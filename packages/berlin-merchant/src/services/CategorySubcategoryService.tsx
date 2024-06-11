import { ApiRequest } from 'berlin-common';

const URL = '/api/v1/merchant/category/all/sub-category';

export const getCategoriesSubCategories = (lang: string) => {
  return ApiRequest.get(`${URL}?lang=${lang}`);
};
