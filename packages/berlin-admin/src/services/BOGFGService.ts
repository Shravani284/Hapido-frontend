import { ApiRequest } from 'berlin-common';

const URL = {
  GETBOGFG: 'api/v1/admin/flashsale/fgift',
  POSTBOGFG: 'api/v1/admin/flashsale/fgift',
  UPDATEBOGFG: 'api/v1/admin/flashsale/fgift',
  DELETEBOGFG: 'api/v1/admin/flashsale/fgift',
  GETBOGFGBYID: 'api/v1/admin/flashsale/fgift',
  ALLDEALS: '/api/v1/admin/deal',
  ALLBUNDLEDEALS: '/api/v1/admin/dealbundle',
  ALLCOMBODEALS: 'api/v1/admin/dealcombo',
};

export const getBogfg = async (
  page: number,
  rowsPerPage: number,
  data: any
) => {
  let url = `?page=${page + 1}&limit=${rowsPerPage}`;

  if (data?.dealid) url += `&dealid=${data?.dealid}`;
  if (data?.entitlement_mode)
    url += `&entitlement=${data?.entitlement_mode?.id}`;
  if (data?.platform)
    url +=
      data?.platform.id !== 'BOTH' ? `&platform=${data?.platform?.id}` : '';
  if (data?.active_date) url += `&fs_active_date=${data?.active_date}`;
  if (data?.end_date) url += `&fs_end_date=${data?.end_date}`;
  if (data?.active) url += `&active=${data?.active?.id}`;
  try {
    const response = await ApiRequest.get(`${URL.GETBOGFG}${url}`);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const BogfgCreate = async (payLoad: any) => {
  try {
    const response = await ApiRequest.post(URL.POSTBOGFG, payLoad);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const updateBogfg = async (payLoad: any) => {
  return await ApiRequest.patch(URL.UPDATEBOGFG, payLoad);
};

export const deleteBogfg = async (id: any) => {
  return await ApiRequest.delete(`${URL.DELETEBOGFG}/${id}`);
};

export const getBogfgById = async (id: string) => {
  return await ApiRequest.get(`${URL.GETBOGFGBYID}/${id}`);
};

export const allDealsList = async (page: number, rowsPerPage: number) => {
  try {
    const response = await ApiRequest.get(
      `${URL.ALLDEALS}?page=${page + 1}&limit=${rowsPerPage}`
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const allBundleList = async (page: number, rowsPerPage: number) => {
  try {
    const response = await ApiRequest.get(
      `${URL.ALLBUNDLEDEALS}?page=${page + 1}&limit=${rowsPerPage}`
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const allComboList = async (page: number, rowsPerPage: number) => {
  try {
    const response = await ApiRequest.get(
      `${URL.ALLCOMBODEALS}?page=${page + 1}&limit=${rowsPerPage}`
    );

    return response;
  } catch (error) {
    throw error;
  }
};
