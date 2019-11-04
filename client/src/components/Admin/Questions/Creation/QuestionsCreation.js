import React from "react";
import { Form } from "react-bootstrap";

class QuestionsCreation extends React.Component {
    render() {
        return(
            <div>
                {this.renderRequiredQuestions()}
            </div>
        );
    }

    // RENDER FUNCTIONS
    renderRequiredQuestions() {
        return(
            <div>
                <Form.Group>
                    <Form.Label>Nombre(s)</Form.Label>
                    <Form.Control   type="text"
                                    disabled/>
                    <Form.Label>Apellido paterno</Form.Label>
                    <Form.Control   type="text"
                                    disabled/>
                    <Form.Label>Apellido materno</Form.Label>
                    <Form.Control   type="text"
                                    disabled/>
                    <Form.Label>Fecha de nacimiento</Form.Label>
                    <Form.Control   type="text"
                                    disabled/>
                    <Form.Label>Lugar de nacimiento</Form.Label>
                    <Form.Control   type="text"
                                    disabled/>
                    <Form.Label>Genero</Form.Label>
                    <Form.Check     type="radio"
                                    label="Hombre"
                                    disabled/>
                    <Form.Check     type="radio"
                                    label="Mujer"
                                    disabled/>
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control   type="email"
                                    disabled/>
                </Form.Group>
            </div>
        );
    }
}
export default QuestionsCreation;