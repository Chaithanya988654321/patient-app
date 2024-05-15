import React,{useEffect} from 'react'
import logo from "../images/logo.svg"
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch} from 'react-redux';
import { setUserData } from '../store/slices/UserSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({setProgress}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //google login functionality
 
  const onLoginSuccess=(res)=>{
    const user=jwtDecode(res.credential)
    localStorage.setItem('user', JSON.stringify(user));
    dispatch(setUserData(user))
    setTimeout(() => {
      toast.success('Login Successfully', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
      navigate('/')
    }, 1000);
    
  }
  //error login functionality
  const onLoginError=(err)=>{
    setTimeout(() => {
      toast.success(`{err}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
      navigate('/login')
    }, 1000);

  }
  useEffect((() =>{
    setProgress(40);
    setTimeout(()=>{
      setProgress(100)
    },200)
    
  }),[setProgress,dispatch])
  


  return (
    <>
    <ToastContainer
                position="top-center"
                autoClose={3000}
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                closeButton={false}
                theme="light"
                style={{ width: "100%", fontSize: "15px",display:"flex",justifyContent:"center",top:"1em" }}
            />
      <div className='loginContainer'>
      
        <div className='loginBox'>
          <img src={logo} alt='logo'/>
          <h1>Sign In To Your Account</h1>
          <p>Don't have an Account? <span><Link to='/signup'>Sign Up</Link></span></p>
          <GoogleLogin
            onSuccess={onLoginSuccess}
            onError={onLoginError}
          />
          <p>Continue without sign in? <span><Link to='signup?'>Explore</Link></span></p>
          </div>
  
      </div>
    </>
  )
}

export default Login