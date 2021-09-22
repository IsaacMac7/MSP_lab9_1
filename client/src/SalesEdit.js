import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import { useLocation } from "react-router-dom";
import SalesDetails from "./SalesDetails";
import  {Route, useHistory} from "react-router-dom";

function SalesEdit() {
    const [stockId, setStockID] = useState(0);
    const [stockName, setStockName] = useState("");
    const [stockAmt, setStockAmt] = useState(0);
    const [stockDate, setDate] = useState("");

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
      setStockID(location.state.stockId);
      setStockName(location.state.stockName);
      setStockAmt(location.state.stockAmt);
      setDate(location.state.stockDate);
  }, [location]);
  
  const editList = () => {
    try {
        axios.put("http://localhost:8080/salesapi/salesupdate", {
            stockId: stockId,
            newStockName: stockName,
            newStockAmt: stockAmt,
            newDate: stockDate,
          });
    }
    catch (err) {
        <p>Error in Updating</p>
    }
    finally {
        <Route exact path="/salesdetails" components={SalesDetails} />
        history.push("/salesrecords");
    }
    

  };



  return (
    <div className="App">
      <h1> EDIT SALES RECORDS</h1>
      <label> Stock ID: </label>
      <input type="number" value={location.state.stockId} />
      <label> Stock Name: </label>
      <input type="text" defaultValue={location.state.stockName} onChange={(event) => {setStockName(event.target.value)}} />
      <label> Amount Sold: </label>
      <input type="text" defaultValue={location.state.stockAmt} onChange={(event) => {setStockAmt(event.target.value)}} />
      <label> Sale Date: </label>
      <input type="text" defaultValue={location.state.stockDate} onChange={(event) => {setDate(event.target.value)}} />
      <button onClick={editList}> Update Stock </button>
    </div>
  );
}

export default SalesEdit;