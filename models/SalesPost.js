const mongoose = require('mongoose');

const SalesItemSchema = new mongoose.Schema({

    stockId: {
        type: String,
        required: true,
    },

    stockName: {
        type: String,
        required: true,
    },
    stockAmt: {
        type : String,
        required : true,
    },
    stockDate: {
        type: String,
        default : Date.now() + 7*24*60*60*1000
    }

 

});

const SalesPost = mongoose.model("SalesPost", SalesItemSchema);


module.exports = SalesPost;