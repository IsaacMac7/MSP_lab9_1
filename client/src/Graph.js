import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';


import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from "recharts";
  
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
    const [salesList, setSalesList] = useState([]);
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
    const data = salesList;
return (
    <ResponsiveContainer width="90%" aspect={3}>
        <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="salesId" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
            type="monotone"
            dataKey="salesPrice"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="stockAmt" stroke="#82ca9d" />
        </LineChart>
    </ResponsiveContainer>
  );
}

export default Graph;