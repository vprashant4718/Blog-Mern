import { Button, Spinner } from 'flowbite-react'
import React, { useState } from 'react';
import {AiFillGoogleCircle} from 'react-icons/ai';
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase.js'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/slice/createSlice.js';


export default function OAuth() {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const auth = getAuth(app)

    const googleClick =async()=>{
        const provider =  new GoogleAuthProvider();
        provider.setCustomParameters({prompt: 'select_account'})
      

        try{
          
          const result = await signInWithPopup(auth, provider); 
          const res = await fetch(`/api/auth/google`,{
            method:'POST',
            headers:{
              'Content-Type' : 'application/json',
            }, 
            body: JSON.stringify({
              name: result.user.displayName,
              email: result.user.email,
              googlePhotoUrl: result.user.photoURL
            })
          });

          const data = await res.json();
          
          if (res.ok) {
            dispatch(signInSuccess(data));
            navigate('/')
          }

        }
        catch(error){
          console.log(error)
        }
        
    }
  return (
    <Button type='button' onClick={googleClick} gradientDuoTone={'pinkToOrange'} className='w-[90vw] border rounded-lg sm:w-[50vw] lg:w-[40vw]' outline >
        <AiFillGoogleCircle className='w-6 h-6 mr-3'/>
        {loading ? (
            <Spinner className="text-sm" />
          ) : (
            "Continue with Google"
          )} 
    </Button>
  )
}
