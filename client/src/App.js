import React from "react";
import Login from "./components/Login/Login";
import AdminDashboard from "./components/Admin/Dashboard/AdminDashboard";
import UserDashboard from "./components/User/Dashboard/UserDashboard";
import Search from "./components/Search/Search";
import EventCreation from "./components/Admin/Event/Creation/EventCreation";
import Navigation from "./components/Navigation/Navigation";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { AUTHENTICATED, ADMIN } from "./constants/sessionstorage";
import { container } from "./assets/jss/components/appStyle";

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <BrowserRouter>
          {this.renderAdminNav()}
          <div style={container}>
            <Switch>
              <Route path="/" component={Login} exact />
              
              <ProtectedRoute path="/event"
                              component={EventCreation}
                              isAdmin={true}
                              />
    
              <ProtectedRoute path="/admin" 
                              component={AdminDashboard}
                              isAdmin={true}
                              />
    
              <ProtectedRoute path="/home" 
                              component={UserDashboard}
                              isAdmin={false}
                              />
    
              <ProtectedRoute path="/search" 
                              component={Search}
                              isAdmin={false}
                              />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }

  renderAdminNav() {
    var navItems = [
      {url: "/event", name: "Eventos"}, 
      {url: "", name: "Preguntas"}, 
      {url: "", name: "Usuarios"},
    ]
    if(sessionStorage.getItem(AUTHENTICATED) && sessionStorage.getItem(ADMIN)) return(<Navigation navitems={navItems}/>);
  }
}

export default App;
