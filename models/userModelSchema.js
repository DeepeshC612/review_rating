const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    userEmail : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phonenumber : {
        type : string,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    profilePic : {
        type : String,
        required : true
    },
    userRole : {
        type : String,
        required : true,
        default : 'user'
    },
    isActive : {
        type : Boolean,
        required : true,
        default : true
    },
}
)
userSchema.set('timestamps', true)
module.exports = mongoose.model('user', userSchema)