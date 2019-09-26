import React from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { AUTHENTICATED, ADMIN } from "../../constants/sessionstorage";
import {} from "../../assets/jss/components/searchStyle";

class Search extends React.Component {
  render() {
    if (
      !sessionStorage.getItem(AUTHENTICATED) ||
      !sessionStorage.getItem(ADMIN)
    ) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h1>Search</h1>
      </div>
    );
  }
}

export default Search;
