import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import logo from '../Components/assets/logo.png';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../utils/constant';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    // Basic name validation
    if (!name.trim()) {
      toast.error('Please enter your name');
      return false;
    }

    // Basic email validation
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    // Basic password validation
    if (!password.trim()) {
      toast.error('Please enter a password');
      return false;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleRegister = () => {
    if (!validateForm()) return;

    axios.post(`${API_BASE_URL}/api/users/register`, { name, email, password })
      .then(response => {
        if (response) {
          toast.success('Registration successful');
          navigate('/login');
        } else if (response.data.alreadyExists) {
          toast.error('User with this email already exists');
        } else {
          toast.error('Registration failed');
        }
      })
      .catch(error => {
        console.error('Error registering user:', error);
        toast.error('Registration failed');
      });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-r from-[#8DE1D7] to-[#BFA9F5]">
      {/* Left Column */}
      <div className='flex justify-center flex-col items-center min-h-screen w-full lg:w-[50%] bg-[#BFA9F5]'>
        <h1 className='text-2xl font-semibold text-black'>
          Already Here?
        </h1>
        <h2 className='text-center text-gray-700'>
          Login and discover a great amount of new opportunities
        </h2>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="mt-10 bg-white font-bold p-3 w-[12vw] lg:w-[24vw] rounded-[50px] hover:bg-blue-500 text-black"
        >
          Login in
        </button>
      </div>

      {/* Right Column */}
      <div className='flex justify-center items-center flex-1'>
        <div className="w-full lg:w-[50%] h-[70vh] flex items-center pt-10 flex-col space-y-8 bg-white rounded-[15px] shadow-lg">
          <img src={logo} alt="Logo" className="w-24 mb-8" />
          <h2 className="text-3xl text-center text-black font-semibold">Register Here</h2>
          <form className="mt-4 space-y-4">
            <div>
              <input
                placeholder='Name'
                id="name"
                type="text"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                placeholder='Email Address'
                id="email"
                type="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                placeholder='Password'
                id="password"
                type="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                placeholder='Confirm Password'
                id="confirmPassword"
                type="password"
                className="input-field"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={handleRegister}
              className="button-primary"
            >
              Sign Up
            </button>
          </form>
          <div className='flex item-center justify-center'>
            <div className='mt-3 bg-gray-400 w-[120px] h-[2px]'></div>
            <div className='px-2 text-gray-400 font-bold'>Or</div>
            <div className='mt-3 bg-gray-400 w-[120px] h-[2px]'></div>
          </div>
          <div className='flex item-center justify-center'>
            <i className="text-blue-600 cursor-pointer ri-facebook-circle-fill text-3xl"></i>
            <i className="text-red-500 cursor-pointer px-2 ri-google-fill text-3xl"></i>
            <i className="cursor-pointer ri-twitter-x-line pt-1 text-2xl"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
