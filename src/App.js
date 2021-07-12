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
import MyProfilePage from './Pages/MyProfilePage';
import EditPage from './Pages/EditPage';
import SellerProfile from './Pages/SellerProfile';
import EditPostPage from './Pages/EditPostPage';




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
          <Route path='/myprofile' component={MyProfilePage} />
          <Route path='/editprofile/:editInfo' component={EditPage} />
          <Route path='/profile/:profileId' component={SellerProfile} />
          <Route path='/editpost/:postId' component={EditPostPage} />
          <Route component={PageNotFound} path='*' />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
