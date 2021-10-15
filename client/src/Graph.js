import React, { useState, useEffect } from "react";
import axios from "axios";
import {Bar, Line} from 'react-chartjs-2';
import {Chart} from 'react-chartjs-2';

import './App.css';

function byID(salesList, selectedStock){
    const filteredData = salesList.filter(function(item){
        return item.stockInfo  == selectedStock;
    })
    // console.log("filtered", filteredData);
    return filteredData;
}

export default function Graph(){
    var[salesList, setsalesList] = useState([]);
    const[dateList, setdateList] = useState([]);
    const[amtList, setamtList] = useState([]);
    const[stockList, setStockList] = useState([]);
    var [selectedStock, setselectedStock] = useState("");

    //fetch sales data
    useEffect(()=>{
        let empDate = [];
        let empAmt = [];
        axios.get('http://localhost:8080/salesapi/read').then((response)=>{
          setsalesList(response.data);
          salesList = byID(salesList, selectedStock);
          for (const dataObj of salesList) {
              empDate.push(dataObj.stockDate); //dataObj sees it as individual key-value pairs, must be put into an array first (in order)
              empAmt.push(dataObj.stockAmt);
          }
        //   console.log("empDate", empDate);
        //   console.log("empAmt", empAmt);
          setdateList(empDate); //once dataObj is in an array, put it in a list
          setamtList(empAmt);
        })
    },[salesList], [dateList], [amtList])
    // console.log("sales api", salesList);
    // console.log("stock date", dateList);
    // console.log("amtList", amtList);

    //fetch stock data
    useEffect(()=>{
        axios.get('http://localhost:8080/api/read').then((response)=>{
          setStockList(response.data);
        })
      },[stockList])
    //   console.log("stock list", stockList);
    
    //check selected stock
    // console.log(selectedStock);
    

    //draw data on graph
    const chart = {
        labels: dateList,
        datasets: [
            {
            label: 'Amount of Stock Sold',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: amtList
            }
        ]
    };

    return (
        <div >
            <div>
                <select placeholder = "ID Name" onMouseMove={(event) => {setselectedStock(event.target.value)}}> 
                    {stockList.map((val)=>{
                        return (<option key={val} > Stock ID: {val.stockId} Stock Name: {val.stockName} ${val.stockRetailPrice}
                            </option>
                            
                        );

                    })} 
                </select>
            </div>
            <Line id={"myChart"}
                data={chart}
                options={{
                    animation: {
                        duration: 0
                    },
                    maintainAspectRatio: true,
                    title:{
                        display:true,
                        fontSize:20
                },
                legend:{
                    display:true,
                    position:'right'
                }
                }}
            />
        </div>

    );
}
