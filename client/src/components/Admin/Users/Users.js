import React from "react";
import { tableContainer, tableWrapper, table, header, cellHeader, cell } from "../../../assets/jss/components/usersStyle";

class Users extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div style={tableContainer}>
                <div style={tableWrapper}>
                    <div style={table}>
                        <div style={header}>
                            <div style={cellHeader}>
                                Correo electrónico
                            </div>
                        </div>
                        <div style={cell}>
                            k.rbandala@gmail.com
                        </div>
                        <div style={cell}>
                            k.rbandala@gmail.com
                        </div>
                        <div style={cell}>
                            k.rbandala@gmail.com
                        </div>
                        <div style={cell}>
                            k.rbandala@gmail.com
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
export default Users;
