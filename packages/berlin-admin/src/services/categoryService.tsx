import { ApiRequest } from 'berlin-common';

const URL = '/api/v1/admin/category';
const PRIMARYCATEGORY = '/api/v1/admin/category/dd';

// /api/v1/admin/category/dd
export const getCategories = () => {
  return ApiRequest.get(`${PRIMARYCATEGORY}`);
};

export const getAllCategories = (
  language: string,
  page: number,
  rowsPerPage: number,
  payload?: any
) => {
  var url = `${URL}?lang=${language}&page=${page + 1}&limit=${rowsPerPage}`;
  // ree_level=2&is_menu=true&is_featured=true&is_home_widget=false&active=true&name=washing
  if (payload?.tree_level) {
    url += `&tree_level=${payload.tree_level.id}`;
  }
  if (payload?.name) {
    url += `&name=${payload.name}`;
  }
  if (payload?.is_menu) {
    url += `&is_menu=${payload.is_menu.id === 'Yes' ? true : false}`;
  }
  if (payload?.is_featured) {
    url += `&is_featured=${payload.is_featured.id === 'Yes' ? true : false}`;
  }
  if (payload?.is_home_widget) {
    url += `&is_home_widget=${
      payload.is_home_widget.id === 'Yes' ? true : false
    }`;
  }
  if (payload?.active) {
    url += `&active=${payload.active.id}`;
  }
  if (payload?.parent_category) {
    url += `&categoryid=${payload.parent_category.id}`;
  }
  return ApiRequest.get(url);
};

export const createCategory = (payload: any) => {
  return ApiRequest.post(URL, payload);
};

export const getSubCategories = (categoryId: string) => {
  const endPoint = `${URL}/subcategories/${categoryId}?lang=en`;
  return ApiRequest.get(endPoint);
};

export const updateCategory = (payload: any) => {
  return ApiRequest.patch(URL, payload);
};

export const deleteCategory = (categoryId: number) => {
  const url = `${URL}/${categoryId}`;
  return ApiRequest.delete(url);
};

export const getCategoryById = (categoryId: number) => {
  const url = `${URL}/${categoryId}`;
  return ApiRequest.get(url);
};
