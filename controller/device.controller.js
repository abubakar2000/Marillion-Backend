var mongoose = require("mongoose");
const deviceModel = require("../models/device.model");

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
const remove = async (req, res) => {};

module.exports = {
  find,
  update,
  insert,
  remove,
};
