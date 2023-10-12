// Write a functional component that allows a user to enter ratings on the five-star system. The component should initially display five empty stars in a row. When the user hovers over a star, that star as well as all the stars that come before it in the row should become filled (both the empty star and filled star image URLs are provided in the started code below). When the user stops hovering over the star, the component should return to its starting state. Further, if a user clicks on a star, then the component should continue to display that rating even after the user stops hovering; the component should reset only after the user hovers on a star that comes before the clicked star. If the user hovers over later stars, the component should fill those stars but should still display the clicked rating after the hover ends.

import React, { useState, useEffect } from 'react';
import { BodyWrapper } from '../styles/StyledComponent';
import { Grid } from '@mui/material';

const OptimiseChallenge12 = () => {
    const STAR_COUNT = 5;
    const EMPTY_STAR_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/1088px-Five-pointed_star.svg.png";
    const FULL_STAR_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/1200px-Gold_Star.svg.png";

    const [rating, setRating] = useState(0);
    const [emptyStarImageURL, setEmptyStarImageURL] = useState('');
    const [fullStarImageURL, setFullStarImageURL] = useState('');

    const handleStarInteraction = (starIndex) => {
        setRating(starIndex + 1);
    };

    useEffect(() => {
        const fetchImageURLs = async () => {
            try {
                const [emptyStarRes, fullStarRes] = await Promise.all([
                    fetch(EMPTY_STAR_URL),
                    fetch(FULL_STAR_URL)
                ]);

                if (emptyStarRes.ok) {
                    setEmptyStarImageURL(emptyStarRes.url);
                } else {
                    throw new Error(`Failed to fetch empty star image. Status code: ${emptyStarRes.status}`);
                }

                if (fullStarRes.ok) {
                    setFullStarImageURL(fullStarRes.url);
                } else {
                    throw new Error(`Failed to fetch full star image. Status code: ${fullStarRes.status}`);
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
                {Array.from({ length: STAR_COUNT }).map((_, index) => (
                    <Grid item lg={3} md={4} xs={12} key={index}>
                        <img
                            src={index < rating ? fullStarImageURL : emptyStarImageURL}
                            alt={index < rating ? "Full Star" : "Empty Star"}
                            onMouseEnter={() => handleStarInteraction(index)}
                            onClick={() => handleStarInteraction(index)}
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
