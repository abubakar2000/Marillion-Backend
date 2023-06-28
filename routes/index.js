var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("Nauman Bhai agai");
});

module.exports = router;
