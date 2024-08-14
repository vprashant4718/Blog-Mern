import { Button, Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react';
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {HiOutlineArrowSmRight, HiUser} from 'react-icons/hi';
import { BsFilePost } from "react-icons/bs";
import { FaCommentDots } from "react-icons/fa";
import {signOutStart, signOutSuccess, signOutFailure} from "../redux/slice/createSlice";
import { useDispatch } from 'react-redux'; 
import { useSelector } from 'react-redux';

export default function DashSidebar() {
const { currentUser, error:errormessage } = useSelector((state) => state.user);

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
           {currentUser.isAdmin === true?
           (<div className='flex flex-col gap-2' ><Link to={'/dashboard?tab=profile'}>
                <SidebarItem active={tab==='/dashboard?tab=profile'} icon={HiUser} label={'admin'} labelColor={'dark'} as='div'>
                    Profile
                </SidebarItem>
            </Link>
            <Link to={'/dashboard?tab=posts'}>
                <SidebarItem active={tab==='/dashboard?tab=posts'} icon={BsFilePost} labelColor={'dark'} as='div'>
                    Posts
                </SidebarItem>
            </Link>
            <Link to={'/dashboard?tab=comment'}>
                <SidebarItem active={tab==='/dashboard?tab=comment'} icon={FaCommentDots}  labelColor={'dark'} as='div'>
                    Comments
                </SidebarItem>
            </Link>
                <SidebarItem active={tab==='/dashboard?tab=signout'} icon={HiOutlineArrowSmRight} labelColor={'dark'} className='cursor-pointer'>
                   <div onClick={signOutUser}>SignOut</div> 
                </SidebarItem></div> ) : 
                
                ( <div className='flex flex-col gap-2'> <Link to={'/dashboard?tab=profile'}>
                <SidebarItem active={tab==='/dashboard?tab=profile'} icon={HiUser} label={'user'} labelColor={'dark'} as='div'>
                    Profile
                </SidebarItem>
            </Link>
                <SidebarItem active={tab==='/dashboard?tab=signout'} icon={HiOutlineArrowSmRight} labelColor={'dark'} className='cursor-pointer'>
                   <div onClick={signOutUser}>SignOut</div> 
                </SidebarItem></div> )}
        </SidebarItemGroup>

            
        </SidebarItems>
    </Sidebar>
  )
}
