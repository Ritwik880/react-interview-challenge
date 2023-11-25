import React from 'react';
import useLocalStorage from './useLocalStorage';

const MiniChallenge5 = () => {
    const [data, setData] = useLocalStorage('myData', []);

    // Example of API logic
    const fetchData = async () => {
        try {
            const response = await fetch('https://api.example.com/data');
            const newData = await response.json();
            setData(newData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <button onClick={fetchData}>Fetch Data from API</button>
            <p>Data: {JSON.stringify(data)}</p>
        </div>
    );
};

export default MiniChallenge5;
