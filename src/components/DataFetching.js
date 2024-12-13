// DataFetching.js
import React, { useState, useEffect } from 'react';

const DataFetching = ({ type, renderItem }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/${type}`);
                if (!response.ok) throw new Error('Failed to fetch data');
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [type]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="my-6">
            <h3 className="text-center text-2xl font-semibold text-gray-800 mb-4">{type}</h3>
            <ul className="space-y-4">
                {data.map((item) => (
                    <li key={item.id} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
                        {renderItem(item)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DataFetching;
