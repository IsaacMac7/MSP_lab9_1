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
    <div className="App">
      <h1> EDIT STOCK ITEM </h1>
      <label> Stock ID: </label>
      <input type="number" value={location.state.stockId} />
      <label> Stock Name: </label>
      <input type="text" defaultValue={location.state.stockName} onChange={(event) => {setStockName(event.target.value)}} />
      <label> Stock Info: </label>
      <input type="text" defaultValue={location.state.stockInfo} onChange={(event) => {setStockInfo(event.target.value)}} />
      <label> Stock Quantity: </label>
      <input type="text" defaultValue={location.state.stockQuantity} onChange={(event) => {setStockQuantity(event.target.value)}} />
      <label> Stock Cost: </label>
      <input type="text" defaultValue={location.state.stockCost} onChange={(event) => {setStockCost(event.target.value)}} />
      <label> Stock Retail Price: </label>
      <input type="text" defaultValue={location.state.stockRetailPrice} onChange={(event) => {setStockRetailPrice(event.target.value)}} />
      <button onClick={editList}> Update Stock </button>
    </div>
  );
}

export default StockEdit;