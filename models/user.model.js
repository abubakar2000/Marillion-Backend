const mongoose = require("mongoose");
const subscriptionModel = require("./subscription.model");
const Schema = mongoose.Schema;

let UsersSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: false },
    city: { type: String, required: false },
    postalCode: { type: String, required: false },
    telephone: { type: String, required: false },
    address: { type: String, required: false },
    imagePath: { type: String, required: false },
    otp: { type: String, required: false },
    emailVerified: { type: Boolean, required: false },
    tempMail: { type: String, required: false },
    tempMailVerified: { type: Boolean, required: false },
    subscription: {
      type: Schema.Types.ObjectId,
      ref: "subscriptions",
      required: false,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

// Export the model
module.exports = mongoose.model("users", UsersSchema);
