import React from "react";
import download from "downloadjs";
import { API_URL } from "../../../constants/apiurl";
import { Button,Form } from "react-bootstrap";
import "../../../assets/css/fileupload.css";
import Axios from "axios";
import { TOKEN } from "../../../constants/sessionstorage";

class CSV extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
        this.handleFileChange = this.handleFileChange.bind(this);
        this.onClickUpload = this.onClickUpload.bind(this);
    }

    render() {
        return(
            <div>
                <Form method="post" action="#" id="#">
                    <div className="form-group files">
                        <label>Upload Your File </label>
                        <input type="file" 
                                className="form-control" 
                                multiple=""
                                onChange={this.handleFileChange}/>
                    </div>
                </Form>

                <Button onClick={this.handleDownload}>Descargar</Button>
                <Button onClick={this.onClickUpload}>Subir archivo</Button>
            </div>
        );
    }

    handleDownload = async function() {
        const url = API_URL + '/user/csv-template/5dd22389774d300f91d38644'
        const res = await fetch(url);
        const blob = await res.blob();
        download(blob, 'template.csv');
    }

    handleFileChange(event) {
        this.setState({file: event.target.files[0]})
    }

    onClickUpload() {
        const url = API_URL + '/user/upload-csv/5dd22389774d300f91d38644';
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