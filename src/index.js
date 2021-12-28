import React from 'react';
import ReactDOM from 'react-dom';
import { FirebaseAppProvider, SuspenseWithPerf } from 'reactfire';
import firebaseConfig from './config/firebaseConfig';
import App from './App';
import './index.css';
import {
    Typography,
    Box
} from "@material-ui/core";

ReactDOM.render(
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <SuspenseWithPerf fallback={
            <Box  textAlign="center" pt={20}>
                <Typography variant="subtitle1">
                    Sniffing...<br />
                    Identifying hooman...<br />
                    Please wait..<br />
                </Typography>
            </Box>
        }>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </SuspenseWithPerf>
    </FirebaseAppProvider>,
    document.getElementById('root')
);
