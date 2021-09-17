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

 

});

const Stock = mongoose.model("stockitems", StockSchema);

module.exports = Stock;