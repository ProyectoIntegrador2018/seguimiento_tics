import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="wrapper">
      <div classname="form-wrapper">
        <br></br>
        <h1 style={{marginLeft : "500px"}}>Formulario de Registro</h1>
        <br></br><br></br>
  <div style={{marginLeft : "350px"}}>
  <Form>
  <Form.Group as={Row} controlId="formHorizontalName">
    <Form.Label column sm={2}>
      Nombre(s)
    </Form.Label>
    <Col sm={5}>
      <Form.Control type="text" placeholder="Nombre" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="formHorizontalLName">
    <Form.Label column sm={2}>
      Apellido(s)
    </Form.Label>
    <Col sm={5}>
      <Form.Control type="text" placeholder="Apellidos" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="formHorizontalEmail">
    <Form.Label column sm={2}>
      Email
    </Form.Label>
    <Col sm={5}>
      <Form.Control type="email" placeholder="Email" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="formHorizontalBday">
    <Form.Label column sm={2}>
      Fecha de nacimiento
    </Form.Label>
    <Col sm={5}>
      <Form.Control type="text" placeholder="dd/mm/aaaa" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="formHorizontalAge">
    <Form.Label column sm={2}>
      Edad
    </Form.Label>
    <Col sm={2}>
      <Form.Control type="text" placeholder="Edad" />
    </Col>
  </Form.Group>

  <fieldset>
    <Form.Group as={Row}>
      <Form.Label as="legend" column sm={2}>
        Sexo
      </Form.Label>
      <Col sm={10}>
        <Form.Check
          type="radio"
          label="Masculino"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
        />
        <Form.Check
          type="radio"
          label="Femenino"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
        />
      </Col>
    </Form.Group>
  </fieldset>

  <Form.Group as={Row} controlId="formHorizontalSchool">
    <Form.Label column sm={2}>
      Nombre de escuela
    </Form.Label>
    <Col sm={5}>
      <Form.Control type="text" placeholder="Escuela" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="formHorizontalGrade">
    <Form.Label column sm={2}>
      Grado escolar
    </Form.Label>
    <Col sm={5}>
      <Form.Control type="text" placeholder="Grado escolar" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="formHorizontalTelephone">
    <Form.Label column sm={2}>
      Teléfono
    </Form.Label>
    <Col sm={5}>
      <Form.Control type="text" placeholder="10 dígitos" />
    </Col>
  </Form.Group>

  <fieldset>
    <Form.Group as={Row}>
      <Form.Label as="legend" column sm={2}>
      Has tomado alguna clase de programación, desarrollo de videojuegos?
      </Form.Label>
      <Col sm={10}>
        <Form.Check
          type="radio"
          label="Si"
          name="formHorizontalRadios"
          id="formHorizontalRadioSi"
        />
        <Form.Check
          type="radio"
          label="No"
          name="formHorizontalRadios"
          id="formHorizontalRadioNo"
        />
      </Col>
    </Form.Group>
  </fieldset>

  <fieldset>
    <Form.Group as={Row}>
      <Form.Label as="legend" column sm={2}>
      Tienes computadora en tu casa que puedas usar?
      </Form.Label>
      <Col sm={10}>
        <Form.Check
          type="radio"
          label="Si"
          name="formHorizontalRadios"
          id="formHorizontalRadioSi1"
        />
        <Form.Check
          type="radio"
          label="No"
          name="formHorizontalRadios"
          id="formHorizontalRadioNo1"
        />
      </Col>
    </Form.Group>
  </fieldset>

  <fieldset>
    <Form.Group as={Row}>
      <Form.Label as="legend" column sm={2}>
      Al inscribirte al curso, cuentas ya con un equipo de compañeros?
      </Form.Label>
      <Col sm={10}>
        <Form.Check
          type="radio"
          label="Si"
          name="formHorizontalRadios"
          id="formHorizontalRadioSi2"
        />
        <Form.Check
          type="radio"
          label="No"
          name="formHorizontalRadios"
          id="formHorizontalRadioNo2"
        />
      </Col>
    </Form.Group>
  </fieldset>

  <Form.Group as={Row} controlId="formHorizontalTeam">
    <Form.Label column sm={2}>
      Nombre del equipo
    </Form.Label>
    <Col sm={5}>
      <Form.Control type="text" placeholder="Nombre del equipo" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="formHorizontalGroup">
    <Form.Label column sm={2}>
      Grupo
    </Form.Label>
    <Col sm={5}>
      <Form.Control type="text" placeholder="Grupo" />
    </Col>
  </Form.Group>

  <Form.Group as={Row}>
    <Col sm={{span: 10, offset: 2}}>
      <Button type="submit">Sign in</Button>
    </Col>
  </Form.Group>
</Form>
</div>

      </div>    
    </div>
  );
}

export default App;
