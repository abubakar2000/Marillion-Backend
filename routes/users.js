var express = require("express");
var router = express.Router();
var {
  create,
  login,
  update,
  find,
  sendVerification,
  verify,
  forgot,
  updatePassword,
  updateEmail,
  verifyNewEmail,
  updatePasswordWithOldPassword,
  updateUser,
  findAll,
  remove,
  count,
} = require("../controller/user.controller");

router.post("/", create);
router.get("/", findAll);
router.put("/", update);
router.post("/login", login);
router.get("/count", count);
router.post("/sendverification", sendVerification);
router.post("/sendverification/forgot", forgot);
router.post("/sendverification/checknupdate", updatePassword);
router.post("/verify", verify);
router.post("/updateEmail", updateEmail);
router.post("/verifyNewEmail", verifyNewEmail);
router.post("/updatePasswordWithOldPassword", updatePasswordWithOldPassword);
router.post("/updateUser", updateUser);
router.post("/get", find);
router.delete("/:email", remove);

module.exports = router;
