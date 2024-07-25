import { Button, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';



export default function Header() {
    const {currentUser} = useSelector((state)=> state.user)
    const path = useLocation().pathname;
  return (
    
    <Navbar className='border-b-2 p-2'>

        <Link to={'/'} className='self-center whitespace-nowrap  text-sm
        sm:text-xl font-semibold dark:text-white'>
        <span className='px-3 py-1 bg-gradient-to-r from-indigo-600 via-purple-800 to-pink-600 rounded-lg text-white' > True </span><span>Blogs</span>
        </Link>

        <form >
            <TextInput type='text' placeholder='Search...'   className='hidden lg:inline'/>
        </form>

        <Button className='h-10 w-12 rounded-lg lg:hidden' color={'gray'} pill>
            <IoSearchSharp className=''/>
        </Button>


        <div className='flex gap-2'>
            <Button className='h-10 w-12 cursor-pointer' color={'gray'} pill >
                <BsFillMoonStarsFill/>
            </Button>

       {!currentUser && <Link to={'/sign-in'} >
        <Button  gradientDuoTone={'purpleToBlue'}>SingIn</Button>
        </Link>}
        
        <Navbar.Toggle />
        </div>

        <Navbar.Collapse>
            <Navbar.Link active={path === '/'} as={'div'}>
                <Link to={'/'}>
                Home
                </Link>
                </Navbar.Link>
                
            <Navbar.Link active={path === '/about'} as={'div'}>
                <Link to={'/about'}>
                About
                </Link>
                </Navbar.Link>

            {currentUser && <Navbar.Link active={path === '/profile'} as={'div'}>
                <Link to={'/profile'}>
                <img src={currentUser.googlePhotoUrl} alt="" className='rounded-full w-10 h-10' />
               
                 
                </Link>
            </Navbar.Link>}

        </Navbar.Collapse>

    </Navbar>   
  )
}
