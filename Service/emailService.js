const nodemailer = require("nodemailer");
require('dotenv').config();

const sender = process.env.EMAIL;
const password = process.env.PASS;

const sendEmail = (email, token) => {
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: sender,
    pass: password,
  },
})

var mailOptions = {
  from: sender,
  to: email,
  subject: "Password reset",
  html: `
  <p>You requested for password reset</p>
  <h5>click in this <a herf="http://localhost:3000/reset/${token}"> link </a> to reset password
  </h5>`
};

transporter.sendMail(mailOptions, (error, info)=>{
  if (error){
    res.stauts(424).json({
      success: "failure",
      error: "Error Occure " + error.message
    })
  } else {
    res.stauts(200).json({
      success: "success",
      message: "Email send successfully " + info.response
    })
  }
})
}


module.exports = {
  sendEmail,
};
