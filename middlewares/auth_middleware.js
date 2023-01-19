const jwt = require('jsonwebtoken')
const User = require('../models/userModelSchema')

const checkUserAuth = async (req, res, next) => {
    console.log(req.headers);
    // let token;
    // const {authorization} = req.headers;
    // if (authorization && authorization.startsWith("Bearer token")) {
    //     try{
    //         token = 
    //     }
    // }
}

module.exports = {checkUserAuth}