import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from 'material-table';
import './App.css';
import { Link } from 'react-router-dom';



function StockDetails() {

 

  const [stockList, setStockList] = useState([]);

  useEffect(()=>{

    axios.get('http://localhost:8080/api/read').then((response)=>{
      setStockList(response.data);
    })

  }, [stockList]) 

  const[newStockName, setNewStockName] = useState("");




  const updateStock = (id) => {
    axios.put("http://localhost:8080/api/update", {
      id: id, 
      newStockName: newStockName,
    });
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
            <h1> {val.stockId}</h1>
            <h1> {val.stockName}</h1>
            <input type="text" placeholder="New Stock Name..." 
            onChange={(event) => {setNewStockName(event.target.value)}}/>
            <button onClick={() => updateStock(val._id)}> Update </button>
            <button onClick={() => deleteStock(val._id)}> Delete </button>
          </div>
        );


      })}


    </div>

    
  );
}

export default StockDetails;
