import React from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isThisSecond } from "date-fns";

class EventCreation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date().setHours(0,0,0,0),
            endDate: new Date().setHours(23,59,59,999)
        };
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
    }

    render() {
        return(
            <div>
                <Form>
                    <Form.Group>
                        <Form.Label>Nombre del evento</Form.Label>
                        <Form.Control type="text" placeholder="Nombre"/>
                    </Form.Group>
                    <Form.Group>
                        <DatePicker selected={this.state.startDate} onChange={this.handleStartDateChange}/>
                        <DatePicker selected={this.state.endDate} />
                    </Form.Group>
                </Form>
            </div>
        );
    }

    //      INPUT HANDLING FUNCTIONS

    handleStartDateChange (date) {
        this.setState({
            startDate: date
        });
    }

}
export default EventCreation;