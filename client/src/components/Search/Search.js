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
    this.setUpData();
  }

  setUpData = () => {
    this.state = {
      filterText: "",
      headers: [
        "ID",
        "Nombre",
        "Edad",
        "Cursos",
        "Escuela actual",
        "Grado actual",
        "Carrera iniciada",
        "Carrera TIC",
        "Correo"
      ],
      rows: [
        [
          1,
          "Pepe Madero",
          28,
          3,
          "Secundaria",
          "Segundo año",
          0,
          1,
          "pepe@madero.com"
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
          "pepe@madero.com"
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
          "pepe@madero.com"
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
          "pepe@madero.com"
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
          "pepe@madero.com"
        ]
      ]
    };

    var names = [];
    var curps = [];
    this.state.rows.forEach(function(row) {
      names.push(row[1]);
      curps.push(row[4]);
    });

    this.state.names = names;
    this.state.curps = curps;
  };

  handleUserInput(filterText) {
    this.setState({ filterText: filterText });
  }

  getItem = event => {
    var item = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value
    };

    return item;
  };

  handleTableUpdate(event) {
    var item = this.getItem(event);

    var newRows = this.state.rows.map(function(row) {
      for (var key in row) {
        if (key === item.name && row.id === item.id) {
          row[key] = item.value;
        }
      }

      return row;
    });

    this.setState({ rows: newRows });
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
            onTableUpdate={this.handleTableUpdate.bind(this)}
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
