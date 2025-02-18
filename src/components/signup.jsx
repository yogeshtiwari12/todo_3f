import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { mainurl } from './commonfile.jsx';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.put(`${mainurl}/userroute21/signup`, formData, { withCredentials: true });
      if (response.status === 201) {
        alert("signup successful")
        setMessage('Signup successful! Please log in.');
        setFormData({ name: '', email: '', password: '', role: '' });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">Signup</h1>
        
        {error && (
          <p className="text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-600 p-3 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-blue-900 dark:text-white font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-blue-300 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none dark:bg-gray-700 dark:text-white"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-blue-900 dark:text-white font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-blue-300 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none dark:bg-gray-700 dark:text-white"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-blue-900 dark:text-white font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-blue-300 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none dark:bg-gray-700 dark:text-white"
              placeholder="Enter your password"
            />
          </div>

          {/* Role Field */}
          <div>
            <label className="block text-blue-900 dark:text-white font-medium mb-2">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full p-3 border border-blue-300 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none dark:bg-gray-700 dark:text-white"
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="user" className="dark:bg-gray-800">User</option>
              <option value="admin" className="dark:bg-gray-800">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 dark:bg-blue-800 text-white font-bold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-700 transition duration-300"
          >
            Signup
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-blue-800 dark:text-white">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;