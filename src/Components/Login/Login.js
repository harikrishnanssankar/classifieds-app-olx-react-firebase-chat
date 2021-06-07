import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import db, { auth } from '../../firebase';
import Logo from '../../olx-logo.png';
import './Login.css';

function Login({ setLoginPopOn, loginPopOn }) {
  const [err, setErr] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const phoneRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const history = useHistory();


 


  const handleClick = (e) => {
    e.preventDefault()
    if (!isSignUp) {
      auth.signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      ).then(() => setLoginPopOn(false)
      ).catch((error) => {
        setErr(error.message)
      })
    } else {
      auth.createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      ).then((result) => {
        result.user.updateProfile({ displayName: usernameRef.current.value }).then(() => {
          db.collection('users').add({
            id: result.user.uid,
            username: usernameRef.current.value,
            phone: phoneRef.current.value
          }).then(() => {
            setLoginPopOn(false)
            setIsSignUp(false)
          })
        })
      }).catch((error) => {
        setErr(error.message)
        console.log(error);
      })
    }
  }
  const navigateBack = () => {
    if (isSignUp) {
      setIsSignUp(false)
    } else {
      setLoginPopOn(false)
    }
  }

  const loginClose = () => {
    setLoginPopOn(false)
    setIsSignUp(false)
  }


  let popUpRef = useRef();

  useEffect(() => {
    
      let handler = (event) => {
        if (!popUpRef.current.contains(event.target)) {
          setLoginPopOn(false)
          setIsSignUp(false)
        }
      }
      document.addEventListener("mousedown", handler);
      return () => {
        document.removeEventListener("mousedown", handler)
      }
  

  })







  return (
    <div className="login">
      <div ref={popUpRef} className="login__contents">
        <div className="login__icons">
          <div onClick={navigateBack} className="back__icon">
            <i class="bi bi-arrow-left"></i>
          </div>
          <div onClick={loginClose} className="close__icon">
            <i class="bi bi-x-lg"></i>
          </div>
        </div>
        <img onClick={() => history.push('/')} className="login__logo" src={Logo} />
        <h3>{!isSignUp ?
          "Login"
          :
          "SignUp"
        }
        </h3>
        <p className="login__error" >{err && "!" + " " + err}</p>
        <form className="login__form">
          <input
            className="input"
            type="email"
            ref={emailRef}
            placeholder="Enter email"
          />
          <input
            className="input"
            type="password"
            ref={passwordRef}
            placeholder="Password"
          />
          {
            isSignUp
            &&
            <input
              className="input"
              type="text"
              name="name"
              // value={username}
              ref={usernameRef}
              placeholder="Enter name"
            // onChange={e => setUsername(e.target.value)}
            />
          }
          {isSignUp &&
            <input
              className="input"
              type="number"
              name="phone"
              // value={phone}
              ref={phoneRef}
              placeholder="Enter mobile no."
            //onChange={e => setPhone(e.target.value)}
            />
          }

          <button onClick={handleClick} className="login__button">
            {
              !isSignUp ?
                "Login"
                :
                "SignUp"
            }
          </button>
        </form>
        <p className="signup__button" onClick={() => setIsSignUp(!isSignUp)}>
          {
            !isSignUp ?
              "New to OLX? Signup"
              :
              "Already a user? Login"
          }
        </p>
      </div>
    </div>
  );
}

export default Login;
