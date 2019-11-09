import React from "react";
import { Form, Button } from "react-bootstrap";
import { TOKEN } from "../../../../constants/sessionstorage";
import { API_URL } from "../../../../constants/apiurl";
import Axios from "axios";

class QuestionsCreation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: []
        };
        this.onAddQuestions = this.onAddQuestions.bind(this);
        this.renderQuestionItems = this.renderQuestionItems.bind(this);
        this.onQuestionChange = this.onQuestionChange.bind(this);
        this.onClickRemove = this.onClickRemove.bind(this);
        this.onQuestionsSubmission = this.onQuestionsSubmission.bind(this);
    }

    render() {
        return(
            <div>
                {this.renderRequiredQuestions()}
                <Form onSubmit={this.onQuestionsSubmission}>
                    {this.renderQuestionItems()}
                    <Button onClick={this.onAddQuestions}>Agregar pregunta</Button>
                    <Button type="submit">Guardar</Button>
                </Form>
            </div>
        );
    }

    // RENDER FUNCTIONS
    renderRequiredQuestions() {
        return(
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
        );
    }

    renderQuestionItems() {
        return(
            <Form.Group>
                {this.state.questions.map((question, idx) => {
                    return(
                        <div key={idx}>
                            <Form.Control   type="text"
                                            value={question}
                                            minLength={5}
                                            onChange={(e) => this.onQuestionChange(e, idx)}/>
                            <Button onClick={() => this.onClickRemove(idx)}>-</Button>
                        </div>
                    );
                })}
            </Form.Group>
        );
    }

    //  API FUNCTIONS
    onQuestionsSubmission(event) {
        event.preventDefault();

        var token = sessionStorage.getItem(TOKEN);
        var requestUrl = API_URL + '/admin/store-questions';
        const headers = { "Content-Type": "application/json", "x-auth-token": token };
        var body = {
            event_questions: this.state.questions,
            event_id: this.props.eventId
        };

        Axios.post(requestUrl, body, {headers})
         .then(data => {
             console.log(data.data);
         })
         .catch(error => console.log(error));
    }

    //  INPUT FUNCTIONS
    onAddQuestions() {
        var temp = this.state.questions;
        temp.push("");
        this.setState({
            questions: temp
        });
    }

    onQuestionChange(event, idx) {
        var temp = this.state.questions;
        temp[idx] = event.target.value;
        this.setState({
            questions: temp
        });
    }

    onClickRemove(idx) {
        var temp = this.state.questions;
        temp.splice(idx,1);
        this.setState({
            questions: temp
        });
    }
}
export default QuestionsCreation;