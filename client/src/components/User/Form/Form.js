import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import {
    limiter, loginContainer, loginWrapper, loginTitle,
    inputWrapper, buttonWrapper, button100,
    button100Wrapper, inputStyle, invalidInput
} from '../../../assets/jss/components/formStyle';
import initialState from './InitialState';
import { Redirect } from "react-router-dom";
import { basicQuestions } from './BasicQuestions';
import { API_URL } from '../../../constants/apiurl';
import { TOKEN, ADMIN } from '../../../constants/sessionstorage';

const headers = {
    "Content-Type": "application/json",
    "x-auth-token": sessionStorage.getItem(TOKEN)
}

class FormQuestions extends React.Component {
    constructor() {
        super();
        this.state = initialState
        this.handleChange = this.handleChange.bind(this)
        this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
        this.renderQuestions = this.renderQuestions.bind(this);
        this.fetchEventQuestions = this.fetchEventQuestions.bind(this);
    }

    componentWillMount() {
        // make the API call here...
        if(!this.props.location.state) return( <Redirect to="/select-upload-method"/> );
        this.fetchEventQuestions(this.props.location.state.eventId)
    }

    render() {
        if (this.state.eventNames === null) return (<p>Loading...</p>)
        const renderedQuestions = this.renderQuestions(basicQuestions);
        return (
            <div style={limiter}>
                <div style={loginContainer}>
                    <div style={loginWrapper}>
                        <Form>
                            <span style={loginTitle}> Forma </span>
                            {renderedQuestions}
                            {this.state.eventQuestions === null ? <p>Loading...</p> : this.renderEventQuestions(this.state.eventQuestions)}
                            <div style={buttonWrapper}>
                                <div style={button100Wrapper}>
                                    <Button style={button100} onClick={this.handleSaveButtonClick}>
                                        Guardar
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

    renderQuestions(questions) {
        let counter = 0;
        const rendered = questions.map((question) => {
            if (question.renderType === 'input') {
                const value = this.renderInputSection(question.label, question.type, question.name, question.placeHolder, this.handleChange);
                return value;
            }
            if (question.renderType === 'phone') {
                const value = this.renderPhoneSection(question.label, question.name, question.placeHolder, this.handleChange, this.state.isMobileInvalid[counter]);
                counter++;
                return value;
            }
            if (question.renderType === 'date') {
                const value = this.renderDateSection(question.label, question.name, this.handleChange);
                return value;
            }
            const value = this.renderSelectSection(question.id, question.name, question.label, this.handleChange, question.options);
            return value;
        })
        return rendered;
    }

    renderEventQuestions(questions) {
        const rendered = questions.map((question) => {
            //console.log(question);
            const value = this.renderInputSection(question.text, 'text', question._id, 'escribe aqui', this.handleChange);
            return value;
        })
        return rendered;
    }

    fetchEventQuestions(questionId) {
        let questionsUrl = sessionStorage.getItem(ADMIN) === "true" ? API_URL + '/admin/questions/' : API_URL + '/user/questions/';
        axios.get(questionsUrl + questionId, { headers })
            .then(res => {
                const questions = res.data;
                this.setState({
                    eventQuestions: questions
                })
            }).catch(err => {
                console.log(err);
            })
    }

    renderInputSection(label, type, name, placeHolder, onChange) {
        return (
            <div style={inputWrapper}>
                <Form.Label>{label}</Form.Label>
                <Form.Control type={type}
                    name={name}
                    value={this.state[name] || ''}
                    style={inputStyle}
                    placeholder={placeHolder}
                    onChange={onChange}
                />
            </div>
        )
    }

    renderPhoneSection(label, name, placeHolder, onChange, isInvalid) {
        return (
            <div style={inputWrapper}>
                <Form.Label>{label}</Form.Label>
                <Form.Control type="number"
                    style={inputStyle}
                    name={name}
                    placeholder={placeHolder}
                    isInvalid={isInvalid}
                    onChange={onChange} />
            </div>
        )
    }

    renderDateSection(label, name, onChange) {
        return (
            <div style={inputWrapper}>
                <Form.Label>{label}</Form.Label>
                <Form.Control type='date'
                    style={inputStyle}
                    name={name}
                    onChange={onChange} />
            </div>
        )
    }

    renderSelectSection(id, name, label, onChange, options) {
        options = options.map(option => {
            return (<option id={option._id} value={option._id}>{option.name}</option>)
        })
        return (
            <div style={inputWrapper}>
                <Form.Group controlId={id}>
                    <Form.Label>{label}</Form.Label>
                    <Form.Control as="select" onChange={onChange} name={name}>
                        {options}
                    </Form.Control>
                </Form.Group>
            </div>
        )
    }
    handleChange(event) {
        if (event.target.name === 'selectedEvent') {
            for (let i = 0; i < this.state.eventNames.length; i++) {
                if (this.state.eventNames[i]._id === event.target.value) {
                    this.setState({ selectedEvent: { ...this.state.eventNames[i] } })
                    this.fetchEventQuestions(this.state.eventNames[i]._id);
                }
            }
        }
        else if (event.target.name === 'sex' || event.target.name === 'schoolType') {
            let change = {};
            change[event.target.name] = event.target._id;
            this.setState(change);
        }
        else {
            let change = {};
            change[event.target.name] = event.target.value;
            this.setState(change);
        }
    }
    handleSaveButtonClick() {
        this.setState({ isMobileInvalid: [this.state.mobileNumber.toString().length !== 10, this.state.tutorPhone.toString().length !== 10] });
        if (this.state.mobileNumber.toString().length === 10 && this.state.tutorPhone.toString().length === 10) {
            let studentUrl = sessionStorage.getItem(ADMIN) === "true" ? API_URL + '/admin/store-student' : API_URL + '/user/store-student';
            let answerUrl = sessionStorage.getItem(ADMIN) === "true" ? API_URL + '/admin/store-answer' : API_URL + '/user/store-answer';
            const sex = this.state.sex
            const data = {
                name: this.state.name,
                last_name: this.state.firstLastName,
                second_last_name: this.state.secondLastName,
                birth_date: this.state.birthday,
                birth_place: this.state.state,
                gender: sex,
                email: this.state.email,
                event: this.props.location.state.eventId

            }
            console.log(data)
            axios.post(studentUrl, data, { headers })
                .then(res => {
                    this.state.eventQuestions.map(question => {
                        const answerData = {
                            student_id: res.data._id,
                            text: this.state[question._id],
                            question_id: question._id
                        }
                        axios.post(answerUrl, answerData, {headers})
                            .then(answerRes => {
                                console.log(answerRes);
                            }).catch(err => {
                                console.log(err);
                            })
                    })
                }).catch(err => {
                    console.log(err);
                })
        }
    }
}

export default FormQuestions;