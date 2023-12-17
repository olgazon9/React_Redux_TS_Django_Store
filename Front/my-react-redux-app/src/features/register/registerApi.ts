// src/features/register/registerApi.ts

import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; // Replace with your backend API URL

export const registerApi = async (newUser: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/register/`, newUser);
    return response;
  } catch (error) {
    throw error;
  }
};
