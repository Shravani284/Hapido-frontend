import { ApiRequest } from 'berlin-common';
import { localeLang } from '../utils/getLang';

const URL = {
  CONSUMER_PROFILE: '/api/v1/users/auth/getconsumer',
  UPDATE_PROFILE: '/api/v1/users/auth/updateconsumer',
  GET_ALL_CATEGORIES: '/api/v1/consumer/categories',
  DELETE_CONSUMER: '/api/v1/users/auth/deleteconsumer',
  CHANGE_PASSWORD: '/api/v1/users/auth/changepassword',
  GETOTP: '/api/v1/users/auth/send/otp?mode=SMS',
  VERIFYOTP: '/api/v1/users/auth/verify/mobileotp?mode=SMS',
};

export const getUserProfile = async () => {
  try {
    const response = await ApiRequest.get(
      `${URL.CONSUMER_PROFILE}?lang=${localeLang}`
    );
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const getAllCategory = async () => {
  try {
    const response = await ApiRequest.get(
      `${URL.GET_ALL_CATEGORIES}?lang=${localeLang}`
    );
    return response.data;
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
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

export const NumberOTP = async (payLoad: any) => {
  try {
    const response = await ApiRequest.post(URL.GETOTP, { mobile: payLoad });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changeNumberOTP = async (payLoad: any) => {
  try {
    const response = await ApiRequest.post(URL.VERIFYOTP, payLoad);
    return response.data;
  } catch (error) {
    throw error;
  }
};
