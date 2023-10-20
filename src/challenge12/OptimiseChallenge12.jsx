import React, { useState, useEffect } from 'react';
import { BodyWrapper } from '../styles/StyledComponent';
import { Grid } from '@mui/material';

const OptimiseChallenge12 = () => {
    const EMPTY_STAR_URL =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/1088px-Five-pointed_star.svg.png";
    const FULL_STAR_URL =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/1200px-Gold_Star.svg.png";

    // Initialize state to keep track of user's rating
    const [rating, setRating] = useState(0);

    // Fetch star image URLs
    const [emptyStarImageURL, setEmptyStarImageURL] = useState(EMPTY_STAR_URL);
    const [fullStarImageURL, setFullStarImageURL] = useState(FULL_STAR_URL);

    // Function to handle hover and click on a star
    const handleStarHover = (starIndex) => {
        // Update the rating to the hovered star
        setRating(starIndex + 1);
    };

    // Function to reset rating when mouse leaves the stars
    const resetRating = () => {
        setRating(0);
    };

    useEffect(() => {
        // Preload star images
        const preloadImages = async () => {
            const emptyStarImage = new Image();
            emptyStarImage.src = EMPTY_STAR_URL;

            const fullStarImage = new Image();
            fullStarImage.src = FULL_STAR_URL;
        };

        preloadImages();
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
                            onMouseLeave={resetRating}
                            onClick={() => handleStarHover(index)}
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

export default OptimiseChallenge12;
