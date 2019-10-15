import React from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EventCreation extends React.Component {

    constructor(props) {
        super(props);
        var current = new Date();
        this.state = {
            name: "",
            startDate: current,
            endDate: new Date(current.getFullYear(), current.getMonth(), current.getDate()+1)
        };
        // Input change
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);

        this.onRegisterClick = this.onRegisterClick.bind(this);
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
                    <Button onClick={this.onRegisterClick}>
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
            name: `${this.state.name} ${date.toString().split(" ")[3]}`
        });
    }

    handleEndDateChange(date) {
        this.setState({
            endDate: date
        });
    }

    onRegisterClick() {
        var start = this.dateToString(this.state.startDate);
        var end = this.dateToString(this.state.endDate);
        console.log(start);
        console.log(end);
    }

    // AUXILIAR FUNCTIONS

    dateToString = function(date) {
        return date.toString().split(" ").slice(1,4).join(' ');
    }

}
export default EventCreation;