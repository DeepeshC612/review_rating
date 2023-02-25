const mongoose = require('mongoose')

const compSchema = new mongoose.Schema({
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
    companyRating : {
        type : Number,
        required : true,
        default : 0
    },
    companyLogo : {
        type : String,
        required : true
    },
    isActive : {
        type : Boolean,
        required : true,
        default : true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
}
)
compSchema.set('timestamps', true)
module.exports = mongoose.model('comp', compSchema)