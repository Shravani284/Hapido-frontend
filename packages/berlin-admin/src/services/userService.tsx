import { ApiRequest } from 'berlin-common';

const URL = {
  GETUSER: '/api/v1/admin/users/getusers',
  GETUSERID: '/api/v1/admin/users/getuserbyid',
  USER: '/api/v1/admin/users/auth/create_user',
  UPDATEUSER: '/api/v1/admin/users/auth/update_user',
  DELETEUSER: '/api/v1/admin/users/auth/update_user',
  // GETCATEGORY: '/api/v1/admin/category',
  GETMODULE: '/api/v1/admin/module/list',
  REMOVEMODULE: '/api/v1/admin/users/auth/removepermission',
  REMOVEADDRESS: '/api/v1/admin/users/auth/removeaddress',
  DEPARTMENT: '/api/v1/admin/department/departmentlist',
  REMOVEDEPARTMENT: '/api/v1/admin/users/auth/removedepartment',
};

export const getUserAPI = async (
  page: number,
  rowsPerPage: number,
  data: any
) => {
  let url = `?page=${page}&limit=${rowsPerPage}`;
  if (data?.first_name) url += `&first_name=${data?.first_name}`;
  if (data?.last_name) url += `&last_name=${data?.last_name}`;
  if (data?.email) url += `&email=${data?.email}`;
  if (data?.country_code?.id) url += `&country_code=${data?.country_code?.id}`;
  if (data?.mobile) url += `&mobilenumber=${data?.mobile}`;
  if (data?.locale) url += `&locale=${data?.locale}`;
  if (data?.module_id?.id) url += `&module_id=${data?.module_id?.id}`;
  if (data?.user_platform?.id)
    url += `&user_platform=${data?.user_platform?.id}`;
  if (data?.active)
    url += `&is_active=${data?.active.id === 'Yes' ? true : false}`;

  const response = await ApiRequest.get(`${URL.GETUSER}${url}`);
  return response; // Assuming the API response contains the 'data' property
};

export const getUserByIdAPI = async (id: any) => {
  try {
    const response = await ApiRequest.get(`${URL.GETUSERID}/${id}`);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const CreateUser = async (payLoad: any) => {
  try {
    const response = await ApiRequest.post(URL.USER, payLoad);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const UpdateUser = async (payLoad: any) => {
  try {
    const response = await ApiRequest.patch(URL.UPDATEUSER, payLoad);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const removeUserModule = async (payload: {
  id: number;
  user_id: number;
}) => {
  try {
    const response = await ApiRequest.patch(URL.REMOVEMODULE, payload);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const removeUserDepartMent = async (payload: {
  id: number;
  user_id: number;
}) => {
  try {
    const response = await ApiRequest.patch(URL.REMOVEDEPARTMENT, payload);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const removeUserAddress = async (payload: any) => {
  try {
    const response = await ApiRequest.patch(URL.REMOVEADDRESS, payload);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const getAllDepartMent = async () => {
  try {
    const response = await ApiRequest.get(URL.DEPARTMENT);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const getAllUser = async () => {
  try {
    const res = await ApiRequest.get(`${URL.GETUSER}?is_active=true&flagged=0`);
    const data = res.data.data.users.map((item: any) => {
      return {
        label: item.first_name + ' ' + item.last_name,
        id: item.id,
        active: item.active,
        flagged: item.flagged,
      };
    });
    return data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const deleteUser = async (payLoad: { id: string; active: boolean }) => {
  return await ApiRequest.patch(URL.DELETEUSER, payLoad);
};

// export const getAllCategory = async () => {
//   try {
//     const response = await ApiRequest.get(URL.GETCATEGORY);
//     const data = response.data.data.categories.map((item: any) => {
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
//     return data; // Assuming the API response contains the 'data' property
//   } catch (error) {
//     throw error; // Re-throw the error to handle it higher up in the call stack
//   }
// };

export const getAllModule = async () => {
  try {
    const response = await ApiRequest.get(URL.GETMODULE);
    const result = response.data.data.map((item: any) => {
      return { label: item.module_name, id: item.id };
    });
    return result;
  } catch (error) {
    throw error;
  }
};
