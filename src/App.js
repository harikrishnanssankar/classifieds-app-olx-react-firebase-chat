import React, { useContext, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import { AuthContext, FirebaseContext } from './store/Context';
import { auth } from './firebase';
import Create from './Pages/Create';
import ProductPage from './Pages/ProductPage';
import MyAdsPage from './Pages/MyAdsPage';
// import { GoogleMap, useLoadScript, Marker, infoWindow, } from "@react-google-maps/api";





function App() {
  const { user, setUser } = useContext(AuthContext);
  // const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
    });
    console.log(user);
  });

  // const libraries = ["places"];
  // const {isLoaded, loadError} = useLoadScript({
  //   googleMapsApiKey : "AIzaSyBWpamfc6vFmcSEzC_LiUcki-FBRZv-8XI",
  //   libraries,
  // });
  // if (loadError) return "Error loading maps";
  // if (!isLoaded) return "loading maps"


  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/create">
            <Create user={user} />
          </Route>
          <Route path="/item/:productId">
            <ProductPage />
          </Route>
          <MyAdsPage />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
