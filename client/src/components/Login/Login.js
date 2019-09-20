import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { limiter, loginContainer, loginWrapper, loginTitle, 
        inputWrapper, buttonWrapper, button100, 
        button100Wrapper, inputStyle } from '../../assets/jss/components/loginStyle';

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
                                <Form.Control type="email" style={inputStyle} placeholder="Ingrese su correo"/>
                            </div>

                            <div style={inputWrapper}>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" style={inputStyle} placeholder="Ingrese su contraseña"></Form.Control>
                            </div>
                            
                            <div style={buttonWrapper}>
                                <div style={button100Wrapper}>
                                    <Button style={button100}>
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

}
export default Login;