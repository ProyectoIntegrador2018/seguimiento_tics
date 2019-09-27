import React from 'react';
import Login from './components/Login/Login';
import AdminDashboard from './components/Admin/Dashboard/AdminDashboard';
import UserDashboard from './components/User/Dashboard/UserDashboard';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route  path="/"
                  component={Login}
                  exact />

          <Route  path="/home"
                  component={UserDashboard}
                  exact />
          
          <Route  path="/admin"
                  component={AdminDashboard}
                  exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
