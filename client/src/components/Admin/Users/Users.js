import React from "react";
import Axios from "axios";
import LoadingSpinner from "./../../LoadingSpinner/LoadingSpinner";
import { tableContainer, tableWrapper, table, header, cellHeader, cell, roundedBttn, formStyle, formBttn } from "../../../assets/jss/components/usersStyle";
import { API_URL } from "../../../constants/apiurl";
import { TOKEN } from "../../../constants/sessionstorage";
import { Button, Form, Toast } from "react-bootstrap";
import { title } from "../../../assets/jss/sharedStyling";


class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            displayForm: false,
            email: "",
            password: "",
            isFetching: true
        }
        this.renderRegistrationForm = this.renderRegistrationForm.bind(this);
        this.fetchUsersAPI = this.fetchUsersAPI.bind(this);
        this.onDisplayFormClick = this.onDisplayFormClick.bind(this);
        this.onStoreRecordSubmit = this.onStoreRecordSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.toggleDisplayForm = this.toggleDisplayForm.bind(this);
        this.renderTable = this.renderTable.bind(this);
    }

    componentDidMount() {
        this.fetchUsersAPI();
    }

    render() {
        return(
           <div>
               <span style={title}>Usuarios registrados</span>
               <LoadingSpinner showSpinner={this.state.isFetching}/>
                <div style={tableContainer}>
                
                {this.state.displayForm ? this.renderRegistrationForm() : null }
                    {this.state.users.length == 0 ? <span style={title}>No hay usuarios registrados</span> :
                                                this.renderTable()}
                    
                <Button onClick={this.onDisplayFormClick}
                         style={roundedBttn}
                        disabled={this.state.displayForm}>+</Button>
                        
                </div>
           </div>
        );
    }

    renderTable() {
        return(
            <div style={tableWrapper}>
                <div style={table}>
                    <div style={header}>
                        <div style={cellHeader}>
                            Correo electrónico
                        </div>
                    </div>
                    {this.state.users.map(user =>{
                        return(
                            <div style={cell} key={user.email}>
                                {user.email}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }

    renderRegistrationForm() {
        return(
            <Toast style={formStyle} onClose={this.toggleDisplayForm}>
                <Toast.Header>
                    <strong className="mr-auto">Registrar nuevo usuario</strong>
                </Toast.Header>
                <Toast.Body>
                    <Form onSubmit={this.onStoreRecordSubmit} >
                        <Form.Group>
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control type="email" onChange={this.handleEmailChange} required={true}/>
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" onChange={this.handlePasswordChange} required={true} minLength={4}/>
                        </Form.Group>
                        <Button type="submit" style={formBttn}>Guardar</Button>
                    </Form>
                </Toast.Body>
            </Toast>
        )
    }

    // INPUT
    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    toggleDisplayForm() {
        this.setState({
            displayForm: false,
            email: "",
            password: ""
        })
    }

    onDisplayFormClick() {
        this.setState({
            displayForm: true
        });
    }

    onStoreRecordSubmit() {
        this.postUserAPI();
    }

    //  API
    fetchUsersAPI() {
        var url = API_URL + '/admin/all-users';
        
        Axios.get(url, this.buildHeaders())
         .then(data => {
             this.setState({
                 users: data.data,
                 isFetching: false
             });
         })
         .catch(error => {
             console.log(error);
         });
    }

    postUserAPI() {
        var url = API_URL + '/admin/store-user';
        var body = {
            email: this.state.email,
            password: this.state.password
        };

        Axios.post(url, body, this.buildHeaders())
         .then(data => {
            console.log(data);
            this.setState({
                displayForm: false,
                email: "",
                password: "",
            });
         })
         .catch(error => {
             console.log(error);
         });
    }

    buildHeaders() {
        var token = sessionStorage.getItem(TOKEN);
        const headers = {
            "Content-Type": "application/json",
            "x-auth-token": token
        };
        return { headers };
    }

}
export default Users;
