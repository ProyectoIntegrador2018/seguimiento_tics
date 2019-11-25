import React from "react";
import { Form, Button } from "react-bootstrap";
import { TOKEN } from "../../../constants/sessionstorage";
import { API_URL } from "../../../constants/apiurl";
import Axios from "axios";
import { title, invalidInput } from "../../../assets/jss/sharedStyling";
import basicQuestions from "../../User/Form/BasicQuestions";
import { addQuestionBttn, storeQuestionBttn, deleteBttn, toolBar, inputQuestion, questionContainer, textSpan } from "../../../assets/jss/components/questionsStyle";
import remove from "../../../assets/img/remove.png";
import { element } from "prop-types";

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
                <span style={title}>Preguntas del evento</span>
                {this.renderRequiredQuestions()}
                <Form onSubmit={this.onQuestionsSubmission}>
                    {this.renderQuestionItems()}
                    <Button onClick={this.onAddQuestions} style={addQuestionBttn}>+ Agregar pregunta</Button>
                    <Button type="submit" style={storeQuestionBttn}>Guardar</Button>
                </Form>
            </div>
        );
    }

    // RENDER FUNCTIONS
    renderRequiredQuestions() {
        let aux = basicQuestions.basicQuestions;
        return(
            <Form.Group>
                <span style={invalidInput}>  * Preguntas requeridas</span>
                {this.renderFirstChunk()}
                {aux.map(q => this.renderEachRequiredQuestion(q))}

                {this.renderSecondChunk()}                
                
                {this.renderThirdChunk()}
            </Form.Group>
        );
    }

    renderEachRequiredQuestion = function(question) {
        console.log(question)
        return(
            <Form.Group>
                <Form.Label>{question.label}</Form.Label>
                <Form.Control  type={question.type}
                                disabled/>
            </Form.Group>
        )
    }

    renderFirstChunk() {
        return(
            <div className="row">
                    <div className="col">
                        <Form.Label>Nombre(s)</Form.Label>
                        <Form.Control   type="text"
                                        disabled/>
                    </div>
                    <div className="col">
                        <Form.Label>Apellido paterno</Form.Label>
                        <Form.Control   type="text"
                                        disabled/>
                    </div>
                    <div className="col">
                        <Form.Label>Apellido materno</Form.Label>
                        <Form.Control   type="text"
                                        disabled/>
                    </div>
            </div>
        );
    }

    renderSecondChunk() {
        return(
            <div className="row">
                    <div className="col">
                        <Form.Label>Fecha de nacimiento</Form.Label>
                        <Form.Control   type="text"
                                        disabled/>
                    </div>
                    <div className="col">
                        <Form.Label>Lugar de nacimiento</Form.Label>
                        <Form.Control   type="text"
                                        disabled/>
                    </div>
            </div>
        );
    }

    renderThirdChunk() {
        return(
            <Form.Group>
                <Form.Label>Genero</Form.Label>
                <Form.Check     type="radio"
                                label="Hombre"
                                disabled/>
                <Form.Check     type="radio"
                                label="Mujer"
                                disabled/>
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control   type="email"
                                style={{width:'35%'}}
                                disabled/>
            </Form.Group>
        );
    }

    renderQuestionItems() {
        return(
            <Form.Group>
                {this.state.questions.map((question, idx) => {
                    return(
                        <div key={idx} style={questionContainer}>
                            <div style={toolBar}>
                                <span style={textSpan}>{idx+1}</span>
                                <Button style={deleteBttn}
                                        onClick={() => this.onClickRemove(idx)}>
                                    <img src={remove} style={{height: '20px'}}/>
                                </Button>
                            </div>
                            <Form.Control   type="text"
                                            value={question}
                                            minLength={5}
                                            style={inputQuestion}
                                            onChange={(e) => this.onQuestionChange(e, idx)}/>
                            
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
             this.props.afterStoreRecords(true, "Preguntas guardadas con éxito");
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