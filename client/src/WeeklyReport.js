import React,{useState, useEffect} from 'react';
import App from './App';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';



export default function WeeklyReport() {

  const[stockList, setStockList] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:8080/api/read').then((response)=>{
      setStockList(response.data);
    })
  },[])



  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col"> </th>
            <th scope="col">Monday</th>
            <th scope="col">Tuesday</th>
            <th scope="col">Wednesday</th>
            <th scope="col">Thursday</th>
            <th scope="col">Friday</th>
            <th scope="col">Saturday</th>
            <th scope="col">Sunday</th>
            <th scope="col">Total</th>
          </tr>
        </thead >
        <tbody>
        {stockList.map((val,i) => (
          <tr  key={val.id}>
            <th scope="row">{val.stockName}</th>

          
            <th scope="row">{val.stockQuantity}</th> 
            <th scope="row">{val.stockQuantity}</th>
            <th scope="row">{val.stockQuantity}</th>
            <th scope="row">{val.stockQuantity}</th>
            <th scope="row">{val.stockQuantity}</th>
            <th scope="row">{val.stockQuantity}</th>
            <th scope="row">{val.stockQuantity}</th>




            <th scope="row"></th>
          
          </tr>
          ))}
        
        </tbody>
        <tfoot >
        
          <tr>
              <th scope="row">Total</th>
              
       
          </tr>
        </tfoot>  
      </table>
    </div>
  );


}
