import { ApiRequest } from 'berlin-common';

const URL = {
  DEALSLIST: 'api/v1/merchant/deals',
  DEALEXCEL: 'api/v1/merchant/voucher/downloadvoucher',
};

export const dealsList = async (
  page: number,
  rowsPerPage: number,
  data: any,
  lang: String
) => {
  let url = `?lang=${lang}&page=${page + 1}&limit=${rowsPerPage}`;
  if (data?.status?.id && data?.status?.id !== 'all')
    url += `&status=${data.status?.id}`;
  if (data?.vouchertype?.id) url += `&vouchertype=${data.vouchertype?.id}`;
  if (data?.category?.id) url += `&categoryid=${data?.category?.id}`;
  if (data?.dealid) url += `&dealid=${data?.dealid}`;
  if (data?.dealName) url += `&searchTerm=${data?.dealName}`;
  if (data?.dealBookingfilter === 'Y') url += `&is_slot_enabled=true`;
  if (data?.dealBookingfilter === 'N') url += `&is_slot_enabled=false`;
  try {
    const response = await ApiRequest.get(`${URL.DEALSLIST}${url}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const dealExcel = async (payLoad: any) => {
  try {
    const response = await ApiRequest.post(
      `${URL.DEALEXCEL}?merchantId=${payLoad?.merchantId}&dealId=${payLoad?.dealId}&dealType=${payLoad?.dealType}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
