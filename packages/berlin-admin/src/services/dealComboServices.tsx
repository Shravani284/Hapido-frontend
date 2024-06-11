import { ApiRequest } from 'berlin-common';

const URL = {
  DEALCOMBOLIST: '/api/v1/admin/dealcombo',
  GETDEALCOMBOS: 'api/v1/admin/dealcombo',
  GETALLDEALIDS: '/api/v1/admin/deal',
  DELETECOMBO: 'api/v1/admin/dealcombo',
  UPDATEDEALCOMBOLIST: 'api/v1/admin/dealcombo',
  GETCOMBOBYIDS: 'api/v1/admin/dealcombo',
};
export const dealComboList = async () => {
  return await ApiRequest.post(URL.DEALCOMBOLIST);
};
export const getAllComboChildDeal = async () => {
  try {
    const response = await ApiRequest.get(
      `${URL.GETALLDEALIDS}?combo=true&active=1`
    );
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const getDealCombo = (page: number, rowsPerPage: number, data: any) => {
  let url = `?page=${page}&limit=${rowsPerPage}`;
  if (data?.comboid) url += `&comboid=${data?.comboid}`;
  if (data?.name) url += `&name=${data?.name}`;
  if (data?.combo_child_id)
    url += `&combo_child_id=${data?.combo_child_id?.id}`;
  if (data?.categoryid) url += `&categoryid=${data?.categoryid?.id}`;
  if (data?.featured) url += `&featured=${data?.featured?.id}`;
  if (data?.home_widget) url += `&home_widget=${data?.home_widget?.id}`;
  if (data?.platform)
    url +=
      data?.platform.id !== 'BOTH' ? `&platform=${data?.platform?.id}` : '';
  if (data?.active_date) url += `&active_date=${data?.active_date}`;
  if (data?.end_date) url += `&end_date=${data?.end_date}`;
  if (data?.active) url += `&active=${data?.active?.id}`;
  const endPoint = `${URL.GETDEALCOMBOS}${url}`;
  return ApiRequest.get(endPoint);
};

export const addDealCombo = async (payLoad: object) => {
  try {
    const response = await ApiRequest.post(URL.GETDEALCOMBOS, payLoad);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllDealIds = async () => {
  try {
    const response = await ApiRequest.get(`${URL.GETALLDEALIDS}?active=1`);
    const data = response.data.data.deals.map((item: any) => {
      const result: string[] = [];
      item.translations.forEach((e: any) => {
        if (e.column_name === 'title_trans_ids' && e.locale == 'en') {
          result.push(e.text);
        }
      });
      return {
        label: result.join(', '),
        id: item.id,
      };
    });
    return data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const deleteDealCombo = async (payLoad: object) => {
  try {
    const response = await ApiRequest.patch(URL.DELETECOMBO, payLoad);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const getCombosByIds = async (id: any) => {
  try {
    const response = await ApiRequest.get(`${URL.GETCOMBOBYIDS}/${id}`);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const updateDealComboList = async (payload: any) => {
  try {
    const response = await ApiRequest.patch(
      `${URL.UPDATEDEALCOMBOLIST}`,
      payload
    );
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
