import { ApiRequest } from 'berlin-common';

const URL = {
  GETCRONJOBS: '/api/v1/admin/cronjob',
  CREATECRONJOBS:"/api/v1/admin/cronjob",
  UPDATECRONJOBS: '/api/v1/admin/cronjob',
  DELETECRONJOBS: '/api/v1/admin/cronjob',
  GETCRONJOBSBYID: '/api/v1/admin/cronjob',
};

export const getcronJobs = async (page: number, rowsPerPage: number) => {
 try {
    const response = await ApiRequest.get(
      `${URL.GETCRONJOBS}?page=${page + 1}&limit=${rowsPerPage}`
    );
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const createCronJobs = async (payLoad: any) => {
  try {
    const response = await ApiRequest.post(URL.CREATECRONJOBS, payLoad);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const updatecronJobs= async (payLoad: any) => {
  return await ApiRequest.patch(URL.UPDATECRONJOBS, payLoad);
};

export const getCronJobsById = async (id: string) => {
  return await ApiRequest.get(`${URL.GETCRONJOBSBYID}/${id}`);
};

export const deleteCronJobs = async (id: any) => {
  return await ApiRequest.delete(`${URL.DELETECRONJOBS}/${id}`);
};

