const mongoose = require('mongoose');

// Schema building - to be moved to another component
const Schema = mongoose.Schema;
const SalesItemSchema = new Schema({
    id: String,
    name: String,
    date: {
        type: String,
        default: Date.now()
    }
});

// Model - pass to Mongo Atlas
const SalesPost = mongoose.model('SalesPost', SalesItemSchema);

module.exports = SalesPost;