const { default: mongoose, Schema, Mongoose } = require("mongoose");
const subscriptionModel = require("../models/subscription.model");
var userModel = require("../models/user.model");
const { sendMail } = require("../services/mailer.service");
const { randomString } = require("../utils/utils");

const create = async (req, res) => {
  console.log(req.body);

  const newUser = userModel({
    ...req.body,
  });

  const response = await newUser.save();

  res.send(response);
};

const update = async (req, res) => {
  const ref = new mongoose.Types.ObjectId(req.body.id);
  const response = await userModel.findByIdAndUpdate(
    ref,
    {
      $set: req.body,
    },
    { upsert: true }
  );
  res.send(response);
};

const login = async (req, res) => {
  const response = await userModel.findOne({
    ...req.body,
  });
  if (!response) {
    res.send({
      error: true,
      message: "Invalid email or password",
    });
    return;
  }
  res.send({
    error: false,
    message: response,
  });
};

const sendVerification = async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    res.send({
      error: true,
      message: "No User found",
    });
  }
  if (!user.emailVerified) {
    const otp = randomString(8);
    const response = await sendMail({
      to: req.body.email,
      subject: otp,
      html: `<div style="background-color:white;color:black">
      <div
    style="text-align: center;margin: 0pt;font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
    <div style="padding: 10pt;background-color: blueviolet;text-align: center;font-size: 3vh;color: white;">
    ${req.body.firstName} ${req.body.lastName} welcome to Marillion
    </div>
    <br>
    <div style="text-align: start;padding:10pt;">
        <div>
            Please use the verification code to sign up
        </div>
        <h1 style="letter-spacing:1.3pt">${otp}</h1>
    </div>
    <div style="text-align: start;background-color: gainsboro;padding: 10pt;color: gray;">
        This is a computer generated email. Pleasae don't respond to it.
    </div>
  </div>
      </div>`,
    });
    await userModel.findByIdAndUpdate(user.id, {
      $set: {
        otp: otp,
      },
    });
    res.send({
      error: false,
      message: `A verification code has been sent to ${req.body.email}. Type that here`,
    });
  } else {
    res.send({
      error: false,
      message: "Email Already Verified",
    });
  }
};

const verify = async (req, res) => {
  const response = await userModel.findOneAndUpdate(
    {
      ...req.body,
    },
    {
      $set: {
        otp: "",
        emailVerified: true,
      },
    }
  );
  if (response?.emailVerified) {
    res.send({
      error: false,
      message: "Email already verified",
    });
  }
  if (response) {
    res.send({
      error: false,
      message: "Successfully verified the email",
    });
    return;
  } else {
    res.send({
      error: true,
      message: "Invalid Verification entered",
    });
  }
};

const find = async (req, res) => {
  const data = await userModel.findById(req.body.id, { password: 0 });
  res.send(data);
};

module.exports = {
  create,
  login,
  sendVerification,
  verify,
  update,
  find,
};
