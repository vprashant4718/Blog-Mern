import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import Profile from './pages/Profile';
import DashBoard from './pages/DashBoard';
import SignUp from './pages/SignUp';
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
     
     <Header />
     <Routes>

      <Route path='/' element={<Home />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/sign-in' element={<SignIn />}/>
      <Route path='/signout' element={<SignOut />}/>
      
      <Route element={<PrivateRoute/>}>
      <Route path='/profile' element={<Profile />}/>
      <Route path='/dashboard' element={<DashBoard />}/>

      </Route>
      <Route path='/signup' element={<SignUp />}/>

     </Routes>
    </BrowserRouter>
  )
}
