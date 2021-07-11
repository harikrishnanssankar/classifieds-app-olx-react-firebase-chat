import { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import Arrow from '../../assets/Arrow';
import db, { auth } from '../../firebase';
import { AuthContext } from '../../store/Context';
import "./Menu.css";

const Menu = () => {
  const { user } = useContext(AuthContext)
  const [popOn, setPopOn] = useState(false);
  const [userDetails, setUserDetails] = useState([])
  let menuRef = useRef();
  const history = useHistory();
  useEffect(() => {
    db.collection('users').doc(`${user.uid}`).get().then(res => {
      setUserDetails(res.data())
    })
    return () => {
      
    }
  }, [])
  useEffect(() => {
    if (user) {
      let handler = (event) => (!menuRef.current.contains(event.target)) && setPopOn(false)
      document.addEventListener("mousedown", handler);
      return () => {
        document.removeEventListener("mousedown", handler)
      }
    }
  })
  return (
    <div className="menu">
      <div className="user__present">
        <div className="menu__quickbtns">
          <i onClick={() => history.push('/chat/chatid')} className="bi bi-chat"></i>
          <i className="bi bi-bell"></i>
        </div>
        <div ref={menuRef} className="popover__container">
          <div onClick={() => setPopOn(!popOn)} className="pop__btn">
            <img className="profile__pic" src={userDetails.photourl} alt="img" />
            <div className={popOn ? 'menu__arrow' : "menu__arrowDown"}>
              <Arrow></Arrow>
            </div>
          </div>
          <div className={popOn ? "pop__active" : "pop__disabled"}>
            <div className="arrow-up"></div>
            <div className="pop__contents">
              <div className="menu__profile">
                <img src={userDetails.photourl} alt="img" />
                <div onClick={() => history.push('/editProfile/info')} className="menu__profileDiv">
                  <h6>Hello,</h6>
                  <h4>{userDetails.username}</h4>
                  <h6>View and edit profile</h6>
                </div>
              </div>
              <div className="header__profileCompletion">
                <h5>2 steps left</h5>
                <div className="profileCompletion__divs">
                  <div className="profilecompleted__div"></div>
                  <div className="profilecompleted__div"></div>
                  <div className="profilecompleted__div"></div>
                  <div className="profilecompleted__div"></div>
                  <div className="profileuncompleted__div"></div>
                  <div className="profileuncompleted__div"></div>
                </div>
                <p>OLX is built on trust. Help other people get to know you. Tell them about the things you like. </p>
              </div>
              <div onClick={() => history.push('/myads')} className="menu__section">
                <i className="bi bi-files"></i>
                <h5>My Ads</h5>
              </div>
              <div className="menu__section">
                <i className="bi bi-briefcase"></i>
                <h5>Buy Business Package</h5>
              </div>
              <div className="menu__section horizontal__line">
                <i className="bi bi-credit-card"></i>
                <h5>Brought Package & Billing</h5>
              </div>
              <div className="menu__section">
                <i className="bi bi-question-circle"></i>
                <h5>Help</h5>
              </div>
              <div className="menu__section horizontal__line">
                <i className="bi bi-sliders"></i>
                <h5>Settings</h5>
              </div>
              <div className="menu__section horizontal__line">
                <i className="bi bi-download"></i>
                <h5>Install OLX Lite app</h5>
              </div>
              <div onClick={() => auth.signOut()} className="menu__section">
                <i className="bi bi-box-arrow-left"></i>
                <h5 >Logout</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;