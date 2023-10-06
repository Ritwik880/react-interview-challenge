import React, { useState, useEffect } from 'react';
import { BodyWrapper } from '../styles/StyledComponent';
import { Grid } from '@mui/material';

const Challenge12 = () => {
    const EMPTY_STAR_URL =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/1088px-Five-pointed_star.svg.png";
    const FULL_STAR_URL =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/1200px-Gold_Star.svg.png";

    // Initialize state to keep track of user's rating
    const [rating, setRating] = useState(0);
    const [emptyStarImageURL, setEmptyStarImageURL] = useState('');
    const [fullStarImageURL, setFullStarImageURL] = useState('');

    // Function to handle hover over a star
    const handleStarHover = (starIndex) => {
        // Update the rating to the hovered star
        setRating(starIndex + 1);
    };

    // Function to handle click on a star
    const handleStarClick = (starIndex) => {
        // Set the rating to the clicked star
        setRating(starIndex + 1);
    };

    useEffect(() => {
        // Fetch image URLs and update state when they are available
        const fetchImageURLs = async () => {
            try {
                const emptyStarRes = await fetch(EMPTY_STAR_URL);
                if (emptyStarRes.ok) {
                    setEmptyStarImageURL(emptyStarRes.url);
                } else {
                    throw new Error(`Failed to fetch data. Status code: ${emptyStarRes.status}`);
                }

                const fullStarRes = await fetch(FULL_STAR_URL);
                if (fullStarRes.ok) {
                    setFullStarImageURL(fullStarRes.url);
                } else {
                    throw new Error(`Failed to fetch data. Status code: ${fullStarRes.status}`);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchImageURLs();
    }, []);

    return (
        <BodyWrapper>
            <Grid container spacing={2}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <Grid item lg={3} md={4} xs={12} key={index}>
                        <img
                            src={index < rating ? fullStarImageURL : emptyStarImageURL}
                            alt={index < rating ? "Full Star" : "Empty Star"}
                            onMouseEnter={() => handleStarHover(index)}
                            onMouseLeave={() => { }}
                            onClick={() => handleStarClick(index)}
                            style={{ cursor: "pointer" }}
                            width={200}
                            height={200}
                        />
                    </Grid>
                ))}
            </Grid>
        </BodyWrapper>
    );
};

export default Challenge12;
