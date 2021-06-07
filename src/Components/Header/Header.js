import React, { useContext, useState, useRef, useEffect } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useHistory } from 'react-router';
import { AuthContext } from '../../store/Context';
import Menu from '../Menu/Menu';
import Login from '../Login/Login';


function Header() {

  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [popOn, setPopOn] = useState(false);
  let menuRef = useRef();
  const [loginPopOn, setLoginPopOn] = useState(false);

  useEffect(() => {
    if (user) {
      let handler = (event) => {
        if (!menuRef.current.contains(event.target)) {
          setPopOn(false)
        }
      }
      document.addEventListener("mousedown", handler);
      return () => {
        document.removeEventListener("mousedown", handler)
      }
    }

  })


  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div onClick={history.push('/')} className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
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
            <Menu user={user} menuRef={menuRef} popOn={popOn} setPopOn={setPopOn} />
            :
            <div className="userLogin__btn" onClick={() => setLoginPopOn(!loginPopOn)}>Login</div>
          }
        </div>
        <div className={loginPopOn ? "login__popup" : "login__popupdisabled"}>
          <Login loginPopOn={loginPopOn} setLoginPopOn={setLoginPopOn} />
        </div>
        <div className="sellMenu">
          <SellButton ></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;