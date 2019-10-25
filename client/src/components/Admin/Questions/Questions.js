import React from "react";
import EventSelection from "../../EventSelection/EventSelection";

class Questions extends React.Component {
    render() {
        return(
            <EventSelection routeURL="/admin/all-events"/>
        )
    }
}
export default Questions;