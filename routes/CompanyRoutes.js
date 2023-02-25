const express = require("express");
const router = express.Router();
const comp = require("../controllers/companyControllers");
const validation = require("../validation/company/CompanyValidation");
const { upload } = require('../middlewares/multiStoreMiddleware')

router.post(
  "/Create/:id",
  upload.single("CompanyLogo"),
  validation.registerCompValidation,
  comp.createCompany
);
router.post("/details/:id", comp.detailsComp);
router.get("/allCompany", comp.ListComp);
router.get("/Search", comp.searchComp);

module.exports = router;
