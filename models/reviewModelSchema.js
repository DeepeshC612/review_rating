const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
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
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    CompanyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
}
)
reviewSchema.set('timestamps', true)
module.exports = mongoose.model('review', reviewSchema)