import React from "react";
import {
  limiter,
  searchContainer
} from "../../assets/jss/components/searchStyle";
import DataTable from "./DataTable";
import SearchInput from "./SearchInput";
import { Row, Col } from "antd";
import { API_URL } from "../../constants/apiurl";
import axios from "axios";
import { TOKEN } from "../../constants/sessionstorage";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      headers: this.getHeaders(),
      rows: this.getRows()
    };

    var names = [];
    var curps = [];
    this.state.rows.forEach(function(row) {
      names.push(row[1]);
      curps.push(row[4]);
    });

    this.state.names = names;
    this.state.curps = curps;
  }

  getHeaders() {
    return [
      "ID",
      "Nombre",
      "Edad",
      "Cursos",
      "Escuela actual",
      "Grado actual",
      "Carrera iniciada",
      "Carrera TIC",
      "Correo",
      "Seleccionado"
    ];
  }

  getRows() {
    return [
      [
        1,
        "Pepe Madero",
        28,
        3,
        "Secundaria",
        "Segundo año",
        0,
        1,
        "pepe@madero.com",
        "checkbox"
      ],
      [
        1,
        "Pepe Madero",
        28,
        3,
        "Secundaria",
        "Segundo año",
        0,
        1,
        "pepe@madero.com",
        "checkbox"
      ],
      [
        1,
        "Pepe Madero",
        28,
        3,
        "Secundaria",
        "Segundo año",
        0,
        1,
        "pepe@madero.com",
        "checkbox"
      ],
      [
        1,
        "Pepe Madero",
        28,
        3,
        "Secundaria",
        "Segundo año",
        0,
        1,
        "pepe@madero.com",
        "checkbox"
      ],
      [
        1,
        "Oscar Juarez",
        28,
        3,
        "Secundaria",
        "Segundo año",
        0,
        1,
        "pepe@madero.com",
        "checkbox"
      ]
    ];
  }

  handleUserInput(filterText) {
    this.setState({ filterText: filterText });
  }

  render() {
    var url = API_URL + "/user/students-data";
    var token = sessionStorage.getItem(TOKEN);

    axios
      .get(url)
      .then(response => {
        /*var data = response.data;
        if (data.error) {
          this.setState({ isInvalid: true });
        } else {
          this.setState({
            isInvalid: false,
            user: data
          });
          this.props.rerender();
        }*/
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

    return (
      <div style={limiter}>
        <div style={searchContainer}>
          <Row>
            <Col xs={{ span: 5 }}>
              <SearchInput
                filterText={this.state.filtertext}
                onUserInput={this.handleUserInput.bind(this)}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 1 }}>
              <DataTable
                headers={this.state.headers}
                rows={this.state.rows}
                names={this.state.names}
                curps={this.state.curps}
                filterText={this.state.filterText}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Search;
