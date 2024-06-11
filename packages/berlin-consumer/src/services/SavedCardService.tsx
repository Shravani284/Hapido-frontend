import { ApiRequest } from 'berlin-common';
import { localeLang } from '../utils/getLang';

const URL = {
  GETALLCARDS: '/api/v1/cards?',
  DELETECARD: '/api/v1/deletecard',
  DEFAULTCARD: '/api/v1/defaultcard',
};

export const getAllCards = async () => {
  try {
    const response = await ApiRequest.get(
      `${URL.GETALLCARDS}?lang=${localeLang}`
    );
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const deleteCard = async (payLoad: object) => {
  try {
    const response = await ApiRequest.patch(URL.DELETECARD, payLoad);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const defaultCard = async (payLoad: object) => {
  try {
    const response = await ApiRequest.patch(URL.DEFAULTCARD, payLoad);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
