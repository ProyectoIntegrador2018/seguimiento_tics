import React from "react";
import TextInput from "../Basic Components/TextInput";
import { Form } from "react-bootstrap";

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onUserInput(event.target.value);
    console.log(event.target.value);
  }

  render() {
    return (
      <div>
        <Form.Label>Buscar por nombre o CURP</Form.Label>
        <Form.Control value={this.props.filterText}
                      onChange={this.handleChange}/>
      </div>
    );
  }
}

export default SearchInput;
