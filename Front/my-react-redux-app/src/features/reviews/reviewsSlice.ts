import { createSlice } from '@reduxjs/toolkit';

export interface Review {
  id: number;
  image: string;
  text: string;
  author: string;
}

// Updated initialState with correct image paths
const initialState: Review[] = [
  { id: 1, image: '/images/image1.png', text: 'Amazing product! Highly recommended for anyone looking for quality.', author: 'John Doe' },
  { id: 2, image: '/images/image2.png', text: 'Exceptional service and fantastic quality. Will definitely buy again!', author: 'Jane Smith' },
  { id: 3, image: '/images/image3.png', text: 'I am thoroughly impressed with the customer support. Highly satisfied!', author: 'Alice Johnson' },
  { id: 4, image: '/images/image4.png', text: 'The product exceeded my expectations in every way. Great value for money!', author: 'Bob Brown' }
];

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    // Reducers logic (if any)
  },
});

export const selectAllReviews = (state: any) => state.reviews;

export default reviewsSlice.reducer;
