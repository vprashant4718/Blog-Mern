import { Button, Spinner } from 'flowbite-react';
import React from 'react';
import {useSelector} from 'react-redux'

export default function DashProfile() {
  const {currentUser} = useSelector((state)=> state.user);
  const localStore = localStorage.getItem('persist:root');
  
  return (
    <div className='flex flex-col gap-2 justify-center items-center'>
      <h1 className='text-3xl mb-5'>Profile</h1>
      <form  className='flex flex-col'>
        <div className='flex flex-col mb-4 justify-center items-center'>
          <img src={currentUser.googlePhotoUrl} alt="" className='rounded-full w-28 h-28 border-8 border-gray-200 cursor-pointer' />
        </div>
        <div className='flex flex-col gap-4 justify-center dark:text-black'>
          <input type="text" name="name" id="name" defaultValue={currentUser.username} className='w-[90vw] border rounded-lg sm:w-[50vw] lg:w-[40vw] focus:outline-none lowercase'/>
          <input type="email" name="email" id="email"  defaultValue={currentUser.email} className='w-[90vw] border rounded-lg sm:w-[50vw] lg:w-[40vw] focus:outline-none lowercase'/>
          <input type="password" name="password" id="password"  defaultValue={currentUser.email} className='w-[90vw] border rounded-lg sm:w-[50vw] lg:w-[40vw] focus:outline-none lowercase'/>

          <Button
          type="submit"
          gradientDuoTone={"purpleToBlue"}
          className="w-[90vw] border rounded-lg sm:w-[50vw] lg:w-[40vw] focus:outline-none dark:text-white"
        >
          {true ? (
            <Spinner className="text-sm dark:text-white" />
          ) : (
            "Update"
          )}
        </Button>
        
        </div>
      </form>
    </div>
  )
}
