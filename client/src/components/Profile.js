import React, { useEffect } from 'react'
import {useSelector } from 'react-redux';

const Profile = ({ setProgress }) => {
    //getting userdata from redux
    const userData = useSelector((state) => {
        return state.user;
    })



    useEffect((() => {
        setProgress(40);
        setTimeout(() => {
            setProgress(100)
        }, 200)

    }), [setProgress])
    return (
        <div className='profile'>
            <div className='imgProfile'>
                {userData.setUser[0] !== null &&
                    <img src={userData?.setUser[0]?.picture} alt="userImage" referrerPolicy="no-referrer" />
                }
            </div>
            {userData.setUser[0] !== null &&
                <div><p>{userData?.setUser[0]?.name}</p>
                    <p>{userData?.setUser[0]?.email}</p> </div>

            }

        </div>
    )
}

export default Profile