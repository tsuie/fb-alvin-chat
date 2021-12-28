import React from 'react';
import { useUser } from 'reactfire';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
}));

const Messagebox = (data) => {
    const currentUser = useUser();
    const {items, users} = data;
    const classes = useStyles();

    const findUser = (item) => {
        // item.uid
        return _.findLast(users, user => {
            return item.uid === user.uid;
        });
    }

    const plotLists = () => {
        // items.
     
        return (
            <List>
                {items.map((item, index) => {
                    const user = findUser(item);
                    const createdAt = moment(item.createdAt.toDate().toISOString()).format('MM/DD/YY hh:mm');

                    return (
                        <div key={uuidv4()}>
                        <ListItem alignItems="flex-start"  button  selected={(currentUser.uid === user.uid) ? true : false}>
                            <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={user.photoURL}/>
                            </ListItemAvatar>
                            <ListItemText
                            primary={item.message}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        {user.displayName}
                                    </Typography> - <small>{createdAt}</small>
                                </React.Fragment>
                            }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        </div>
                    );
                })}
            </List>
        )
    }
 
    return plotLists()
};

export default Messagebox;