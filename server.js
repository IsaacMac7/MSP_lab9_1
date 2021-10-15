const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors= require('cors');
const app = express();

const PORT = process.env.PORT || 8080;
const MONGODB_URI = 'mongodb+srv://msp_dev:msp_dev_pssw@phpapp.emq6r.mongodb.net/phpApp?retryWrites=true&w=majority';

const routes = require('./routes/api');
const salesroutes = require('./routes/salesapi');

// connects to mongodb
mongoose.connect(MONGODB_URI || 'mongodb://localhost/phpApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// check connection
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected.');
})

// Data Parsing
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(cors());

app.use('/login', (req, res) => {
    res.send({
        token:'test123'
    });
});

// Handles HTTP requests
app.use(morgan('tiny'));
app.use('/api', routes);
app.use('/salesapi', salesroutes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));