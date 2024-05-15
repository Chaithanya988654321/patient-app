import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import TopBar from './TopBar';

const Home = ({ setProgress }) => {

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
    <>
      <section className='home'>
        {userData.setUser[0] === null && <div className="home-content">
          <><h1>Please Login to Get Access! </h1>
            <Link to="/login"><button>Login</button></Link></>
        </div>}
        {userData.setUser[0] !== null && <TopBar />

        }
      </section>


    </>
  )
}

export default Home