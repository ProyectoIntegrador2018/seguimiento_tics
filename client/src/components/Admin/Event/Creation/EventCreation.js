import React from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TOKEN } from "../../../../constants/sessionstorage";
import { API_URL } from "../../../../constants/apiurl";
import Axios from "axios";

class EventCreation extends React.Component {

    constructor(props) {
        super(props);
        var current = new Date();
        this.state = {
            name: "",
            startDate: current,
            endDate: new Date(current.getFullYear(), current.getMonth(), current.getDate()+1),
            isInvalid: false
        };
        // Input change
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        // Button click
        this.onRegisterClick = this.onRegisterClick.bind(this);
        // API Requests
        this.checkNameAvailabilityAPI = this.checkNameAvailabilityAPI.bind(this);
    }

    render() {
        return(
            <div>
                <Form>
                    <Form.Group>
                        <Form.Label>Nombre del evento</Form.Label>
                        <Form.Control   type="text" 
                                        placeholder="Nombre" 
                                        onChange={this.handleNameChange}
                                        isInvalid={this.state.isInvalid}
                                        onBlur={this.checkNameAvailabilityAPI}
                                        minLength={3}
                                        required={true}
                                        value={this.state.name}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Fecha de inicio</Form.Label>
                        <DatePicker selected={this.state.startDate} 
                                    onChange={this.handleStartDateChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Fecha de fin</Form.Label>
                        <DatePicker selected={this.state.endDate} 
                                    onChange={this.handleEndDateChange}/>
                    </Form.Group>
                    <Button type="submit"
                            onClick={this.onRegisterClick}
                            disabled={this.state.isInvalid || this.state.name === ""}>
                        Registrar
                    </Button>
                </Form>
            </div>
        );
    }

    //      INPUT HANDLING FUNCTIONS

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleStartDateChange(date) {
        this.setState({
            startDate: date,
        });
    }

    handleEndDateChange(date) {
        this.setState({
            endDate: date
        });
    }

    onRegisterClick() {
        this.storeEventAPI();
    }

    // API FUNCTIONS

    checkNameAvailabilityAPI() {
        const reqBody = {
            name : this.state.name,
        };
        var body = this.buildBodyAndHeaders("/admin/availability-event", reqBody);

        Axios.post(body.url, body.body, body.headers)
         .then(response => {
             var data = response.data;
             if(data.error) this.setState({ isInvalid: true });
             else this.setState({ isInvalid: false });
         })
         .catch(error => {
             console.log(error);
         });
    }

    storeEventAPI() {
        console.log(this.state.name);
        const reqBody = {
            name : this.state.name,
            start_date: this.dateToString(this.state.startDate),
            end_date: this.dateToString(this.state.endDate)
        };
        var body = this.buildBodyAndHeaders("/admin/register-event", reqBody);
        
        Axios.post(body.url, body.body, body.headers)
         .then(response => {
             console.log(response);
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