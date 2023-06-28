const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let SubscriptionSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true, default: 0.99 },
    description: { type: String, required: true, default: null },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

// Export the model
module.exports = mongoose.model("subscriptions", SubscriptionSchema);
