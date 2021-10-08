import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {

    const[stockList, setStockList] = useState([]);
    const[salesList, setSalesList] = useState([]);


    useEffect(()=>{
        axios.get('http://localhost:8080/api/read').then((response)=>{
          setStockList(response.data);
        })
        axios.get('http://localhost:8080/salesapi/read').then((response)=>{
            setSalesList(response.data);
          })
      },[stockList],[salesList])

    

    return (
        <div className = "App">


<label>Price: </label>
<select placeholder = "ID Name"> 
        {stockList.map((val)=>{
          return (<option key={val} > {val.stockRetailPrice}
            </option>
            
          );

        })} 
      </select>
      <label>StockAmt:</label>
      <select placeholder = "ID Name"> 
        {salesList.map((val)=>{
          return (<option key={val} > {val.stockInfo} {val.stockAmt} {val.stockRetailPrice}
            </option>
            
          );

        })} 
      </select>
        </div>
    );

}
export default App;