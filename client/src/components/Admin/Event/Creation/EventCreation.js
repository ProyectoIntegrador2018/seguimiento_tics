import React from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TOKEN } from "../../../../constants/sessionstorage";
import { API_URL } from "../../../../constants/apiurl";
import Axios from "axios";
import {Redirect} from "react-router-dom";
import { title, 
        button100, 
        buttonWrapper, 
        button100Wrapper,
        invalidInput } from "../../../../assets/jss/sharedStyling";
import { eventContainer, eventForm, calendarSpacing } from "../../../../assets/jss/components/eventStyle";

class EventCreation extends React.Component {

    constructor(props) {
        super(props);
        var current = new Date();
        this.state = {
            name: "",
            startDate: current,
            edition: "",
            endDate: new Date(current.getFullYear(), current.getMonth(), current.getDate()+1),
            isInvalid: false,
            redirect: false,
            errorMsg: ""
        };
        // Render
        this.renderRedirect = this.renderRedirect.bind(this);
        // Input change
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleEditionChange = this.handleEditionChange.bind(this);
        // Button click
        this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
        // API Requests
        this.checkNameAvailabilityAPI = this.checkNameAvailabilityAPI.bind(this);
    }

    render() {
        return(
            <div style={eventContainer}>
                {this.renderRedirect()}
                <span style={title}>Crear nuevo evento</span>
                <Form style={eventForm} onSubmit={this.onRegisterSubmit}>

                    {this.renderInputFormGroup("text", "Nombre del evento", "Nombre", this.state.name, this.handleNameChange)}

                    {this.renderInputFormGroup("number", "Edición del evento", "2019", this.state.edition, this.handleEditionChange)}

                    {this.renderDateFormGroup("Fecha de inicio", this.state.startDate, this.handleStartDateChange)}

                    {this.renderDateFormGroup("Fecha de fin", this.state.endDate, this.handleEndDateChange)}
                    <div style={buttonWrapper}>
                        <div style={button100Wrapper}>
                            <Button type="submit"
                                style={button100}
                                disabled={this.state.isInvalid || this.state.name === ""}>
                                Registrar
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }

    //      RENDER FUNCTIONS

    renderInputFormGroup(type, label, placeholder, value, onChange) {
        return(
            <Form.Group>
                <Form.Label>{label}</Form.Label>
                <Form.Control   type={type}
                                placeholder={placeholder} 
                                onChange={onChange}
                                required={true}
                                value={value}/>
            </Form.Group>
        );
    }

    renderErrorMessage() {
        if(this.state.isInvalid) {
            return(
                <Form.Text style={invalidInput}> {this.state.errorMsg} </Form.Text>
            );
        }
    }

    renderDateFormGroup(label, state, changeFunction) {
        return(
            <Form.Group>
                <Form.Label style={calendarSpacing}>{label}</Form.Label>
                <DatePicker selected={state} 
                            onChange={changeFunction}/>
            </Form.Group>
        );
    }

    renderRedirect() {
        if(this.state.redirect) {
            return <Redirect to='/questions'/>
        };
    }

    //      INPUT HANDLING FUNCTIONS

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleEditionChange(event) {
        this.setState({
            edition: event.target.value
        });
    }

    handleStartDateChange(date) {
        var invalid = date > this.state.endDate;
        this.setState({
            isInvalid: invalid,
            errorMsg: "Fecha de inicio debe de ser antes de la fecha de fin",
            startDate: date
        });
    }

    handleEndDateChange(date) {
        var invalid = date < this.state.startDate;
        this.setState({
            isInvalid: invalid,
            errorMsg: "Fecha de fin debe de ser después de la fecha de inicio",
            endDate: date
        });
    }

    onRegisterSubmit(event) {
        event.preventDefault();
        this.storeEventAPI();
    }

    // API FUNCTIONS

    checkNameAvailabilityAPI() {
        const reqBody = { name : this.state.name };
        var body = this.buildBodyAndHeaders("/admin/availability-event", reqBody);

        Axios.post(body.url, body.body, body.headers)
         .then(response => {
             var data = response.data;
             if(data.error) this.setState({ isInvalid: true, errorMsg: "Ya existe un evento con ese nombre" });
             else this.setState({ isInvalid: false });
         })
         .catch(error => {
             console.log(error);
         });
    }

    storeEventAPI() {
        const reqBody = {
            name : this.state.name,
            edition : this.state.edition,
            start_date: this.dateToString(this.state.startDate),
            end_date: this.dateToString(this.state.endDate)
        };
        var body = this.buildBodyAndHeaders("/admin/register-event", reqBody);
        
        Axios.post(body.url, body.body, body.headers)
         .then(response => {
             this.setState({
                 redirect: true
             });
         })
         .catch(error => {
             console.log(error);
         });
    }

    // AUXILIAR FUNCTIONS

    dateToString = function(date) {
        return date.toString().split(" ").slice(1,4).join(" ");
    }

    buildBodyAndHeaders = function(url, body) {
        var token = sessionStorage.getItem(TOKEN);
        var requestUrl = API_URL + url;
        const headers = {
            "Content-Type": "application/json",
            "x-auth-token": token
        }
        
        return ({
            url: requestUrl, 
            body: body,
            headers: { headers }
        });
    }
}

export default EventCreation;