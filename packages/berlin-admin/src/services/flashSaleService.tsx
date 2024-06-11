import { ApiRequest } from 'berlin-common';

const URL = {
  GETALLBOGO: '/api/v1/admin/flashsale/bogo',
  UPDATEBOGO: '/api/v1/admin/flashsale/bogo',
  DELETEBOGO: '/api/v1/admin/flashsale/bogo/',
  UPDATEBOGOBYID: '/api/v1/admin/flashsale/bogo/',
  ALLDEALS: '/api/v1/admin/deal?active=1',
  ALLBUNDLEDEALS: '/api/v1/admin/dealbundle?active=1',
  ALLCOMBODEALS: '/api/v1/admin/dealcombo?active=1',
};

export const getALlBOGO = async (
  page: number,
  rowsPerPage: number,
  data: any
) => {
  try {
    let url = `?page=${page + 1}&limit=${rowsPerPage}`;
    if (data?.dealtype) url += `&dealtype=${data?.dealtype.id}`;
    if (data?.dealid) url += `&dealid=${data?.dealid}`;
    if (data?.platform)
      url +=
        data?.platform.id !== 'BOTH' ? `&platform=${data?.platform?.id}` : '';
    if (data?.active_date) url += `&fs_active_date=${data?.active_date}`;
    if (data?.end_date) url += `&fs_end_date=${data?.end_date}`;
    if (data?.active) url += `&active=${data?.active?.id}`;
    const response = await ApiRequest.get(`${URL.GETALLBOGO}${url}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createBOGO = async (payLoad: any) => {
  try {
    const response = await ApiRequest.post(URL.GETALLBOGO, payLoad);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBOGO = async (id: any) => {
  return await ApiRequest.delete(`${URL.DELETEBOGO}${id}`);
};

export const getBOGOByID = async (id: string) => {
  try {
    const response = await ApiRequest.get(`${URL.UPDATEBOGOBYID}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBOGO = async (payload: object) => {
  try {
    const response = await ApiRequest.patch(`${URL.UPDATEBOGO}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
