import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Projects from './pages/Projects'


export default function App() {
  return (
    <BrowserRouter>

    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/signup' element={<SignUp></SignUp>}></Route>
      <Route path='/signin' element={<Signin></Signin>}></Route>
      <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
      <Route path='/about' element={<About></About>}></Route>
      <Route path='/projects' element={<Projects></Projects>}></Route>

    </Routes>
    </BrowserRouter>
  )
}
