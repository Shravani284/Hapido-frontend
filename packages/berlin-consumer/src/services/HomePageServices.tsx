import { ApiRequest } from 'berlin-common';
import { localeLang } from '../utils/getLang';

const URL = {
  ALL_CATEGORIES: '/api/v1/consumer/categories',
  MAIN_BANNER: '/api/v1/consumer/banners',
  CATEGORIES_LIST_DEAL: '/api/v1/consumer/category/deals',
  CATEGORIES_LIST: '/api/v1/consumer/home/widget',
  HOME_LAYOUT: '/api/v1/consumer/home',
  MENU_CATEGORY: '/api/v1/consumer/categories',
  IS_ALL_FEATURE: '/api/v1/consumer/home/feature',
  IS_PRIM_SUB_CATEGORY: '/api/v1/consumer/category/parent/subcategory',
  CATEGORIES_BY_ID: '/api/v1/consumer/category',
  STATIC_PAGE: '/api/v1/consumer/static',
};

export const allCategories = async () => {
  try {
    const response = await ApiRequest.get(
      `${URL.ALL_CATEGORIES}?lang=${localeLang}`
    );
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const mainBanner = async (
  bannerType: string,
  bannerModule: string,
  city: string
) => {
  try {
    const response = await ApiRequest.get(
      `${URL.MAIN_BANNER}?lang=${localeLang}&banner_type=${bannerType}&banner_module=${bannerModule}&cityname=${city}`
    );
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const mainFeatured = async () => {
  try {
    const response = await ApiRequest.get(
      `${URL.IS_ALL_FEATURE}?lang=${localeLang}`
    );
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const categoriesById = async (slug: string, city: string) => {
  try {
    const response = await ApiRequest.get(
      `${URL.CATEGORIES_LIST}/deals?lang=${localeLang}&categoryid=${slug}&status=PUBLISHED&city=${city}`
    );
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const allDealsListCategory = async (
  platform: string,
  slug: string, // This is category id
  payload: any,
  name: string
  // page: number,
  // limit: number
) => {
  let url = `${URL.CATEGORIES_LIST_DEAL}/list?lang=${localeLang}&status=PUBLISHED&city=${name}&slug=${slug}`;
  // if (page) {
  //   url += `&page=${page}`;
  // }
  // if (limit) {
  //   url += `&limit=${limit}`;
  // }
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
  if (payload?.slotenabled == true) {
    url += `&slotenabled=1`;
  }
  try {
    const response = await ApiRequest.get(url);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const homePageLayout = async (city: string) => {
  try {
    const response = await ApiRequest.get(
      `${URL.HOME_LAYOUT}?lang=${localeLang}&city=${city}`
      // { cancelToken: source.token }
    );
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const homePageCategoryList = async () => {
  try {
    const response = await ApiRequest.get(
      `${URL.MENU_CATEGORY}?lang=${localeLang}&page=1&limit=10&is_menu=true`
    );
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const categoriesSubCategory = async (slug: any) => {
  try {
    const response = await ApiRequest.get(
      `${URL.IS_PRIM_SUB_CATEGORY}?lang=${localeLang}&slug=${slug}`
    );
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
// Category Listing Description
export const descCategoriesById = async (slug: any) => {
  try {
    const response = await ApiRequest.get(
      `${URL.CATEGORIES_BY_ID}?lang=${localeLang}&slug=${slug}`
    );
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const HapidoStaticPages = async (slug: any) => {
  try {
    const response = await ApiRequest.get(
      `${URL.STATIC_PAGE}?slug=${slug}&lang=${localeLang}`
    );
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const flashSalePageMob = async (name: any, slug: any) => {
  try {
    const response = await ApiRequest.get(
      `${URL.CATEGORIES_LIST_DEAL}/list?lang=${localeLang}&status=PUBLISHED&city=${name}&slug=${slug}`
    );
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
