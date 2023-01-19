const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joipassword = joi.extend(joiPasswordExtendCore);

const schema = {
  registerUser: joi
    .object({
      userName: joi.string().max(20).required(),
      userEmail: joi.string().email().required(),
      password: joipassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(2)
        .noWhiteSpaces()
        .messages({
          "password.minOfUppercase":
            "{#label} should contain at least {#min} uppercase character",
          "password.minOfSpecialCharacters":
            "{#label} should contain at least {#min} special character",
          "password.minOfLowercase":
            "{#label} should contain at least {#min} lowercase character",
          "password.minOfNumeric":
            "{#label} should contain at least {#min} numeric character",
          "password.noWhiteSpaces": "{#label} should not contain white spaces",
        })
        .required(),
      phonenum: joi
        .number()
        .integer()
        .min(1000000000)
        .max(9999999999)
        .message("Invalid mobile Number")
        .required(),
      city: joi.string().required(),
      state: joi.string().required(),
    })
    .unknown(true),

  LoginUser: joi
    .object({
      userEmail: joi.string().email().required(),
      password: joi.string().required(),
    })
    .unknown(true),
};

module.exports = schema;
