import React from 'react'
import {useSelector } from 'react-redux';
const TopBar = () => {
    const userData = useSelector((state) => {
        return state.user;

    })
    return (
        <div className='main-content'>
            <div className='topNav'>
                <div className='left-content'>
                    <h1>Hi <span>{userData?.setUser[0]?.given_name}</span>, Welcome 👋</h1>
                </div>
                <div className='right-content'>
                    <div className='imgDiv'>
                        <img src={userData?.setUser[0]?.picture} alt='img'/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TopBar