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

    useEffect(()=>{
        axios.get('http://localhost:8080/salesapi/readreport').then((response)=>{
          var res = response.data;
          res.forEach(r => r.stockDate = getDayOfWeek(r.stockDate))
          var list = res.find(r => r.stockDate);
          /*
          var list = [];
          list.push(res[0])
          for (var i = 1; i < res.length; i++) {
            if (list.exist(list.stockDate == res[i].stockDate)) {
              var ind = list.findIndex(list.stockDate == res[i].stockDate);
              list[ind].salesPrice += res[i].salesPrice;
            }
          }
          */

          setReportList(res);
        })
      },[reportList])

    console.log(JSON.stringify(reportList))

    const columns = [
      {title: "Stock Info", field: 'stockInfo'},
      {title: "Sale Price", field: 'salesPrice'},
      {title: "Sales Day", field: 'stockDate'}
    ]

    return (
        <div className = "App">
          <MaterialTable 
            title="Sales Report" 
            data={reportList}
            columns={columns}
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