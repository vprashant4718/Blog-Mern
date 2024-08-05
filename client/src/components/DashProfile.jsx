import { Alert, Button, Spinner } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import {useSelector} from 'react-redux';
import {getDownloadURL, getStorage, uploadBytesResumable} from 'firebase/storage'
import {ref} from 'firebase/storage'
import {app} from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
  const {currentUser} = useSelector((state)=> state.user);
  const [profile, setprofile] = useState(null)
  const [profileURL, setprofileURL] = useState(null)
  const [profileUploadProgress, setprofileUploadProgress] = useState(null)
  const [profileUploadError, setprofileUploadError] = useState(null)
  const filePicker = useRef();

  const handleProfileChange=(e)=>{
    const file = e.target.files[0];
    if(file){
      setprofileURL(URL.createObjectURL(file))
      setprofile( e.target.files[0]);
    }
  }

  useEffect(() => {
    if(profile){
      uploadProfileImage();
    }
  }, [profile])
  
  
  const uploadProfileImage = async()=>{
    setprofileUploadError(null)
    const storage = getStorage(app);
    const fileName = new Date().getTime().toString() + profile.name ;
    const storageRef = ref(storage, fileName); 
    const uploadTask = uploadBytesResumable(storageRef, profile);
    
    uploadTask.on('state_changed', 
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
        setprofileUploadProgress(progress.toFixed(0));
      },
      (error)=>{
        setprofileUploadError('could not upload image (image should be 5 MB or less');
        setprofileUploadProgress(null)
      },()=>{

        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          setprofileURL(downloadUrl);
        })
      }
      )
  }
  console.log(profile, profileURL, profileUploadProgress)
  return (
    <div className='flex flex-col gap-2 justify-center items-center'>
      <h1 className='text-3xl mb-5'>Profile</h1>
      <form  className='flex flex-col'>
        <div className='flex flex-col mb-4 justify-center items-center relative'>
         <input type="file" name="img" id="profile_change" onChange={handleProfileChange} ref={filePicker} hidden/>
          {profileUploadProgress && 
          (
            <CircularProgressbar onClick={()=>{filePicker.current.click()}} value={profileUploadProgress || 0} text={`${profileUploadProgress}%`} strokeWidth={5} styles={{root:{width:'100%', height:'100%', position:'absolute', top:0, left:0}, path:{stroke:`rgba(62, 152, 199, ${profileUploadProgress/100})`}}}/>
          )}
          <img src={profileURL || currentUser.googlePhotoUrl } alt="" className={`rounded-full w-28 h-28 border-8 border-gray-200 cursor-pointer ${profileUploadProgress && profileUploadProgress < 100 && 'opacity-10'}`} onClick={()=>{filePicker.current.click()}} />
        </div>
      {profileUploadError && <Alert color={'failure'}>
              {profileUploadError}
      </Alert>}
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
