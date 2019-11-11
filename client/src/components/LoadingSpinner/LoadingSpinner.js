import React from "react";
import { Modal, Spinner } from "react-bootstrap";
class LoadingSpinner extends React.Component {
    render() {
        return(
            <Modal show={this.props.showSpinner} onHide={this.onClose}>
                <Modal.Body>
                    <Spinner animation="border" role="status"/>
                </Modal.Body>
            </Modal>
        );
    }
    // Required for Reactstrap, otherwise throws error
    onClose() {}
}
export default LoadingSpinner;