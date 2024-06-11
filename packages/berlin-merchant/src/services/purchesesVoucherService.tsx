import { ApiRequest } from 'berlin-common';

const URL = {
  GET_PURCHESES_VOUCHER: '/api/v1/admin/merchant/voucher/list',
};

export const getPurchesesVoucherList = async (
  page: number,
  rowsPerPage: number,
  lang: string,
  data: any
) => {
  try {
    let url = `?lang=${lang}&page=${page + 1}&limit=${rowsPerPage}`;
    if (data?.dealName) url += `&dealname=${data?.dealName}`;
    if (data?.category?.id) url += `&categoryid=${data?.category?.id}`;
    if (data?.voucherCode) url += `&code=${data?.voucherCode}`;
    if (data?.startOrderDate) url += `&startdate=${data?.startOrderDate}`;
    if (data?.endOrderDate) url += `&enddate=${data?.endOrderDate}`;
    if (data?.status) url += `&status=${data?.status}`;
    if (data?.startRedeemedDate)
      url += `&redeem_start_date=${data?.startRedeemedDate}`;
    if (data?.endRedeemedDate)
      url += `&redeem_end_date=${data?.endRedeemedDate}`;

    const response = await ApiRequest.get(`${URL.GET_PURCHESES_VOUCHER}${url}`);
    return response;
  } catch (error) {
    throw error;
  }
};
