import React from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { title, button100, buttonWrapper, button100Wrapper } from "../../assets/jss/sharedStyling";
import { pickerWidth, sectionContainer, submitBttn, mainContainter } from "../../assets/jss/components/selectEventStyle";

class UploadSelection extends React.Component {
    constructor() {
        super();
        this.state = {
            change: false,
            selectedMethod: null
        }
        this.handleCSVClick = this.handleCSVClick.bind(this);
        this.handleFormClick = this.handleFormClick.bind(this);
    }

    render() {
        if (this.state.change) {
            return (<Redirect to={{
                pathname: '/select-event',
                state: {selectedMethod: this.state.selectedMethod}
            }}/>)
        }
        return (
            <div style={mainContainter}>
                <span style={title}>¿Cómo quieres hacer el registro?</span>
                <div style={buttonWrapper}>
                    <div style={button100Wrapper, submitBttn}>
                        <br/>
                        <Button style={button100} onClick={this.handleCSVClick}>CSV</Button>
                        <br/>
                        <Button style={button100} onClick={this.handleFormClick}>Formulario</Button>
                    </div>
                </div>
            </div>
        )
    }

    handleCSVClick() {
        this.setState({
            selectedMethod: 'csv',
            change: true
        })
    }

    handleFormClick() {
        this.setState({
            selectedMethod: 'form',
            change: true
        })
    }
}

export default UploadSelection