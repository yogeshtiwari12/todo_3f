import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { mainurl } from './commonfile';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role: User
    const [otp, setOtp] = useState();
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!name || !email || !password || !role) {
            toast.error('Please fill all the fields.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.put(`${mainurl}/userroute21/signup`, {
                name,
                email,
                password,
                role,
            });

            if (response.status === 200) {
                setIsOtpSent(true);
                toast.success('OTP sent successfully');
            }
        } catch (error) {
            toast.error('Error signing up: ' + error.response?.data?.message);
            console.error('Error signing up:', error);
        }
        setLoading(false);
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!otp) {
            toast.error('Please enter the OTP.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${mainurl}/userroute21/signup/verify`, {
                name,
                email,
                otp:otp,
                password,
                role, // Send role for verification
            });

            if (response.status === 200) {
                toast.success('Signup Successful');
                alert("Signup Successful")
                navigate('/login');
            }
        } catch (error) {
            toast.error('Error verifying OTP: ' + error.response?.data?.message);
            console.error('Error verifying OTP:', error);
        }
        setLoading(false);
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isOtpSent ? 'Verify OTP' : 'Sign Up'}
                </h2>

                <form className="space-y-4" onSubmit={isOtpSent ? handleVerifyOtp : handleSignup}>
                    {!isOtpSent && (
                        <>
                            <div>
                                <label htmlFor="name" className="block text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="role" className="block text-gray-700">
                                    Role
                                </label>
                                <select
                                    id="role"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </>
                    )}

                    {isOtpSent && (
                        <div>
                            <label htmlFor="otp" className="block text-gray-700">
                                OTP
                            </label>
                            <input
                                type="number"
                                id="otp"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={otp}
                                onChange={(e) => setOtp(parseInt(e.target.value))}
                                required
                            />
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading}
                        >
                            {loading ? (isOtpSent ? 'Verifying OTP...' : 'Signing Up...') : (isOtpSent ? 'Verify OTP' : 'Sign Up')}
                        </button>
                    </div>

                    {!isOtpSent && (
                        <div>
                            <Link
                                to="/login"
                                className="w-full text-black py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer"
                            >
                                Already have an account? Login
                            </Link>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Signup;
