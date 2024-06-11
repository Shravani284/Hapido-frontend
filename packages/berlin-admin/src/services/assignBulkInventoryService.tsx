import { ApiRequest } from 'berlin-common';

const URL = {
  ADDBULKINVENTORY: '/api/v1/admin/bulk-allocate',
  GET_DEAL_BY_ID: '/api/v1/admin/deal',
};

export const addBulkInventory = async (payLoad: any) => {
  try {
    const response = await ApiRequest.post(`${URL.ADDBULKINVENTORY}`, payLoad);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const getDealById = async (id: any) => {
  try {
    const response = await ApiRequest.get(`${URL.GET_DEAL_BY_ID}/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
