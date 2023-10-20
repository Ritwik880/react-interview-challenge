import React from 'react';

const Child = () => {
  const handleReviewSubmit = (reviewData) => {
    console.log('Review Submitted:', reviewData);
  };

  return (
    <ReviewPromptWrapper submitHandler={handleReviewSubmit}>
      <button>Button 1</button>
      <button>Button 2</button>
      <button>Button 3</button>
    </ReviewPromptWrapper>
  );
};

export default Child;
