const { Schema, default: mongoose } = require("mongoose");
const subscriptionModel = require("../models/subscription.model");

const insert = async (req, res) => {
  const newService = subscriptionModel({
    ...req.body,
  });
  const response = await newService.save();
  res.send(response);
};
const find = async (req, res) => {
  const response = await subscriptionModel.findOne({
    ...req.body,
  });
  res.send(response);
};
const update = async (req, res) => {
  const ref = new mongoose.Types.ObjectId(req.body.id);
  console.log(ref);
  const response = await subscriptionModel.findByIdAndUpdate(
    ref,
    {
      $set: req.body,
    },
    {
      upsert: true,
    }
  );
  res.send(response);
};
const remove = () => {};

module.exports = {
  insert,
  find,
  update,
  remove,
};
