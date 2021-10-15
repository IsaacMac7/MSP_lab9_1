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
  

  // //get API
  // useEffect(()=>{
  //   axios.get('http://localhost:8080/salesapi/read').then((response)=>{
  //     setSalesList(response.data);
  //   })

  // }, [salesList]) 

  // //sort for panadol
  // var result = salesList.filter(x => x.stockInfo === "Stock ID: 6 Stock Name: Panadol $15");
  // console.log(result);

  // //canvas for graph
  // return (
  //   <div>
  //     <Line
  //       data={{
  //         labels: [stockDate],
  //         datasets: [
  //           {
  //             label: 'Panadol Sales',
  //             data: [stockAmt],l
  //           }
  //         ]
  //       }}
        
  //     />
  //   </div>
  // ) 

  const chart = () => {
    let empDate = [];
    let empAmt = [];
    axios
      .get('http://localhost:8080/salesapi/read')
      .then(response => {
        console.log(response);
        for (const dataObj of response.data){
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
      console.log(empDate, empDate);
  }



  useEffect(() => {
    chart();
  }, []);

  return (
    <div className="Graph" class="chart-container">
      <h1>Graph</h1>
        <Line
          data={chartData}
          options={{
            maintainAspectRatio: false,
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
    </div>
  );

  
}


export default Graph;