import { ApiRequest } from 'berlin-common';
import { bannerPlacement } from '../pages/banner/bannerPlaceForm/bannerForm';

const URL = {
  BANNERPOSITION: '/api/v1/admin/banner/placement',
  ALlBANNERPLACEMENT: '/api/v1/admin/placements/banner',
  UPDATEBANNERBYID: '/api/v1/admin/banner/placement',
  CREATEBANNER: '/api/v1/admin/banner',
  GETCATEGORY: '/api/v1/admin/category',
  GETALLBANNERPLACEMENTS: '/api/v1/admin/placements/banner',
  GETALLBANNERS: '/api/v1/admin/banner',
  DELETEBANNER: '/api/v1/admin/banner',
  UPDATEBANNERLIST: '/api/v1/admin/banner',
  UPDATEBANNER: '/api/v1/admin/banner/placement',
  // DELETEBANNERPLACEMENT: '/api/v1/admin/banner/placement',
};

export const bannerPosition = async (payLoad: bannerPlacement) => {
  return await ApiRequest.post(URL.BANNERPOSITION, payLoad);
};

export const bannerPlacementList = async (
  page: number,
  rowsPerPage: number
) => {
  try {
    const response = await ApiRequest.get(
      `${URL.ALlBANNERPLACEMENT}?page=${page + 1}&limit=${rowsPerPage}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateBannerById = async (id: string) => {
  return await ApiRequest.get(`${URL.UPDATEBANNERBYID}/${id}`);
};

export const createBanner = async (payLoad: object) => {
  try {
    const response = await ApiRequest.post(URL.CREATEBANNER, payLoad);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllBannerPlacements = async () => {
  try {
    const response = await ApiRequest.get(`${URL.GETALLBANNERPLACEMENTS}`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const getBanners = async (
  page: number,
  rowsPerPage: number,
  data: any
) => {
  let url = `?page=${page + 1}&limit=${rowsPerPage}`;
  if (data?.campaign_name) url += `&campaignname=${data?.campaign_name}`;
  if (data?.banner_type?.label)
    url += `&bannertype=${data?.banner_type?.label}`;
  if (data?.banner_module?.id)
    url += `&bannermodule=${data?.banner_module?.id}`;
  if (data?.banner_placement_id?.id)
    url += `&bannerplacementid=${data?.banner_placement_id?.id}`;
  if (data?.target_module?.id)
    url += `&targetmodule=${data?.target_module?.id}`;
  if (data?.target_deal_id?.id) url += `&dealid=${data?.target_deal_id?.id}`;
  if (data?.target_category_id)
    url += `&categoryid=${data?.target_category_id}`;
  if (data?.target_tag_id?.id) url += `&tagid=${data?.target_tag_id?.id}`;
  if (data?.search_term) url += `&searchTerm=${data?.search_term}`;
  if (data?.city_id?.id) url += `&cityid=${data?.city_id?.id}`;
  if (data?.platform?.id) url += `&platform=${data?.platform?.id}`;
  if (data?.status?.id) url += `&status=${data?.status?.id}`;
  if (data?.active) url += `&active=${data?.active}`;

  const response = await ApiRequest.get(`${URL.GETALLBANNERS}${url}`);
  return response.data;
};

export const deleteBanner = async (id: string) => {
  try {
    // const response = await ApiRequest.patch(URL.DELETEBANNER, payLoad);
    const response = await ApiRequest.delete(`${URL.DELETEBANNER}/${id}`);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export const getByIdBanner = async (id: any) => {
  try {
    const response = await ApiRequest.get(`${URL.UPDATEBANNERLIST}/${id}`);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const updateBannerList = async (payload: any) => {
  try {
    const response = await ApiRequest.patch(`${URL.UPDATEBANNERLIST}`, payload);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export default interface updateBannerType {
  id: number;
  placement_location: string | null;
  placement_title: string | null;
}

export const updateBanner = async (payLoad: updateBannerType) => {
  return await ApiRequest.patch(URL.UPDATEBANNER, payLoad);
};
