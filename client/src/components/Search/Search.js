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
import { title } from "../../assets/jss/sharedStyling";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      headers: [],
      rows: []
    };
    this.loadData = this.loadData.bind(this);
    this.loadData();
  }

  handleUserInput(filterText) {
    this.setState({ ...this, filterText: filterText });
  }

  loadData = () => {
    var url = API_URL + "/user/students-data";

    axios
      .get(url)
      .then(response => {
        var data = response.data;
        var names = [];
        var curps = [];
        var headers = [];
        var rows = [];
        if (data.length > 0) {
          var row = data[0];
          for (var prop in row) {
            if (prop != "_id") {
              headers.push(prop);
            }
          }
        }

        headers.push("Seleccionar");

        data.forEach(function(row) {
          var nxtRow = [];
          for (var prop in row) {
            if (prop != "_id" && prop != "answers" && prop != "event" && prop != "__v") {
              nxtRow.push(row[prop]);
              if (prop == "curp") {
                curps.push(row[prop]);
              } else if (prop == "name") {
                names.push(row[prop]);
              }
            }
          }
          nxtRow.push("Seleccionar");
          rows.push(nxtRow);
        });

        this.setState({
          ...this,
          headers: ['Nombre(s)','Apellido paterno', 'Apellido materno', 'Fecha de nacimiento', 'Lugar de nacimiento', 'Sexo', 'Email', 'CURP', 'Seleccionar'],
          rows: rows,
          names: names,
          curps: curps
        });

        this.state.names = names;
        this.state.curps = curps;
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div style={limiter}>
        <span style={title}> Busqueda y análisis</span>
        <div>
          <Row>
            <Col span={24}>
              <div style={searchContainer}>
                <SearchInput
                  filterText={this.state.filtertext}
                  onUserInput={this.handleUserInput.bind(this)}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 1 }}>
              <div style={searchContainer}>
                <DataTable
                  headers={this.state.headers}
                  rows={this.state.rows}
                  names={this.state.names}
                  curps={this.state.curps}
                  filterText={this.state.filterText}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Search;
