import React from 'react';
import { Redirect } from 'react-router-dom';
import { AUTHENTICATED, ADMIN } from '../../../constants/sessionstorage';

class AdminDashboard extends React.Component {

    render() {

        if(!sessionStorage.getItem(AUTHENTICATED) || 
            !sessionStorage.getItem(ADMIN)) {
                return <Redirect to='/'/>
        }

        return(
            <div>
                <h1>Admin Dashboard</h1>                
            </div>
        );
    }

}

export default AdminDashboard;