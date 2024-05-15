import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import TopBar from './TopBar';
import axios from 'axios';
import { GiHospitalCross } from "react-icons/gi";
import { MdDeleteOutline } from "react-icons/md";
import { setAllPatients } from "../store/slices/UserSlice.js";
import {loadStripe} from '@stripe/stripe-js';

const PatientList = ({ setProgress }) => {

  const [allUser, setAllUser] = useState([]);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  //fetch all users
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get('http://localhost:8800/user')
        setAllUser(res.data);
        dispatch(setAllPatients(res.data));
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllUsers()
  }, [dispatch])


  //make pyament
  const makePayment=async()=>{
    const stripe = await loadStripe('pk_test_51PGRMaSDvmO2eEIILOiYiULgmOhCa3Ewop9bX11saxC30n0Q4DEqkoY1Vy0f6Lfr00s1gZazS4Rv8MXpRLOJ8gaa00NyQTInTQ');
    const body={
      price:500
    }
    const headers={
      "Content-Type":"application/json"
    }
    const response=await fetch("http://localhost:8800/create-checkout-payment",{
      method: 'POST',
      headers: headers,
      body:JSON.stringify(body)
    })
    const session=await response.json()
    const result=stripe.redirectToCheckout({
      sessionId:session.id
    })
    if(result.error){
      console.log(result.error);
    }
  }

  // delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/user/${id}`)
      const updatedData = allUserData.allPatients.filter((data) => {
        return data.id !== id;
      })
      dispatch(setAllPatients(updatedData));
    } catch (error) {
      console.log(error);
    }
  }



  const userData = useSelector((state) => {
    return state.user;

  })
  const allUserData = useSelector((state) => {
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
          <div className='patient-search'>
            <input type='text' placeholder='Search patient'  onChange={(e)=>setQuery(e.target.value)}></input>
          </div>

          <div className='patient-list'>
            {allUserData.allPatients.length === 0 && <h1>No Patient yet!</h1>}


            {allUserData.allPatients.filter(user=>user.name.toLowerCase().includes(query)).map((data) => {

              return (
                <div className='patientBox' key={data.phone}>
                  <div className='pItem'>
                    <GiHospitalCross />
                    <div>
                      <h1>{data?.name}</h1>
                      <p>{data?.phone}</p>
                    </div>
                  </div>
                  <div className='pItem2'>
                    {data.time !== null ? <><button className='apButton' onClick={makePayment}>Pay Fees</button>
                      <div className='timeA'>
                        <p>Time : {data.time}</p>
                        <p>Date : {data.date}</p>

                      </div>
                    </> : <button>Pending</button>}
                    <MdDeleteOutline onClick={() => handleDelete(data.id)} />
                  </div>

                </div>
              )
            })}

          </div>
        </div>
        }
      </section>


    </>
  )
}

export default PatientList