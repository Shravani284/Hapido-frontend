import { ApiRequest } from 'berlin-common';

const URL = {
  GETFLASHSALE: '/api/v1/admin/flashsale/bosd',
  POSTFLASHSALE: 'api/v1/admin/flashsale/bosd',
  ADDFLASHSALE: '/api/v1/admin/flashsale/bosd',
  DELETEFLASHSALE: '/api/v1/admin/flashsale/bosd',
  GETFLASHSALEBYID: '/api/v1/admin/flashsale/bosd',
  ALLDEALS: '/api/v1/admin/deal',
  ALLBUNDLEDEALS: '/api/v1/admin/dealbundle',
  ALLCOMBODEALS: 'api/v1/admin/dealcombo',
};

export const getFlashSale = async (
  page: number,
  rowsPerPage: number,
  data: any
) => {
  try {
    let url = `?page=${page + 1}&limit=${rowsPerPage}`;
    if (data?.deal_1_type) url += `&deal_1_type=${data?.deal_1_type.id}`;
    if (data?.deal_id_1) url += `&deal_id_1=${data?.deal_id_1}`;
    if (data?.deal_2_type) url += `&deal_2_type=${data?.deal_2_type.id}`;
    if (data?.deal_id_2) url += `&deal_id_2=${data?.deal_id_2}`;
    if (data?.platform)
      url +=
        data?.platform.id !== 'BOTH' ? `&platform=${data?.platform?.id}` : '';
    if (data?.active_date) url += `&fs_active_date=${data?.active_date}`;
    if (data?.end_date) url += `&fs_end_date=${data?.end_date}`;
    if (data?.active) url += `&active=${data?.active?.id}`;
    const response = await ApiRequest.get(`${URL.GETFLASHSALE}${url}`);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const FlashSaleCreate = async (payLoad: any) => {
  try {
    const response = await ApiRequest.post(URL.POSTFLASHSALE, payLoad);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const updateFlashSale = async (payLoad: any) => {
  return await ApiRequest.patch(URL.ADDFLASHSALE, payLoad);
};

export const deleteFlashSale = async (id: any) => {
  return await ApiRequest.delete(`${URL.DELETEFLASHSALE}/${id}`);
};

export const getFlashSaleById = async (id: string) => {
  return await ApiRequest.get(`${URL.GETFLASHSALEBYID}/${id}`);
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
