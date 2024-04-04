import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    // Perform registration logic here
    if (password === confirmPassword) {
      // Make a POST request to the registration endpoint
      axios.post('http://localhost:5001/register', { name, email, password })
        .then(response => {
          // Check the response and handle accordingly
          if (response.data.registered) {
            alert('Registration successful');
            navigate('/login'); // Redirect to login page after successful registration
          } else {
            alert('Registration failed');
          }
        })
        .catch(error => {
          console.error('Error registering user:', error);
          alert('Registration failed');
        });
    } else {
      // Handle password mismatch, show an error message or highlight the fields
      alert('Passwords do not match');
    }
  };

  return (
    <div className="min-h-screen  flex  bg-[#E5EAFF]">
       <div className='flex justify-center flex-col items-center  min-h-screen w-[20vw] bg-[#8DE1D7]'>
       <h1 className='text-[2vw] font-semibold text-black'>
         Already Here?
       </h1>
       <h2 className=' text-center text-[#7E7E7E]'>
       Login and discover a great amount of new opportunities
       </h2>
       <button
            type="button"
            onClick={() => navigate("/login")} 
            className="mt-10 bg-white font-bold   p-3 w-[12vw] rounded-[50px] hover:bg-blue-500 text-black"
          >
            Login in
          </button>
    </div>
    
    <div className='flex w-[80vw] flex-col gap-10 items-center justify-center'>

    
    <div>
    <img src="public/Group 8.png" alt="Description of the image" />
    </div>
    <div className=" w-[28vw] h-[70vh] flex items-center pt-10 flex-col  space-y-8 bg-white rounded-[15px] shadow-lg">
      <h2 className="text-3xl  text-center text-black-900 font-semibold">Register Here</h2>
      <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
        
        <div>
          {/* <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label> */}
          <input
            placeholder='Name'
            id="name"
            type="name"
            className="bg-[#E5EAFF] mb-2 font-semibold text-[#C6C3C3]m-auto p-3 w-[20vw] border rounded-md"
            value={email}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          {/* <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label> */}
          <input
            placeholder='Email Address'
            id="email"
            type="email"
            className="bg-[#E5EAFF] mb-1 font-semibold text-[#C6C3C3]m-auto p-3 w-[20vw] border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
       
        <div>
          {/* <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label> */}
          <input
            placeholder='Password'
            id="password"
            type="password"
            className="bg-[#E5EAFF] font-semibold text-[#C6C3C3] mb-1 mt-1 p-3 w-full border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          {/* <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label> */}
          <input
            placeholder='Email Address'
            id="email"
            type="email"
            className="bg-[#E5EAFF] mb-0 font-semibold mt-1 text-[#C6C3C3]m-auto p-3 w-[20vw] border rounded-md"
            value={email}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
       
        </div>
        <div>
          <button
            type="button"
            onClick={handleRegister}
            className="mt-1 bg-[#FF9900] font-bold  p-3 w-full rounded-[50px] hover:bg-blue-500 text-black"
          >
            Sign Up
          </button>
          <div className='flex item-center justify-center mt-0 '>
            <div className= 'mt-3 bg-[#C6C3C3] w-[120px] h-[2px]'>

            </div>
            <div className='pl-2 pr-2 text-[#C6C3C3] font-bold'>Or</div>
            <div className= 'mt-3 bg-[#C6C3C3] w-[120px] h-[2px]'>

            </div>
          </div>
          <div className=' flex item-center justify-center  '>
             <i  className=" text-blue-600 cursor-pointer ri-facebook-circle-fill text-[2vw]"></i>
             <i className=" text-red-500 cursor-pointer pl-2 pr-2 ri-google-fill text-[2vw]"></i>
             <i className=" cursor-pointer ri-twitter-x-line pt-1 text-[1.8vw]"></i>
          </div>
        </div>
      </form>
      {/* <p className="text-sm text-center text-gray-600">
        Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link>.
      </p> */}
     
    </div>
  </div>
    
  </div>
  );
};

export default Register;
