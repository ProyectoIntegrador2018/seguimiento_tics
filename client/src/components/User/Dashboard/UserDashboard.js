import React from "react";
import { secondHeader, mainBullets, diffColor, mainHeader } from "../../../assets/jss/components/dashboardStyle";

class UserDashboard extends React.Component {
  render() {
    return (
      <div>
        <span style={mainHeader}>¡Bienvenido!</span>
        <span style={secondHeader}>Esta aplicación le permite realizar diferentes opciones:</span>
        <ul style={mainBullets}>
          <li style={diffColor}>Registrar estudiantes por CSVs o con una form</li>
          <li>Buscar a estudiantes</li>
          <li style={diffColor}>Análizar datos con gráficas</li>
        </ul>
      </div>
    );
  }
}

export default UserDashboard;
