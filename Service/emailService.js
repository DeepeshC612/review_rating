const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cholkerdeepesh@gmail.com",
    pass: "wzpyzojhpheqbuue",
  },
});

const mailOptions = {
  from: "cholkerdeepesh@gmail.com",
  to: "jaycholker@gmail.com",
  subject: "This is test mail",
  text: "Hii, this is test mail",
};

module.exports = {
  transporter,
  mailOptions,
};
