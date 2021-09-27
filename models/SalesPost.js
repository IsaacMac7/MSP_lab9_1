const mongoose = require('mongoose');

const SalesItemSchema = new mongoose.Schema({
    salesId: {
        type: String,
        required: true,
    },

    stockInfo: {
        type: String,
        required: true,
    },
    stockAmt: {
        type : String,
        required : true,
    },
    stockDate: {
        type: String,
        default : Date.now()
    }
});

const SalesPost = mongoose.model("SalesPost", SalesItemSchema);


module.exports = SalesPost;