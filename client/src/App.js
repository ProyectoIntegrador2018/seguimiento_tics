<<<<<<< HEAD
import React from 'react';
import Login from './components/Login/Login';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import UserDashboard from './components/User/Dashboard/UserDashboard';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
=======
import React from "react";
import Login from "./components/Login/Login";
import Dashboard from "./components/AdminDashboard/Dashboard";
import Search from "./components/Search/Search";
import { BrowserRouter, Switch, Route } from "react-router-dom";
>>>>>>> 525ae0c7933eebb405b1302b2ec6fa91a811e06c

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
