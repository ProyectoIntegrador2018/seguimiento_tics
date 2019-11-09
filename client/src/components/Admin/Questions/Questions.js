import React from "react";
import EventSelection from "../../EventSelection/EventSelection";
import QuestionsCreation from "./Creation/QuestionsCreation";

class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: ""
        };
        this.selectedEvent = this.selectedEvent.bind(this);
    }

    render() {
        return(
            <div>
                { this.state.event === "" ? <EventSelection routeURL="/admin/all-events"
                                                            selectedEvent={this.selectedEvent}/>
                                          : <QuestionsCreation eventId={this.state.event}/> }
            </div>
        );
    }

    selectedEvent(eventId) {
        this.setState({ event: eventId });
    }

}
export default Questions;