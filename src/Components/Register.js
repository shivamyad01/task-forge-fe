import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Register</h2>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="mt-1 p-3 w-full border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 p-3 w-full border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 p-3 w-full border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="mt-1 p-3 w-full border rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleRegister}
              className="mt-4 bg-green-500 text-white p-3 w-full rounded-md hover:bg-green-600"
            >
              Register 
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>.
        </p>
      </div>
    </div>
  );
};

export default Register;
