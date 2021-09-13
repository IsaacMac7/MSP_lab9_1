const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URI = 'mongodb+srv://msp_dev:msp_dev_pssw@phpapp.emq6r.mongodb.net/phpApp?retryWrites=true&w=majority';

const routes = require('./routes/api');

// connects to mongodb
mongoose.connect(MONGODB_URI || 'mongodb://localhost/phpApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// check connection
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected.');
})

// Handles HTTP requests
app.use(morgan('tiny'));
app.use('/api', routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));