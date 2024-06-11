import { ApiRequest } from 'berlin-common';
import { TranslationType } from '../pages/category/constants/types';

const URL = {
  REFUNDLISTS: '/api/v1/admin/refund',
  GETREFUNDDETAILS: '/api/v1/admin/refund',
  UPDATEREFUND: '/api/v1/admin/refund',
  GETMERCHANTDOROPDOWN: '/api/v1/admin/merchant',
};

export const getAllRefundList = async (
  page: number,
  rowsPerPage: number,
  data: any
) => {
  let url = `?page=${page + 1}&limit=${rowsPerPage}`;
  if (data?.refund_status?.id) url += `&status=${data?.refund_status?.id}`;
  if (data?.voucher_id) url += `&voucherid=${data?.voucher_id}`;
  if (data?.order_number) url += `&ordernumber=${data?.order_number}`;
  if (data?.order_id) url += `&orderid=${data?.order_id}`;
  if (data?.deal_type) url += `&dealtype=${data?.deal_type.id}`;
  if (data?.merchantId?.id) url += `&merchantid=${data?.merchantId?.id}`;
  if (data?.userId?.id) url += `&userid=${data?.userId?.id}`;
  if (data?.dealName?.id) url += `&dealid=${data?.dealName?.id}`;

  const response = await ApiRequest.get(`${URL.REFUNDLISTS}${url}`);
  return response.data;
};

export const getRefundDetails = async (id: any) => {
  try {
    const response = await ApiRequest.get(`${URL.GETREFUNDDETAILS}/${id}`);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const updateRefund = async (payLoad: any) => {
  try {
    const response = await ApiRequest.patch(`${URL.UPDATEREFUND}`, payLoad);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
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
