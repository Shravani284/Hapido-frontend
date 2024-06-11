import { ApiRequest } from 'berlin-common';

const URL = {
  ADDDEALBUNDLE: '/api/v1/admin/dealbundle',
  GETALLDEALBUNDLE: '/api/v1/admin/dealbundle',
  DELETEDEALBUNDLE: '/api/v1/admin/dealbundle',
  GETALLDEAL: '/api/v1/admin/deal',
  GETDEALBUNDLEID: '/api/v1/admin/dealbundle',
  UPDATEEALBUNDLE: '/api/v1/admin/dealbundle',
};

export const addDealBundle = async (payLoad: object) => {
  try {
    const response = await ApiRequest.post(URL.ADDDEALBUNDLE, payLoad);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const getDealBundle = async (page: number, limit: number, data: any) => {
  let url = `?page=${page + 1}&limit=${limit}`;
  if (data?.bundleid) url += `&bundleid=${data?.bundleid}`;
  if (data?.name) url += `&name=${data?.name}`;
  if (data?.bundle_child_id)
    url += `&bundle_child_id=${data?.bundle_child_id?.id}`;
  if (data?.categoryid) url += `&categoryid=${data?.categoryid?.id}`;
  if (data?.featured) url += `&featured=${data?.featured?.id}`;
  if (data?.home_widget) url += `&home_widget=${data?.home_widget?.id}`;
  if (data?.platform)
    url +=
      data?.platform.id !== 'BOTH' ? `&platform=${data?.platform?.id}` : '';
  if (data?.active_date) url += `&active_date=${data?.active_date}`;
  if (data?.end_date) url += `&end_date=${data?.end_date}`;
  if (data?.active) url += `&active=${data?.active?.id}`;
  try {
    const response = await ApiRequest.get(`${URL.GETALLDEALBUNDLE}${url}`);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const deleteDealBundle = async (payLoad: object) => {
  try {
    const response = await ApiRequest.patch(URL.DELETEDEALBUNDLE, payLoad);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const getAllDeal = async () => {
  try {
    const response = await ApiRequest.get(`${URL.GETALLDEAL}`);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const getAllBundleChildDeal = async () => {
  try {
    const response = await ApiRequest.get(`${URL.GETALLDEAL}?bundle=true`);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const getAllActiveDeal = async () => {
  try {
    const response = await ApiRequest.get(
      `${URL.GETALLDEAL}?active=1&active_now=Yes`
    );
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const getDealBundleByID = async (id: string | number) => {
  try {
    const response = await ApiRequest.get(`${URL.GETDEALBUNDLEID}/${id}`);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const updateDealBundle = async (payLoad: object) => {
  try {
    const response = await ApiRequest.patch(URL.UPDATEEALBUNDLE, payLoad);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
