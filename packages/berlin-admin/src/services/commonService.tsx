import { ApiRequest } from 'berlin-common';

const URL = {
  ALLDEAL: '/api/v1/admin/deal?active=1',
  ALLACTIVEDEALS: '/api/v1/admin/deal?active=1',
  ALLACTIVEBUNDLEDEALS: '/api/v1/admin/dealbundle?active=1',
  ALLACTIVECOMBODEALS: 'api/v1/admin/dealcombo?active=1',
};

// to get all deal dropDownList
export const getAllDeal = async () => {
  try {
    const response = await ApiRequest.get(`${URL.ALLDEAL}`);
    const data = response.data.data.deals.map((item: any) => {
      const result: string[] = [];
      item.translations.forEach((e: any) => {
        if (e.column_name === 'title_trans_ids' && e.locale == 'en') {
          result.push(e.text);
        }
      });
      return {
        label:
          (item.type?.toLowerCase() === 'bundle' ? 'Bundle - ' : '') +
          result.join(', '),
        id: item.id,
        isSlot: item?.is_slot_enabled,
        slot_allow_allocation_days_count: item.slot_allow_allocation_days_count,
      };
    });
    return data;
  } catch (error) {
    throw error;
  }
};

// deal services
export const allDealsList = async () => {
  try {
    const response = await ApiRequest.get(`${URL.ALLACTIVEDEALS}`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const allBundleList = async () => {
  try {
    const response = await ApiRequest.get(`${URL.ALLACTIVEBUNDLEDEALS}`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const allComboList = async () => {
  try {
    const response = await ApiRequest.get(`${URL.ALLACTIVECOMBODEALS}`);

    return response;
  } catch (error) {
    throw error;
  }
};
