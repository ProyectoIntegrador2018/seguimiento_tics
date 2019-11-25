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
import Questions from "./components/Admin/Questions/Questions";
import Users from "./components/Admin/Users/Users";
import Data from "./components/Data/Data";
import FormQuestions from "./components/User/Form/Form";
import CSV from "./components/User/Csv/CSV";
import RegisterStudent from "./components/User/RegisterStudent/RegisterStudent";
import UploadSelection from "./components/UploadSelection/UploadSelection";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRerender: false
    };
    this.rerenderAfterLogin = this.rerenderAfterLogin.bind(this);
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          {this.renderNav()}
          <div style={container}>
            <Switch>
              <Route
                path="/"
                component={() => <Login rerender={this.rerenderAfterLogin} />}
                exact
              />

              <ProtectedRoute
                path="/admin"
                component={AdminDashboard}
                isAdmin={true}
              />

              <ProtectedRoute
                path="/event"
                component={EventCreation}
                isAdmin={true}
              />

              <ProtectedRoute path="/users" component={Users} isAdmin={true} />

              <ProtectedRoute
                path="/questions"
                component={Questions}
                isAdmin={true}
              />

              <ProtectedRoute
                path="/home"
                component={UserDashboard}
                isAdmin={false}
              />

              <ProtectedRoute
                path="/search"
                component={Search}
                isAdmin={false}
              />
              <ProtectedRoute
                path="/form"
                component={FormQuestions}
                isAdmin={false}
              />

              <ProtectedRoute
                path="/file-upload"
                component={CSV}
                isAdmin={false}
              />

              <ProtectedRoute
                path="/select-upload-method"
                component={UploadSelection}
                isAdmin={false}
              />

              <ProtectedRoute
                path="/select-event"
                component={RegisterStudent}
                isAdmin={false}
              />

              <ProtectedRoute
                path="/file-upload"
                component={CSV}
                isAdmin={false}
              />

              <ProtectedRoute path="/data" component={Data} isAdmin={false} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }

  renderNav() {
    const adminNavItems = [
      { url: "/event", name: "Eventos" },
      { url: "/questions", name: "Preguntas" },
      { url: "/users", name: "Usuarios" },
      { url: "/search", name: "Análisis de datos" }
    ];
    const userNavItems = [
      { url: "/select-upload-method", name: "Registro" },
      { url: "/search", name: "Busqueda y análisis de datos" }
    ];

    if (sessionStorage.getItem(AUTHENTICATED)) {
      if (sessionStorage.getItem(ADMIN) == "true")
        return <Navigation navitems={adminNavItems} />;
      return <Navigation navitems={userNavItems} />;
    }
  }

  rerenderAfterLogin(value) {
    this.setState({
      shouldRerender: value
    });
  }
}

export default App;
