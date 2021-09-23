import React, { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import './App.css';
import { useHistory } from "react-router-dom";
import MaterialTable from 'material-table';

function StockDetails() {
  let history = useHistory();
  const[stockList, setStockList] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:8080/api/read').then((response)=>{
      setStockList(response.data);
    })
  },[stockList])

  const[newStockName, setNewStockName] = useState("");

  const updateStock = (id) => {
    
    axios.put('http://localhost:8080/api/update', {
      id: id, 
      newStockName: newStockName,
    });
    
    
  };

  const deleteStock = (id) => {
    axios.delete(`http://localhost:8080/api/delete/${id}`);
  };



  const columns = [
    {title: "Stock Id", field: 'stockId'},
    {title: "Stock Name", field: 'stockName'},
    {title: "Stock Info", field: 'stockInfo'},
    {title: "Stock Quantity", field: 'stockQuantity'},
    {title: "Stock Cost", field : 'stockCost'},
    {title: "Stock Retail Price", field: 'stockRetailPrice'}
  
  ]

  console.log(columns);
  return (
    <div className="App">
      <MaterialTable 
        title="Stock Details" 
        data={stockList}
        columns={columns}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add New Stock',
            isFreeAction: true,
            onClick: (event, rowData) => {
              window.location.href="http://localhost:3000/stockform"
            }

          },
          {
            icon: 'edit',
            tooltip: 'Edit Item',
            onClick: (event, rowData) => {
              
              history.push({pathname: "/update",
              state: {
                stockId: rowData.stockId,
                stockName: rowData.stockName,
                stockInfo: rowData.stockInfo,
                stockQuantity: rowData.stockQuantity,
                stockCost: rowData.stockCost,
                stockRetailPrice: rowData.stockRetailPrice}
              })
            }
          },
          {
            icon: 'delete',
            tooltip: 'Delete Stock',
            onClick: (event, rowData) => {
              deleteStock(rowData._id)
            }

          },
        ]}
      />
    </div>
  );
}

export default StockDetails;
