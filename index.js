const dotenv = require('dotenv')
dotenv.config()

const bodyparser = require("body-parser");
const express = require("express");
const app = express();
const port = 5000;
require("./models/config");
const user = require("./routes/userRoutes");
const { transporter, mailOptions } = require("./Service/emailService");
// const cron = require("node-cron");

app.get("/send", async (req, res) => {
  // cron.schedule("*/10 * * * * *", function(){
  //     console.log("running a task every 10 second");

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent Succesfully" + info.response);
    }
  });
});
// });

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());


app.use("/", user);
app.listen(process.env.PORT, function (req, res) {
  console.log(`Server is running port no:${process.env.PORT}`);
});
