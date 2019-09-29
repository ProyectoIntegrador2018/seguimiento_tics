import React from 'react';
import { Redirect } from 'react-router-dom';
import { AUTHENTICATED, ADMIN } from '../../../constants/sessionstorage';

class UserDashboard extends React.Component {

    render() {
        return(
            <div>
                <table>
                    <tr>
                        <th>User Dashboard</th>
                    </tr>
                    <tr>
                        <td>Records</td>
                    </tr>
                </table>
                          
            </div>
        );
    }

}

export default UserDashboard;