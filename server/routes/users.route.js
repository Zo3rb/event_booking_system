const express = require("express");

const router = express.Router();

router.route("/").get((req, res) => {
  return res.status(200).json({
    status: "success",
    data: {
      msg: "Welcome from users",
    },
  });
});

module.exports = router;
