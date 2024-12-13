// AuthForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = ({ type, onSuccess, onError }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const endpoint = type === 'login' ? 'login' : 'register';
        try {
            const response = await fetch(`https://reqres.in/api/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                onSuccess(data.token);
                navigate('/');
            } else {
                onError(data.error || `${type.charAt(0).toUpperCase() + type.slice(1)} failed`);
            }
        } catch (error) {
            onError(`An error occurred during ${type}.`);
        }
    };

    return (
        <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-xl">
            <h3 className="text-center text-2xl font-bold text-gray-800 mb-6">{type === 'login' ? 'Login' : 'Register'}</h3>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <input
                    type="email"
                    className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600">Password</label>
                <input
                    type="password"
                    className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                onClick={handleSubmit}
            >
                {type === 'login' ? 'Login' : 'Register'}
            </button>
            <div className="text-center mt-4 text-sm">
                {type === 'login' ? (
                    <p>
                        Don't have an account?{' '}
                        <a href="/register" className="text-blue-600 font-semibold">Register</a>
                    </p>
                ) : (
                    <p>
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-600 font-semibold">Login</a>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Auth;
