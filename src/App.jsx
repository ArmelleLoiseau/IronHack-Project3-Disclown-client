import { useState } from 'react'
import './App.css'
import {io} from "socket.io-client"
import Signup from './components/Signup'
import Login from './components/Login'
const socket = io("htpp://localhost:3000")

function App() {


  return (
    <div className="App">
<h1> HELLO </h1>
    {/* <Signup />
    
    <Login /> */}

    </div>
  )
}

export default App
