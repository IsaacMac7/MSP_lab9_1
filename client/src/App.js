import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import Home from "./Home";
import StockForm from "./StockForm";
import StockDetails from './StockDetails';
import NavBar from './Navbar';
import  {Route, Link } from "react-router-dom";
import StockEdit from "./StockEdit";

class App extends React.Component {

 
  render() {

    // Temporary Navigation Bar
 

    return (
      <div>
        <h2>PHP React App</h2>
        <NavBar />
        <Route exact path="/" component={Home} /> 
        <Route exact path="/stockform" component={StockForm} />
        <Route exact path="/stockdetails" component={StockDetails} />
        <Route exact path="/update" component={() => <StockEdit/>} />

      </div>

        

     
    );
  }
}

export default App;