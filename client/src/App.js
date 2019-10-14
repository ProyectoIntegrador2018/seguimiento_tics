import React from "react";
import Login from "./components/Login/Login";
import AdminDashboard from "./components/Admin/Dashboard/AdminDashboard";
import UserDashboard from "./components/User/Dashboard/UserDashboard";
import Search from "./components/Search/Search";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import EventCreation from "./components/Admin/Event/Creation/EventCreation";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Login} exact />

          <ProtectedRoute path="/home" 
                          component={UserDashboard}
                          isAdmin={false}
                          />

          <ProtectedRoute path="/admin" 
                          component={AdminDashboard}
                          isAdmin={true}
                          />

          <ProtectedRoute path="/search" 
                          component={Search}
                          isAdmin={false}
                          />

          <ProtectedRoute path="/event"
                          component={EventCreation}
                          isAdmin={true}
                          />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
