import {
    AppBar,
    Toolbar,
    IconButton,
    Typography
} from "@material-ui/core";
import React from "react";
import PetsIcon from '@material-ui/icons/Pets';

export default function Chat() {
    return(
    <>
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <PetsIcon />
                </IconButton>
                <Typography variant="h6" color="inherit">
                WOOF STATION
                </Typography>
            </Toolbar>
        </AppBar>
        <br />
    </>
    )
}