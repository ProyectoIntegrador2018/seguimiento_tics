import React from "react";
import { Form, Button } from "react-bootstrap";
import { TOKEN } from "../../../constants/sessionstorage";
import { API_URL } from "../../../constants/apiurl";
import Axios from "axios";
import { title, invalidInput, divisor } from "../../../assets/jss/sharedStyling";
import basicQuestions from "../../User/Form/BasicQuestions";
import { addQuestionBttn, storeQuestionBttn, deleteBttn, toolBar, inputQuestion, questionContainer, textSpan, requiredSection } from "../../../assets/jss/components/questionsStyle";
import remove from "../../../assets/img/remove.png";

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
                <span style={invalidInput}>  * Preguntas requeridas</span>
                <div style={requiredSection}> 
                    {this.renderRequiredQuestions()}
                </div>
                <div style={divisor}></div>
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
        let questions = basicQuestions.basicQuestions;
        let renderer = [];
        for(let i = 3; i < questions.length; i++) {
            if(i % 3 === 0) renderer = renderer.concat(this.renderQuestionsChunk(questions.slice(i - 3, i), i));
        }
        return renderer;
    }

    renderQuestionsChunk = function(questions, idx) {
        return[
            <div key={idx} className="row"> 
                { questions.map(q => {
                    return q.renderType === "select" ? this.renderSelectType(q) 
                                              : this.renderInputType(q)}) }
            </div>
        ];
    }

    renderInputType = function(q) {
        return (
            <div key={q.name} className="col">
                <Form.Group key={q.name}>
                    <Form.Label>{q.label}</Form.Label>
                    <Form.Control type={q.type}
                                as={q.renderType !== "phone" && q.renderType !== "date" ? q.renderType : "input"}
                                disabled/>
                </Form.Group>
            </div>
        );
    }

    renderSelectType = function(q) {
        return (
            <div key={q.name} className="col">
                <Form.Group key={q.name}>
                <Form.Label>{q.label}</Form.Label>
                <Form.Control   as={q.renderType}
                                disabled>
                    {q.options.map(opt => {return(<option key={opt.name}>{opt.name}</option>)})}
                </Form.Control>
                </Form.Group>
            </div>
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