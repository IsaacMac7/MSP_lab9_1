const express = require('express');
const router = express.Router();

const SalesPost = require('../models/SalesPost');

// Routes
router.get('/', (req, res) => {
    SalesPost.find({ })
            .then( (data) => {
                console.log('Data: ', data);
                res.json(data);
            })
            .catch((error) => {
                console.log('Error: ', error);
            });
});

// route to post to the server
router.post('/save', (req, res) => {
    res.json({
        msg: 'Data received'
    });
});

module.exports = router;