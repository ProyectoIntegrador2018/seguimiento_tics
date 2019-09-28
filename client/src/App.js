import React from "react";
import Login from "./components/Login/Login";
import Dashboard from "./components/AdminDashboard/Dashboard";
import Search from "./components/Search/Search";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Login} exact />

          <Route path="/home" component={Dashboard} exact />

          <Route path="/search" component={Search} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
