import React from 'react';
import { Form } from 'react-bootstrap';
import { limiter, loginContainer, loginWrapper, loginTitle, inputWrapper, 
        buttonWrapper, buttonBackground, button100, button100Wrapper } from '../../assets/jss/components/loginStyle';

class Login extends React.Component {
    render() {
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
                                <Form.Control type="email" placeholder="Ingrese su correo"/>
                            </div>

                            <div style={inputWrapper}>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Ingrese su contraseña"></Form.Control>
                            </div>
                            
                            <div style={buttonWrapper}>
                                <div style={button100Wrapper}>
                                    <div style={buttonBackground}></div>
                                    <button style={button100}>
                                        Login
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

}
export default Login;