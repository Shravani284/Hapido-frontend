import { ApiRequest } from 'berlin-common';

const URL = {
  GETALLTRAVELERTYPE: '/api/v1/admin/travellertypes',
  DELETETRAVELERTYPE: '/api/v1/admin/travellertypes',
  ADDTRAVELERTYPE: '/api/v1/admin/travellertypes',
};

export const getAllTravelerType = async (page: number, rowsPerPage: number) => {
  try {
    const response = await ApiRequest.get(
      `${URL.GETALLTRAVELERTYPE}?page=${page + 1}&limit=${rowsPerPage}`
    );
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const addTraveler = async (payLoad: object) => {
  try {
    const response = await ApiRequest.post(URL.ADDTRAVELERTYPE, payLoad);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const updateTraveler = async (payLoad: object) => {
  try {
    const response = await ApiRequest.patch(URL.ADDTRAVELERTYPE, payLoad);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const getTravelerById = async (id: any) => {
  try {
    const response = await ApiRequest.get(`${URL.ADDTRAVELERTYPE}/${id}`);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const deleteTravelerType = async (id: string) => {
  try {
    const response = await ApiRequest.delete(`${URL.DELETETRAVELERTYPE}/${id}`);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
