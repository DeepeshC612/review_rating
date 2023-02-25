const joi = require("joi");

const schema = {
  giveReview: joi
    .object({
      subject: joi
      .string()
      .max(50)
      .messages({
        "subject.max": "{#label} should not exceed {#max} characters",
      })
      .required(),
      enterReview: joi
      .string()
      .max(300)
      .messages({
        "enterReview.max": "{#label} should not exceed {#max} characters",
      })
      .required(),
      rating: joi.number().required(),
    })
    .unknown(true),
};

module.exports = schema;
