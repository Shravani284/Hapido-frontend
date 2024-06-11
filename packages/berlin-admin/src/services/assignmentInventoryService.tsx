import { ApiRequest } from 'berlin-common';
import moment from 'moment';

const URL = {
  GETALLMERCHANTDEALS: '/api/v1/admin/merchantdeals',
  GET_DEAL_SLOTS: '/api/v1/admin/deal/',
  GET_COUNTS: '/api/v1/admin/deal/',
  ASSIGN_INVENTORY: '/api/v1/admin/inventory/assign',
  GET_CALENDARS_API: '/api/v1/admin/deal/',
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
