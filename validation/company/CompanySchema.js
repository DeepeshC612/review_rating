const joi = require("joi");

const schema = {
  registerComp: joi
    .object({
      companyName: joi
        .string()
        .max(20)
        .messages({
          "companyName.max": "{#label} should not exceed {#max} characters",
        })
        .required(),
      location: joi.string().required(),
      city: joi.string().required(),
      foundedOn: joi
        .date()
        .messages({
          "foundedOn.date": "{#label} should be in {#date} format",
        })
        .required(),
    })
    .unknown(true),
};

module.exports = schema;
