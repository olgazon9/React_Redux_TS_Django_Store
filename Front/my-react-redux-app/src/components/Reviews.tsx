import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllReviews, Review } from '../features/reviews/reviewsSlice';
import '../features/reviews/Reviews.css'; // Ensure this path is correct

const Reviews: React.FC = () => {
  const reviews = useSelector(selectAllReviews) as Review[];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => setCurrentIndex((index) => (index + 1) % reviews.length);
  const prevReview = () => setCurrentIndex((index) => (index - 1 + reviews.length) % reviews.length);

  return (
    <div className="reviews-gallery">
      <button className="arrow left" onClick={prevReview}>&lt;</button>
      <div className="review-card">
        <img src={reviews[currentIndex].image} alt={`Review by ${reviews[currentIndex].author}`} />
        <p>{reviews[currentIndex].text}</p>
        <h3>{reviews[currentIndex].author}</h3>
      </div>
      <button className="arrow right" onClick={nextReview}>&gt;</button>
    </div>
  );
};

export default Reviews;
