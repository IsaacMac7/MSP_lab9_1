const express = require('express');
const router = express.Router();
const alert = require('alert');
const StockModel = require('../models/StockItem');
const SalesModel = require('../models/SalesPost');

// GET
router.get('/readreport', async (req,res)=>{
    //var stock = axios.get('http://localhost:8080/api/readreport');

    //console.log(stock)
});