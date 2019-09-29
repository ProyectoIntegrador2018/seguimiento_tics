import React from "react";
import { Redirect } from "react-router-dom";
import { AUTHENTICATED, ADMIN } from "../../constants/sessionstorage";
import {
  limiter,
  searchContainer
} from "../../assets/jss/components/searchStyle";
import DataTable from "./DataTable";

class Search extends React.Component {
  render() {
    if (
      !sessionStorage.getItem(AUTHENTICATED) ||
      !sessionStorage.getItem(ADMIN)
    ) {
      return <Redirect to="/" />;
    }

    const headings = [
      "ID",
      "Nombre",
      "Edad",
      "Cursos",
      "Escuela actual",
      "Grado actual",
      "Carrera iniciada",
      "Carrera TIC",
      "Correo"
    ];

    const rows = [
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
      ]
    ];

    return (
      <div style={limiter}>
        <div style={searchContainer}>
          <DataTable headings={headings} rows={rows} />
        </div>
      </div>
    );
  }
}

export default Search;
