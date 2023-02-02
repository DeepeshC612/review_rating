const joi = require("joi");

const schema = {
  giveReview: joi
    .object({
      subject: joi.string().max(20).required(),
      enterReview: joi.string().max(300).required(),
      rating: joi.number().required(),
    })
    .unknown(true),
};

module.exports = schema;
