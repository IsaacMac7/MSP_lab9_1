const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({

    stockId: {
        type: String,
        required: true,
    },

    stockName : {
        type: String,
        required: true,
    },
    
    stockInfo : {
        type: String,
        required: true,
    },

    stockQuantity: {
        type: Number,
        required: true,
    },

    stockCost: {
        type: Number,
        required: true,
    },
    stockRetailPrice: {
        type: Number,
        required: true,
    }

 

});

const Stock = mongoose.model("stockitems", StockSchema);

module.exports = Stock;