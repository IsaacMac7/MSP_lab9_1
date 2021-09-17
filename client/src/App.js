import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';


function App() {

  const [stockId, setStockId] = useState(0);
  const [stockName, setStockName] = useState("");

  const[newStockName, setNewStockName] = useState("");

  const [stockList, setStockList] = useState([]);

  useEffect(()=>{

    axios.get("http://localhost:8080/api/read").then((response)=>{
      setStockList(response.data);

    });

  }, []);
  

  const addToList = () => {
    axios.post("http://localhost:8080/api/", {
      stockId: stockId, 
      stockName: stockName,
    });

  };


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
      <h1> PHARMACY </h1>
   
      <label> Stock ID: </label>
      <input type="number" onChange={(event) => {setStockId(event.target.value)}} />
      <label> Stock Name: </label>
      <input type="text" onChange={(event) => {setStockName(event.target.value)}} />
      <button onClick={addToList}> Add Stock </button>


      <h1> Stock List </h1>

      {stockList.map((val,key)=> {


      return(
        <div key={key} className="food">
          <h1> {val.stockId}</h1>
          <h1> {val.stockName}</h1>
          <input type="text" placeholder="New Food Name..." 
          onChange={(event) => {setNewStockName(event.target.value)}}/>
          <button onClick={() => updateStock(val._id)}> Update </button>
          <button onClick={() => deleteStock(val._id)}> Delete </button>
        </div>
      );


    })};

    
       
    </div>

    
  );
}

export default App;
