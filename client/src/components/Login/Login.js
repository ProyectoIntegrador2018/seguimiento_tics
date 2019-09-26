import React from 'react';
<<<<<<< HEAD
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { AUTHENTICATED, ADMIN } from '../../constants/sessionstorage';
import { limiter, loginContainer, loginWrapper, loginTitle, 
        inputWrapper, buttonWrapper, button100, 
        button100Wrapper, inputStyle } from '../../assets/jss/components/loginStyle';


const testData = {
    email: '12@12.com',
    pass: '12'
};
=======
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { AUTHENTICATED, ADMIN } from '../../constants/sessionstorage';
import { API_URL } from '../../constants/apiurl';
import { limiter, loginContainer, loginWrapper, loginTitle, 
        inputWrapper, buttonWrapper, button100, 
        button100Wrapper, inputStyle, invalidInput } from '../../assets/jss/components/loginStyle';
>>>>>>> autenticacion_usuario

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: false,
            isInvalid: false,
            user: {}
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
        
        this.loginAPIRequest = this.loginAPIRequest.bind(this);
    }

    render() {

        if( this.state.redirect || sessionStorage.getItem(AUTHENTICATED)) {
            if(this.state.user.admin || sessionStorage.getItem(ADMIN)) return <Redirect to='/admin'/>
            return <Redirect to='/home'/>
        }

        return(
            <div style={limiter}>
                <div style={loginContainer}>
                    <div style={loginWrapper}>
                        <Form>
                            <span style={loginTitle}>
                                Iniciar sesión
                            </span>

                            {this.state.isInvalid ? this.renderWrongDataMessage(): null}

                            <div style={inputWrapper}>
                                <Form.Label>Correo electrónico</Form.Label>
                                <Form.Control   type="email" 
                                                style={inputStyle} 
                                                placeholder="Ingrese su correo"
                                                isInvalid={this.state.isInvalid}
                                                onChange={this.handleEmailChange}/>
                            </div>

                            <div style={inputWrapper}>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control   type="password" 
                                                style={inputStyle} 
                                                placeholder="Ingrese su contraseña"
                                                isInvalid={this.state.isInvalid}
                                                onChange={this.handlePasswordChange}/>
                            </div>
                            
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
        return(
            <Form.Text style={invalidInput}>
                Correo y/o contraseña incorrecta
            </Form.Text>
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
        var url = API_URL + '/auth/login';
        const reqBody = {
            email: this.state.email,
            password: this.state.password
        };
        
        axios.post(url, reqBody)
         .then(response => {
             var data = response.data;
             console.log(data);
             if(data.error) { this.setState({ isInvalid: true }); }
             else {
                sessionStorage.setItem(AUTHENTICATED, true);
                sessionStorage.setItem(ADMIN, data.admin);
                 this.setState({
                     isInvalid: false,
                     user: data,
                     redirect: true
                 });
             }
         })
         .catch(error => {
             console.log(error);
         });
    }

}
export default Login;