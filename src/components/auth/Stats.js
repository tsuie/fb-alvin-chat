import React from 'react';
import { useUser, useFirestoreCollectionData, useFirestore } from 'reactfire';
import 'firebase/auth'
import {
    Grid,
    Card,
    CardContent,
    CardHeader,
    Typography,
    Avatar,
    Button
} from "@material-ui/core";
import _ from 'lodash';
import PetsIcon from '@material-ui/icons/Pets';
import Logout from './Logout';
import EqualizerIcon from '@material-ui/icons/Equalizer';

const Stats = (props) => {
    // Import firebase
    const firestore = useFirestore();
    
    const messagesCollection = firestore.collection('messages');
    const usersCollection = firestore.collection('users');

    const messages = _.sortBy(useFirestoreCollectionData(messagesCollection), 'createdAt');
    const users = useFirestoreCollectionData(usersCollection);
    // const { classes } = props;
    const user = useUser();

    return (
        <div>
            <Card >
                <CardHeader
                    avatar={
                        <Avatar alt={user.displayName} src={user.photoURL} />
                    }
                    action={
                        <Logout />
                      }
                    title={'Welcome ' + user.displayName}
                    subheader={user.email}
                ></CardHeader>
                
            </Card>
            <br />
            <Typography variant="h4"><EqualizerIcon/> WOOF STATS</Typography>
            <br />
            <Grid container spacing={3}>
                <Grid item xs={6} >
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1">Total Woofers (Users)</Typography>
                            <Typography variant="h1">{users.length}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} >
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1">Total Woof Sent (Messages)</Typography>
                            <Typography variant="h1">{messages.length}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" href="/"><PetsIcon /> Back to Woofing!</Button>
                </Grid>
            </Grid>
        </div>
        
    )
};

export default Stats;
