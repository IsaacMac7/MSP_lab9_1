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
router.post('/', async (req)=>{
    const salesId = req.body.salesId;
    const stockInfo = req.body.stockInfo;
    const stockDate = req.body.stockDate;
    const stockAmt = req.body.stockAmt;
    const sales = new SalesModel({ 
        salesId: salesId, 
        stockInfo: stockInfo,
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
        console.log(err);
    }

});

router.delete("/salesdelete/:id", async(req,res)=>{

    const id = req.params.id;

    await SalesModel.findByIdAndRemove(id).exec();
    res.send('deleted');


});


module.exports = router;

