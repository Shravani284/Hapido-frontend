import { ApiRequest } from 'berlin-common';

const URL = {
  // GETCATEGORIES: '/api/v1/admin/category',
  ALLDEALS: '/api/v1/admin/deal',
  ALLBUNDLEDEALS: '/api/v1/admin/dealbundle',
  ALLCOMBODEALS: '/api/v1/admin/dealcombo',
  GETALLFLASHDISCOUNTS: '/api/v1/admin/flashsale/flashdiscount',
  ADDFLASHDISCOUNT: 'api/v1/admin/flashsale/flashdiscount',
  DELETEFLASHDISCOUNT: 'api/v1/admin/flashsale/flashdiscount',
  GETFLASHDISCOUNTBYID: '/api/v1/admin/flashsale/flashdiscount',
  UPDATEFLASHDISCOUNT: 'api/v1/admin/flashsale/flashdiscount',
};

export const getAllFlashDiscounts = async (
  page: number,
  rowsPerPage: number
) => {
  try {
    const response = await ApiRequest.get(
      `${URL.GETALLFLASHDISCOUNTS}?page=${page + 1}&limit=${rowsPerPage}`
    );
    return response;
    // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

// export const getCategories = async ({ language }: { language: string }) => {
//   try {
//     const response = await ApiRequest.get(
//       `${URL.GETCATEGORIES}?lang=${language}`
//     );
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

export const allDealsList = async (page: number, rowsPerPage: number) => {
  try {
    const response = await ApiRequest.get(
      `${URL.ALLDEALS}?page=${page + 1}&limit=${rowsPerPage}`
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const allBundleList = async (page: number, rowsPerPage: number) => {
  try {
    const response = await ApiRequest.get(`${URL.ALLBUNDLEDEALS}`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const allComboList = async (page: number, rowsPerPage: number) => {
  try {
    const response = await ApiRequest.get(
      `${URL.ALLCOMBODEALS}?page=${page + 1}&limit=${rowsPerPage}`
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const addFlashDiscount = async (payLoad: object) => {
  try {
    const response = await ApiRequest.post(URL.ADDFLASHDISCOUNT, payLoad);
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteFlashDiscount = async (payLoad: object) => {
  try {
    const response = await ApiRequest.patch(URL.DELETEFLASHDISCOUNT, payLoad);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const getFlashDiscountById = async (id: any) => {
  try {
    const response = await ApiRequest.get(`${URL.GETFLASHDISCOUNTBYID}/${id}`);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const updateFlashDiscount = async (payLoad: any) => {
  try {
    const response = await ApiRequest.patch(
      `${URL.UPDATEFLASHDISCOUNT}`,
      payLoad
    );
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
