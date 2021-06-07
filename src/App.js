import React, { useContext, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import { AuthContext, FirebaseContext } from './store/Context';
import { auth } from './firebase';

function App() {
  const {user, setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
    });
    console.log(user);
  })
  return (
    <div>
      <Router>
          <Route exact path="/">
            <Home />
          </Route>
      </Router>
    </div>
  );
}

export default App;
