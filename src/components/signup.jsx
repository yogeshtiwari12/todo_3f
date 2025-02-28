import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { mainurl } from './commonfile';
import { Mail, Lock, User, Shield, Key, Loader2 } from 'lucide-react';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [otp, setOtp] = useState('');
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
                name, email, password, role,

            },
            {withCredentials: true}
        );

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
                name, email, otp, password, role,
            });

            if (response.status === 200) {
                alert('Signup Successful');
                toast.success('Signup Successful');
                navigate('/login');
            }
        } catch (error) {
            toast.error('Error verifying OTP: ' + error.response?.data?.message);
            console.error('Error verifying OTP:', error);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                            {isOtpSent ? 'Verify Your Email' : 'Create Account'}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            {isOtpSent 
                                ? 'Please enter the OTP sent to your email'
                                : 'Join us and start managing your tasks effectively'}
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={isOtpSent ? handleVerifyOtp : handleSignup}>
                        {!isOtpSent && (
                            <>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Shield className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <select
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
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
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Key className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="number"
                                    placeholder="Enter OTP"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                                    value={otp}
                                    onChange={(e) => setOtp(parseInt(e.target.value))}
                                    required
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2"
                            disabled={loading}
                        >
                            {loading && <Loader2 className="animate-spin -ml-1 h-5 w-5" />}
                            <span>
                                {loading 
                                    ? (isOtpSent ? 'Verifying...' : 'Creating Account...') 
                                    : (isOtpSent ? 'Verify OTP' : 'Sign Up')}
                            </span>
                        </button>

                        {!isOtpSent && (
                            <p className="text-center text-gray-600 dark:text-gray-400">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
                                >
                                    Login
                                </Link>
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;