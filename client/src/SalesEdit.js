import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import { useLocation } from "react-router-dom";
import SalesDetails from "./SalesDetails";
import  {Route, useHistory} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function SalesEdit() {
    const [salesId, setSalesId] = useState(0);
    const [stockInfo, setStockInfo] = useState("");
    const [stockAmt, setStockAmt] = useState(0);
    const [stockDate, setDate] = useState("");
    const [salesPrice, setsalesPrice] = useState(0);

    const[stockList, setStockList] = useState([]);

  const history = useHistory();
  const location = useLocation();

  useEffect(()=>{
    axios.get('http://localhost:8080/api/read').then((response)=>{
      setStockList(response.data);
    })
  },[stockList])

  useEffect(() => {
      setSalesId(location.state.salesId);
      setStockInfo(location.state.stockInfo);
      setStockAmt(location.state.stockAmt);
      setDate(location.state.stockDate);
      setsalesPrice(location.state.salesPrice);
  }, [location]);
  
  const editList = () => {
    try {
        axios.put("http://localhost:8080/salesapi/salesupdate", {
            salesId: salesId,
            newStockInfo: stockInfo,
            newStockAmt: stockAmt,
            newStockDate: stockDate,
            newsalesPrice: salesPrice,
          });
    }
    catch (err) {
        <p>Error in Updating</p>
    }
    finally {
        <Route exact path="/salesdetails" components={SalesDetails} />
        history.push("/salesdetails");
    }
    

  };



  return (
    <div className="App">
      <h1> EDIT SALES RECORDS</h1>
      <label> Sales ID: </label>
      <input type="number" value={location.state.salesId} />
      <label> Stock Info: </label>
      <select value={location.state.stockInfo} onChange={(event)=> {setStockInfo(event.target.value)}}> 
      {stockList.map((val)=>{
        return(<option key={val}> {val.stockId} {val.stockName} </option>);
      })}
      </select>
      <label> Sale Date: </label>
      <input type="date" defaultValue={location.state.stockDate} onChange={(event) => {setDate(event.target.value)}} />
      <label> Amount Sold: </label>
      <input type="text" defaultValue={location.state.stockAmt} onChange={(event) => {setStockAmt(event.target.value)}} />
      <label> Sale Price: </label>
      <input type="number" value = {ItemPrice(location.state.salesPrice, location.state.stockAmt) * stockAmt} onMouseMove={(event) => {setsalesPrice(event.target.value)}} />
      <button onClick={editList}> Update Stock </button>
    </div>
  );
}

function ItemPrice(salesPrice, StockAmount){
  var itemprice = salesPrice / StockAmount;
  return itemprice;
}

export default SalesEdit;