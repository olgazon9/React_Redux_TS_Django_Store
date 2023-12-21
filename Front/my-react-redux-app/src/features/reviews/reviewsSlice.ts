import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Review {
  id: number;
  image: string;
  text: string;
  author: string;
}

const initialState: Review[] = [
  // Add your review objects here
   { id: 1, image: 'image1.jpg', text: 'Review 1', author: 'Author 1' },
   { id: 3, image: 'image1.jpg', text: 'Review 1', author: 'Author 1' },
   { id: 4, image: 'image1.jpg', text: 'Review 1', author: 'Author 1' },
   { id: 2, image: 'image2.jpg', text: 'Review 2', author: 'Author 2' },
  // ...
];

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    // Add any reducers you might need
  },
});

export const selectAllReviews = (state: any) => state.reviews;

export default reviewsSlice.reducer;
