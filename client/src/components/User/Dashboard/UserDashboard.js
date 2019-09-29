import React from 'react';
import { Redirect } from 'react-router-dom';
import { AUTHENTICATED, ADMIN } from '../../../constants/sessionstorage';

class UserDashboard extends React.Component {

    render() {
        return(
            <div>
                <h1>User Dashboard</h1>                
            </div>
        );
    }

}

export default UserDashboard;