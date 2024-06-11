import { ApiRequest } from 'berlin-common';
import { localeLang } from '../utils/getLang';
const URL = {
  GETDEALBUNDLEID: '/api/v1/admin/dealbundle',
  SUBMITREVIEW: '/api/v1/consumer/review',
  GETVOCHERLIST: '/api/v1/consumer/voucher/getallvouchers',
  UPLOADREVIEWIMAGE: '/api/v1/consumer/uploader/images?table_name=reviews&id=',
  CREATEREVIEW: '/api/v1/consumer/review',
  DOWNLOADVOUCHERS: '/api/v1/consumer/download/vouchers',
};

export const submitReview = async (payLoad: object) => {
  try {
    const response = await ApiRequest.patch(URL.SUBMITREVIEW, payLoad);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const getVoucherList = async (page: number, limit: number) => {
  try {
    const response = await ApiRequest.get(
      `${URL.GETVOCHERLIST}?page=${page}&limit=${limit}&lang=${localeLang}`
    );
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const uploadReviewImages = async (id: number, payload: any) => {
  try {
    const response = await ApiRequest.post(
      `${URL.UPLOADREVIEWIMAGE}${id}`,
      payload
    );
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const createReview = async (payLoad: object) => {
  try {
    const response = await ApiRequest.post(URL.CREATEREVIEW, payLoad);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const downloadVouchers = async (payload: object) => {
  try {
    const response = await ApiRequest.post(URL.DOWNLOADVOUCHERS, payload, {
      headers: {
        'Content-Disposition': 'attachment;',
      },
    });
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
