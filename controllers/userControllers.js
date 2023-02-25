const bcrypt = require("bcrypt");
const userSchema = require("../models/userModelSchema");
const jwt = require("jsonwebtoken");
const mail = require("../Service/emailService");

const userSignup = async (req, res) => {
  const regData = new userSchema(req.body);
  const isemailExists = await userSchema.findOne({
    userEmail: req.body.userEmail,
  });
  if (isemailExists) {
    return res.status(409).json({
      success: "failure",
      error: "User with this email is already exists",
    });
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      regData.password = await bcrypt.hash(req.body.password, salt);
      const filePath = `uploads${req.file.filename}`;
      regData.profilePic = filePath;
      await regData.save();
      res.status(201).json({
        success: "success",
        message: "User is created succesfully",
      });
    } catch (err) {
      res.status(400).json({
        success: "failure",
        error: "Error occure " + err.message,
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
          const token = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );
          res.status(200).send({
            success: "success",
            message: "Login success",
            userDetails: {
              userName: user.userName,
              profilePic: user.profilePic,
              userEmail: user.userEmail,
            },
            token: token,
          });
        } else {
          res.status(401).send({
            success: "failure",
            error: "Email or Password is not valid",
          });
        }
      } else {
        res.status(401).send({
          success: "failure",
          error: "You are not valid register user",
        });
      }
    }
  } catch (Error) {
    res.status(401).send({
      success: "failure",
      error: "Error Occure " + Error.message,
    });
  }
};

const emailForResetPass = async (req, res) => {
  const { userEmail } = req.body;
  try {
    const alreadyExits = await userSchema.findOne({ userEmail: userEmail });
    if (alreadyExits != null) {
      const secretKey = alreadyExits._id + process.env.JWT_SECRET_KEY;
      const token = await jwt.sign({ userId: alreadyExits._id }, secretKey, {
        expiresIn: "5d",
      });
      mail.sendEmail(userEmail, alreadyExits._id, token);
      return res.status(200).json({
        success: "success",
        message: "Email send sucessfully",
        token: token,
        userId: alreadyExits._id,
      });
    } else {
      res.status(550).json({
        success: "failure",
        error: "This email is not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: "failure",
      error: "Error Occure" + err.message,
    });
  }
};

const userResetPass = async (req, res) => {
  const { newPassword, confirmPass } = req.body;
  const { id, token } = req.params;
  try {
    const userExits = await userSchema.findById(id);
    const secretKey = userExits._id + process.env.JWT_SECRET_KEY;
    jwt.verify(token, secretKey);
    if (newPassword && confirmPass) {
      if (newPassword !== confirmPass) {
        res.status(401).json({
          success: "failure",
          error: "Password and confirm is not match",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(confirmPass, salt);
        await userSchema.findByIdAndUpdate(userExits._id, {
          $set: { password: newHashPassword },
        });
        res.status(200).json({
          success: "success",
          message: "Password reset successfully",
        });
      }
    } else {
      res.status(403).json({
        success: "failure",
        error: "All fields are required",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: "failure",
      error: "Error Occure " + err.message,
    });
  }
};

module.exports = {
  userSignup,
  userLogin,
  emailForResetPass,
  userResetPass,
};
