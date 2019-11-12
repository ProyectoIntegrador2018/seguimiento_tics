import React from "react";
import {Form, Button} from "react-bootstrap";
import Axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { TOKEN } from "../../constants/sessionstorage";
import { API_URL } from "../../constants/apiurl";
import {title, button100, buttonWrapper, button100Wrapper} from "../../assets/jss/sharedStyling";
import {pickerWidth, sectionContainer, submitBttn, mainContainter} from "../../assets/jss/components/selectEventStyle";

class EventSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: "",
            isFetching: true,
            events: [],
            hasRecords: true,
        };
        this.fetchPickListValues = this.fetchPickListValues.bind(this);
        this.createPicklistItems = this.createPicklistItems.bind(this);
        this.onSelectPicklistChange = this.onSelectPicklistChange.bind(this);
        this.renderEventPicklist = this.renderEventPicklist.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchPickListValues();
    }

    render() {
        return(
            <div style={mainContainter}>
                {this.state.hasRecords ?    this.renderEventPicklist() : 
                                            <span style={title}>No hay eventos registrados</span>}
            </div>
        );
    }

    //  RENDER FUNCTIONS
    renderEventPicklist() {
        return(
            <div>
                <span style={title}>Selecciona el evento</span>
                <Form onSubmit={this.onFormSubmit} style={sectionContainer}>
                    <LoadingSpinner showSpinner={this.state.isFetching}/>
                    <Form.Control   as="select"
                                    defaultValue={this.state.selected}
                                    onChange={this.onSelectPicklistChange}
                                    style={pickerWidth}
                                    >
                        {this.createPicklistItems()}
                    </Form.Control>

                    <div style={buttonWrapper}>
                        <div style={button100Wrapper, submitBttn}>
                            <Button type="submit" style={button100}>Siguiente</Button>
                        </div>
                    </div>
                </Form>
            </div>
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
             if(response.data.length == 0) {
                 this.setState({
                     hasRecords: false,
                     isFetching: false
                 });
                 
             }
             else {
                this.setState({
                    events: response.data,
                    isFetching: false,
                    selected: response.data[0]._id
                });
             }
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