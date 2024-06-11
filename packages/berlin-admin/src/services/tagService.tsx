import { ApiRequest } from 'berlin-common';

const URL = {
  ALLTAG: '/api/v1/admin/tags',
};

export const getAllTags = async (page: number, rowsPerPage: number) => {
  return await ApiRequest.get(
    `${URL.ALLTAG}?page=${page + 1}&limit=${rowsPerPage}`
  );
};

export const createTag = async (payload: any) => {
  return await ApiRequest.post(`${URL.ALLTAG}`, payload);
};

export const updateTag = async (payload: any) => {
  try {
    const response = await ApiRequest.patch(URL.ALLTAG, payload);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const deleteTag = async (payload: any) => {
  try {
    const response = await ApiRequest.delete(`${URL.ALLTAG}/${payload}`);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const getTagById = async (id: string | number) => {
  try {
    const response = await ApiRequest.get(`${URL.ALLTAG}/${id}`);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
