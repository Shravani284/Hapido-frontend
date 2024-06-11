import { ApiRequest } from 'berlin-common';
import moment from 'moment';

const URL = {
  // GETALLMERCHANTDEALS: '/api/v1/admin/merchantdeals',
  GET_DEAL_SLOTS: '/api/v1/merchant/deal/',
  GET_COUNTS: '/api/v1/merchant/deal/',
  ASSIGN_INVENTORY: '/api/v1/merchant/inventory/assign',
  GET_CALENDARS_API: '/api/v1/merchant/deal/',
  GETDEALBUNDLEID: '/api/v1/merchant/bundledeal',
  COMBINE_DEALS: '/api/v1/admin/combinedeals',
};

export const getDealSlots = async (
  id: string | number,
  selectedDate: string
) => {
  try {
    const date = moment(selectedDate).format('YYYY-MM-DD');
    const response = await ApiRequest.get(
      `${URL.GET_DEAL_SLOTS}${id}/slots?selectedDate=${date}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDealCounts = async (id: string | number) => {
  try {
    const response = await ApiRequest.get(
      `${URL.GET_COUNTS}${id}/inventory/count`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDealCalender = async (id: string | number) => {
  try {
    const response = await ApiRequest.get(
      `${URL.GET_CALENDARS_API}${id}/inventory/calendar`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AssignInventory = async (payload: any) => {
  try {
    const response = await ApiRequest.post(`${URL.ASSIGN_INVENTORY}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDealBundleByID = async (id: string | number) => {
  try {
    const response = await ApiRequest.get(`${URL.GETDEALBUNDLEID}/${id}`);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

// All single and bundle parent deal API
export const getAllInventoryMerchantDeals = async (id: number) => {
  try {
    const response = await ApiRequest.get(
      `${URL.COMBINE_DEALS}?merchantid=${id}&active=1&slot_enabled=1`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
