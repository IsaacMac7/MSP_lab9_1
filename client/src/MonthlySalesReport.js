import React, { useState, useEffect } from "react";
import axios from "axios";

import MaterialTable from 'material-table';

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
        res.forEach(r => (!dateList.includes(r.stockDate) && r.stockDate.slice(-2) == '01' ? dateList.push(r.stockDate) : null));
        setDates(dateList);

        // get total stock of starting week for each product
        for (const r of res) {
        const startDate = Date.parse(startWeek);
        var lastDate = new Date(startDate);
        lastDate.setMonth(lastDate.getMonth() + 6);
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
        setReportList(list);
        })
    },[reportList])

    const columns = [
      {title: "Stock Info", field: "info"},
      {title: "Sales Amount", field: "amount"},
    ]

    return (
        <div className = "App">
        <h1 class="container rounded border py-3 my-10" style={{backgroundColor: '#8F99E7', color: 'white'}}>MONTHLY SALES REPORT </h1>
        <div className="selectItem">
        <div class="input-group mb-3">
        <label class="input-group-text"> Starting Month: </label>
        <select class="form-select h-100" placeholder = "Month" onChange={(event) => {setStartWeek(event.target.value)}}> 
            {dates.map((val)=>{
            return (<option key={val} > {val}
                </option>
                
            );

            })} 
        </select>
        </div>
        </div>
        <MaterialTable 
        title="Sales Report"
        style={{ width: "65em", margin: "0%", color: '#8F99E7'}}  
        data={reportList}
        columns={columns}
        options={{
            exportButton: true,
            exportAllData: true,
            headerStyle: {
            backgroundColor: '#8f99e7',
            color: 'white',
            fontWeight: 'bold',
            borderTopWidth: 2,
            borderColor: 'white'
            }
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