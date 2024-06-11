import { ApiRequest } from 'berlin-common';
import { localeLang } from '../utils/getLang';

const URL = {
  UPDATEADDRESS: '/api/v1/users/auth/updateconsumer',
  GETALLAREA: '/api/v1/consumer/areas',
  GETCOUNTRY: '/api/v1/consumer/country',
  ADDADDRESS: '/api/v1/users/auth/updateconsumer',
  UPDATE_PROFILE: '/api/v1/users/auth/updateconsumer',
  GET_ALL_CATEGORIES: '/api/v1/consumer/categories',
  DELETE_CONSUMER: '/api/v1/users/auth/deleteconsumer',
  CHANGE_PASSWORD: '/api/v1/users/auth/changepassword',
  GETCITY: 'api/v1/consumer/cities',
  GETAREABYID: '/api/v1/consumer/area',
};

// export const updateAddress = async () => {
//   try {
//     const response = await ApiRequest.get(URL.UPDATEADDRESS);
//     return response.data; // Assuming the API response contains the 'data' property
//   } catch (error) {
//     throw error; // Re-throw the error to handle it higher up in the call stack
//   }
// };

export const getAllAreaList = async () => {
  try {
    const response = await ApiRequest.get(`${URL.GETAREABYID}`);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const addAddress = async (payload: object) => {
  try {
    const response = await ApiRequest.patch(`${URL.ADDADDRESS}`, payload);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const getAllArea = async (id: string) => {
  try {
    const response = await ApiRequest.get(
      `${URL.GETALLAREA}/${id}?lang=${localeLang}`
    );

    return response;
  } catch (error) {
    throw error;
  }
};
export const getCountryDropDown = async () => {
  try {
    const response = await ApiRequest.get(
      `${URL.GETCOUNTRY}?lang=${localeLang}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getCityByCountryId = async (id: string) => {
  try {
    const response = await ApiRequest.get(
      `${URL.GETCITY}/${id}?lang=${localeLang}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (payload: object) => {
  try {
    const response = await ApiRequest.patch(`${URL.UPDATE_PROFILE}`, payload);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const deleteUser = async (payload: object) => {
  try {
    const response = await ApiRequest.patch(`${URL.DELETE_CONSUMER}`, payload);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const changePassword = async (payLoad: any) => {
  try {
    const response = await ApiRequest.post(URL.CHANGE_PASSWORD, payLoad);
    return response.data;
  } catch (error) {
    throw error;
  }
};
