import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import {
    limiter, loginContainer, loginWrapper, loginTitle,
    inputWrapper, buttonWrapper, button100,
    button100Wrapper, inputStyle, invalidInput
} from '../../assets/jss/components/loginStyle';

const yesNoOptions = [
    {
        name: 'No',
        value: 'no'
    },
    {
        name: 'Sí',
        value: 'si'
    }
]

const sexOptions = [
    {
        name: 'Masculino',
        value: 'masculino'
    },
    {
        name: 'Femenino',
        value: 'femenino'
    }
]

const schoolTypesOptions = [
    {
        name: 'Publica',
        value: 'public'
    },
    {
        name: 'Privada',
        value: 'private'
    }
]

class Forma extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            lastNames: '',
            email: '',
            address: '',
            city: '',
            state: '',
            pc: '',
            country: '',
            mobileNumber: '',
            birthday: '',
            age: '',
            sex: 'masculino',
            schoolName: '',
            schoolType: 'public',
            schoolGrade: '',
            tutorName: '',
            tutorPhone: '',
            tutorMail: '',
            hasTakenClass: false,
            takenClasses: '',
            company: '',
            participatedApportaTeen: false,
            hasTakenChicosCode: false,
            requiresScolarship: false,
            howFoundOut: '',
            isMobileInvalid: false,
            isTutorPhoneInvalid: false
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLastNamesChange = this.handleLastNamesChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handlePCchange = this.handlePCchange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleMobileNumberChange = this.handleMobileNumberChange.bind(this);
        this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleSexChange = this.handleSexChange.bind(this);
        this.handleSchoolNameChange = this.handleSchoolNameChange.bind(this);
        this.handleSchoolTypeChange = this.handleSchoolTypeChange.bind(this);
        this.handleSchoolGradeChange = this.handleSchoolGradeChange.bind(this);
        this.handleTutorNameChange = this.handleTutorNameChange.bind(this);
        this.handleTutorPhoneChange = this.handleTutorPhoneChange.bind(this);
        this.handleTutorMailChange = this.handleTutorMailChange.bind(this);
        this.handleHasTakenClassChange = this.handleHasTakenClassChange.bind(this);
        this.handleTakenClassesChange = this.handleTakenClassesChange.bind(this);
        this.handleCompanyChange = this.handleCompanyChange.bind(this);
        this.handleParticipatedApportaTeenChange = this.handleParticipatedApportaTeenChange.bind(this);
        this.handleHasTakenChicosCodeChange = this.handleHasTakenChicosCodeChange.bind(this);
        this.handleRequiresScolarshipChange = this.handleRequiresScolarshipChange.bind(this);
        this.handleHowFoundOutChange = this.handleHowFoundOutChange.bind(this);

        this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    }

    render() {
        return (
            <div style={limiter}>
                <div style={loginContainer}>
                    <div style={loginWrapper}>

                        <Form>
                            <span style={loginTitle}> Forma </span>

                            <Row>
                                <Col>{this.renderInputSection("Nombre", "text", "Ingrese su(s) nombre(s)", this.handleNameChange)}</Col>
                                <Col>{this.renderInputSection("Apellidos", "text", "Ingrese sus apellidos", this.handleLastNamesChange)}</Col>
                            </Row>

                            {this.renderInputSection("Email", "email", "Su dirección de correo electrónico", this.handleEmailChange)}

                            {this.renderInputSection('Domicilio', 'text', 'Calle Principal 1234', this.handleAddressChange)}

                            <Row>
                                <Col>{this.renderInputSection('Ciudad', 'text', 'Ciudad del domicilio', this.handleCityChange)}</Col>
                                <Col>{this.renderInputSection('Estado', 'text', 'Estado del domicilio', this.handleStateChange)}</Col>
                            </Row>

                            <Row>
                                <Col>{this.renderInputSection('Código Postal', 'number', 'Ejemplo: 123456', this.handlePCchange)}</Col>
                                <Col>{this.renderInputSection('País', 'text', 'País del domicilio', this.handleCountryChange)}</Col>
                            </Row>

                            {/* {this.renderInputSection('Teléfono Celular', 'number', 'Ingrese su número de teléfono celular', this.handleMobileNumberChange)} */}

                            <div style={inputWrapper}>
                                <Form.Label>Teléfono Celular</Form.Label>
                                <Form.Control type="number"
                                    style={inputStyle}
                                    placeholder="Ingrese su número de teléfono celular"
                                    isInvalid={this.state.isMobileInvalid}
                                    onChange={this.handleMobileNumberChange} />
                            </div>

                            {this.renderDateSection('Fecha de nacimiento', this.handleBirthdayChange)}

                            {this.renderSelectSection('formGenderSelect', 'Sexo', this.handleSexChange, sexOptions)}

                            {this.renderInputSection('Nombre de la escuela', 'text', 'El nombre de su escuela', this.handleSchoolNameChange)}

                            {this.renderSelectSection('formSchoolTypeSelect', 'Tipo de la escuela', this.handleSchoolTypeChange, schoolTypesOptions)}

                            {this.renderInputSection('Grado escolar', 'text', 'El grado de escolaridad', this.handleSchoolGradeChange)}

                            {this.renderInputSection('Nombre del tutor', 'text', 'Nombre del padre, madre o tutor', this.handleTutorNameChange)}

                            {/* {this.renderInputSection('Teléfono del tutor', 'number', 'Número de teléfono del tutor', this.handleTutorPhoneChange)} */}

                            <div style={inputWrapper}>
                                <Form.Label>Teléfono del tutor</Form.Label>
                                <Form.Control type="number"
                                    style={inputStyle}
                                    placeholder="Número de teléfono del tutor"
                                    isInvalid={this.state.isTutorPhoneInvalid}
                                    onChange={this.handleTutorPhoneChange} />
                            </div>

                            {this.renderInputSection('Email del tutor', 'email', 'Ingrese el email del tutor', this.handleTutorMailChange)}

                            {this.renderSelectSection('formHasTakenClassSelect', '¿Has tomado alguna clase de programación, desarrollo de videojuegos/apps, o de robótica antes?', this.handleHasTakenClassChange, yesNoOptions)}

                            {this.renderInputSection('Si tu respuesta fue "Sí", especifica qué clases has tomado, por cuanto tiempo y qué lenguaje sabes utilizar.', 'text', '', this.handleTakenClassesChange)}

                            {this.renderInputSection('Empresa', 'text', 'Nombre de la empresa', this.handleCompanyChange)}

                            {this.renderSelectSection('formParticipationSelect', '¿Participaste en alguna edición anterior de ApportaTeen', this.handleParticipatedApportaTeenChange, yesNoOptions)}

                            {this.renderSelectSection('formHasTakenCourse', '¿En tu escuela has tomado cursos del programa Diseño Escalable de Juegos: Chic@s Code con AgentCubes?', this.handleHasTakenChicosCodeChange, yesNoOptions)}

                            {this.renderSelectSection('formScolarshipSelect', '¿Requieres beca?', this.handleRequiresScolarshipChange, yesNoOptions)}

                            {this.renderInputSection('¿Cómo te enteraste del evento?', 'text', 'Escribe aquí...', this.handleHowFoundOutChange)}


                            <div style={buttonWrapper}>
                                <div style={button100Wrapper}>
                                    <Button style={button100} onClick={this.handleSaveButtonClick}>
                                        Guardar
                                    </Button>
                                </div>
                            </div>
                        </Form>

                    </div>
                </div>
            </div>
        );
    }

    renderInputSection(label, type, placeHolder, onChange) {
        return (
            <div style={inputWrapper}>
                <Form.Label>{label}</Form.Label>
                <Form.Control type={type}
                    style={inputStyle}
                    placeholder={placeHolder}
                    onChange={onChange} />
            </div>
        )
    }

    renderPhoneSection(number, placeHolder, onChange) {
        return (
            <div style={inputWrapper}>
                <Form.Label>{number}</Form.Label>
                <Form.Control type="number"
                    style={inputStyle}
                    placeholder={placeHolder}
                    onChange={onChange} />
            </div>
        )
    }

    renderDateSection(label, onChange) {
        return (
            <div style={inputWrapper}>
                <Form.Label>{label}</Form.Label>
                <Form.Control type='date'
                    style={inputStyle}
                    onChange={onChange} />
            </div>
        )
    }

    renderSelectSection(id, label, onChange, options) {
        options = options.map(option => {
            return (<option value={option.value}>{option.name}</option>)
        })
        return (
            <div style={inputWrapper}>
                <Form.Group controlId={id}>
                    <Form.Label>{label}</Form.Label>
                    <Form.Control as="select" onChange={onChange}>
                        {options}
                    </Form.Control>
                </Form.Group>
            </div>
        )
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        })
        console.log(this.state)
    }

    handleLastNamesChange(event) {
        this.setState({
            lastNames: event.target.value
        })
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        })
    }

    handleAddressChange(event) {
        this.setState({
            address: event.target.value
        })
    }

    handleCityChange(event) {
        this.setState({
            city: event.target.value
        })
    }

    handleStateChange(event) {
        this.setState({
            state: event.target.value
        })
    }

    handlePCchange(event) {
        this.setState({
            pc: event.target.value
        })
    }

    handleCountryChange(event) {
        this.setState({
            country: event.target.value
        })
    }

    handleMobileNumberChange(event) {
        this.setState({
            mobileNumber: event.target.value
        })
    }

    handleBirthdayChange(event) {
        this.setState({
            birthday: event.target.value
        })
    }

    handleAgeChange(event) {
        this.setState({
            age: event.target.value
        })
    }

    handleSexChange(event) {
        this.setState({
            sex: event.target.value
        })
        console.log(event.target.value);
    }

    handleSchoolNameChange(event) {
        this.setState({
            schoolName: event.target.value
        })
    }

    handleSchoolTypeChange(event) {
        this.setState({
            schoolType: event.target.value
        })
    }

    handleSchoolGradeChange(event) {
        this.setState({
            schoolGrade: event.target.value
        })
    }

    handleTutorNameChange(event) {
        this.setState({
            tutorName: event.target.value
        })
    }

    handleTutorPhoneChange(event) {
        this.setState({
            tutorPhone: event.target.value
        })
    }

    handleTutorMailChange(event) {
        this.setState({
            tutorMail: event.target.value
        })
    }

    handleHasTakenClassChange(event) {
        if (event.target.value === 'yes')
            this.setState({ hasTakenClass: true })
        else
            this.setState({ hasTakenClass: false })
    }

    handleTakenClassesChange(event) {
        this.setState({
            takenClasses: event.target.value
        })
    }

    handleCompanyChange(event) {
        this.setState({
            company: event.target.value
        })
    }

    handleParticipatedApportaTeenChange(event) {
        this.setState({
            participatedApportaTeen: event.target.value
        })
    }

    handleHasTakenChicosCodeChange(event) {
        this.setState({
            hasTakenChicosCode: event.target.value
        })
    }

    handleRequiresScolarshipChange(event) {
        this.setState({
            requiresScolarship: event.target.value
        })
    }

    handleHowFoundOutChange(event) {
        this.setState({
            howFoundOut: event.target.value
        })
    }

    handleSaveButtonClick() {
        if (this.state.mobileNumber.toString().length !== 10) {
            this.setState({ isMobileInvalid: true });
        }
        else {
            this.setState({ isMobileInvalid: false });
        }
        if (this.state.tutorPhone.toString().length !== 10) {
            this.setState({ isTutorPhoneInvalid: true });
        }
        else {
            this.setState({ isTutorPhoneInvalid: false })
        }
    }
}

export default Forma;