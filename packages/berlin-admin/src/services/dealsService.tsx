import { ApiRequest } from 'berlin-common';

const URL = {
  GETMERCHANTDOROPDOWN: '/api/v1/admin/merchant?active=1',
  ALLDEALS: '/api/v1/admin/deal',
  DELETEDEALS: '/api/v1/admin/deal',
  CREATEDEALS: '/api/v1/admin/deal',
  UPDATEDEALSBYID: '/api/v1/admin/deal',
  MeRCHANT_DROPDOWN: '/api/v1/admin/merchant/dropdown/merchantlisting?',
  CLONEDEALS: '/api/v1/admin/deal/single/dd',
};

export const merchantDropDownApi = async () => {
  try {
    const response = await ApiRequest.get(
      `${URL.GETMERCHANTDOROPDOWN}?active=1&onboardingstatus=APPROVED`
    );
    const data = response.data.data.marchants.map((item: any) => {
      const result: string[] = [];
      item.translations.forEach((e: any) => {
        if (e.column_name === 'name' && e.locale == 'en') {
          result.push(e.text);
        }
      });
      return {
        label: result.join(', '),
        id: item.id,
        active: item.active,
        merchant_onboarding_status: item.merchant_onboarding_status,
      };
    });
    return data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const allDealsList = async (
  page: number,
  rowsPerPage: number,
  data: any
) => {
  try {
    let url = `?page=${page + 1}&limit=${rowsPerPage}`;
    if (data?.dealid) url += `&dealid=${data?.dealid}`;
    if (data?.name) url += `&name=${data?.name}`;
    if (data?.inventory_pricing)
      url += `&inventory_pricing=${data?.inventory_pricing.id}`;
    if (data?.type_pricing) url += `&type_pricing=${data?.type_pricing.id}`;
    if (data?.booking_deal) url += `&booking_deal=${data?.booking_deal.id}`;
    if (data?.categoryid) url += `&categoryid=${data?.categoryid.id}`;
    if (data?.merchantid) url += `&merchantid=${data?.merchantid.id}`;
    if (data?.voucher_type) url += `&voucher_type=${data?.voucher_type.id}`;
    if (data?.hapido_fulfilled)
      url += `&hapido_fulfilled=${data?.hapido_fulfilled.id}`;
    if (data?.template_type) url += `&template_type=${data?.template_type.id}`;
    if (data?.groupType)
      url += `&groupType=${data?.groupType.map((item) => item.id)}`;
    if (data?.excludedGroup)
      url += `&excludedGroup=${data?.excludedGroup.map((item) => item.id)}`;

    if (data?.featured) url += `&featured=${data?.featured.id}`;
    if (data?.home_widget) url += `&home_widget=${data?.home_widget.id}`;
    if (data?.platform)
      url +=
        data?.platform.id !== 'BOTH' ? `&platform=${data?.platform?.id}` : '';
    if (data?.onboarding_status)
      url += `&onboarding_status=${data?.onboarding_status.id}`;
    if (data?.active_date) url += `&active_date=${data?.active_date}`;
    if (data?.end_date) url += `&end_date=${data?.end_date}`;
    if (data?.active) url += `&active=${data?.active.id}`;

    const response = await ApiRequest.get(`${URL.ALLDEALS}${url}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteDealsFormList = async (payload: any) => {
  try {
    const response = await ApiRequest.patch(URL.DELETEDEALS, payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDealById = async (id: any) => {
  try {
    const response = await ApiRequest.get(`${URL.UPDATEDEALSBYID}/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createDeals = async (payLoad: any) => {
  try {
    const response = await ApiRequest.post(URL.CREATEDEALS, payLoad);
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateDeal = async (payLoad: any) => {
  try {
    const response = await ApiRequest.patch(URL.CREATEDEALS, payLoad);
    return response;
  } catch (error) {
    throw error;
  }
};
export const merchantDropdown = async (lang: string) => {
  try {
    const response = await ApiRequest.get(
      `${URL.MeRCHANT_DROPDOWN}?lang=${lang}&active=1`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getCloneDeals = async () => {
  try {
    const response = await ApiRequest.get(`${URL.CLONEDEALS}`);
    return response;
  } catch (error) {
    throw error;
  }
};
