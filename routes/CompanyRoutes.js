const express = require('express')
const Comprouter = express.Router()
const comp = require('../controllers/companyControllers')
const validation = require('../validation/company/CompanyValidation')

Comprouter.post(
    "/CreateCompany",
    validation.registerCompValidation,
    comp.createCompany
  );

module.exports = Comprouter;