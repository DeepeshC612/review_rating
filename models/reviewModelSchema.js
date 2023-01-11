const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    companyName : {
        type : String,
        required : true
    },
    subject : {
        type : String,
        required : true
    },
    enterReview : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    isActive : {
        type : Boolean,
        required : true,
        default : true
    },
}
)
reviewSchema.set('timestamps', true)
module.exports = mongoose.model('review', reviewSchema)