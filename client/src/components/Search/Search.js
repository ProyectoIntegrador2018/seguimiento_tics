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

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      headers: [],
      rows: []
    };
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
    this.setState({ ...this, filterText: filterText });
  }

  render() {
    var url = API_URL + "/user/students-data";

    axios
      .get(url)
      .then(response => {
        var data = response.data;
        var names = [];
        var curps = [];
        var headers = [];
        var rows = [];
        data.forEach(function(row) {
          for (var prop in row) {
            if (prop != "_id") {
              headers.push(prop);
              console.log(prop);
            }
          }
          names.push(row[1]);
          curps.push(row[4]);
        });

        this.setState({ ...this, headers: headers });

        this.state.names = names;
        this.state.curps = curps;
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
