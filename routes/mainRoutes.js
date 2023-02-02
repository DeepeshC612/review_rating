const express = require("express");
const router = express.Router();
const userRoutes = require('../routes/userRoutes')
const compRoutes = require('../routes/CompanyRoutes')
const reviewRoutes = require('../routes/reviewRoutes')


router.use('/user', userRoutes)
router.use('/Company', compRoutes)
router.use('/review', reviewRoutes)

module.exports = router