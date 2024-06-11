import { ApiRequest } from 'berlin-common';

const URL = {
  GETCITY: '/api/v1/admin/city',
  DELETECITY: '/api/v1/admin/city',
  UPDATECITY: '/api/v1/admin/city',
  UPDATECITYBYID: '/api/v1/admin/city/',
};

export const createCity = async (payLoad: any) => {
  try {
    const response = await ApiRequest.post(URL.GETCITY, payLoad);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const deleteCity = async (payLoad: { id: string; active: boolean }) => {
  return await ApiRequest.patch(URL.DELETECITY, payLoad);
};

export const getCityByID = async (id: string) => {
  try {
    const response = await ApiRequest.get(`${URL.UPDATECITYBYID}${id}`);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const updateCity = async (payload: object) => {
  try {
    const response = await ApiRequest.patch(`${URL.UPDATECITY}`, payload);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
