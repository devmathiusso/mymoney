import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./elements/Header";
import Home from "./pages/Home";
import CashFlow from "./pages/CashFlow";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Home} />
        <Route path="/cash-flow/:yearMonth" component={CashFlow} />
      </div>
    </Router>
  );
}

export default App;
