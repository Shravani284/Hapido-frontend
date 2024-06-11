import { ApiRequest } from 'berlin-common';

const URL = {
  GETCOUNTRY: '/api/v1/admin/country',
  ADDCOUNTRY: '/api/v1/admin/country',
  GETCITY: '/api/v1/admin/city',
  DELETECOUNTRY: '/api/v1/admin/country',
  GETCOUNTRYBYID: '/api/v1/admin/country',
};

export const getCountry = async (
  page: number,
  rowsPerPage: number,
  data: any
) => {
  try {
    let url = `?page=${page + 1}&limit=${rowsPerPage}`;
    if (data?.countryName) url += `&name=${data?.countryName}`;
    if (data?.filterSort?.id) url += `&sort=${data?.filterSort?.id}`;
    if (data?.filterStatus) url += `&active=${data?.filterStatus?.id}`;

    const response = await ApiRequest.get(`${URL.GETCOUNTRY}${url}`);
    return response;
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const addCountry = async (payLoad: any) => {
  return await ApiRequest.post(URL.ADDCOUNTRY, payLoad);
};

export const getCityDropDown = async () => {
  try {
    const response = await ApiRequest.get(`${URL.GETCITY}?active=1`);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const getCity = async (page: number, rowsPerPage: number, data: any) => {
  try {
    let url = `?page=${page + 1}&limit=${rowsPerPage}`;
    if (data?.cityName) url += `&name=${data?.cityName}`;
    if (data?.filterSort?.id) url += `&sort=${data?.filterSort?.id}`;
    if (data?.filterStatus) url += `&active=${data?.filterStatus?.id}`;
    if (data?.filterCountry) url += `&countryId=${data?.filterCountry?.id}`;
    const response = await ApiRequest.get(`${URL.GETCITY}${url}`);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const updateCountry = async (payLoad: any) => {
  return await ApiRequest.patch(URL.ADDCOUNTRY, payLoad);
};

export const deleteCountry = async (payLoad: {
  id: string;
  active: boolean;
}) => {
  return await ApiRequest.patch(URL.DELETECOUNTRY, payLoad);
};

export const getCountryById = async (id: string) => {
  return await ApiRequest.get(`${URL.GETCOUNTRYBYID}/${id}`);
};
