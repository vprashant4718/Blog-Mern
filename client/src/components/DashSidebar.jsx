import { Button, Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {HiArrowSmRight, HiOutlineArrowSmRight, HiUser} from 'react-icons/hi'
import {signOutStart, signOutSuccess, signOutFailure} from "../redux/slice/createSlice";
import { useDispatch } from 'react-redux'; 


export default function DashSidebar() {
const dispatch = useDispatch()    
const location = useLocation();
const [tab, settab] = useState(null);

useEffect(() => {
const urlParams = new URLSearchParams(location.search);
const tabUrl = urlParams.get('tab');
if (tabUrl) {
  settab(tabUrl);
}

}, [location.search]);

const signOutUser =async(e)=>{
  e.preventDefault();
  dispatch(signOutStart());
  try {
    const res = await fetch(`/api/user/signout`,{
      method:'POST'
    });
    const data = await res.json();
    if(res.ok){
     dispatch(signOutSuccess(data));
   }
  } catch (error) {
      dispatch(signOutFailure(error.message));
  }
}
  return (
    <Sidebar className='w-auto md:min-h-screen md:w-60'>
        <SidebarItems>
        <SidebarItemGroup>
            <Link to={'/dashboard?tab=profile'}>
                <SidebarItem active={tab==='profile'} icon={HiUser} label={'user'} labelColor={'dark'} as='div'>
                    Profile
                </SidebarItem>
            </Link>
                <SidebarItem active={tab==='profile'} icon={HiOutlineArrowSmRight} labelColor={'dark'} className='cursor-pointer'>
                   <div onClick={signOutUser}>SignOut</div> 
                </SidebarItem>
        </SidebarItemGroup>

            
        </SidebarItems>
    </Sidebar>
  )
}
