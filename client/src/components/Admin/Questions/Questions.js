import React from "react";
import EventSelection from "../../EventSelection/EventSelection";
import QuestionsCreation from "./QuestionsCreation";
import {Toast} from "react-bootstrap";

class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: "",
            successMessage: "",
            displaySuccess: false
        };
        this.selectedEvent = this.selectedEvent.bind(this);
        this.shouldDisplaySuccess = this.shouldDisplaySuccess.bind(this);
        this.onToggleToast = this.onToggleToast.bind(this);
    }

    render() {
        return(
            <div>
                { this.state.event === "" ? <EventSelection routeURL="/admin/all-events"
                                                            selectedEvent={this.selectedEvent}/>
                                          : <QuestionsCreation  eventId={this.state.event}
                                                                afterStoreRecords={this.shouldDisplaySuccess}/> }
                
                <Toast  show={this.state.displaySuccess} 
                        onClose={this.onToggleToast}
                        style={{right: "7%", bottom: "7%", position: "absolute"}}>
                    <Toast.Header><strong className="mr-auto">Éxito</strong></Toast.Header>
                    <Toast.Body>{this.state.successMessage}</Toast.Body>
                </Toast>
            </div>
        );
    }

    onToggleToast() {
        this.setState({
            displaySuccess: false
        });
    }

    selectedEvent(eventId) {
        this.setState({ event: eventId });
    }

    shouldDisplaySuccess(value, message){
        this.setState({
            displaySuccess: value,
            successMessage: message,
            event: ""
        });
        setTimeout(function() {
            this.setState({displaySuccess: false});
        }.bind(this),3500)
    } 

}
export default Questions;