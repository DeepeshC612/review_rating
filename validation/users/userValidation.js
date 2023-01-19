const user = require("../users/userSchema");

module.exports = {
  registerUserValidation: async (req, res, next) => {
    const values = await user.registerUser.validate(req.body, {
      abortEarly: false,
    });
    if (values.error) {
      res.status(400).json({
        success: 0,
        message: values.error.details[0].message,
      });
    } else {
      next();
    }
  },

  LoginUserValidation: async (req, res, next) => {
    const values = await user.LoginUser.validate(req.body, {
      abortEarly: false,
    });
    if (values.error) {
      res.status(400).json({
        success: 0,
        message: values.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
