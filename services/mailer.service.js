const nodemailer = require("nodemailer");
const config = require("../config/config.json");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  service: "gmail",
  secure: false,
  auth: {
    user: config.email,
    pass: config.keyg,
  },
});

// async..await is not allowed in global scope, must use a wrapper
const sendMail = async ({ to, subject, html, body }) => {
  // send mail with defined transport object
  console.log(to, subject, html);
  const info = await transporter.sendMail({
    from: `"Nick Havercroft" <${config.email}>`, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: html, // html body
  });

  return info;
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
};

module.exports = {
  sendMail,
};
