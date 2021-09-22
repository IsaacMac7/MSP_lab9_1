import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from 'material-table';
import './App.css';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";


function SalesDetails() {
  let history = useHistory();
  const [salesList, setSalesList] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:8080/salesapi/read').then((response)=>{
      setSalesList(response.data);
    })

  }, [salesList]) 

  const[newSalesName, setNewSalesName] = useState("");

  const updateSales = (id) => {
    
    axios.put('http://localhost:8080/salesapi/salesupdate', {
      id: id, 
      newSalesName: newSalesName,
    });
    
    
  };

  const deleteStock = (id) => {
    axios.delete(`http://localhost:8080/salesapi/salesdelete/${id}`);
  };

  return (
    <div className="App">
      <h1> Sales List </h1>
      {salesList.map((val,key)=> {
        return(
          <div key={key} className="sales">
            <h1> {val.stockId} </h1>
            <h1> {val.stockName}</h1>
            <h1> {val.stockDate}</h1>
            <h1> {val.stockAmt}</h1>
      
            <button onClick={() => {history.push({pathname: "/salesupdate", 
              state: {
                stockId: val.stockId,
                stockName: val.stockName,
                stockDate: val.stockDate,
                stockAmt: val.stockAmt,
              }})}}> Update </button>
            <button onClick={() => deleteStock(val._id)}> Delete </button>
          </div>
        );
      })}
    </div>
  );
}

export default SalesDetails;