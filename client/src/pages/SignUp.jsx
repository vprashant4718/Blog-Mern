import { Alert, Button, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";


export default function SignUp() {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({});
  const [loading, setloading] = useState(false);
  const [message, setmessage] = useState("");
  const [errormessage, seterrormessage] = useState(false);
   

  const handleChange = (e) => {
    setformdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formdata.username || !formdata.email || !formdata.password) {
      return seterrormessage("All fields are required");
    }
    try {
      setloading(true);

      const res = await fetch(`/api/auth/signup`, {
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
       return seterrormessage(data.message==='getaddrinfo ENOTFOUND ac-qqzgln6-shard-00-01.jscrtou.mongodb.net'? 'no internet connect to internet' : data.message);
      }
      setloading(false);
      seterrormessage(false);
      setmessage('User Created Successfully');
      navigate('/sign-in');
      
      
    } catch (error) {
      seterrormessage(error.message);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center m-auto gap-10 my-6 ">
      <div
        className="self-center whitespace-nowrap  text-2xl font-bold
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
          id="username"
          placeholder="Username"
          className="w-[90vw] border rounded-lg sm:w-[50vw] lg:w-[40vw] lowercase"
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          className="w-[90vw] border rounded-lg sm:w-[50vw] lg:w-[40vw] lowercase "
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
          className="w-[90vw] border rounded-lg sm:w-[50vw] lg:w-[40vw] focus:outline-none dark:text-white"
        >
          {loading ? (
            <Spinner className="text-sm dark:text-white" />
          ) : (
            "SignUp"
          )}
        </Button>
        <OAuth />


          <p>already have an account ? <Link to={'/sign-in'} className="text-blue-700 font-semibold">SignIn</Link></p>

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
