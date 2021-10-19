import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';


function App() {

  const [salesId, setSalesId] = useState(0);
  const [stockInfo, setStockInfo] = useState("");
  const [stockDate, setstockDate] = useState("");
  const [stockAmt, setstockAmt] = useState(0);
  const [salesPrice, setsalesPrice] = useState(0);
  const[stockList, setStockList] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:8080/api/read').then((response)=>{
      setStockList(response.data);
    })
  },[stockList])

  const addToList = () => {
    console.log(salesPrice);
    axios.post("http://localhost:8080/salesapi/", {
      salesId: salesId, 
      stockInfo: stockInfo,
      stockDate: stockDate,
      stockAmt: stockAmt,
      salesPrice: salesPrice,
    })

    window.location.href="http://localhost:3000/salesdetails";
  };


  return (
    <div className="Forms">
    <div className="row g-3 align-items-center">
      <div className="FormHeading">
       <h1 class="container rounded border py-3 my-10" style={{backgroundColor: '#8F99E7', color: 'white'}}>ADD NEW SALES RECORD</h1>
      </div>

      <form style={{color: "#8F99E7"}}> 
        <div class="col-md-7"> 
          <label class="form-label"> Sales ID: </label>
          <input class="form-control" type="number" onChange={(event) => {setSalesId(event.target.value)}} />
        </div>

        <div class="col-md-7"> 
          <label class="form-label"> Product: </label>
          <select class="form-select h-100" placeholder = "ID Name" onChange={(event)=> {setStockInfo(event.target.value)}}>
          {stockList.map((val)=>{
            return (<option key={val} > Stock ID: {val.stockId} Stock Name: {val.stockName} ${val.stockRetailPrice}
              </option>
              
            );
          })}

          </select>
        </div>

        <div class="col-md-7"> 
          <label class="form-label"> Sale Date: </label>
          <input class="form-control" type="date" onChange={(event)=> {setstockDate(event.target.value)}}  />
        </div>

        <div class="col-md-7"> 
          <label class="form-label"> Stock Quantity: </label>
          <input class="form-control" type="text" onChange={(event)=> {setstockAmt(event.target.value)}} />
        </div>

        <div class="col-md-7">
          <label class="form-label"> Sale Price: </label>
          <input class="form-control" type="number" value={Price(stockInfo) * stockAmt} onMouseMove={(event) => {setsalesPrice(event.target.value)}} />
        </div>

      
      </form>

      
      <div class="col-md-12"> 
          <button style={{backgroundColor: "#8F99E7"}}class="btn btn-primary" onClick={addToList}> Add Sales </button>
      </div>
    </div>
    </div>

  );
}

function Price(stockInfo) {
  var splitInfo = stockInfo.split('$');
  var splitPrice = splitInfo[1];
  return splitPrice
}
export default App;