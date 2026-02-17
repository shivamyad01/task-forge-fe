import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import logo from '../Components/assets/logo.png';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { login as loginApi } from '../api/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!password.trim()) {
      toast.error('Please enter your password');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    try {
      const data = await loginApi(email, password);
      if (data?.token) {
        login(data.token);
        navigate('/dashboard');
        toast.success('Login successful');
      } else {
        toast.error('Incorrect email or password');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error logging in. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <div className="w-full md:w-1/5 flex items-center justify-center bg-white border-b md:border-b-0 md:border-r border-gray-200 py-6 md:py-12">
        <div className="text-center md:text-left px-4 md:px-8 w-full max-w-xs">
          <img src={logo} alt="TaskForge" className="h-10 mx-auto md:mx-0 mb-3" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-black">New Here?</h1>
          <p className="mt-2 text-sm sm:text-base md:text-lg text-[#2F4F4A] max-w-xs mx-auto md:mx-0">Sign up and discover a great amount of new opportunities!</p>
          <div className="mt-5 md:mt-6 flex justify-center md:justify-start">
            <button
              onClick={() => navigate('/register')}
              className="bg-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-lg hover:opacity-95 text-sm sm:text-base"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-100">
          <h2 className="text-xl sm:text-2xl md:text-3xl text-[#0B3B66] font-semibold text-center">Login Here</h2>
          <form onSubmit={(e) => e.preventDefault()} className="mt-4 sm:mt-6 space-y-4">
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
            <div className="flex items-center justify-between text-sm text-[#7E7E7E]">
              <label className="flex items-center gap-2">
                <input type="checkbox" /> Remember me
              </label>
              <button className="underline" type="button">Forgot Password?</button>
            </div>
            <div>
              <button
                onClick={handleLogin}
                className="w-full py-4 sm:py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-md transition-colors text-lg sm:text-base"
              >
                LOGIN
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

export default Login;
