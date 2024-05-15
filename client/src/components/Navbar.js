import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setUserData, setDarkMode } from '../store/slices/UserSlice';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";






const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [hideInfo, setHideInfo] = useState(false)
    const [active, setActive] = useState(false)
    const [dark, setDark] = useState(false)




    //logOut user
    const logOutUser = () => {
        localStorage.removeItem("user")
        dispatch(setUserData(null))
        googleLogout();
        setTimeout(() => {
            navigate("/")
        }, 1000)

    }
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        dispatch(setUserData(items))
    }, [dispatch]);


    //getting userdata from redux
    const userData = useSelector((state) => {
        return state.user;

    })

    //darkmode

    const handleMode = () => {
        setDark(!dark)
        dispatch(setDarkMode({
            setDark: (!dark),
            bgDark: "rgb(16, 20, 38)",
            bgLight: "#fff",
            textLight: "#fff",
            textDark: "#000",
            inputHoverDark: "rgb(23 31 64)",
            pColorDark: "#F7F9FC",
            boxDark: "#222B45"
        }))

    }





    return (

        // <header>
        //     <nav>
        //         <div className="navLeft">
        //             <Link to='/' ><div className='logo' style={{ cursor: "pointer"}}>
        //                 <img src={logo} alt="logo" />
        //             </div></Link>
        //             <div className="navSearch">
        //                 <button onClick={handleMode} style={{color:userData.darkMode.setDark?userData.darkMode.textLight:""}}>{dark ? <MdOutlineLightMode /> : <RiMoonLine />} {dark ? "LIGHT" : "DARK"}</button>
        //             </div>
        //         </div>
        //         <div className="navRight">
        //             <NavLink to="/" style={{color:userData.darkMode.setDark?userData.darkMode.textLight:""}}>Home</NavLink>
        //             {userData.setUser[0] === null && <NavLink to="/login"><button className='sign_in' style={{ color: userData.darkMode.setDark ? userData.darkMode.textLight : "" }}>SIGN IN</button></NavLink>}
        //             {userData.setUser[0] === null && <NavLink to="/signup"><button className='sign_up' style={{ color: userData.darkMode.setDark ? userData.darkMode.textLight : "" }}>SIGN UP</button></NavLink>}
        //             {userData.setUser[0] !== null && <div className='userLoggedIn' onClick={() => setHideInfo(!hideInfo)}>
        //                 <div className='userImage'><img src={userData?.setUser[0]?.picture} alt="userImage" referrerPolicy="no-referrer" /></div>
        //                 {hideInfo && <div className='userMenu'>
        //                     <div className='userMenuItems' style={{background:userData.darkMode.setDark?userData.darkMode.bgDark:""}}>
        //                         <Link to={'/profile'}><div><h3 style={{color:userData.darkMode.setDark?userData.darkMode.textLight:""}}>My Profile</h3></div></Link>
        //                         <div onClick={logOutUser}><h3 style={{color:userData.darkMode.setDark?userData.darkMode.textLight:""}}>Logout</h3></div>
        //                     </div>

        //                 </div>}
        //             </div>}

        //         </div>
        //     </nav>
        // </header>

        <header>
            <nav>
                <div className='sidebar'>
                    <div className='top-sidebar'>
                        <h1>Patient</h1>
                        <p>Appointment App</p>
                        <div className='sidebar-content'>
                            <div className='navitem'>
                                <NavLink to="/" className={({ isActive }) => (isActive ? "link-active" : "none")}>Home</NavLink>
                            </div>
                            <div className='navitem'>
                                <NavLink to="/createpatient" className={({ isActive }) => (isActive ? "link-active" : "none")}> Create Patient</NavLink>
                            </div>
                            <div className='navitem'>
                                <NavLink to="/patientlist" className={({ isActive }) => (isActive ? "link-active" : "none")}>Patient List</NavLink>
                            </div>
                            <div className='navitem'>
                                <NavLink to="/createappoinment" className={({ isActive }) => (isActive ? "link-active" : "none")} >Create Appointment</NavLink>
                            </div>
                            {userData.setUser[0] === null &&<><div className='navitem'>
                                <NavLink to="/login" className={({ isActive }) => (isActive ? "link-active" : "none")}>Sign in</NavLink>
                            </div>
                                <div className='navitem'>
                                    <NavLink to="/signup" className={({ isActive }) => (isActive ? "link-active" : "none")}>Sign up</NavLink>
                                </div></>}
                            {userData.setUser[0] !== null && <button onClick={logOutUser}>Logout</button>}

                        </div>
                    </div>
                    <div className='bottom-sidebar'>
                        <h1>Assigment</h1>
                    </div>

                </div>
            </nav>
        </header>

    )
}

export default Navbar