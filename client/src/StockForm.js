import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';


function App() {

  const [stockId, setStockId] = useState(0);
  const [stockName, setStockName] = useState("");


  
  const addToList = () => {
    axios.post("http://localhost:8080/api/", {
      stockId: stockId, 
      stockName: stockName,
    });

  };


  return (
    <div className="App">
      <h1> ADD STOCK ITEM </h1>
   
      <label> Stock ID: </label>
      <input type="number" onChange={(event) => {setStockId(event.target.value)}} />
      <label> Stock Name: </label>
      <input type="text" onChange={(event) => {setStockName(event.target.value)}} />
      <button onClick={addToList}> Add Stock </button>


    </div>

    
  );
}

export default App;