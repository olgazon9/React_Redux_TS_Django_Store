// src/features/login/loginApi.ts

import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:8000'; // Replace with your backend API URL

export const loginApi = async (credentials: any) => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post(`${BASE_URL}/login/`, credentials, config);
    return response;
  } catch (error) {
    throw error;
  }
};
