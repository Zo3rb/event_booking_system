const os = require("node:os");
const express = require("express");

const router = express.Router();

// Helper function to format bytes to a human-readable string (GB)
const formatBytesToGB = (bytes) => {
  if (bytes === 0) return "0 GB";
  const gb = bytes / (1024 * 1024 * 1024);
  return `${gb.toFixed(2)} GB`;
};

router.get("/", async (req, res) => {
  try {
    const cpus = os.cpus();
    // Aggregate CPU info by model and speed
    const aggregatedCpuInfo = cpus.reduce((acc, cpu) => {
      const model = cpu.model.trim();
      const speedGHz = (cpu.speed / 1000).toFixed(2);
      const key = `${model} @ ${speedGHz}GHz`;

      if (!acc[key]) {
        acc[key] = { model, speed: `${speedGHz} GHz`, cores: 0 };
      }
      acc[key].cores++;
      return acc;
    }, {});

    const healthCheck = {
      uptime: `${(process.uptime() / 3600).toFixed(2)} hours`,
      message: "ok",
      timestamp: new Date(Date.now()).toLocaleString(),
      serverTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      memory: {
        free: formatBytesToGB(os.freemem()),
        total: formatBytesToGB(os.totalmem()),
        usage: `${((1 - os.freemem() / os.totalmem()) * 100).toFixed(2)}%`,
      },
      platform: os.platform(),
      release: os.release(),
      architecture: os.arch(),
      hostname: os.hostname(),
      processor: {
        cores: os.cpus().length,
        loadAverage: os.loadavg().map((load) => load.toFixed(2)),
        models: Object.values(aggregatedCpuInfo),
      },
    };

    res.status(200).json({
      status: "success",
      data: healthCheck,
    });
  } catch (error) {
    console.error("Error in health check route:", error);
    res.status(503).json({
      status: "error",
      message: "Service Unavailable",
      errorDetails: error.message,
    });
  }
});

module.exports = router;
