import React from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { AUTHENTICATED, ADMIN, TOKEN } from "../../constants/sessionstorage";
import { API_URL } from "../../constants/apiurl";
import { title, button100, buttonWrapper, button100Wrapper, invalidInput } from "../../assets/jss/sharedStyling";
import { limiter, loginContainer, loginWrapper, inputWrapper, inputStyle } from "../../assets/jss/components/loginStyle";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isInvalid: false,
      user: {}
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);

    this.loginAPIRequest = this.loginAPIRequest.bind(this);

    this.renderInputSection = this.renderInputSection.bind(this);
  }

  render() {
    if (sessionStorage.getItem(AUTHENTICATED)) {
      if (sessionStorage.getItem(ADMIN) === "true")
        return <Redirect to="/admin" />;
      return <Redirect to="/home" />;
    }

    return (
      <div style={limiter}>
        <div style={loginContainer}>
          <div style={loginWrapper}>
            <Form>
              <span style={title}> Iniciar sesión </span>

              {this.state.isInvalid ? this.renderWrongDataMessage() : null}

              {this.renderInputSection(
                "Correo electrónico",
                "email",
                "Ingrese su  correo",
                this.handleEmailChange
              )}

              {this.renderInputSection(
                "Contraseña",
                "password",
                "Ingrese su  contraseña",
                this.handlePasswordChange
              )}

              <div style={buttonWrapper}>
                <div style={button100Wrapper}>
                  <Button style={button100} onClick={this.onLoginClick}>
                    Iniciar sesión
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }

  //      ADDITIONAL RENDERS
  renderWrongDataMessage() {
    return (
      <Form.Text style={invalidInput}>
        Correo y/o contraseña incorrecta
      </Form.Text>
    );
  }

  renderInputSection(label, type, placeHolder, onChange) {
    return (
      <div style={inputWrapper}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type={type}
          style={inputStyle}
          placeholder={placeHolder}
          isInvalid={this.state.isInvalid}
          onChange={onChange}
        />
      </div>
    );
  }

  //      INPUT HANDLING FUNCTIONS

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  onLoginClick() {
    this.loginAPIRequest();
  }

  //      API REQUEST FUNCTIONS

  loginAPIRequest() {
    var url = API_URL + "/auth/login";
    const reqBody = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post(url, reqBody)
      .then(response => {
        var data = response.data;
        console.log(data);
        if (data.error) {
          this.setState({ isInvalid: true });
        } else {
          sessionStorage.setItem(AUTHENTICATED, true);
          sessionStorage.setItem(ADMIN, data.admin);
          sessionStorage.setItem(TOKEN, data.token);
          this.setState({
            isInvalid: false,
            user: data
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}
export default Login;
