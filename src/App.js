// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AuthForm from './components/Auth';
import StatusMessage from './components/StatusMessage';
import DataFetching from './components/DataFetching';
import Logout from './components/Logout';

function App() {
    const [token, setToken] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleAuthSuccess = (token) => {
        setToken(token);
        setMessage('Authentication successful!');
        navigate('/');
    };

    const handleLogout = () => {
        setToken(null);
        setMessage('Logged out successfully!');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-center text-4xl font-bold text-gray-900 mb-10">
                {'Hello'}
            </h1>

            <Routes>
                <Route
                    path="/"
                    element={
                        token ? (
                            <div className="space-y-12">
                                <DataFetching
                                    type="users"
                                    renderItem={(user) => <span>{user.name}</span>}
                                />
                                <DataFetching
                                    type="posts"
                                    renderItem={(post) => <span>{post.title}</span>}
                                />
                                <StatusMessage message={message} type="success" />
                            </div>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/register"
                    element={
                        <AuthForm
                            type="register"
                            onSuccess={handleAuthSuccess}
                            onError={setMessage}
                        />
                    }
                />
                <Route
                    path="/login"
                    element={
                        <AuthForm
                            type="login"
                            onSuccess={handleAuthSuccess}
                            onError={setMessage}
                        />
                    }
                />
            </Routes>

            {token && (
                <div className="text-center mt-6">
                    <Logout onLogout={handleLogout} />
                </div>
            )}
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}
