import { ApiRequest } from 'berlin-common';
import { CLIENT_RENEG_WINDOW } from 'tls';

const URL = {
  GETMERCHANT: '/api/v1/admin/merchant',
  // GETCATEGORY: '/api/v1/admin/category',
};

// all merchant API call
export const getMerchantAPI = async (
  page: number,
  rowsPerPage: number,
  data: any
) => {
  try {
    let url = `?page=${page + 1}&limit=${rowsPerPage}`;
    if (data?.name) url += `&searchTerm=${data?.name}`;
    if (data?.email) url += `&email=${data?.email}`;
    if (data?.country_code) url += `&country_code=${data?.country_code.id}`;
    if (data?.mobile) url += `&mobilenumber=${data?.mobile}`;
    if (data?.onBoardingStatus)
      url += `&onboardingstatus=${data?.onBoardingStatus.id}`;
    if (data?.hapidoBusinessUserId)
      url += `&hapidobusinessuserid=${data?.hapidoBusinessUserId.id}`;
    if (data?.areaId) url += `&areaId=${data?.areaId.id}`;
    if (data?.cityId) url += `&cityId=${data?.cityId.id}`;

    const response = await ApiRequest.get(`${URL.GETMERCHANT}${url}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const merchantCreateApi = async (payLoad: any) => {
  try {
    const response = await ApiRequest.post(URL.GETMERCHANT, payLoad);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const merchantUpdateApi = async (payLoad: any) => {
  try {
    const response = await ApiRequest.patch(URL.GETMERCHANT, payLoad);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMerchantByIdAPI = async (id: any) => {
  try {
    const response = await ApiRequest.get(`${URL.GETMERCHANT}/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateMerchant = async (payload: any) => {
  try {
    const response = await ApiRequest.patch(URL.GETMERCHANT, payload);
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
