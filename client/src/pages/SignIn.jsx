import React from 'react';
import { Alert, Button, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function SignIn() {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({});
  const [loading, setloading] = useState(false);
  const [message, setmessage] = useState("");
  const [errormessage, seterrormessage] = useState(false);
   

  console.log(formdata)

  const handleChange = (e) => {
    setformdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formdata.email || !formdata.password) {
      return seterrormessage("All fields are required");
    }
    try {
      setloading(true);

      const res = await fetch(`/api/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();

      if(data.success === false){
        setloading(false);
        setmessage(false);
       return seterrormessage(data.message);
      }
      setloading(false);
      seterrormessage(false);
      setmessage(data);
      navigate('/');
      
    } catch (error) {
      seterrormessage(error.message);
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
          className="w-[90vw] border rounded-lg sm:w-[50vw] lg:w-[40vw]"
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Password"
          className="w-[90vw] border rounded-lg sm:w-[50vw] lg:w-[40vw]"
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
      <p>already have an account ? <Link to={'/signup'} className="text-blue-700 font-semibold">SignUp</Link></p>

        <div>
          {message &&    
        <Alert className="mt-5 w-[90vw] border rounded-lg sm:w-[50vw] lg:w-[40vw]" color={'success'}>
          {message}
         </Alert>}
          {errormessage &&   
          <Alert className="w-[90vw] border rounded-lg sm:w-[50vw] lg:w-[40vw]" color={'failure'}> 
          {errormessage} 
          </Alert>} 
          </div>
      </form>

       
    </div>

  );
}

