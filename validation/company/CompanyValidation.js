const company = require('../company/CompanySchema')

module.exports = {
    registerCompValidation: async (req, res, next) => {
      const values = await company.registerComp.validate(req.body, {
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
}