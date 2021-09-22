const express = require('express');
const router = express.Router();


const SalesModel = require('../models/SalesPost');


// GET
router.get('/read', async (req,res)=>{
    SalesModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }

        res.send(result);

    });
   
});

// POST
router.post('/', async (req,res)=>{
    const stockId = req.body.stockId;
    const stockName = req.body.stockName;
    const stockDate = req.body.stockDate;
    const stockAmt = req.body.stockAmt;
    const sales = new SalesModel({ 
        stockId: stockId, 
        stockName: stockName,
        stockDate: stockDate,
        stockAmt: stockAmt,
    });

    try {
        await sales.save();

    } catch(err) {
        console.log(err);
    }

});


router.put('/salesupdate', async (req,res)=>{
    const newStockName = req.body.newStockName;
    const newStockDate = req.body.newStockDate;
    const newStockAmt = req.body.newStockAmt;

    try {
        const stock = await StockModel.findOne({stockId});

        stock.overwrite(
            {
                stockId: stockId,
                stockName: newStockName,
                stockDate: newStockDate,
                stockAmt: newStockAmt,
            }
        )
        await stock.save();
        res.send("update");
        
        await StockModel.findById(id, (err,updatedStock)=>{
            updatedStock.stockName = newStockName;
            updatedStock.stockDate = newStockDate;
            updatedStock.stockAmt = newStockAmt;
            updatedStock.save();
            res.send("update");
        });
        

    } catch(err) {
        console.log(err);
    }

});

router.delete("/salesdelete/:id", async(req,res)=>{

    const id = req.params.id;

    await SalesModel.findByIdAndRemove(id).exec();
    res.send('deleted');


});


module.exports = router;

