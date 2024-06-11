import { ApiRequest } from 'berlin-common';

const URL = {
  ADDEXTCODE: '/api/v1/admin/codes',
  GETALLCODES: '/api/v1/admin/codes',
};

export const addExternalCode = async (payLoad: object) => {
  try {
    const response = await ApiRequest.post(URL.ADDEXTCODE, payLoad);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const getAllCodes = async (merchant_id: number, deal_id: number) => {
  try {
    const response = await ApiRequest.get(
      `${URL.GETALLCODES}?merchant_id=${merchant_id}&deal_id=${deal_id}`
    );
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
