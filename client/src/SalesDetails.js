import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import { useHistory } from "react-router-dom";
import MaterialTable from 'material-table';
import 'bootstrap/dist/css/bootstrap.min.css';

function SalesDetails() {
  let history = useHistory();
  const [salesList, setSalesList] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:8080/salesapi/read').then((response)=>{
      setSalesList(response.data);
    })

  }, [salesList]) 

  const[newSalesName, setNewSalesName] = useState("");

  const updateSales = (id) => {
    
    axios.put('http://localhost:8080/salesapi/salesupdate', {
      id: id, 
      newSalesName: newSalesName,
    });
    
    
  };

  const deleteSales = (id) => {
    axios.delete(`http://localhost:8080/salesapi/salesdelete/${id}`);
  };

  const columns = [
    {title: "Sales Id", field: 'salesId'},
    {title: "Stock Information", field: 'stockInfo'},
    {title: "Sale Date", field: 'stockDate'},
    {title: "Sale Quantity", field: 'stockAmt'},
    {title: "Sales Price", field: 'salesPrice'},
  ]

  return (
    <div className="App">
      <h1 class="container rounded border py-3 my-10">Items Sold</h1>
      <MaterialTable 
        title="Sales Details"
        style={{ width: "90%", margin: "0%", color: '#6D78C7'}}
        data={salesList}
        columns={columns}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add New Sales',
            isFreeAction: true,
            onClick: (event, rowData) => {
              window.location.href="http://localhost:3000/salesform"
            }

          },
          {
            icon: 'edit',
            tooltip: 'Edit Item',
            onClick: (event, rowData) => {
              history.push({pathname: "/salesupdate",
              state: {
                salesId: rowData.salesId,
                stockInfo: rowData.stockInfo,
                stockDate: rowData.stockDate,
                stockAmt: rowData.stockAmt,
                salesPrice: rowData.salesPrice}
              })
            }
          },
          {
            icon: 'delete',
            tooltip: 'Delete Sales',
            onClick: (event, rowData) => {
              deleteSales(rowData._id)
            }

          },
         
        ]}
        options={{
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: '#8f99e7',
            color: 'white',
            fontWeight: 'bold',
            borderTopWidth: 2,
            borderColor: 'white'
          }
        }}
      />
    </div>
  );
}

export default SalesDetails;