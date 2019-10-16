import React from "react";
import Input from "./Input";

class TextInput extends React.Component {
  render() {
    return (
      <Input
        type="text"
        name={this.props.name}
        value={this.props.value}
        changeHandler={this.props.changeHandler}
      />
    );
  }
}

export default TextInput;
