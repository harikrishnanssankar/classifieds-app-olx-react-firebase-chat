import React, { useContext, useState, useRef, useEffect } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useHistory, useLocation, useParams } from 'react-router';
import { AuthContext } from '../../store/Context';
import Menu from '../Menu/Menu';
import Login from '../Login/Login';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import PlaceSearch from '../PlaceSearch/PlaceSearch';



function Header() {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [loginPopOn, setLoginPopOn] = useState(false);
  const location = useLocation();











  // const { params } = useParams();
  // useEffect(() => {
  //   if (params == 'login') {
  //     setLoginPopOn(true)
  //   }
  // }, [params])

  useEffect(() => {
    if (location?.state?.from == 'create') {
      setLoginPopOn(true)
    }
  }, [location?.state?.from])
  const handleSellClick = () => {
    (user ? history.push('/create') : setLoginPopOn(true))
  }

  const handleLogin = () => {
    setLoginPopOn(!loginPopOn);
  }
 
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div onClick={() => history.push('/')} className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        {/* <PlaceSearch/> */}
        <div className="productSearch">
          <input className="productSearch__input"
            type="text"
            placeholder="Find car,mobile phone and more..."
          />
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="userSection">
          {user ?
            <Menu user={user} />
            :
            <div className="userLogin__btn" onClick={handleLogin}>Login</div>
          }
        </div>
        <div className={loginPopOn ? "login__popup" : "login__popupdisabled"}>
          <Login loginPopOn={loginPopOn} setLoginPopOn={setLoginPopOn} />
        </div>
        <div onClick={handleSellClick}>
          <div className="sellMenu">
            <SellButton ></SellButton>
            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;