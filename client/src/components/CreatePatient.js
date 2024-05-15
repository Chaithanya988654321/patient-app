import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import TopBar from './TopBar';
import axios from 'axios';

const CreatePatient = ({ setProgress }) => {

  const[addUser,setAddUser]=useState({
    name:"",
    email:"",
    phone:""
  })

  const handleChange=(e)=>{
    setAddUser((prev)=>({...prev,[e.target.name]:e.target.value}))
    console.log(addUser);
  }
 const handleSubmit=async(e)=>{
  e.preventDefault();
  try {
    await axios.post("http://localhost:8800/user",addUser)
    setAddUser({
      name:"",
      email:"",
      phone:""
    })
  } catch (error) {
    console.log(error);
  }
 }
  // useEffect(()=>{

  // })

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
            <h1>Add New patient</h1>
            <form>
              <input type='text' placeholder='Enter Patient Name' name="name" value={addUser.name} onChange={handleChange}/>
              <input type='email' placeholder='Enter Patient Email' name="email" value={addUser.email} onChange={handleChange}/>
              <input type='phone' placeholder='Enter Patient Phone' name='phone' value={addUser.phone} onChange={handleChange}/>
              <button className='button1' type="submit" onClick={handleSubmit}> Add Patient</button>
            </form>
          </div>
        </div>
        }


      </section>


    </>
  )
}

export default CreatePatient