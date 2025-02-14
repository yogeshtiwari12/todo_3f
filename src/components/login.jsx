import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { mainurl } from './commonfile';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${mainurl}/userroute21/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.status) {
        alert(response.data.message);
  
        setEmail('');
        setPassword('');
      }
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      navigate('/')
    } catch (err) {
      alert(err?.response?.data?.message)
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-blue-900 font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-blue-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-blue-900 font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-blue-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-500 transition duration-300"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-blue-800">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
