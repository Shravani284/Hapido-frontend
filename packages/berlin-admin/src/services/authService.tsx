import { ApiRequest } from 'berlin-common';

const URL = {
  LOGIN: '/api/v1/admin/users/auth/login',
};

export const login = async (payLoad: { email: string; password: string }) => {
  try {
    const response = await ApiRequest.post(URL.LOGIN, payLoad);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
