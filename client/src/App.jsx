import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import Profile from './pages/Profile';
import DashBoard from './pages/DashBoard';
import SignUp from './pages/SignUp';

export default function App() {
  return (
    <BrowserRouter>
     
     <Routes>

      <Route path='/' element={<Home />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/signin' element={<SignIn />}/>
      <Route path='/signout' element={<SignOut />}/>
      <Route path='/profile' element={<Profile />}/>
      <Route path='/dashboard' element={<DashBoard />}/>
      <Route path='/signup' element={<SignUp />}/>

     </Routes>
    </BrowserRouter>
  )
}
