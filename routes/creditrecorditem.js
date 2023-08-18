var express = require("express");
var router = express.Router();

const {
  insert,
  find,
  remove,
  update,
} = require("../controller/creditrecorditem.controller");

router.post("/", insert);
router.get("/", find);
router.put("/", update);
router.delete("/", remove);

module.exports = router;
