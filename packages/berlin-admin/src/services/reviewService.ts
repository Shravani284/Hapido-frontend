import { ApiRequest } from 'berlin-common';

const URL = {
  GETEREVIEWLIST: '/api/v1/admin/reviews',
  GETREVIEWBYID: '/api/v1/admin/review',
  UPDATEREVIEW: '/api/v1/admin/review',
  DELETEREVIEW: '/api/v1/admin/review',
  GETMERCHANTDOROPDOWN: '/api/v1/admin/merchant',
};

export const getReviewList = async (
  page: number,
  rowsPerPage: number,
  data: any
) => {
  try {
    let url = `?page=${page + 1}&limit=${rowsPerPage}`;
    if (data?.voucher_id) url += `&voucherid=${data?.voucher_id}`;
    if (data?.order_id) url += `&orderid=${data?.order_id}`;
    if (data?.order_number) url += `&ordernumber=${data?.order_number}`;
    if (data?.userId?.id) url += `&customerid=${data?.userId?.id}`;
    if (data?.deal_type) url += `&dealtype=${data?.deal_type.id}`;
    if (data?.dealName?.id) url += `&dealid=${data?.dealName?.id}`;
    if (data?.merchantId?.id) url += `&merchantid=${data?.merchantId?.id}`;
    if (data?.review_stars?.id) url += `&reviewstars=${data?.review_stars?.id}`;
    const response = await ApiRequest.get(
      `${URL.GETEREVIEWLIST}${url}`
      // `${URL.GETEREVIEWLIST}?page=${
      //   page + 1
      // }&limit=${rowsPerPage}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getReviewByIdAPI = async (id: any) => {
  try {
    const response = await ApiRequest.get(`${URL.GETREVIEWBYID}/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateReview = async (payload: any) => {
  try {
    const response = await ApiRequest.patch(URL.UPDATEREVIEW, payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const reviewDelete = async (id: any) => {
  try {
    const response = await ApiRequest.delete(`${URL.DELETEREVIEW}/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const merchantDropDownApi = async () => {
  try {
    const response = await ApiRequest.get(URL.GETMERCHANTDOROPDOWN);
    const data = response.data.data.marchants.map((item: any) => {
      const result: string[] = [];
      item.translations.forEach((e: any) => {
        if (e.column_name === 'name') {
          result.push(e.text);
        }
      });
      return {
        label: result.join(', '),
        id: item.id,
      };
    });
    return data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
