import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import TopBar from './TopBar';
import axios from 'axios';




const CreateAppointment = ({ setProgress }) => {

  

  const [addAppoin, setAddAppoin] = useState({
    phone: "",
    time: "",
    date: ""
  })

  const handleChange = (e) => {
    setAddAppoin((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/setappointment",addAppoin)
      setAddAppoin({
        phone: "",
        time: "",
        date: ""
      })
    } catch (error) {
      console.log(error);
    }
    
  }

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
        {userData.setUser[0] !== null && <div className='main-content'>

          <div className='createForm'>
            <h1>Create Appointment for exixting patient!</h1>
            <form>
              <input type='phone' placeholder='Enter Patient Phone' name='phone' value={addAppoin.phone} onChange={handleChange} />
              <input type='time' placeholder='Enter Patient Phone' name='time' value={addAppoin.time}  onChange={handleChange}/>
              <input type='date' placeholder='Enter Patient Phone'   name='date' value={addAppoin.date}  onChange={handleChange}/>
              
              <button className='button1' type="submit" onClick={handleSubmit}> Create Appoinment</button>
            </form>

          </div>
        </div>
        }


      </section>


    </>
  )
}

export default CreateAppointment