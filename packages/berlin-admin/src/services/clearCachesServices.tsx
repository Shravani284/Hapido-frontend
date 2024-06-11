import { ApiRequest } from 'berlin-common';
const URL = {
  CLEARCACHES: '/api/v1/admin/purge/cache',
};

export const clearAllCaches = async () => {
  try {
    const response = await ApiRequest.post(`${URL.CLEARCACHES}`);
    return response;
  } catch (error) {
    throw error;
  }
};
