import React from 'react';
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
import Create from './Pages/Create';
import ProductPage from './Pages/ProductPage';
import MyAdsPage from './Pages/MyAdsPage';
import SearchPage from './Pages/SearchPage';
import PageNotFound from './Pages/PageNotFound';
import ChatPage from './Pages/ChatPage';
import ProfilePage from './Pages/ProfilePage';
import EditPage from './Pages/EditPage';
import Maps from './Pages/Maps';




function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/'>
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
          <Route path='/myads' component={MyAdsPage} />
          <Route path='/myfavorites' component={MyAdsPage} />
          <Route path='/chat/:chatId' component={ChatPage} />
          <Route path='/myprofile' component={ProfilePage} />
          <Route path='/editprofile/:editInfo' component={EditPage} />
          <Route path='/maps' component={Maps} />
          <Route component={PageNotFound} path='*' />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
