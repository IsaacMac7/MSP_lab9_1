const express = require('express');
const router = express.Router();
const alert = require('alert');
const StockModel = require('../models/StockItem');

// GET
router.get('/read', async (req,res)=>{
    StockModel.find({}, (err, result) => {
        if (err) {
            alert('Error: Reading stocks detail in database, check console for more');
            console.log(err);
            res.send(err);
        }
        res.send(result);
    });
});

// POST
router.post('/', async (req,res)=>{
    const stockId = req.body.stockId;
    const stockName = req.body.stockName;
    const stockInfo = req.body.stockInfo;
    const stockQuantity = req.body.stockQuantity;
    const stockCost = req.body.stockCost;
    const stockRetailPrice = req.body.stockRetailPrice;
    const stock = new StockModel({ 
        stockId: stockId, 
        stockName: stockName,
        stockInfo: stockInfo,
        stockQuantity: stockQuantity,
        stockCost: stockCost,
        stockRetailPrice: stockRetailPrice,
    });

    try {
        await stock.save();
    } catch(err) {
        alert('Error: Saving stock in database.\nError message: ' + err);
        console.log(err);
    }
});


router.put('/update', async (req,res)=>{
    const newStockName = req.body.newStockName;
    const newStockInfo = req.body.newStockInfo;
    const newStockQuantity = req.body.newStockQuantity;
    const newStockCost = req.body.newStockCost;
    const newStockRetailPrice = req.body.newStockRetailPrice;
    const stockId = req.body.stockId;

    try {
        const stock = await StockModel.findOne({stockId});

        stock.overwrite(
            {
                stockId: stockId,
                stockName: newStockName,
                stockInfo: newStockInfo,
                stockQuantity: newStockQuantity,
                stockCost: newStockCost,
                stockRetailPrice: newStockRetailPrice
            }
        )
        await stock.save();
        res.send("update");
        
        await StockModel.findById(id, (err,updatedStock)=>{
            updatedStock.stockName = newStockName;
            updatedStock.stockInfo = newStockInfo;
            updatedStock.stockQuantity = newStockQuantity;
            updatedStock.stockCost = newStockCost;
            updatedStock.stockRetailPrice = newStockRetailPrice;
            updatedStock.save();
            res.send("update");
        });
    } catch(err) {
        alert('Error: Updating stock detail in database.\nError message: ' + err);
        console.log(err);
    }

});

router.delete("/delete/:id", async(req,res)=>{
    const id = req.params.id;
    try {
        await StockModel.findByIdAndRemove(id).exec();
    }
    catch (err) {
        alert('Error: Deleting stock detail in database.\nError message: ' + err);
        console.log(err);
    }
    res.send('deleted');
});

module.exports = router;