import React, { useState } from 'react';

const Challenge22 = ({ submitHandler, children }) => {
  const [interactionCount, setInteractionCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(3); // Default rating

  const handleChildClick = () => {
    setInteractionCount(interactionCount + 1);

    if (interactionCount >= 2) {
      setShowModal(true);
    }
  };

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value, 10));
  };

  const handleSubmit = () => {
    const reviewData = {
      rating,
    };

    submitHandler(reviewData);

    // Close the modal
    setShowModal(false);
  };

  return (
    <div>
      {React.Children.map(children, (child, index) => (
        React.cloneElement(child, {
          key: index,
          onClick: handleChildClick,
        })
      ))}

      {showModal && (
        <div className="modal">
          <h2>Leave a Review</h2>
          <p>Rate your experience:</p>
          <input
            type="range"
            min="1"
            max="5"
            value={rating}
            onChange={handleRatingChange}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Challenge22;