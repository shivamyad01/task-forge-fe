import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import logo from '../Components/assets/logo.png';
import toast from 'react-hot-toast';
import { register as registerApi } from '../api/authService';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!password.trim()) {
      toast.error('Please enter a password');
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    try {
      const res = await registerApi(name, email, password);
      if (res) {
        toast.success('Registration successful');
        navigate('/login');
      } else {
        toast.error('Registration failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#E9EEFF]">
      <div className="w-full md:w-1/5 flex items-center justify-center bg-gradient-to-r from-[#86E6D9] to-[#8DE1D7] py-6 md:py-12">
        <div className="text-center md:text-left px-4 md:px-8 w-full max-w-xs">
          <img src={logo} alt="TaskForge" className="h-10 mx-auto md:mx-0 mb-3" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-black">Already Here?</h1>
          <p className="mt-2 text-sm sm:text-base md:text-lg text-[#2F4F4A] max-w-xs mx-auto md:mx-0">Login and discover a great amount of new opportunities</p>
          <div className="mt-5 md:mt-6 flex justify-center md:justify-start">
            <button
              onClick={() => navigate('/login')}
              className="bg-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-lg hover:opacity-95 text-sm sm:text-base"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl text-[#0B3B66] font-semibold text-center">Register Here</h2>
          <form onSubmit={(e) => e.preventDefault()} className="mt-4 sm:mt-6 space-y-4">
            <input
              className="w-full p-4 sm:p-3 rounded-lg bg-[#F3F8FF] placeholder-gray-400 border border-transparent focus:ring-2 focus:ring-orange-300 text-base"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full p-4 sm:p-3 rounded-lg bg-[#F3F8FF] placeholder-gray-400 border border-transparent focus:ring-2 focus:ring-orange-300 text-base"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full p-4 sm:p-3 rounded-lg bg-[#F3F8FF] placeholder-gray-400 border border-transparent focus:ring-2 focus:ring-orange-300 text-base"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="w-full p-4 sm:p-3 rounded-lg bg-[#F3F8FF] placeholder-gray-400 border border-transparent focus:ring-2 focus:ring-orange-300 text-base"
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div>
              <button
                onClick={handleRegister}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#FF9900] to-[#FFB86B] font-bold shadow-md hover:opacity-95"
              >
                Sign Up
              </button>
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center"><i className="ri-facebook-circle-fill text-blue-600"></i></button>
              <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center"><i className="ri-google-fill text-red-500"></i></button>
              <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center"><i className="ri-twitter-x-line text-sky-600"></i></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
