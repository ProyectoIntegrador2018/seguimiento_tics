import React from 'react';
import { Redirect } from "react-router-dom";
import EventSelection from '../../EventSelection/EventSelection';
import { ADMIN } from '../../../constants/sessionstorage';

class RegisterStudent extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedEvent: null
        }
        this.selectedEvent = this.selectedEvent.bind(this);
    }

    selectedEvent(event) {
        this.setState({
            selectedEvent: event
        })
        console.log(event)
    }

    render() {
        if(this.state.selectedEvent !== null) {
            if(this.props.location.state.selectedMethod === 'form') {
                return (<Redirect to={{
                    pathname: '/form',
                    state: {eventId: this.state.selectedEvent}
                }}/>)
            }
            else {
                return (<Redirect to={{
                    pathname: '/file-upload',
                    state: {eventId: this.state.selectedEvent}
                }}/>)
            }
        }
        const url = sessionStorage.getItem(ADMIN) === "true" ? '/admin/all-events' : '/user/all-events';
        return (
            <div>
                <EventSelection
                    selectedEvent={this.selectedEvent}
                    routeURL={url}>
                </EventSelection>
            </div>
        )
    }
}

export default RegisterStudent;