import React from "react";
import {
  limiter,
  searchContainer
} from "../../assets/jss/components/searchStyle";
import DataTable from "./DataTable";
import SearchInput from "./SearchInput";

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
    return (
      <div style={limiter}>
        <div style={searchContainer}>
          <SearchInput
            filterText={this.state.filtertext}
            onUserInput={this.handleUserInput.bind(this)}
          />
          <DataTable
            headers={this.state.headers}
            rows={this.state.rows}
            names={this.state.names}
            curps={this.state.curps}
            filterText={this.state.filterText}
          />
        </div>
      </div>
    );
  }
}

export default Search;
