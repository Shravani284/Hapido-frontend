import { ApiRequest } from 'berlin-common';

const URL = {
  ADDTICKET: '/api/v1/admin/tickets',
  GETDOCSTABLE: '/api/v1/admin/tickets',
};

export const addTicket = async (payLoad: any) => {
  try {
    const response = await ApiRequest.post(`${URL.ADDTICKET}`, payLoad);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const getDocsTable = async (merchantId: number, DealId: number) => {
  let url = ``;
  if (merchantId) url += `?merchantid=${merchantId}`;
  if (DealId) url += `&dealid=${DealId}`;
  try {
    const response = await ApiRequest.get(`${URL.GETDOCSTABLE}${url}`);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
