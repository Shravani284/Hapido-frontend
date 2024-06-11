import { ApiRequest } from 'berlin-common';
import { string } from 'yup';

const URL = {
  DELETEADDRESS: '/api/v1/users/auth/removeaddress',
};

export const deleteAddress = async (id: number) => {
  try {
    const response = await ApiRequest.delete(`${URL.DELETEADDRESS}/${id}`);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
