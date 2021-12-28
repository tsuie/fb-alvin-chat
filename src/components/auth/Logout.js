import React from 'react';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth'
import { IconButton } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Redirect } from 'react-router-dom';

const Logout = () => {
    // Import firebase
    const firebase = useFirebaseApp();

    // Log out function
    const handleClick = () => {
        firebase.auth().signOut();
        return <Redirect to='/' />
    }

    return (
        <IconButton aria-label="logout" color="primary" onClick={handleClick}>
            <ExitToAppIcon />
        </IconButton>
    )
};

export default Logout;
