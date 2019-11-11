import React from "react";
import Axios from "axios";
import { tableContainer, tableWrapper, table, header, cellHeader, cell } from "../../../assets/jss/components/usersStyle";
import { API_URL } from "../../../constants/apiurl";
import { TOKEN } from "../../../constants/sessionstorage";
import { Button, Form } from "react-bootstrap";


class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            displayForm: false,
            email: "",
            password: ""
        }
        this.renderRegistrationForm = this.renderRegistrationForm.bind(this);
        this.fetchUsersAPI = this.fetchUsersAPI.bind(this);
        this.onDisplayFormClick = this.onDisplayFormClick.bind(this);
        this.onStoreRecordSubmit = this.onStoreRecordSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    componentDidMount() {
        this.fetchUsersAPI();
    }

    render() {
        return(
           <div>
                <div style={tableContainer}>
                    {this.state.displayForm ? this.renderRegistrationForm() : null }
                    <div style={tableWrapper}>
                        <div style={table}>
                            <div style={header}>
                                <div style={cellHeader}>
                                    Correo electrónico
                                </div>
                            </div>
                            {this.state.users.map(user =>{
                                return(
                                    <div style={cell}>
                                        {user.email}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                <Button onClick={this.onDisplayFormClick}
                        disabled={this.state.displayForm}>Agregar</Button>
                </div>
           </div>
        );
    }

    renderRegistrationForm() {
        return(
            <Form onSubmit={this.onStoreRecordSubmit}>
                <Form.Group>
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control type="email" onChange={this.handleEmailChange}/>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" onChange={this.handlePasswordChange}/>
                </Form.Group>
                <Button type="submit">Guardar</Button>
            </Form>
        )
    }

    // INPUT
    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
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
                 users: data.data
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
                password: ""
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
