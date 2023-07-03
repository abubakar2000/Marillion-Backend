const { find, update, insert } = require("../controller/device.controller");

const router = require("express").Router();

router.post("/lookup", find);
router.put("/", update);
router.post("/", insert);

module.exports = router;
