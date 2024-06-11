import { ApiRequest } from 'berlin-common';
import { localeLang } from '../utils/getLang';

const URL = {
  SEARCH_LIST: '/api/v1/consumer/deals/search/aloglia',
};

export const searchList = async (
  search: string,
  payload: any,
  name: string,
  category?: any
) => {
  let url = `${URL.SEARCH_LIST}?search_key=${search}&lang=${localeLang}&status=PUBLISHED&city=${name}`;
  if (payload?.latitude) {
    url += `&latitude=${payload?.latitude}`;
  }
  if (payload?.latitude) {
    url += `&langitude=${payload?.langitude}`;
  }
  if (payload?.price) {
    url += `&minprice=${payload?.price[0]}&maxprice=${payload?.price[1]}`;
  }
  if (payload?.distance) {
    url += `&distance=${payload?.distance}`;
  }
  if (payload.highlights) {
    url += `&highlights=${payload?.highlights}`;
  }
  if (payload?.rating) {
    url += `&rating=${payload?.rating}`;
  }
  if (payload?.sort) {
    url += `&sortBy=${payload?.sort}`;
  }
  // if (payload?.slotenabled) {
  //   url += `&slotenabled=${payload?.slotenabled}`;
  // }
  if (category) {
    url += `&categoryid=${category}`;
  }
  try {
    const response = await ApiRequest.get(url);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
