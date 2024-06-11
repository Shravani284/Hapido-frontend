import { ApiRequest } from 'berlin-common';

const URL = {
  ALLPROMO: '/api/v1/admin/promo',
};

export const getAllPROMO = async (
  page: number,
  rowsPerPage: number,
  data: any
) => {
  let url = `?page=${page}&limit=${rowsPerPage}`;
  if (data?.code) url += `&promocode=${data?.code}`;
  if (data?.coupon_type?.id) url += `&type=${data?.coupon_type?.id}`;
  if (data?.coupon_scope?.id) url += `&scope=${data?.coupon_scope?.id}`;
  if (data?.is_reusable?.id) url += `&isReusable=${data?.is_reusable?.id}`;
  if (data?.first_purchase_only?.id)
    url += `&isFirstPurchase=${data?.first_purchase_only?.id}`;
  if (data?.user_id?.id) url += `&user_id=${data?.user_id?.id}`;
  if (data?.platform?.id) url += `&platform=${data?.platform?.id}`;
  if (data?.active_date) url += `&code_active_date=${data?.active_date}`;
  if (data?.end_date) url += `&code_expiry_date=${data?.end_date}`;
  if (data?.active?.id) url += `&active=${data?.active?.id}`;

  const response = await ApiRequest.get(`${URL.ALLPROMO}${url}`);
  return response.data;
};

export const createPromo = async (payload: any) => {
  return await ApiRequest.post(`${URL.ALLPROMO}`, payload);
};

export const updatePromo = async (payload: any) => {
  try {
    const response = await ApiRequest.patch(URL.ALLPROMO, payload);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const getPromoById = async (id: string | number) => {
  try {
    const response = await ApiRequest.get(`${URL.ALLPROMO}/${id}`);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
