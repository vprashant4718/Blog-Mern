import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {HiArrowSmRight, HiOutlineArrowSmRight, HiUser} from 'react-icons/hi'

export default function DashSidebar() {
    
const location = useLocation();
const [tab, settab] = useState(null);

useEffect(() => {
const urlParams = new URLSearchParams(location.search);
const tabUrl = urlParams.get('tab');
if (tabUrl) {
  settab(tabUrl);
}

}, [location.search])
  return (
    <Sidebar className='w-auto md:min-h-screen md:w-60'>
        <SidebarItems>
        <SidebarItemGroup>
            <Link to={'/dashboard?tab=profile'}>
                <SidebarItem active={tab==='profile'} icon={HiUser} label={'user'} labelColor={'dark'}>
                    Profile
                </SidebarItem>
            </Link>
                <SidebarItem active={tab==='profile'} icon={HiOutlineArrowSmRight} labelColor={'dark'} className='cursor-pointer'>
                    SignOut
                </SidebarItem>
        </SidebarItemGroup>

            
        </SidebarItems>
    </Sidebar>
  )
}
