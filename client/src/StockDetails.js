import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from 'material-table';
import './App.css';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";


function StockDetails() {
  let history = useHistory();
  const [stockList, setStockList] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:8080/api/read').then((response)=>{
      setStockList(response.data);
    })

  }, [stockList]) 

  const[newStockName, setNewStockName] = useState("");

  const updateStock = (id) => {
    /*
    axios.put("http://localhost:8080/api/update", {
      id: id, 
      newStockName: newStockName,
    });
    */
    
  };

  const deleteStock = (id) => {
    axios.delete(`http://localhost:8080/api/delete/${id}`);
  };

  return (
    <div className="App">
      <h1> Stock List </h1>
      {stockList.map((val,key)=> {
        return(
          <div key={key} className="stock">
            <h1> {val.stockId} </h1>
            <h1> {val.stockName}</h1>
            <h1> {val.stockInfo}</h1>
            <h1> {val.stockQuantity}</h1>
            <h1> {val.stockCost} </h1>
            <h1> {val.stockRetailPrice} </h1>
      
            <button onClick={() => {history.push({pathname: "/update", 
                                                  state: {
                                                    stockId: val.stockId,
                                                    stockName: val.stockName,
                                                    stockInfo: val.stockInfo,
                                                    stockQuantity: val.stockQuantity,
                                                    stockCost: val.stockCost,
                                                    stockRetailPrice: val.stockRetailPrice
                                                  }})}}> Update </button>
            <button onClick={() => deleteStock(val._id)}> Delete </button>
          </div>
        );
      })}
    </div>
  );
}

export default StockDetails;
