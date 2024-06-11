import { ApiRequest } from 'berlin-common';

const URL = {
  USERPROFILE: '/api/v1/admin/merchant/profile/merchantuser',
  UPDATEPROFILE: '/api/v1/admin/merchant',
};

export const userProfile = async (lang: String) => {
  try {
    const response = await ApiRequest.get(`${URL.USERPROFILE}?lang=${lang}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// export const userProfileUpdate = async () => {
//   try {
//     const response = await ApiRequest.get(`${URL.USERPROFILE}`);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

export const userProfileUpdate = async (payLoad: any) => {
  return await ApiRequest.patch(URL.UPDATEPROFILE, payLoad);
};
