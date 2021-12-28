import React, { useState } from 'react';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth'
import './Signup.css';
import {
    Typography,
    TextField,
    Grid,
    Button,
    Snackbar
} from "@material-ui/core";
import PetsIcon from '@material-ui/icons/Pets';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MuiAlert from '@material-ui/lab/Alert';
import { Redirect } from 'react-router-dom';

//TODO convert this to a functional component to use firebase hooks
const Login = (prop) => {
    const firebase = useFirebaseApp();
    
    const [user, setUser] = useState({
        email: '',
        password: '',
        error: false
    });
    const { classes } = prop;
    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
            error: false,
        })
    };
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const handleSubmit = e => {
        e.preventDefault();
        
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(result => {
                if (!result.user.emailVerified) {
                    setUser({
                        ...user,
                        error: 'Please verify your email before to continue',
                    })
                    // firebase.auth().signOut();
                }
                return <Redirect to="/" />
            })
            .catch(error => {
                // Update the error
                setUser({
                    ...user,
                    error: error.message,
                })
            })
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setUser({
            ...user,
            error: false,
        })
      };

    return (
        <>
            <Typography variant="h3" color="inherit">LOG IN</Typography>
            <form
                onSubmit={handleSubmit}
            >
                {/* {user.error && <h4>{user.error}</h4>} */}
                <Snackbar open={ user.error } autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        <b>WOOF!</b> {user.error}
                    </Alert>
                </Snackbar>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField 
                            onChange={handleChange} 
                            name="email" 
                            placeholder={'Email'} 
                            label="Email" 
                            variant="outlined"
                            size="small"
                            className={classes.fullWidthInput}
                            value={user.email}
                        />
                    </Grid>
                    <hr />
                    <Grid item xs={12}>
                        <TextField 
                            onChange={handleChange} 
                            name="password" 
                            placeholder={'Password'} 
                            label="Password" 
                            variant="outlined"
                            size="small"
                            className={classes.fullWidthInput}
                            value={user.password}
                            type="password"
                        />
                    </Grid>
                    <hr />
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary"><VpnKeyIcon/> Login</Button>
                    </Grid>
                    <hr />
                    <Grid item xs={12}>
                        <Typography variant="overline" display="block">Don't have an account?</Typography>
                    </Grid>
                    <hr />
                    <Grid item xs={12}>
                        <Button href="/signup" variant="contained"><PetsIcon /> Sign up</Button>
                    </Grid>
                </Grid>
            </form>
            
        </>
    )
};

export default Login;
