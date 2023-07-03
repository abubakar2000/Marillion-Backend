const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeviceSchema = new Schema(
  {
    name: { type: String, required: true },
    lat: { type: String, required: true },
    long: { type: String, required: true },
    device_type: { type: String, require: true },
    comments: { type: String, require: true },
    deviceSize: { type: Number, require: true },
    numberOfOccupants: { type: Number, require: true },
    solarRadiationFactor: { type: Number, require: true },
    powerOutputOfSolarPanel: { type: Number, require: true },
    region: { type: String, require: true },
    registered_against: {
      type: Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("devices", DeviceSchema);
