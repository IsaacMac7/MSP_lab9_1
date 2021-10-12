import React, { useState, useEffect } from "react";
import axios from "axios";
import alert from "alert";
import './App.css';

function App() {

  const [salesId, setSalesId] = useState(0);
  const [stockInfo, setStockInfo] = useState("");
  const [stockDate, setstockDate] = useState("");
  const [stockAmt, setstockAmt] = useState(0);

  const[stockList, setStockList] = useState([]);

  const[stockNum, setStockNum] = useState(0);

  useEffect(()=>{
    axios.get('http://localhost:8080/api/read').then((response)=>{
      setStockList(response.data);
    })
  },[stockList])


  
  const addToList = () => {
    axios.post("http://localhost:8080/salesapi/", {
      salesId: salesId, 
      stockInfo: stockInfo,
      stockDate: stockDate,
      stockAmt: stockAmt,
    });

    window.location.href="http://localhost:3000/salesdetails";
  };


  return (
    <div className="App">
      <h1> ADD SALES TRANSACTION </h1>
      <label> Sales ID: </label>
      <input type="number" onChange={(event) => {setSalesId(event.target.value)}} />
      <label> Product: </label>
      <select placeholder = "ID Name" onChange={(event) => {setStockInfo(event.target.value)}}> 
        {stockList.map((val)=>{
          return (<option key={val} > {val.stockName}
            </option>
            
          );

        })} 
      </select>

      <label> Sale Date: </label>
      <input type="date" onChange={(event) => {setstockDate(event.target.value)}} />
      <label> Stock Quantity: </label>
      <input type="text" onChange={(event) => {setstockAmt(event.target.value)}} />
      <button onClick={addToList}> Add Sales </button>

    </div>

  );
}

export default App;