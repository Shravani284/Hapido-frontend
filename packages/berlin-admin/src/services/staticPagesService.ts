import { ApiRequest } from 'berlin-common';

const URL = {
  GETSTATICPAGES: '/api/v1/admin/static',
};

export const getAllStaticPages = async (page: number, rowsPerPage: number) => {
  try {
    const response = await ApiRequest.get(
      `${URL.GETSTATICPAGES}?page=${page + 1}&limit=${rowsPerPage}`
    );
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const createStaticPage = async (payLoad: any) => {
  try {
    const response = await ApiRequest.post(URL.GETSTATICPAGES, payLoad);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const updateStaticPage = async (payLoad: any) => {
  return await ApiRequest.patch(URL.GETSTATICPAGES, payLoad);
};

export const getStaticPage = async (id: string) => {
  return await ApiRequest.get(`${URL.GETSTATICPAGES}/${id}`);
};
