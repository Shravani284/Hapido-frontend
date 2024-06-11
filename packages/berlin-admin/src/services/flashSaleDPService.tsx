import { ApiRequest } from 'berlin-common';

const URL = {
  GETALLDP: '/api/v1/admin/flashsale/flashdp',
  UPDATEDP: '/api/v1/admin/flashsale/flashdp',
  DELETEDP: '/api/v1/admin/flashsale/flashdp/',
  UPDATEDPBYID: '/api/v1/admin/flashsale/flashdp/',
  ALLDEALS: '/api/v1/admin/deal',
  ALLBUNDLEDEALS: '/api/v1/admin/dealbundle',
  ALLCOMBODEALS: '/api/v1/admin/dealcombo',
  // GETCATEGORY: '/api/v1/admin/category',
};

export const getALlDP = async (page: number, rowsPerPage: number, data) => {
  let url = `${URL.GETALLDP}?page=${page + 1}&limit=${rowsPerPage}`;
  if (data.scope) url += `&scope=${data.scope.id}`;
  if (data.categories?.length > 0)
    `&categories=${data.categories.map((e) => e.id).join(',')}`;
  if (data.areas?.length > 0) `&areas=${data.areas.map((e) => e.id).join(',')}`;

  if (data?.platform)
    url +=
      data?.platform.id !== 'BOTH' ? `&platform=${data?.platform?.id}` : '';

  if (data?.active_date) url += `&fs_active_date=${data?.active_date}`;

  if (data?.end_date) url += `&fs_end_date=${data?.end_date}`;

  if (data?.active) url += `&active=${data?.active?.id}`;
  try {
    const response = await ApiRequest.get(url);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const createDP = async (payLoad: any) => {
  try {
    const response = await ApiRequest.post(URL.GETALLDP, payLoad);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const deleteDP = async (id: any) => {
  return await ApiRequest.delete(`${URL.DELETEDP}${id}`);
};

export const getDPByID = async (id: string) => {
  try {
    const response = await ApiRequest.get(`${URL.UPDATEDPBYID}${id}`);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const updateDP = async (payload: object) => {
  try {
    const response = await ApiRequest.patch(`${URL.UPDATEDP}`, payload);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

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
// export const getAllCategory = async () => {
//   try {
//     const response = await ApiRequest.get(URL.GETCATEGORY);
//     const data = response.data?.data?.categories?.map((item: any) => {
//       const result: string[] = [];
//       item.translations.forEach((e: any) => {
//         if (e.column_name === 'name') {
//           result.push(e.text);
//         }
//       });
//       return {
//         label: result.join(', '),
//         id: item.id,
//       };
//     });
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
