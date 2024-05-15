import './App.css';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile'
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoadingBar from 'react-top-loading-bar'
import { useSelector } from 'react-redux';
import CreateAppointment from './components/CreateAppointment';
import CreatePatient from './components/CreatePatient';
import PatientList from './components/PatientList';



const App = () => {
  const [progress, setProgress] = useState(50)
  const mode = useSelector((state) => {
    return state.user;
  })


  return (
    <div style={{ background: mode.darkMode.setDark ? mode.darkMode.bgDark : mode.darkMode.bgLight }}>

      <GoogleOAuthProvider clientId={`${process.env.REACT_APP_MY_KEY}`}>
        <BrowserRouter >
          <LoadingBar
            color='#1778F2'
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home setProgress={setProgress} />} />
            <Route path="/login" element={<Login setProgress={setProgress} />} />
            <Route path="/signup" element={<Signup setProgress={setProgress} />} />
            <Route path="/profile" element={<Profile setProgress={setProgress} />} />
            <Route path="/createappoinment" element={<CreateAppointment setProgress={setProgress} />} />
            <Route path="/createpatient" element={<CreatePatient setProgress={setProgress} />} />
            <Route path="/patientlist" element={<PatientList setProgress={setProgress} />} />
          </Routes>

        </BrowserRouter>

      </GoogleOAuthProvider>
    </div>
  )
}
export default App;
