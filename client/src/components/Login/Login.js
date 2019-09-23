import React from 'react';
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

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: false
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
    }

    render() {

        if(this.state.redirect) return <Redirect to='/home'/>

        return(
            <div style={limiter}>
                <div style={loginContainer}>
                    <div style={loginWrapper}>
                        <Form>
                            <span style={loginTitle}>
                                Iniciar sesión
                            </span>

                            <div style={inputWrapper}>
                                <Form.Label>Correo electrónico</Form.Label>
                                <Form.Control   type="email" 
                                                style={inputStyle} 
                                                placeholder="Ingrese su correo"
                                                onChange={this.handleEmailChange}/>
                            </div>

                            <div style={inputWrapper}>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control   type="password" 
                                                style={inputStyle} 
                                                placeholder="Ingrese su contraseña"
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
        if( this.state.email === testData.email &&
            this.state.password === testData.pass) {
                sessionStorage.setItem(AUTHENTICATED, true);
                sessionStorage.setItem(ADMIN, true);

                this.setState({
                    redirect: true
                });
        }
    }

}
export default Login;