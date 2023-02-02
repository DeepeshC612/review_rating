const jwt = require('jsonwebtoken')
const User = require('../models/userModelSchema')

const checkUserAuth = async (req, res, next) => {
    let token
    const {authorization} = req.headers;
    if(authorization && authorization.startsWith('Bearer')){
        try{
            token = authorization.split(' ')[1];
            console.log(token);
            const {id} = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log(id);
            req.user = await User.findById(id).select('-password');
            console.log(req.user);
            next()
        } catch(err) {
            res.status(401).send({ status: "failed", message: "Unauthorized User" + err.message});
        }
    }
    if(!token){
        res.status(401).send({"message": "Unauthorized User No token"})
    }
}

module.exports = {checkUserAuth}