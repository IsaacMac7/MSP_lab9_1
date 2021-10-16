import React from "react";
import './App.css';
import Home from "./Home";
import StockForm from "./StockForm";
import StockDetails from './StockDetails';
import NavBar from './Navbar';
import {Route, Switch} from "react-router-dom";
import StockEdit from "./StockEdit";
import SalesForm from "./SalesForm";
import SalesDetails from "./SalesDetails";
import SalesEdit from "./SalesEdit";
import WeeklySalesReport from "./WeeklySalesReport";
import MonthlySalesReport from "./MonthlySalesReport";
import "./index.css";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  container: {
    display: 'flex'
  }

})


export default function App() {

  
    const classes = useStyles();


    return (
      <div>
        <h2>PHP React App</h2>

        <div className = {classes.container}>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} /> 
            <Route exact path="/stockform" component={StockForm} />
            <Route exact path="/stockdetails" component={StockDetails} />
            <Route exact path="/salesform" component={SalesForm} />
            <Route exact path="/salesdetails" component={SalesDetails} />        
            <Route exact path="/update" component={() => <StockEdit/>} />
            <Route exact path="/salesupdate" component={() => <SalesEdit/>} />
            <Route exact path="/weeklysalesreport" component = {() => <WeeklySalesReport/>} />
            <Route exact path="/monthlysalesreport" component = {() => <MonthlySalesReport/>} />
          </Switch>
        </div>

      </div>

        

     
    );
  
}

