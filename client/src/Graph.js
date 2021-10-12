import React from "react";
import {Line} from 'react-chartjs-2'
import './App.css';


function LineChart () {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Sales for 2020',
        data: [3, 2, 2, 2, 1]
      }
    ]  
  }
  return <Line data={data} />
}


export default LineChart;