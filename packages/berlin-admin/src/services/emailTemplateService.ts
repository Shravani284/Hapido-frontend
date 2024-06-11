import { ApiRequest } from 'berlin-common';

const URL = {
  GETEMAILTEMPLATEALL: '/api/v1/admin/email/template',
  ADDEMAILTEMPLATE: '/api/v1/admin/email/template',
  UPDATEGETEMAILTEMPLATE: '/api/v1/admin/email/template',
  DELETEGETEMAILTEMPLATE: '/api/v1/admin/email/template',
  GETEMAILTEMPLATEID: '/api/v1/admin/email/template',
};

export const getEmailTemplateAll = async (page: number, rowsPerPage: number) => {
  try {
    const response = await ApiRequest.get(
      `${URL.GETEMAILTEMPLATEALL}?page=${page + 1}&limit=${rowsPerPage}`
    );
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const addEmailTemplate= async (payLoad: any) => {
  return await ApiRequest.post(URL.ADDEMAILTEMPLATE, payLoad);
};

export const UpdateEmailTemplate = async (payLoad: any) => {
  try {
    const response = await ApiRequest.patch(URL.UPDATEGETEMAILTEMPLATE, payLoad);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const getTemplateByIdAPI = async (id: any) => {
  try {
    const response = await ApiRequest.get(`${URL.GETEMAILTEMPLATEID}/${id}`);
    return response;
  } catch (error) {
    throw error; 
  }
};

export const templateDelete = async (id: any) => {
  return await ApiRequest.delete(`${URL.DELETEGETEMAILTEMPLATE}/${id}`);
};


