const nodemailer = require("nodemailer");
const { EMAIL_ID, EMAIL_PASS } = require("./ServerConfig");


const Sender = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_ID,
    pass: EMAIL_PASS,
  },
});

module.exports = {
  Sender,
};
