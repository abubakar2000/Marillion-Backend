const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CreditRecordItemSchema = new Schema(
  {
    device: { type: Schema.Types.ObjectId, required: true },
    credits: { type: Number, require: true },
    paidout: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("CreditRecordItem", CreditRecordItemSchema);
