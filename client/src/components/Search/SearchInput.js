import React from "react";
import TextInput from "../Basic Components/TextInput";

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
        <TextInput
          name="search-bar"
          value={this.props.filterText}
          changeHandler={this.handleChange}
          placeholder="Search..."
        />
      </div>
    );
  }
}

export default SearchInput;
