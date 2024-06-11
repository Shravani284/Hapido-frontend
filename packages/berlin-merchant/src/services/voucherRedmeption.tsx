import { ApiRequest } from 'berlin-common';

const URL = {
  VOUCHERREDEMPTION: '/api/v1/merchant/voucher/redemption',
};

export const addVoucherRedemption = async (payload: any) => {
  try {
    const response = await ApiRequest.post(URL.VOUCHERREDEMPTION, payload);
    return response;
  } catch (error) {
    throw error;
  }
};
