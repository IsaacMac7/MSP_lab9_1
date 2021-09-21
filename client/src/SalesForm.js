import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';


function App() {

  const [salesId, setsalesId] = useState(0);
  const [salesName, setsalesName] = useState("");
  const [salesDate, setsalesDate] = useState("");
  const [salesQuantity, setsalesQuantity] = useState(0);



  
  const addToList = () => {
    axios.post("http://localhost:8080/api/", {
      salesId: salesId, 
      salesName: salesName,
      salesDate: salesDate,
      salesQuantity: salesQuantity,
    });

  };


  return (
    <div className="App">
      <h1> ADD SALES TRANSACTION </h1>
   
      <label> Stock ID: </label>
      <input type="number" onChange={(event) => {setsalesId(event.target.value)}} />
      <label> Stock Name: </label>
      <input type="text" onChange={(event) => {setsalesName(event.target.value)}} />
      <label> Stock Info: </label>
      <input type="date" onChange={(event) => {setsalesDate(event.target.value)}} />
      <label> Stock Quantity: </label>
      <input type="text" onChange={(event) => {setsalesQuantity(event.target.value)}} />
      <button onClick={addToList}> Add Sales </button>

    </div>

  );
}

export default App;