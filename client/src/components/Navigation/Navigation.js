import React from "react";
import {Link} from "react-router-dom";
import { sidenavFixed } from "../../assets/jss/components/navStyle";
import "../../assets/css/navbar.css";

class Navigation extends React.Component {

    render() {
        return(
            <div style={sidenavFixed}>
                <h1><span className="logo">Seguimiento <br/> TIC</span></h1>
                <ul>
                    {this.props.navitems.map(item => {
                        return(
                            <Link key={item.url} 
                                    to={item.url} 
                                    className="nav-item">{item.name}</Link>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
export default Navigation;