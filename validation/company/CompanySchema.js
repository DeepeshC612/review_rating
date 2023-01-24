const joi = require('joi')

const schema = {
    registerComp: joi
      .object({
        companyName: joi.string().max(20).required(),
        location: joi.string().required(),
        city: joi.string().required(),
        foundedOn: joi.date().required(),
      })
      .unknown(true),
}

module.exports = schema