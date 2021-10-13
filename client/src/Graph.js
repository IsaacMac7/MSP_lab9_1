import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';


import {Scatter, ScatterChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from "recharts";
  
//   const data = [
//     {
//       name: "Page A",
//       uv: 4000,
//       pv: 2400,
//       amt: 2400
//     },
//     {
//       name: "Page B",
//       uv: 3000,
//       pv: 1398,
//       amt: 2210
//     },
//     {
//       name: "Page C",
//       uv: 2000,
//       pv: 9800,
//       amt: 2290
//     },
//     {
//       name: "Page D",
//       uv: 2780,
//       pv: 3908,
//       amt: 2000
//     },
//     {
//       name: "Page E",
//       uv: 1890,
//       pv: 4800,
//       amt: 2181
//     },
//     {
//       name: "Page F",
//       uv: 2390,
//       pv: 3800,
//       amt: 2500
//     },
//     {
//       name: "Page G",
//       uv: 3490,
//       pv: 4300,
//       amt: 2100
//     }
//   ];

function Graph() {
    var [salesList, setSalesList] = useState([]);
    const [salesId, setSalesId] = useState(0);
    const [stockInfo, setStockInfo] = useState("");
    const [stockDate, setstockDate] = useState("");
    const [stockAmt, setstockAmt] = useState(0);
    const [salesPrice, setsalesPrice] = useState(0);
    useEffect(()=>{
        axios.get('http://localhost:8080/salesapi/read').then((response)=>{
          setSalesList(response.data);
        })
    
      }, [salesList]) 

    //  var newsalesList =  myfunction(salesList);
    // if (parseID == "6") {
    //     return salesList
    // }
    // console.log(newsalesList);
    // const panadolgroup = panadolParse(salesList);
    // console.log(String(panadolgroup));
    var result = salesList.filter(x => x.stockInfo === "Stock ID: 6 Stock Name: Panadol $15");
    console.log(result);
return (
    <ResponsiveContainer width="90%" aspect={3}>
        <ScatterChart width={730} height={250}
            margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="stockDate" name="DATE" />
            <YAxis dataKey="salesPrice" name="price" unit=" AUD" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="Panadol sales" data={result} fill="#8884d8" />
            
        </ScatterChart>
    </ResponsiveContainer>
  );
}

// function myfunction(salesList) {
//     var splitted = String(salesList.stockInfo).split(':');
//     var parseID = splitted[2];
//     if (parseID==" 6 Stock Name") {
//         return salesList;
//     }
// }

// function panadolParse(salesList) {
//     var panadolgroup = [];
//     if (salesList.some(item => item.stockInfo === 'Stock ID: 6 Stock Name: Panadol $15')) {
//         return panadolgroup = salesList;
//     }
// }

export default Graph;