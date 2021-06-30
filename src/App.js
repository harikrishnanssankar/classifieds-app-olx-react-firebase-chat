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
import { AuthContext } from './store/Context';
import { auth } from './firebase';
import Create from './Pages/Create';
import ProductPage from './Pages/ProductPage';
import MyAdsPage from './Pages/MyAdsPage';
import Login from './Components/Login/Login';
import SearchPage from './Pages/SearchPage';
import PageNotFound from './Pages/PageNotFound';
import MyAds from './Components/MyAds/MyAds';
import MyFavorites from './Components/MyFavorites/MyFavorites';
import ChatPage from './Pages/ChatPage';





function App() {
  // const { user, setUser } = useContext(AuthContext);
  // useEffect(() => {
  //   const authUser = JSON.parse(localStorage.getItem('user'))
  //   setUser(authUser)
  // },[])
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     user? localStorage.setItem('user', JSON.stringify(user))
  //     : localStorage.removeItem('user')
  //   });

  // });

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' exact>
            <Home />
          </Route>
          <Route exact path="/create">
            <Create />
          </Route>
          <Route path="/item/:productId">
            <ProductPage />
          </Route>
          <Route path="/search/:searchId">
            <SearchPage />
          </Route>
          <Route path='/myads' component={MyAdsPage}/>
          <Route path='/myfavorites' component={MyAdsPage}/>
          <Route path='/chat/:chatId' component={ChatPage}/>
          <Route component={PageNotFound} path='*' />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
