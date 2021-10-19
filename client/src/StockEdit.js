import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import { useLocation } from "react-router-dom";
import StockDetails from "./StockDetails";
import  {Route, useHistory} from "react-router-dom";

function StockEdit() {
  const [stockId, setStockId] = useState(0);
  const [stockName, setStockName] = useState("");
  const [stockInfo, setStockInfo] = useState("");
  const [stockQuantity, setStockQuantity] = useState(0);
  const [stockCost, setStockCost] = useState(0);
  const [stockRetailPrice, setStockRetailPrice] = useState(0);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
      setStockId(location.state.stockId);
      setStockName(location.state.stockName);
      setStockInfo(location.state.stockInfo);
      setStockQuantity(location.state.stockQuantity);
      setStockCost(location.state.stockCost);
      setStockRetailPrice(location.state.stockRetailPrice);
  }, [location]);
  
  const editList = () => {
    try {
        axios.put("http://localhost:8080/api/update", {
            stockId: stockId,
            newStockName: stockName,
            newStockInfo: stockInfo,
            newStockQuantity: stockQuantity,
            newStockCost: stockCost,
            newStockRetailPrice: stockRetailPrice,
          });
    }
    catch (err) {
        <p>Error in Updating</p>
    }
    finally {
        <Route exact path="/stockdetails" components={StockDetails} />
        history.push("/stockdetails");
    }
    

  };



  return (
    <div className="Forms">
      <div className="row g-3 align-items-center">
        <div className="FormHeading">
        <h1 class="container rounded border py-3 my-10">EDIT STOCK INFO</h1>
      </div>
     
          <form style={{color: "#8F99E7"}}> 
            <div class="col-md-7">
              <label class="form-label"> Stock ID: </label>
              <input class="form-control" type="number" value={location.state.stockId} />
              
            </div>

            <div class="col-md-7">
              <label class="form-label"> Stock Name: </label>
              <input class="form-control" type="text" defaultValue={location.state.stockName} onChange={(event) => {setStockName(event.target.value)}} />

            </div>

            <div class="col-md-7">
              <label class="form-label"> Stock Info: </label>
              <input class="form-control" type="text" defaultValue={location.state.stockInfo} onChange={(event) => {setStockInfo(event.target.value)}} />

            </div>

            <div class="col-md-7"> 
              <label class="form-label"> Stock Quantity: </label>
              <input class="form-control" type="text" defaultValue={location.state.stockQuantity} onChange={(event) => {setStockQuantity(event.target.value)}} />
            </div>

            <div class="col-md-7"> 
              <label class="form-label"> Stock Cost: </label>
              <input class="form-control" type="text" defaultValue={location.state.stockCost} onChange={(event) => {setStockCost(event.target.value)}} />
            </div>
            <div class="col-md-7">
              <label class="form-label"> Stock Retail Price: </label>
              <input class="form-control" type="text" defaultValue={location.state.stockRetailPrice} onChange={(event) => {setStockRetailPrice(event.target.value)}} />

            </div>
          </form>

          <div class="col-12"> 
            <button style={{backgroundColor: "#8F99E7"}} class="btn btn-primary h-100" onClick={editList}> Update Stock </button>
          </div>

          
  
      
    </div>
    </div>
  );
}

export default StockEdit;