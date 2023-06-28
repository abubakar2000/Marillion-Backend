var express = require("express");
var router = express.Router();
var {
  create,
  login,
  update,
  find,
  sendVerification,
  verify,
} = require("../controller/user.controller");

router.post("/", create);
router.put("/", update);
router.post("/login", login);
router.post("/sendverification", sendVerification);
router.post("/verify", verify);
router.get("/", find);

module.exports = router;
