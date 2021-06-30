import React from 'react';
import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';
import './Home.css';
import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';
import Category from '../Components/Category/Category';
import { Route, useLocation } from 'react-router';
import LoginPage from './Login';
import Login from '../Components/Login/Login';

function Home() {
  return (
    <div className="homeParentDiv">
        <Header />
        <Category />
        <Banner />
        <Posts />
        <Footer />
    </div>
  );
}

export default Home;
