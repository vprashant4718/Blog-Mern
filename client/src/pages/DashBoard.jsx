import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'


export default function DashBoard() {

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
    <div className='flex flex-col   gap-5 md:flex-row '>
        <div>
          <DashSidebar />
        </div>
        <div className='flex flex-col justify-center m-auto'>
           {tab === 'profile' && <DashProfile />} 
       </div>
    </div>
  )
}
