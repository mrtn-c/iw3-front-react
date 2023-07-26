import { useState } from 'react'
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
/**Components */
import Home from './components/Home.jsx'
import './App.css'
import LoginRegister from './components/Login/LoginRegister.jsx';
import './assets/globalStyles.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginRegister/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </Router>
   
  )
}

export default App
