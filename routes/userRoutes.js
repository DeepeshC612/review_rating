const express = require("express");
const router = express.Router();
const {upload} = require('../middlewares/multiStoreMiddelware')
const user = require("../controllers/userControllers");
const valitdation = require("../validation/users/userValidation");
const auth = require('../middlewares/auth_middleware')


router.post(
  '/Signup',
  upload.single("profilePic"),
  valitdation.registerUserValidation,
  user.userSignup
);
router.post(
  "/Login",
  valitdation.LoginUserValidation,
  user.userLogin
);
router.post(
  "/reset_pass",
  user.emailForResetPass
);
router.post(
  "/new_pass/:id/:token",
  user.userResetPass
)


module.exports = router

