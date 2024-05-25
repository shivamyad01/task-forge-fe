import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import logo from '../Components/assets/logo.png';
import { API_BASE_URL } from '../utils/constant';
import toast from 'react-hot-toast';

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    // Basic email validation
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Basic password validation
    if (!password.trim()) {
      setError('Please enter your password');
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    setError('');
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token); // Store token in localStorage

        setLoggedIn(true);
        navigate('/dashboard');
        toast.success('Login successful');
      } else {
        setError('Incorrect email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Error logging in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-[#BFA9F5] to-[#F5B3F3]">
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full md:w-[40vw] lg:w-[30vw] xl:w-[25vw] rounded-lg overflow-hidden shadow-lg bg-white">
          <img src={logo} alt="Logo" className="mx-auto mt-8" />
          <div className="p-8">
            <h2 className="text-3xl text-center text-black font-semibold mb-8">Login Here</h2>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <input
                  placeholder="Email Address"
                  id="email"
                  type="email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <div className="relative">
                  <input
                    placeholder="Password"
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i
                    className={`absolute right-3 top-3 cursor-pointer transition-colors ${
                      showPassword ? 'text-primary' : 'text-gray-500'
                    }`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <i className="ri-eye-fill"></i>
                    ) : (
                      <i className="ri-eye-off-fill"></i>
                    )}
                  </i>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogin}
                className="button-primary w-full mt-6"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'LOGIN'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center bg-gradient-to-r from-[#F5B3F3] to-[#BFA9F5]">
        <h1 className="text-2xl font-semibold text-black mb-4">New Here?</h1>
        <h2 className="text-center text-gray-700 mb-8">
          Sign up and discover a great amount of new opportunities!
        </h2>
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="button-secondary"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
