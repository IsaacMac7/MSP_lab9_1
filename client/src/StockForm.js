import React, { useState} from "react";
import axios from "axios";
import './App.css';


function App() {

  const [stockId, setStockId] = useState(0);
  const [stockName, setStockName] = useState("");
  const [stockInfo, setStockInfo] = useState("");
  const [stockQuantity, setStockQuantity] = useState(0);
  const [stockCost, setStockCost] = useState(0);
  const [stockRetailPrice, setStockRetailPrice] = useState(0);


  
  const addToList = () => {
    axios.post("http://localhost:8080/api/", {
      stockId: stockId, 
      stockName: stockName,
      stockInfo: stockInfo,
      stockQuantity: stockQuantity,
      stockCost: stockCost,
      stockRetailPrice: stockRetailPrice,
    });

  };


  return (
    <div className="App">
      <h1> ADD STOCK ITEM </h1>
   
      <label> Stock ID: </label>
      <input type="number" onChange={(event) => {setStockId(event.target.value)}} />
      <label> Stock Name: </label>
      <input type="text" onChange={(event) => {setStockName(event.target.value)}} />
      <label> Stock Info: </label>
      <input type="text" onChange={(event) => {setStockInfo(event.target.value)}} />
      <label> Stock Quantity: </label>
      <input type="text" onChange={(event) => {setStockQuantity(event.target.value)}} />
      <label> Stock Cost: </label>
      <input type="text" onChange={(event) => {setStockCost(event.target.value)}} />
      <label> Stock Retail Price: </label>
      <input type="text" onChange={(event) => {setStockRetailPrice(event.target.value)}} />
      <button onClick={addToList}> Add Stock </button>


    </div>

    
  );
}

export default App;