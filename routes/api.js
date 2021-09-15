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
    const data = req.body;
    const newObj = new SalesPost(data);

    newObj.save(error => {
        if (error) {
            res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
        else {
            res.json({
                msg: 'Data Received'
            });
        }
    })
});

module.exports = router;