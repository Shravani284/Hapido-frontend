import { ApiRequest } from 'berlin-common';
import { localeLang } from '../utils/getLang';

const URL = {
  GET_ALL_CART_ITEMS: '/api/v1/consumer/cart/getallcartitems',
  ADD_CART: '/api/v1/consumer/cart',
  UPDATE_CART: '/api/v1/consumer/cart',
  DELETE_CART: '/api/v1/consumer/cart/delete',

  CREATEPAYMENTINTENT: 'api/v1/consumer/create/payment',
  // CREATEPAYMENTINTENT: '/api/v1/consumer/create/intents',
  UPDATEPAYMENTINTENT: '/api/v1/consumer/update/intent',
  GETPAYMENTDATA: '/api/v1/consumer/payment/methods',

  COUPON_CODE: '/api/v1/consumer/promo/redeemcode',
  RESET_CODE: '/api/v1/consumer/promo/reset',
};

export const addCart = async () => {
  try {
    const response = await ApiRequest.get(URL.ADD_CART);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCartCount = async (payload: object) => {
  try {
    const response = await ApiRequest.patch(URL.UPDATE_CART, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCart = async (
  id: number,
  deal_type: string,
  payload?: any
) => {
  let url = `?id=${id}`;
  if (deal_type === 'COMBO') {
    url += `&type=${deal_type}`;
  }
  try {
    const response = await ApiRequest.delete(`${URL.DELETE_CART}${url}`, {
      data: payload,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createPaymentIntent = async (payload: object) => {
  try {
    const response = await ApiRequest.post(
      `${URL.CREATEPAYMENTINTENT}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePaymentIntent = async (payload: object) => {
  try {
    const response = await ApiRequest.post(
      `${URL.UPDATEPAYMENTINTENT}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getPaymentData = async () => {
  try {
    const response = await ApiRequest.get(
      `${URL.GETPAYMENTDATA}?lang=${localeLang}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const redeemCode = async (payload: object) => {
  try {
    const response = await ApiRequest.post(URL.COUPON_CODE, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const resetCode = async () => {
  try {
    const response = await ApiRequest.get(
      `${URL.RESET_CODE}?lang=${localeLang}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
