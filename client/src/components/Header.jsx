import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { toggletheme } from '../redux/slice/themeSlice';




export default function Header() {
    const dispatch = useDispatch();
    const {currentUser} = useSelector((state)=> state.user)
    const {theme} = useSelector((state)=> state.theme)
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
            <Button className='h-10 w-12 cursor-pointer' color={'gray'} pill onClick={()=>{dispatch(toggletheme())}} >
                {theme === "light" ?
                <BsFillMoonStarsFill /> : <BsSunFill/>
            }
            </Button>

       {!currentUser ?( <Link to={'/sign-in'} >
        <Button  gradientDuoTone={'purpleToBlue'}>SingIn</Button>
        </Link>)
                :
        (   <Dropdown inline arrowIcon={false}  label={
            <Avatar alt='user' rounded img={currentUser.googlePhotoUrl}/>
           }>

                <DropdownHeader>
                    <span className='text-sm font-semibold'>@{currentUser.username}</span>
                </DropdownHeader>
                <DropdownHeader>
                <span className='text-sm font-semibold'>{currentUser.email}</span>
                </DropdownHeader>
            <Link to={'/profile'} active={path === '/profile'}>
            <DropdownItem>Profile</DropdownItem>
           </Link>
            <DropdownItem>SignOut</DropdownItem>

           <DropdownDivider/>
           
           </Dropdown>
           
            )}
        
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

            

        </Navbar.Collapse>

    </Navbar>   
  )
}
