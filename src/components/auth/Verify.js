import React from 'react';
import { useUser } from 'reactfire';
import Logout from '../auth/Logout';

const Verify = () => {
    const user = useUser();

    return (
       <>
        Please Verify your Account, we sent an email to {user.email}
        <Logout />
       </>
    )
};

export default Verify;