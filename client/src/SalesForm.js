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
  },[])

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
    <div className="App">
      <h1> ADD SALES TRANSACTION </h1>
      <label> Sales ID: </label>
      <input type="number" onChange={(event) => {setSalesId(event.target.value)}} />
      <label> Product: </label>
      <select placeholder = "ID Name" onMouseMove={(event) => {setStockInfo(event.target.value)}}> 
        {stockList.map((val)=>{
          return (<option key={val} > {val.stockId} {val.stockName} {val.stockRetailPrice}
            </option>
            
          );

        })} 
      </select>

      <label> Sale Date: </label>
      <input type="date" onChange={(event) => {setstockDate(event.target.value)}} />
      <label> Stock Quantity: </label>
      <input type="text" onChange={(event) => {setstockAmt(event.target.value)}} />
      <label> Sale Price: </label>
      <input type="number" value={Price(stockInfo) * stockAmt} onMouseMove={(event) => {setsalesPrice(event.target.value)}} 
       />
      <button onClick={addToList}> Add Sales </button>
    </div>

  );
}

function Price(stockInfo) {
  var splitInfo = stockInfo.split(' ');
  var splitPrice = splitInfo[2];
  return splitPrice
}
export default App;