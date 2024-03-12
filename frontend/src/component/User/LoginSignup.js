import React, { useState, useRef, useEffect } from 'react';
import './LoginSignup.css'
import { Face, LockOpen, MailOutline, MailOutlined } from '@material-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { login, ClearError, register } from '../../actions/userActions';
import Loader from '../layout/Loader/Loader';

const LoginSignup = () => {

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const [cTitle, setcTitle] = useState("login");
  //  console.log(location.search);
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState('/Profile.png');

  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const alert = useAlert();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })

  const { name, email, password } = user;


  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  }

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));

  }


  const registerDataChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser(prevUser => ({ ...prevUser, [e.target.name]: e.target.value }));
    }
  };


  const switchTabs = (e, tab) => {
    if (tab === 'login') {
      switcherTab.current.classList.add('shiftToNeutral');
      switcherTab.current.classList.remove('shiftToRight');
      registerTab.current.classList.remove('shiftToNeutralForm');
      loginTab.current.classList.remove('shiftToLeft');
      setcTitle('login');
    }
    if (tab === 'register') {
      switcherTab.current.classList.add('shiftToRight');
      switcherTab.current.classList.remove('shiftToNeutral');
      registerTab.current.classList.add('shiftToNeutralForm');
      loginTab.current.classList.add('shiftToLeft');
      setcTitle('register');
    }
  }
  // console.log(window.location.search);

  let redirect = window.location.search ? window.location.search.split("=")[1] : '/account';

  if (redirect === 'shipping') {
    redirect = '/shipping';
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, isAuthenticated, navigate, redirect])

  return (
    <>
      {
        loading ? <Loader /> :
          <>
            <MetaData title={cTitle} />
            <div className="LoginSignUpContainer">
              <div className="LoginSignUpBox">
                <div>
                  <div className="login-signUp-toggle">
                    <p onClick={(e) => switchTabs(e, "login")} >Login</p>
                    <p onClick={(e) => switchTabs(e, "register")} >Register</p>
                  </div>
                  <button ref={switcherTab}></button>
                </div>
                <form className="loginForm" ref={loginTab} onSubmit={loginSubmit} >
                  <div className="loginEmail">
                    <MailOutline />
                    <input type="email"
                      placeholder='Email'
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>

                  <div className="loginPassword">
                    <LockOpen />
                    <input type="password"
                      placeholder='Password'
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>
                  <Link to='/password/forget'>Forget password?</Link>
                  <input type="submit" value="Login" className='loginBtn' />
                </form>

                <form className="signUpForm"
                  ref={registerTab}
                  encType='multipart/form-data'
                  onSubmit={registerSubmit}
                >
                  <div className="signUpName">
                    <Face />
                    <input type="text"
                      required
                      value={name}
                      placeholder='Name'
                      name='name'
                      onChange={registerDataChange}
                    />
                  </div>

                  <div className="signUpEmail">
                    <MailOutlined />
                    <input type="email"
                      required
                      value={email}
                      placeholder='Email'
                      name='email'
                      onChange={registerDataChange}
                    />
                  </div>

                  <div className="signUpPassword">
                    <LockOpen />
                    <input type="password"
                      required
                      value={password}
                      placeholder='Password'
                      name='password'
                      onChange={registerDataChange}
                    />
                  </div>

                  <div id="registerImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input type="file"
                      name='avatar'
                      accept='image/*'
                      onChange={registerDataChange}
                    />
                  </div>
                  <input type="submit" value='Register' className='signUpBtn' />
                </form>
              </div>
            </div>
          </>
      }
    </>
  )
}

export default LoginSignup
