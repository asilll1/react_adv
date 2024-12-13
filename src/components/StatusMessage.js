// StatusMessage.js
import React from 'react';

const StatusMessage = ({ message, type }) => {
    if (!message) return null;

    return (
        <div className={`transition-all duration-300 p-4 rounded-lg mt-4 ${type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
        </div>
    );
};

export default StatusMessage;
