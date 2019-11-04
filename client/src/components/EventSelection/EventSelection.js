import React from "react";
import {Form, Button, InputGroup} from "react-bootstrap";
import { API_URL } from "../../constants/apiurl";
import Axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { TOKEN } from "../../constants/sessionstorage";
import { title } from "../../assets/jss/sharedStyling";

class EventSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: "",
            isFetching: true,
            events: []
        };
        this.fetchPickListValues = this.fetchPickListValues.bind(this);
        this.createPicklistItems = this.createPicklistItems.bind(this);
        this.onSelectPicklistChange = this.onSelectPicklistChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchPickListValues();
    }

    render() {
        return(
            <Form onSubmit={this.onFormSubmit}>
                <span style={title}>Selecciona el evento</span>
                <LoadingSpinner showSpinner={this.state.isFetching}/>
                <Form.Control   as="select"
                                defaultValue={this.state.selected}
                                onChange={this.onSelectPicklistChange}>
                    {this.createPicklistItems()}
                </Form.Control>
                <Button type="submit">Siguiente</Button>
            </Form>
        );
    }

    //  INPUT FUNCTIONS
    onFormSubmit(event) {
        event.preventDefault();
        this.props.selectedEvent(this.state.selected);
    }

    onSelectPicklistChange(event) {
        this.setState({ selected: event.target.value });
    }

    //  API FUNCTIONS
    fetchPickListValues() {
        var url = API_URL + this.props.routeURL;
        var token = sessionStorage.getItem(TOKEN);
        const headers = {
            "Content-Type": "application/json",
            "x-auth-token": token
        };
        Axios.get(url, {headers})
         .then(response => {
             this.setState({
                 events: response.data,
                 isFetching: false,
                 selected: response.data[0]._id
             });
         });
    }

    //  AUXILIAR FUNCTIONS
    createPicklistItems() {
        var items = [];
        var events = this.state.events;
        for(var i = 0; i < events.length; i++) {
            items.push(<option key={events[i]._id} value={events[i]._id}>{events[i].name}</option>);
        }
        return items;
    }
}
export default EventSelection;