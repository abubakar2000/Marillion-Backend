const { Schema, default: mongoose } = require("mongoose");
const creditrecorditemSchema = require("../models/creditrecorditem.model");

const insert = async (req, res) => {
  const newService = creditrecorditemSchema({
    ...req.body,
  });
  const response = await newService.save();
  res.send(response);
};
const find = async (req, res) => {
  const response = await creditrecorditemSchema.find({
    ...req.body,
  });
  res.send(response);
};
const update = async (req, res) => {
  const ref = new mongoose.Types.ObjectId(req.body.id);
  console.log(ref);
  const response = await creditrecorditemSchema.findByIdAndUpdate(
    ref,
    {
      $set: req.body,
    },
    {
      upsert: false,
    }
  );
  console.log(response);
  res.send(response);
};
const remove = () => {};

module.exports = {
  insert,
  find,
  update,
  remove,
};
