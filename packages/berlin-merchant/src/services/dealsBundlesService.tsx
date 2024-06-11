import { ApiRequest } from 'berlin-common';

const URL = {
  DEALSBUNDLELIST: '/api/v1/merchant/bundledeals',
};

export const dealsBundleList = async (
  page: number,
  rowsPerPage: number,
  data: any,
  lang: String
) => {
  try {
    let url = `?lang=${lang}&page=${page + 1}&limit=${rowsPerPage}`;
    if (data?.status?.id && data?.status?.id !== 'all')
      url += `&status=${data.status?.id}`;
    if (data?.category?.id) url += `&categoryid=${data?.category?.id}`;
    if (data?.dealName) url += `&searchTerm=${data?.dealName}`;
    const response = await ApiRequest.get(`${URL.DEALSBUNDLELIST}${url}`);
    return response;
  } catch (error) {
    throw error;
  }
};
