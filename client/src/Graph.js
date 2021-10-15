import React, { useState, useEffect } from "react";
import axios from "axios";
import {Bar, Line} from 'react-chartjs-2'
import './App.css';


function Graph () {
  const [chartData, setChartData] = useState({});
  var [salesList, setSalesList] = useState([]);
  const [salesId, setSalesId] = useState(0);
  const [stockInfo, setStockInfo] = useState("");
  const [stockDate, setstockDate] = useState("");
  const [stockAmt, setstockAmt] = useState(0);
  const [salesPrice, setsalesPrice] = useState(0);

  function chart() {
    let empDate = [];
    let empAmt = [];
    axios
      .get('http://localhost:8080/salesapi/read')
      .then(response => {
        setSalesList(response.data);
        // console.log(response);
        // console.log(splitID(response));
        for (const dataObj of response.data) {
          empDate.push(dataObj.stockDate);
          empAmt.push(dataObj.stockAmt);
        }
        setChartData({
          labels: empDate,
          datasets: [
            {
              label: "Amount Sold",
              data: empAmt,
              backgroundColor: ["rgba(75, 192, 192, 0.6)"],
              borderWidth: 2
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    // console.log(empDate, empDate);
  }

  useEffect(() => {
    chart();
  }, [salesList]);
  // console.log("sales array", salesList); 
  // console.log(splitID(salesList.stockInfo));
  return (
    <div className="Graph" class="chart-container">
      <h1>Graph</h1>
        <Line
          data={chartData}
          options={{
            maintainAspectRatio: false, //essential for resizing chart
            responsive: true,
            title: { text: "SALES", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />
        <button onClick={(onChange) => applyFilter()} value = "salesList" > Click me </button>
    </div>
  );
  
  function applyFilter(saleList){
    //check array is being passed through
    console.log("apply filter (original array):", salesList);
    //check filtered data works
    const filteredData = salesList.filter(function(ele){
      return ele.stockInfo == "Stock ID: 6 Stock Name: Panadol $15";
    });
    console.log("apply filter (new array):", filteredData);

  }
}





export default Graph;