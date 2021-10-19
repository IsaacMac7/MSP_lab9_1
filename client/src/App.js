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
import Graph from "./Graph";
import "./index.css";
import { makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import Store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Dashboard";

const useStyles = makeStyles({
  container: {
    display: 'flex'
  }

})

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  Store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    Store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
export default function App() {

  
    const classes = useStyles();


    return (
      <div>
        <div className = {classes.container}>
          <NavBar />
          <Provider store={Store}>
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route exact path="/" component={Login} />
            <Route exact path="/stockform" component={StockForm} />
            <Route exact path="/stockdetails" component={StockDetails} />
            <Route exact path="/salesform" component={SalesForm} />
            <Route exact path="/salesdetails" component={SalesDetails} />        
            <Route exact path="/update" component={() => <StockEdit/>} />
            <Route exact path="/salesupdate" component={() => <SalesEdit/>} />
            <Route exact path="/weeklysalesreport" component = {() => <WeeklySalesReport/>} />
            <Route exact path="/monthlysalesreport" component = {() => <MonthlySalesReport/>} />
            <Route exact path="/graph" component = {() => <Graph/>} />
          </Switch>
          </Provider>
        </div>

      </div>

        

     
    );
  
}

