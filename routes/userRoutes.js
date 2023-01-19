const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const user = require("../controllers/userControllers");
const valitdation = require("../validation/users/userValidation");
const auth = require('../middlewares/auth_middleware')


router.post(
  "/Signup",
  upload.none(),
  valitdation.registerUserValidation,
  user.userSignup
);
router.post(
  "/Login",
  valitdation.LoginUserValidation,
  user.userLogin
);
router.post(
  "/user_reset_password",
  auth.checkUserAuth,
  user.UserPasswordRest
);

module.exports = router;
