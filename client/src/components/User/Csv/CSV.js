import React from "react";
import download from "downloadjs";
import { API_URL } from "../../../constants/apiurl";
import { Button,Form } from "react-bootstrap";
import "../../../assets/css/fileupload.css";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { TOKEN } from "../../../constants/sessionstorage";
import { title } from "../../../assets/jss/sharedStyling";
import { storeQuestionBttn } from "../../../assets/jss/components/questionsStyle";

class CSV extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            eventId: ""
        };
        this.handleFileChange = this.handleFileChange.bind(this);
        this.onClickUpload = this.onClickUpload.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
    }

    componentDidMount() {
        if(!this.props.location.state) return( <Redirect to="/select-upload-method"/> );
        this.setState({
            eventId: this.props.location.state.eventId
        });
        console.log(this.props.location.state)
    }

    render() {
        
        return(
            <div>
                <Form method="post" action="#" id="#">
                    <span style={title}>Sube el archivo</span>
                    <div className="form-group files">
                        <span className="download"><a href="#" onClick={this.handleDownload}>Descargar el template</a></span>
                        <input type="file" 
                                className="form-control" 
                                multiple=""
                                onChange={this.handleFileChange}/>
                    </div>
                </Form>
                <Button onClick={this.onClickUpload} style={storeQuestionBttn}>Subir archivo</Button>
            </div>
        );
    }

    handleDownload = async function() {
        const url = API_URL + '/user/csv-template/' + this.props.location.state.eventId
        const res = await fetch(url);
        const blob = await res.blob();
        download(blob, 'template.csv');
    }

    handleFileChange(event) {
        this.setState({file: event.target.files[0]})
    }

    onClickUpload() {
        const url = API_URL + '/user/upload-csv/' + this.props.location.state.eventId;
        const headers = {
            "Content-Type": "application/json",
            "x-auth-token": sessionStorage.getItem(TOKEN)
        };
        const data = new FormData();
        data.append('file', this.state.file);

        Axios.post(url, data, {headers})
         .then(response => {
             console.log(response);
         })
         .catch(error => console.log(error));
    }
}
export default CSV;