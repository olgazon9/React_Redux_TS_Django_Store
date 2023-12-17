// src/features/login/loginApi.ts

import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; // Replace with your backend API URL

export const loginApi = async (credentials: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/login/`, credentials);
    return response;
  } catch (error) {
    throw error;
  }
};
