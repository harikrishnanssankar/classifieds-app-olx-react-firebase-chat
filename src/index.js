import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context, { FirebaseContext } from './store/Context';
import { Firebase } from './firebase'

ReactDOM.render(
    <FirebaseContext.Provider value={{ Firebase }}>
        <Context>
            <App />
        </Context>
    </FirebaseContext.Provider>
    , document.getElementById('root')
);
