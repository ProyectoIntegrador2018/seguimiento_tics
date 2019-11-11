import React from "react";
import {Link} from "react-router-dom";
import { sidenavFixed, sidenavItem } from "../../assets/jss/components/navStyle";

class Navigation extends React.Component {

    render() {
        return(
            <div style={sidenavFixed}>
                <ul>
                    {this.props.navitems.map(item => {
                        return(
                            <Link key={item.url} 
                                    to={item.url} 
                                    style={sidenavItem}>{item.name}</Link>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
export default Navigation;