import { ApiRequest } from 'berlin-common';

const URL = {
  GETAREA: '/api/v1/admin/area',
  ADDAREA: '/api/v1/admin/area',
  GETCITY: '/api/v1/admin/city',
  DELETEAREA: '/api/v1/admin/geography',
  UPDATEAREA: '/api/v1/admin/area',
  GETAREABYID: '/api/v1/admin/area/',
};

// all area with active or inactive
// export const getArea = async () => {
//   try {
//     const response = await ApiRequest.get(URL.GETAREA);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// table Area List with pagination
export const getAreaList = async (
  payload: {
    page: number;
    rowsPerPage: number;
  },
  data: any
) => {
  try {
    let url = `?page=${payload.page + 1}&limit=${payload.rowsPerPage}`;
    if (data?.areaName) url += `&name=${data?.areaName}`;
    if (data?.filterCity) url += `&cityid=${data?.filterCity.id}`;
    if (data?.filterSort?.id) url += `&sort=${data?.filterSort?.id}`;
    if (data?.filterStatus) url += `&active=${data?.filterStatus?.id}`;
    if (data?.filterCountry) url += `&countryid=${data?.filterCountry?.id}`;
    const response = await ApiRequest.get(`${URL.GETAREA}${url}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AddArea = async (payLoad: object) => {
  try {
    const response = await ApiRequest.post(URL.ADDAREA, payLoad);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCity = async (lang: string) => {
  try {
    const response = await ApiRequest.get(`${URL.GETCITY}?lang=${lang}`);
    const cityName = response?.data?.data?.allCities?.map((item: any) => {
      const current: any[] = [];
      item.citytranslation.find((e: any) => {
        if (e?.locale == 'en') {
          current.push(e.text);
        }
      });
      return {
        label: current.join(' '),
        id: item.id,
      };
    });
    return cityName;
  } catch (error) {
    throw error;
  }
};

export const getCityDropDown = async () => {
  try {
    const response = await ApiRequest.get(`${URL.GETCITY}?active=1`);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const deleteGeography = async (data: {
  deleteFor: string;
  id: number;
  param: string;
}) => {
  try {
    const response = await ApiRequest.delete(
      `${URL.DELETEAREA}?for=${data.deleteFor}&${data.param}=${data.id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateArea = async (payLoad: object) => {
  try {
    const response = await ApiRequest.patch(URL.UPDATEAREA, payLoad);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getAreaByID = async (id: string | number) => {
  try {
    const response = await ApiRequest.get(`${URL.GETAREABYID}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
