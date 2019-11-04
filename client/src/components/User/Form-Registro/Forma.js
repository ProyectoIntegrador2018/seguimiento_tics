import React from 'react';
import { Form, Button } from 'react-bootstrap';
import {
    limiter, loginContainer, loginWrapper, loginTitle,
    inputWrapper, buttonWrapper, button100,
    button100Wrapper, inputStyle, invalidInput
} from '../../../assets/jss/components/loginStyle';
import initialState from './initialState';
import { questions, eventQuestions } from './questions';

class Forma extends React.Component {
    constructor() {
        super();
        this.state = initialState
        this.handleChange = this.handleChange.bind(this)
        this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
        this.renderQuestions = this.renderQuestions.bind(this);
    }

    componentWillMount() {
        // make the API call here...
        const events = eventQuestions.map(event => {
            return {
                value: event.id,
                name: event.name,
                questions: event.questions
            };
        });
        console.log(events);
        this.setState({
            eventNames: events,
            selectedEvent: events[0]
        })
    }

    render() {
        const renderedQuestions = this.renderQuestions(questions);
        const renderedEventQuestions = this.renderEventQuestions(this.state.selectedEvent.questions);
        return (
            <div style={limiter}>
                <div style={loginContainer}>
                    <div style={loginWrapper}>
                        <Form>
                            <span style={loginTitle}> Forma </span>
                            {this.renderSelectSection('eventos', 'selectedEvent', 'Evento', this.handleChange, this.state.eventNames)}
                            {renderedQuestions}
                            {renderedEventQuestions}
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
            const value = this.renderInputSection(question.text, 'text', question.id, 'escribe aqui', this.handleChange);
            return value;
        })
        return rendered;
    }

    renderInputSection(label, type, name, placeHolder, onChange) {
        return (
            <div style={inputWrapper}>
                <Form.Label>{label}</Form.Label>
                <Form.Control type={type}
                    name={name}
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
            return (<option value={option.value}>{option.name}</option>)
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
                if (this.state.eventNames[i].value === event.target.value) {
                    this.setState({
                        selectedEvent: this.state.eventNames[i]
                    })
                }
            }
        }
        else {
            let change = {};
            change[event.target.name] = event.target.value;
            this.setState(change);
            console.log(change);
        }
    }

    handleSaveButtonClick() {
        this.setState({
            isMobileInvalid: [this.state.mobileNumber.toString().length !== 10, this.state.tutorPhone.toString().length !== 10]
        });
        console.log(this.state);
    }
}

export default Forma;