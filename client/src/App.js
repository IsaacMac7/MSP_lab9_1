import React from "react";
import './App.css';
import Home from "./Home";
import StockForm from "./StockForm";
import StockDetails from './StockDetails';
import NavBar from './Navbar';
import {Route} from "react-router-dom";
import StockEdit from "./StockEdit";
import SalesForm from "./SalesForm";
import SalesDetails from "./SalesDetails";
import SalesEdit from "./SalesEdit"

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
        <Route exact path="/salesform" component={SalesForm} />
        <Route exact path="/salesdetails" component={SalesDetails} />        
        <Route exact path="/update" component={() => <StockEdit/>} />
        <Route exact path="/salesupdate" component={() => <SalesEdit/>} />

      </div>

        

     
    );
  }
}

export default App;