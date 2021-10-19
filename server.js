const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors= require('cors');
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

const PORT = process.env.PORT || 8080;
const MONGODB_URI = 'mongodb+srv://msp_dev:msp_dev_pssw@phpapp.emq6r.mongodb.net/phpApp?retryWrites=true&w=majority';

const routes = require('./routes/api');
const salesroutes = require('./routes/salesapi');
const usersroutes = require('./routes/usersapi');

// connects to mongodb
mongoose.connect(MONGODB_URI || 'mongodb://localhost/phpApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// check connection
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected.');
})

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Data Parsing
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(cors());

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Handles HTTP requests
app.use(morgan('tiny'));
app.use('/api', routes);
app.use('/salesapi', salesroutes);
app.use('./usersapi', usersroutes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));