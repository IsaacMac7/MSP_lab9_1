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


    var total = dateList.length;
    const iArray = [];
    for (var i = 0; i < total; i++) {
        iArray.push(i);
    }
    // console.log("iArray", iArray);
    // console.log("amt array", amtList.length);
    
    var regLine = regressionMaker(iArray, amtList);
    function regressionMaker(values_x, values_y) {
        var sum_x = 0;
        var sum_y = 0;
        var sum_xy = 0;
        var sum_xx = 0;
        var count = 0;
    
        /*
         * We'll use those variables for faster read/write access.
         */
        var x = 0;
        var y = 0;
        var values_length = values_x.length;
    
        // if (values_length != values_y.length) {
        //     throw new Error('The parameters values_x and values_y need to have same size!');
        // }
    
        /*
         * Nothing to do.
         */
        if (values_length === 0) {
            return [ [], [] ];
        }
    
        /*
         * Calculate the sum for each of the parts necessary.
         */
        for (var v = 0; v < values_length; v++) {
            x = values_x[v];
            y = Number(values_y[v]);
            sum_x += x;
            sum_y += y;
            sum_xx += x*x;
            sum_xy += x*y;
            count++;
        }
    
        /*
         * Calculate m and b for the formular:
         * y = x * m + b
         */
        var m = (count*sum_xy - sum_x*sum_y) / (count*sum_xx - sum_x*sum_x);
        var b = (sum_y/count) - (m*sum_x)/count;
    
        /*
         * We will make the x and y result line now
         */
        var result_values_x = [];
        var result_values_y = [];
    
        for (var v = 0; v < values_length; v++) {
            x = values_x[v];
            y = x * m + b;
            result_values_x.push(x);
            result_values_y.push(y);
        }
    
        return result_values_x, result_values_y;
    }



    // console.log("regression array", regLine.length);

    //draw data on graph
    const chart = {
        labels: dateList,
        datasets: [
            {
            label: 'Amount of Stock Sold',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            data: amtList
            },
            {
                label: 'Regression Line',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgb(255,0,0)',
                borderColor: 'rgb(255,0,0)',
                borderWidth: 1,
                data: regLine
                },
        ]
        
    };

    function sName(selectedStock) {
        var splitInfo = selectedStock.split(' ');
        var splitName = splitInfo[5];
        return splitName
    }

    var splitName = sName(selectedStock);

    function gradientCalculator(regLine){
        var a = regLine[regLine.length-1] - regLine[0];
        var b = iArray[iArray.length-1] - iArray[0];
        var gradient = a/b;
        // console.log("iArray length", iArray.length)
        // console.log("a", a);
        // console.log("b", b);
        return gradient
    }
    var gradient = gradientCalculator(regLine);


    var buyOrNot = "";
    if(gradient>0){
        buyOrNot = "it is in demand"
    } else {
        buyOrNot = "it is not in demand"
    }

    return (
        <div >
            <h1>Graph</h1>
            <p>Below shows the total amount sold in the blue line and a regression of sales in the red line. A decending regression line suggests the product is 
                not in demand, while an ascending regression line suggests the product is in demand. If the regression line is neither 
                descending nor ascending, the product is selling at a steady rate. Please select a product to view graph.</p>
            <div>
                <label> Choose Product: </label>
                <select placeholder = "ID Name" onChange={(event) => {setselectedStock(event.target.value)}}> 
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
            <div>
                <h3>Analysis:</h3>
                <p>{splitName} has a gradient of {gradient}, hence {buyOrNot}.</p>
            </div>
        </div>

    );
}
