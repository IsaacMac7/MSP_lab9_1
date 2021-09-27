const express = require('express');
const router = express.Router();
const alert = require('alert');
const SalesModel = require('../models/SalesPost');
const StockModel = require('../models/StockItem');

// GET
router.get('/read', async (req,res)=>{
    SalesModel.find({}, (err, result) => {
        if (err) {
            alert('Error: Reading sales detail in database.\nError message: ' + err);
            console.log(err);
            res.send(err);
        }
        res.send(result);
    });
});

// POST
router.post('/', async (req, res)=>{
    const salesId = req.body.salesId;
    const stockInfo = req.body.stockInfo;
    const stockDate = req.body.stockDate;
    const stockAmt = req.body.stockAmt;
    var itemInStock = 0;
    const sales = new SalesModel({ 
        salesId: salesId, 
        stockInfo: stockInfo,
        stockDate: stockDate,
        stockAmt: stockAmt,
    });

    // get stock Quantity
    var query = StockModel.findOne({ stockName : stockInfo }).select('stockQuantity');
    query.exec((err, result) => {
        if (err) {
            alert('Error: Reading stock numbers in database, check console for more');
            console.log(err);
            res.send(err);
        }
        else {
            alert("result quantity: " + result.stockQuantity);
            itemInStock = result.stockQuantity;
            res.send(result);
        }
    });

    alert("iteminstock:" + itemInStock);
    
    if (itemInStock >= stockAmt) {
        try {
            await sales.save();
    
        } catch(err) {
            alert('Error: Saving sale detail in database.\nError message: ' + err);
            console.log(err);
        }
    }
    else {
        alert("Quantity:" + itemInStock);
    }
    
});


router.put('/salesupdate', async (req,res)=>{
    const newStockInfo = req.body.newStockInfo;
    const newStockDate = req.body.newStockDate;
    const newStockAmt = req.body.newStockAmt;
    const salesId = req.body.salesId;

    try {
        const stock = await SalesModel.findOne({salesId});

        stock.overwrite(
            {
                salesId: salesId,
                stockInfo: newStockInfo,
                stockDate: newStockDate,
                stockAmt: newStockAmt,
            }
        )
        await stock.save();
        res.send("update");
        
        await SalesModel.findById(id, (err,updatedStock)=>{
            updatedStock.salesId = salesId;
            updatedStock.stockInfo = newStockInfo;
            updatedStock.stockDate = newStockDate;
            updatedStock.stockAmt = newStockAmt;
            updatedStock.save();
            res.send("update");
        });
    } catch(err) {
        alert('Error: Updating sale detail in database.\nError message: ' + err);
        console.log(err);
    }

});

router.delete("/salesdelete/:id", async(req,res)=>{
    const id = req.params.id;
    try {
        await SalesModel.findByIdAndRemove(id).exec();
    }
    catch (err) {
        alert('Error: Deleting sale detail in database.\nError message: ' + err);
        console.log(err);
    }

    res.send('deleted');
});


module.exports = router;

