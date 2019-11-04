import React from "react";
import { Form, Button } from "react-bootstrap";
import QuestionItem from "./QuestionItem";

class QuestionsCreation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: []
        };
        this.onAddQuestions = this.onAddQuestions.bind(this);
        this.renderQuestionItems = this.renderQuestionItems.bind(this);
        this.questionChange = this.questionChange.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
    }

    render() {
        return(
            <div>
                {this.renderRequiredQuestions()}
                {this.renderQuestionItems()}
                <Button onClick={this.onAddQuestions}>Agregar pregunta</Button>
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

    renderQuestionItems() {
        return(
            <div>
                {this.state.questions.map((question, idx) => {
                    return(
                        <QuestionItem   key={idx}
                                        idx={idx}
                                        questionChange={this.questionChange}
                                        removeItem={this.removeQuestion}/>
                    );
                })}
            </div>
        );
    }

    //  INPUT FUNCTIONS
    onAddQuestions() {
        var temp = this.state.questions;
        temp.push("");
        this.setState({
            questions: temp
        });
    }

    //  AUXILIAR FUNCTIONS
    questionChange(txt, idx) {
        var temp = this.state.questions;
        temp[idx] = txt;
        this.setState({
            questions: temp
        });
    }

    removeQuestion(idx) {
        var temp = this.state.questions;
        temp.splice(idx,1);
        this.setState({
            questions: temp
        });
    }
}
export default QuestionsCreation;