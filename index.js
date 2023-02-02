const dotenv = require('dotenv')
dotenv.config()

const bodyparser = require("body-parser");
const express = require("express");
const app = express();
require("./models/config");
const router = require('./routes/mainRoutes');
// const comp = require('./routes/CompanyRoutes')

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());

// app.use("/", comp)
app.use('/', router);
app.listen(process.env.PORT, function (req, res) {
  console.log(`Server is running port no:${process.env.PORT}`);
});
