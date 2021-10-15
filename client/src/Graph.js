import React, { useState, useEffect } from "react";
import axios from "axios";
import {Bar, Line} from 'react-chartjs-2';
import {Chart} from 'react-chartjs-2';

import './App.css';

function byID(salesList){
    const filteredData = salesList.filter(function(item){
        return item.stockInfo  == "Stock ID: 7 Stock Name: Doliprane $10";
    })
    console.log("filtered", filteredData);
    return filteredData;
}

export default function Graph(){
    var[salesList, setsalesList] = useState([]);
    const[dateList, setdateList] = useState([]);
    const[amtList, setamtList] = useState([]);
    const[stockList, setStockList] = useState([]);

    //fetch sales data
    useEffect(()=>{
        let empDate = [];
        let empAmt = [];
        axios.get('http://localhost:8080/salesapi/read').then((response)=>{
          setsalesList(response.data);
          salesList = byID(salesList);
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

    //call function that seperates by stockInfo
    
    
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
        <Line id={"myChart"}
            data={chart}
            options={{
                maintainAspectRatio: false,
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
