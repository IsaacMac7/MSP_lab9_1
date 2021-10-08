import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import { useHistory } from "react-router-dom";
import MaterialTable from 'material-table';

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
    {title: "Stock Name", field: 'stockInfo'},
    {title: "Sale Date", field: 'stockDate'},
    {title: "Sale Quantity", field: 'stockAmt'},
    {title: "Sales Price", field: 'salesPrice'},
  ]

  return (
    <div className="App">
      <MaterialTable 
        title="Sales Details" 
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
          actionsColumnIndex: -1

        }}
      />
    </div>
  );
}

export default SalesDetails;