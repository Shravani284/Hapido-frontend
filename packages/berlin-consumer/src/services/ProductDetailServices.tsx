import { ApiRequest } from 'berlin-common';
import { localeLang } from '../utils/getLang';

const URL = {
  PRODUCT_DETAILS: '/api/v1/consumer/deals',
  PRODUCT_TAG: '/api/v1/consumer/tags',
  CALENDAR: '/api/v1/consumer/deal',
  ADDTOCART: '/api/v1/consumer/cart',
  GETDEALREVIEWS: '/api/v1/consumer/deals/reviews',
};

export const productDetails = async (
  id: string,
  type: string,
  slug: string
) => {
  try {
    const response = await ApiRequest.get(
      `${URL.PRODUCT_DETAILS}/${localeLang}/${type}/${slug}/${id}`
    );
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const allTagList = async () => {
  try {
    const response = await ApiRequest.get(
      `${URL.PRODUCT_TAG}?lang=${localeLang}`
    );
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const getCalendarById = async (id) => {
  try {
    const response = await ApiRequest.get(
      `${URL.CALENDAR}/${id}/calender?lang=${localeLang}`
    );
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const getSlotById = async (id, date) => {
  try {
    const response = await ApiRequest.get(
      `${URL.CALENDAR}/${id}/slots?lang=${localeLang}&selectedDate=${date}`
    );
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const AddToCart = async (payload: any) => {
  try {
    const response = await ApiRequest.post(URL.ADDTOCART, payload);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

// ?deal_id=432&deal_type=SINGLE&limit=2&page=1
export const getDealReviews = async (dealType, dealId, page) => {
  let url;

  if (dealType === 'SINGLE') {
    url = `${
      URL.GETDEALREVIEWS
    }?lang=${localeLang}&deal_id=${dealId}&deal_type=${dealType}&page=${page}&limit=${3}`;
  } else if (dealType === 'BUNDLE') {
    url = `${
      URL.GETDEALREVIEWS
    }?lang=${localeLang}&dealBundleId=${dealId}&deal_type=${dealType}&page=${page}&limit=${3}`;
  } else if (dealType === 'COMBO') {
    url = `${
      URL.GETDEALREVIEWS
    }?lang=${localeLang}&dealComboId=${dealId}&deal_type=${dealType}&page=${page}&limit=${3}`;
  }

  try {
    const response = await ApiRequest.get(`${url}`);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
