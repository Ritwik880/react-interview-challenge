import React, { useState } from 'react';
import axios from 'axios';

function UrlShortner() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');

    const handleShorten = async () => {
        try {
            const response = await axios.post('https://api-ssl.bitly.com/v4/shorten', {
                long_url: originalUrl,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_BITLY_API_KEY', // Replace with your Bitly API key
                },
            });

            setShortenedUrl(response.data.id);
        } catch (error) {
            console.error('Error shortening URL:', error);
        }
    };

    return (
        <div className="App">
            <h1>URL Shortener</h1>
            <div>
                <label>Enter URL:</label>
                <input
                    type="text"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                />
            </div>
            <button onClick={handleShorten}>Shorten</button>
            {shortenedUrl && (
                <div>
                    <p>Shortened URL:</p>
                    <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a>
                </div>
            )}
        </div>
    );
}

export default UrlShortner;
