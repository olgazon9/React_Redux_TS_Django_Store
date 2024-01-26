import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from '../../app/store';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string | File | null; // Image can be a URL string, File object, or null
}

interface ProductState {
  selectedFile: any;
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

const initialState: ProductState = {
  products: [],
  status: 'idle',
  error: null,
  selectedFile: undefined
};

const BASE_URL = 'http://127.0.0.1:8000/products';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<Product[]>(`${BASE_URL}/`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const createProduct = createAsyncThunk(
  'products/createProduct', 
  async (productData: Product, { rejectWithValue, getState }) => {
    try {
      const formData = new FormData();
      const state = getState() as RootState;
      // Adjust this path based on your state structure
      const selectedFile = state.products.selectedFile; 

      Object.entries(productData).forEach(([key, value]) => {
        if (key === 'image') {
          if (selectedFile) {
            // If there is a new file selected, append it
            formData.append(key, selectedFile);
          } // If no file is selected, do not append anything
        } else if (value !== null) {
          // Append other fields normally
          formData.append(key, value.toString());
        }
      });

      const response = await axios.post<Product>(`${BASE_URL}/create/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);


export const updateProduct = createAsyncThunk(
  'products/updateProduct', 
  async ({ id, ...productData }: Product, { rejectWithValue, getState }) => {
    try {
      const formData = new FormData();
      const state = getState() as RootState;
      // Replace with the actual path to selectedFile in your Redux state
      const selectedFile = state.products.selectedFile;

      Object.entries(productData).forEach(([key, value]) => {
        if (key === 'image' && selectedFile) {
          formData.append(key, selectedFile);
        } else if (value !== null && key !== 'image') {
          formData.append(key, value.toString());
        }
      });

      const response = await axios.put<Product>(`${BASE_URL}/update/${id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      console.error(`Error updating product with id ${id}:`, error.response?.data);
      return rejectWithValue(error.message);
    }
  }
);


export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: number, { rejectWithValue }) => {
  try {
    await axios.delete(`${BASE_URL}/delete/${id}/`);
    return id;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error.message);
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'Failed to fetch products.';
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'Failed to create product.';
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'Failed to update product.';
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'Failed to delete product.';
      });
  },
});

export default productsSlice.reducer;
