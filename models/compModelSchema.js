const mongoose = require('mongoose')

const compSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    companyName : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    foundedOn : {
        type : Date,
        required : true
    },
    isActive : {
        type : Boolean,
        required : true,
        default : true
    },
}
)
compSchema.set('timestamps', true)
module.exports = mongoose.model('comp', compSchema)