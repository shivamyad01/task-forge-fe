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
    // Basic email validation
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    // Basic password validation
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
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Error logging in. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-[#E5EAFF]">
      <div className="flex w-[80vw] flex-col gap-10 items-center justify-center">
        <div>
          <img src={logo} alt="" />
        </div>
        <div className="w-[28vw] h-[70vh] flex items-center pt-10 flex-col space-y-8 bg-white rounded-[15px] shadow-lg">
          <h2 className="text-3xl text-center text-black-900 font-semibold">Login Here</h2>
          <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <input
                placeholder="Email Address"
                id="email"
                type="email"
                className="bg-[#E5EAFF] mb-2 font-semibold text-[#C6C3C3] m-auto p-3 w-[20vw] border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                placeholder="Password"
                id="password"
                type="password"
                className="bg-[#E5EAFF] font-semibold text-[#C6C3C3] mt-1 p-3 w-full border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex w-full justify-between p-2">
              <h2 className="text-[#C6C3C3] text-[13px] flex cursor-pointer font-medium">
                <input className="mr-1" type="checkbox"></input>
                Remember me
              </h2>
              <h2 className="text-[#C6C3C3] text-[13px] cursor-pointer font-medium"> Forgot Password?</h2>
            </div>
            <div>
              <button
                type="button"
                onClick={handleLogin}
                className="mt-4 bg-[#FF9900] font-bold p-3 w-full rounded-[50px] hover:bg-blue-500 text-black"
              >
                LOGIN
              </button>
              <div className="flex item-center justify-center mt-0 ">
                <div className="mt-3 bg-[#C6C3C3] w-[120px] h-[2px]"></div>
                <div className="pl-2 pr-2 text-[#C6C3C3] font-bold">Or</div>
                <div className="mt-3 bg-[#C6C3C3] w-[120px] h-[2px]"></div>
              </div>
              <div className="flex item-center justify-center ">
                <i className="text-blue-600 cursor-pointer ri-facebook-circle-fill text-[2vw]"></i>
                <i className="text-red-500 cursor-pointer pl-2 pr-2 ri-google-fill text-[2vw]"></i>
                <i className="cursor-pointer ri-twitter-x-line pt-1 text-[1.8vw]"></i>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center flex-col items-center min-h-screen w-[20vw] bg-[#8DE1D7]">
        <h1 className="text-[2vw] font-semibold text-black">New Here?</h1>
        <h2 className="text-center text-[#7E7E7E]">
          Sign up and discover a great amount of new opportunities!
        </h2>
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="mt-10 bg-white font-bold p-3 w-[12vw] rounded-[50px] hover:bg-blue-500 text-black"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
