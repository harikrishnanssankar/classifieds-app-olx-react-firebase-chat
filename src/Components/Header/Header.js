import React, { useContext, useState, useEffect } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useHistory, useLocation } from 'react-router';
import { AuthContext } from '../../store/Context';
import Menu from '../Menu/Menu';
import Login from '../Login/Login';




function Header() {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [loginPopOn, setLoginPopOn] = useState(false);
  const location = useLocation();
  const [searchInput, setSearchInput] = useState('');
  const [locationSearch, setLocationSearch] = useState('');


  useEffect(() => {
    if (location?.state?.from === 'create') {
      setLoginPopOn(true)
    }
  }, [location?.state?.from])


  const handleSellClick = () => {
    (user ? history.push('/create') : setLoginPopOn(true))
  }

  const handleLogin = () => {
    setLoginPopOn(!loginPopOn);
  }
  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/search/search?${searchInput} ${locationSearch}`)
  }


  return (
    <div className="header__main">
      <div onClick={() => history.push('/')} className="brandName">
        <OlxLogo />
      </div>
      <form className="placeSearch" onSubmit={handleSearch} action="">
        <button type="submit">
          <Search></Search>
        </button>
        <input value={locationSearch} placeholder="Search for places.." onChange={e => setLocationSearch(e.target.value)} type="text" />
      </form>
      <div className="product__SearchContainer">
        <form className="productSearch" onSubmit={handleSearch} action="">
          <input className="productSearch__input"
            value={searchInput}
            type="text"
            placeholder="Find car,mobile phone and more..."
            onChange={e => setSearchInput(e.target.value)}
          />
          <button type="submit" className="searchAction">
            <Search color="#ffffff"></Search>
          </button>
        </form>
      </div>
      <div className="language">
        <span> ENGLISH </span>
        <Arrow></Arrow>
      </div>
      {
        user &&
        <>
          <i className="bi bi-bell header__notification"></i>
          <i onClick={() => history.push('/chat/chatid')} className="bi bi-chat"></i>
        </>
      }
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
      <div className="header__sellBtn" >
        <SellButton ></SellButton>
        <div className="sellMenuContent" onClick={handleSellClick}>
          <SellButtonPlus></SellButtonPlus>
          <span>SELL</span>
        </div>
      </div>
    </div>
  );
}

export default Header;