import { useState } from 'react'
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
/**Components */
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </Router>
  )
}

export default App
