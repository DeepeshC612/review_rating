const express = require("express");
const router = express.Router();
const comp = require("../controllers/companyControllers");
const validation = require("../validation/company/CompanyValidation");
const {upload} = require('../middlewares/multiStoreMiddelware');

router.post(
  "/CreateCompany",
  upload.single("CompanyLogo"),
  validation.registerCompValidation,
  comp.createCompany
);
router.post(
  "/Company-details/:id",
  comp.detailsComp
);
router.get(
  "/findCompany",
  comp.allComp
);

module.exports = router;
