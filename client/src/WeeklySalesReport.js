import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import MaterialTable from 'material-table';

// Accepts a Date object or date string that is recognized by the Date.parse() method
function getDayOfWeek(date) {
  const dayOfWeek = new Date(date).getDay();    
  return isNaN(dayOfWeek) ? null : 
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
}

function App() {

    const[reportList, setReportList] = useState([]);
    const[dates, setDates] = useState([]);
    const[startWeek, setStartWeek] = useState([]);
    const list = [];

    useEffect(()=>{
        axios.get('http://localhost:8080/salesapi/read').then((response)=>{
          var res = response.data;
          var dateList = [];
          var dict = {};
          // get all unique dates
          res.forEach(r => (!dateList.includes(r.stockDate) && getDayOfWeek(r.stockDate) === 'Monday' ? dateList.push(r.stockDate) : null));
          setDates(dateList);

          // get total stock of starting week for each product
          for (const r of res) {
            const startDate = Date.parse(startWeek);
            var lastDate = new Date(startDate);
            lastDate.setDate(lastDate.getDate() + 6);
            const curDate = Date.parse(r.stockDate);

            if (curDate <= lastDate && curDate >= startDate) {
              if (dict[r.stockInfo] === undefined) {
                dict[r.stockInfo] = Number(r.stockAmt);
              }
              else {
                dict[r.stockInfo] = Number(dict[r.stockInfo]) + Number(r.stockAmt);
              }
            }
          }
          
          // make a list
          for (const [key, value] of Object.entries(dict)) {
            let finalList = {info: key, amount: value};
            list.push(finalList);
          }
          /*
          res.forEach(r => (dict[r.stockInfo] === undefined) && (r.stockDate == String(startWeek)) 
                            ? dict[r.stockInfo] = Number(r.stockAmt) 
                            : dict[r.stockInfo] = Number(dict[r.stockInfo]) + Number(r.stockAmt));
          */
          setReportList(list);
        })
      },[reportList])

    const columns = [
      {title: "Stock Info", field: "info"},
      {title: "Sales Amount", field: "amount"},
    ]

    return (
        <div className = "App">
          <label> Starting Week: </label>
            <select placeholder = "Week" onChange={(event) => {setStartWeek(event.target.value)}}> 
              {dates.map((val)=>{
                return (<option key={val} > {val}
                  </option>
                  
                );

              })} 
            </select>
          <MaterialTable 
            title="Sales Report" 
            data={reportList}
            columns={columns}
            options={{
              exportButton: true,
              exportAllData: true
            }}
            actions={[
              {
                icon: 'add',
                tooltip: 'Add New Sales',
                isFreeAction: true,
                onClick: (event, rowData) => {
                  window.location.href="http://localhost:3000/salesform"
                }
              }
            ]}
          />
        </div>
    );

}
export default App;