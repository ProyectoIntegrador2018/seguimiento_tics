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
            isFetching: true,
            events: []
        };
        this.fetchPickListValues = this.fetchPickListValues.bind(this);
        this.createPicklistItems = this.createPicklistItems.bind(this);
    }

    componentDidMount() {
        this.fetchPickListValues();
    }

    render() {
        return(
            <Form>
                <span style={title}>Selecciona el evento</span>
                <LoadingSpinner showSpinner={this.state.isFetching}/>
                <Form.Control as="select">
                    {this.createPicklistItems()}
                </Form.Control>
                <Button type="submit">Siguiente</Button>
            </Form>
        );
    }

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
                 isFetching: false
             });
         });
    }

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