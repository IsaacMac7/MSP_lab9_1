import React, { useState} from "react";
import axios from "axios";
import './App.css';



function App() {

  const [stockId, setstockId] = useState(0);
  const [stockName, setstockName] = useState("");
  const [stockDate, setstockDate] = useState("");
  const [stockAmt, setstockAmt] = useState(0);



  
  const addToList = () => {
    axios.post("http://localhost:8080/salesapi/", {
      stockId: stockId, 
      stockName: stockName,
      stockDate: stockDate,
      stockAmt: stockAmt,
    })

    window.location.href="http://localhost:3000/salesdetails";



  

  };


  return (
    <div className="App">
      <h1> ADD SALES TRANSACTION </h1>
   
      <label> Stock ID: </label>
      <input type="number" onChange={(event) => {setstockId(event.target.value)}} />
      <label> Stock Name: </label>
      <input type="text" onChange={(event) => {setstockName(event.target.value)}} />
      <label> Stock Date: </label>
      <input type="date" onChange={(event) => {setstockDate(event.target.value)}} />
      <label> Stock Quantity: </label>
      <input type="text" onChange={(event) => {setstockAmt(event.target.value)}} />
      <button onClick={addToList}> Add Sales </button>

    </div>

  );
}

export default App;