import React from 'react';
import { Alert, Button, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import  {useDispatch, useSelector} from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/slice/createSlice';
import OAuth from '../components/OAuth';


export default function SignIn() {
  const {loading, error:errormes}= useSelector((state => state.user));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formdata, setformdata] = useState({});
  const [message, setmessage] = useState("");


  const handleChange = (e) => {
    setformdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formdata.email || !formdata.password) {
      return dispatch(signInFailure("All fields are required"));
    }
    try {
      dispatch(signInStart());

      const res = await fetch(`/api/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();

      if(data.success === false){
        return dispatch(signInFailure(data.message));
      }
      setmessage("User Created Successfully")
      dispatch(signInSuccess(data));
      navigate('/');
      
    } catch (error) {
      return dispatch(signInFailure(error.message))
    }
  };
  return (
    <div className="flex flex-col justify-center items-center m-auto gap-10 my-6 ">
      <div className="self-center whitespace-nowrap  text-2xl font-bold
        sm:font-bold sm:text-4xl  items-center dark:text-white"
      >
  <span className="px-3 py-1 bg-gradient-to-r from-indigo-600 via-purple-800 to-pink-600 rounded-lg text-white">
          {" "}
          True{" "}
        </span>
        <span>Blogs</span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="items-center flex flex-col gap-3"
      >
         <TextInput
          type="text"
          id="email"
          placeholder="Email"
          className="w-[90vw] border rounded-lg sm:w-[50vw] lg:w-[40vw] lowercase"
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Password"
          className="w-[90vw] border rounded-lg sm:w-[50vw] lg:w-[40vw] lowercase"
          onChange={handleChange}
        />
        <Button disabled={loading}
          type="submit"
          gradientDuoTone={"purpleToBlue"}
          className="w-[90vw] border rounded-lg sm:w-[50vw] lg:w-[40vw] focus:outline-none"
        >
          {loading ? (
            <Spinner className="text-sm" />
          ) : (
            "SignIn"
          )}
        </Button>

        <OAuth/>
    <p>already have an account ? <Link to={'/signup'} className="text-blue-700 font-semibold">SignUp</Link></p>

        <div>
          {message &&    
        <Alert className="mt-5 w-[90vw] border rounded-lg sm:w-[50vw] lg:w-[40vw]" color={'success'}>
          {message}
         </Alert>}
          {errormes &&   
          <Alert className="w-[90vw] border rounded-lg sm:w-[50vw] lg:w-[40vw]" color={'failure'}> 
          {errormes} 
          </Alert>} 
          </div>
      </form>

       
    </div>

  );
}

