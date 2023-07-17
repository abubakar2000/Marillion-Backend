var mongoose = require("mongoose");
const deviceModel = require("../models/device.model");

const CONSTANTS = [
  { region: "Africa", srf: 5.5, cif: 0.556 },
  { region: "Asia", srf: 5.0, cif: 0.773 },
  { region: "Europe", srf: 4.0, cif: 0.329 },
  { region: "Americas", srf: 4.5, cif: 0.475 },
];

const resolveRegionInfo = (region) => {
  return CONSTANTS.find((object) => object.region === region);
};

const calculate = async (req, res) => {
  const ref = new mongoose.Types.ObjectId(req.body.id);
  try {
    const responseArray = await deviceModel.find(ref);
    const newDevice = responseArray[0];

    const totalkWhGeneratedPerYear =
      (newDevice.deviceSize ?? 0) *
      0.174 *
      (newDevice.device_type === "Hot Water Geyser"
        ? newDevice.numberOfOccupants
        : newDevice.powerOutputOfSolarPanel ?? 0) *
      0.85 *
      newDevice.solarRadiationFactor;

    console.log(newDevice);
    const info = resolveRegionInfo(newDevice.region);
    console.log(info);
    const carbonSavings = totalkWhGeneratedPerYear * info.cif;

    res.send({
      data: carbonSavings,
    });
    return newDevice;
  } catch (error) {
    console.log(error);
    res.send({
      error: true,
      data: error,
    });
    return error;
  }
};
const find = async (req, res) => {
  try {
    const newDevice = await deviceModel.find({
      ...req.body,
    });
    res.send({
      data: newDevice,
    });
    return newDevice;
  } catch (error) {
    res.send({
      error: true,
      data: error,
    });
    return error;
  }
};
const findAll = async (req, res) => {
  try {
    const newDevice = await deviceModel.find();
    res.send({
      data: newDevice,
    });
    return newDevice;
  } catch (error) {
    res.send({
      error: true,
      data: error,
    });
    return error;
  }
};
const count = async (req, res) => {
  const countDoc = await deviceModel.count();
  res.send({
    data: countDoc,
  });
  return countDoc;
};
const update = async (req, res) => {
  const ref = new mongoose.Types.ObjectId(req.body.id);
  const response = await deviceModel.findByIdAndUpdate(
    ref,
    {
      $set: req.body,
    },
    {
      upsert: true,
    }
  );
  res.send({
    data: response,
  });
  return response;
};
const insert = async (req, res) => {
  try {
    const newDevice = deviceModel({
      ...req.body,
    });

    const response = await newDevice.save();
    res.send({
      data: response,
    });
    return response;
  } catch (error) {
    res.send({
      error: true,
      data: "Could not add device",
    });
    return "error";
  }
};
const remove = async (req, res) => {
  const ref = new mongoose.Types.ObjectId(req.body.id);
  const response = await deviceModel.deleteOne(ref);
  res.send({
    data: response,
  });
};
const countRegion = async (req, res) => {
  try {
    const responseObject = await deviceModel.distinct("region");
    res.send({
      data: responseObject.length,
    });
    return responseObject;
  } catch (error) {
    res.send({
      error: true,
      data: error,
    });
    return error;
  }
};
module.exports = {
  calculate,
  find,
  update,
  insert,
  remove,
  findAll,
  count,
  countRegion,
};
