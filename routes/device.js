const {
  find,
  update,
  insert,
  findAll,
  count,
  remove,
  countRegion,
  calculate,
} = require("../controller/device.controller");

const router = require("express").Router();

router.post("/calculate", calculate);
router.post("/lookup", find);
router.put("/", update);
router.post("/", insert);
router.get("/", findAll);
router.get("/count", count);
router.delete("/", remove);
router.get("/regcount", countRegion);

module.exports = router;
