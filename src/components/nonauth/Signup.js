import React, { useState, useEffect } from 'react';
import './Signup.css';
import { useFirebaseApp, useFirestore } from 'reactfire';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
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

export default function Signup(prop) {
    // User State
    const [user, setUser] = useState({
        nickname: '',
        email: '',
        password: '',
        photoUrl: '',
        error: false,
    });
    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
            error: false,
        })
    };
    const { classes } = prop;
    // Import firebase
    const firebase = useFirebaseApp();
    const firestore = useFirestore();
    const userCollection = firestore.collection('users');


    const userRef = async () => {
        const u = await userCollection.where('uid', '==', 'KgCCCGMV5SRt3N6C3l0PQdJZaEZ2').get();
        console.log(u);
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    
    const runDogAPI =  () => {
        return axios.get('https://random.dog/woof.json');
    }
    
    const fetchDogImage = () => {
        userRef();
        console.log('Fetching..', user);
        // Validate URL if its image
        try {
            runDogAPI().then(dogData => {
                let isValid = validateDogImage(dogData.data.url);
                let image = dogData.data.url;
                console.log(image);
                if(!isValid) {
                    fetchDogImage()
                }
                else {
                    user.photoUrl = image;
                }
                console.log(user);
            });
        } catch (error) {
            console.log(error);
        }
    }

    const validateDogImage = (dogImage) => {
        let ret = false;
        if(dogImage) {
            const ext = dogImage.split(".");
            const allowedExt = ["png", "jpg", "jpeg", "PNG", "JPG", "JPEG", "GIF", "gif"];
            const found = allowedExt.find(element => (element === ext[2]));

            if(found) {
                ret = true;
            }
            else {
                ret = false;
            }
        }
        return ret;
    }
    useEffect(fetchDogImage, []);
    // Submit function (Create account)
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(
                function(userData) {
                    userData.user.updateProfile({
                        displayName: user.nickname,
                        photoURL: user.photoUrl
                    });
                    
                    const myURL = { url: window.location.origin };

                    userData.user.sendEmailVerification(myURL).then(
                        function(e) {
                            const uid = uuidv4();
                            setUser({
                                ...user,
                                verifyEmail: `Welcome ${user.nickname}. To continue please verify your email.`,
                            });
                            userCollection.doc(uid).set({
                                uid: userData.user.uid,
                                displayName: userData.user.displayName,
                                email: userData.user.email,
                                photoURL: userData.user.photoURL
                            })
                        }
                    )
                }
            );
        } catch(error) {
            console.log("Error : ", error);
            setUser({
                ...user,
                error: error.message,
            });
        }
        return <Redirect to="/verify" />
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
            <Typography variant="h3" color="inherit">SIGN UP</Typography>
            <form onSubmit={handleSubmit}>
                <Snackbar open={user.error} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        <b>WOOF!</b> {user.error}
                    </Alert>
                </Snackbar>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField 
                            onChange={handleChange} 
                            name="nickname" 
                            placeholder={'Nickname'} 
                            label="Nickname" 
                            variant="outlined"
                            size="small"
                            className={classes.fullWidthInput}
                            value={user.nickname}
                        />
                    </Grid>
                    <hr />
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
                        <Button type="submit" variant="contained" color="primary"><PetsIcon/> Sign Up</Button>
                    </Grid>
                    <hr/>
                    <Grid item xs={12}>
                        <Typography variant="overline" display="block">Already have an account?</Typography>
                    </Grid>
                    <hr/>
                    <Grid item xs={12}>
                        <Button href="/login" variant="contained"><VpnKeyIcon /> Login</Button>
                    </Grid>
                </Grid>
                
            </form>
            {/* {user.error && <h4>{user.error}</h4>} */}
        </>
    )
};
