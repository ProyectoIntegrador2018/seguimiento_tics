import React from "react";

class Input extends React.Component {
  render() {
    return (
      <div className="Input">
        <label htmlFor={this.props.name}>{this.props.name}</label>
        <input
          id={this.props.name}
          type={this.props.type}
          value={this.props.value}
          onChange={this.props.changeHandler}
        ></input>
      </div>
    );
  }
}

export default Input;
