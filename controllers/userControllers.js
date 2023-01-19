const bcrypt = require("bcrypt");
const userSchema = require("../models/userModelSchema");
const jwt = require("jsonwebtoken");


const userSignup = async (req, res) => {
  // console.log(req.body);
  const regData = new userSchema(req.body);
  const isemailExists = await userSchema.findOne({
    userEmail: req.body.userEmail,
  });
  if (isemailExists) {
    return res.status(409).json({
      status: "Conflict",
      message: "User is already Exists",
    });
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      regData.password = await bcrypt.hash(req.body.password, salt);
      let data = await regData.save();
      res.status(201).json({
        status: "success",
        message: "User is created Succesfully",
        res: data,
      });
    } catch (err) {
      res.status(400).json({
        status: "Failure",
        data: "Error Occure" + err.message,
      });
    }
  }
};

const userLogin = async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    if (userEmail && password) {
      const user = await userSchema.findOne({ userEmail: userEmail });
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.userEmail === userEmail && isMatch) {
          const token = jwt.sign({ userID: user._id },process.env.JWT_SECRET_KEY,{ expiresIn: "5d"});
          res.status(200).send({
            status: "success",
            message: "Login Success",
            data: user,
            token: token,
          });
        } else {
          res.status(401).send({
            status: "Failed",
            message: "Email or Password is not vaild",
          });
        }
      } else {
        res.status(401).send({
          status: "Failed",
          message: "You are not vaild register user",
        });
      }
    }
  } catch (Error) {
    console.log(Error);
  }
};

const UserPasswordRest = async (req, res) => {
  res.json({
    message: "inside reset pass"
  }) 
} 

module.exports = {
  userSignup,
  userLogin,
  UserPasswordRest
};
