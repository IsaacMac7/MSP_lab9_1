import React, { useState} from "react";
import axios from "axios";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


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
    })

    window.location.href="http://localhost:3000/stockdetails";

  };


  return (
  
    <div className="Forms">
    <div className="row g-3 align-items-center">
      <div className="FormHeading">
        <h1 class="container rounded border py-3 my-10">ADD NEW STOCK ITEM</h1>
       </div>
    
      
      <form style={{color: "#8F99E7"}}> 
        <div class="col-md-7"> 
          <label class="form-label"> Stock ID: </label>
          <input class="form-control" type="number" onChange={(event) => {setStockId(event.target.value)}} />
    
  

        </div>
        <div class="col-md-7"> 
          <label class="form-label"> Stock Name: </label>
          <input class="form-control" type="text" onChange={(event) => {setStockName(event.target.value)}} />
        </div>

        <div class="col-md-7"> 
          <label class="form-label"> Stock Info: </label>
          <input class="form-control" type="text" onChange={(event) => {setStockInfo(event.target.value)}} />
        </div>

        <div class="col-md-7"> 
          <label class="form-label"> Stock Quantity: </label>
          <input class="form-control" type="text" onChange={(event) => {setStockQuantity(event.target.value)}} />
        </div>

        <div class="col-md-7"> 
          <label class="form-label"> Stock Cost: </label>
          <input class="form-control" type="text" onChange={(event) => {setStockCost(event.target.value)}} />
        </div>

        <div class="col-md-7"> 
          <label class="form-label"> Stock Retail Price: </label>
          <input class="form-control" type="text" onChange={(event) => {setStockRetailPrice(event.target.value)}} />

        </div> 

      
      </form>


      <div class="col-12"> 
          <button style={{backgroundColor: "#8F99E7"}}class="btn btn-primary h-100" onClick={addToList}> Add Stock </button>
      </div>


    </div>
    </div>
   

    
  );
}

export default App;