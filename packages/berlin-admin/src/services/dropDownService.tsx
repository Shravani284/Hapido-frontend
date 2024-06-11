import { ApiRequest } from 'berlin-common';

const URL = {
  AREADROPDOWN: '/api/v1/admin/area/dd?lang=en',
  GETCOUNTRY: '/api/v1/admin/country/dd?lang=en',
  CATEGORIESSUBCATEGORIES: '/api/v1/admin/category/all/sub-category',
  BANNER_PLACEMENT_ID: '/api/v1/admin/placements/banner/dd',
  MERCHANT_DROPDOWN: '/api/v1/admin/merchant/dropdown/merchantlisting',
  ALLUSER: '/api/v1/admin/users/getusers/dd',
  GET_CITIES: '/api/v1/admin/city/dd',
  TAGSDROPDOWN: '/api/v1/admin/tag/dd',
  TRAVELLERTYPES: '/api/v1/admin/travellertypes/dd',
  GETALLMERCHANTDEALSCODE: '/api/v1/admin/merchantdeals',
  GETALLMERCHANTDEALSTICKET: '/api/v1/admin/merchantdeals',
  EXCLUDEDEALBUNDLE: '/api/v1/admin/deals/excluded/dd',
  SALETYPEEXCLUDEDEALBUNDLE: '/api/v1/admin/deals/excluded/dd?sale_type=bosd',
  SALETYPE: '/api/v1/admin/deals/dd?dealtype=Single',

  // deal api
  ALLDEALS: '/api/v1/admin/deals/dd?dealtype=Single',
  ALLDEALSFORCOMBO: 'api/v1/admin/deals/combo/dd',
  ALLBUNDLEDEALS: '/api/v1/admin/dealbundles/dd',
  GETALLCOMBO: '/api/v1/admin/dealcombos/dd',
  GETALLCOMBINEDEAL: '/api/v1/admin/deals/combine/dd',
  DEALSALLTYPE: '/api/v1/admin/deals/single/dd?lang=en&active=1',
  SLOT_DEAL: '/api/v1/admin/deals/dd?slot_enabled=1',
  COMBINE_DEALS: '/api/v1/admin/combinedeals',
  ALL_Deals: '/api/v1/admin/deals/dd?dealtype=Single',
  ALLPROMOCODE: '/api/v1/admin/promo/dropdown/dd',

  //
};

export const getAllArea = async () => {
  try {
    const response = await ApiRequest.get(`${URL.AREADROPDOWN}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCountryDropDown = async () => {
  try {
    const response = await ApiRequest.get(`${URL.GETCOUNTRY}&active=1`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const getCategoriesSubCategories = async () => {
  try {
    const response = await ApiRequest.get(`${URL.CATEGORIESSUBCATEGORIES}`);
    return response.data.data.category;
  } catch (error) {
    throw error;
  }
};
export const bannerPlacementID = async () => {
  try {
    const response = await ApiRequest.get(`${URL.BANNER_PLACEMENT_ID}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllUser = async () => {
  try {
    const response = await ApiRequest.get(`${URL.ALLUSER}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const merchantActiveList = async (lang: string) => {
  try {
    const response = await ApiRequest.get(
      `${URL.MERCHANT_DROPDOWN}?lang=${lang}&active=1&status=APPROVED`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// All Cities API
export const getAllCities = async () => {
  try {
    const response = await ApiRequest.get(`${URL.GET_CITIES}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const tagDropDown = async () => {
  try {
    const response = await ApiRequest.get(`${URL.TAGSDROPDOWN}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// All Deal with slots API
export const getSlotDeal = async () => {
  try {
    const response = await ApiRequest.get(`${URL.SLOT_DEAL}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const travelerTypesList = async () => {
  try {
    const response = await ApiRequest.get(URL.TRAVELLERTYPES);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Promo Combo Deals
export const allComboList = async () => {
  try {
    const response = await ApiRequest.get(`${URL.GETALLCOMBO}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
//Combo Exclude Deals
export const allExcludeComboList = async (category: any) => {
  let url = ``;
  if (category) url += `?categoryids=${category}`;
  try {
    const response = await ApiRequest.get(`${URL.GETALLCOMBO}${url}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
//Single and Bundle deals
export const allCombinedDeals = async () => {
  try {
    const response = await ApiRequest.get(`${URL.GETALLCOMBINEDEAL}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
//Single and Bundle Exclude deals

export const allExcludeCombinedDeals = async (category: any) => {
  let url = ``;
  if (category) url += `?categoryids=${category}`;
  try {
    const response = await ApiRequest.get(`${URL.GETALLCOMBINEDEAL}${url}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllMerchantDealsCode = async (id: number) => {
  try {
    const response = await ApiRequest.get(
      `${URL.GETALLMERCHANTDEALSCODE}?vouchertype=External&merchantid=${id}&templatetype=Hapido&active=1`
    );
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const getAllMerchantDealsTicket = async (id: number) => {
  try {
    const response = await ApiRequest.get(
      `${URL.GETALLMERCHANTDEALSTICKET}?vouchertype=External&merchantid=${id}&templatetype=Merchant&active=1`
    );
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const excludeDealBundle = async (id: number, slotType?: any) => {
  let url;
  if (
    window.location.pathname === '/flashsale/bosd/add' ||
    window.location.pathname.includes('/flashsale/bosd/update')
  ) {
    if (slotType == true) {
      url = `${URL.SALETYPEEXCLUDEDEALBUNDLE}&bundleid=${id}`;
    } else {
      url = `${URL.EXCLUDEDEALBUNDLE}?bundleid=${id}`;
    }
  } else {
    url = `${URL.EXCLUDEDEALBUNDLE}?bundleid=${id}`;
  }
  try {
    const response = await ApiRequest.get(`${url}`);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const allDealListDD = async (type, slotType?: any) => {
  let url;
  if (type === 'SINGLE') {
    url = URL.ALLDEALS;
    if (
      window.location.pathname === '/flashsale/flashdiscount/add' ||
      window.location.pathname.includes('/flashsale/flashdiscount/update')
    ) {
      url += `&inventory=false`;
    }
    if (
      window.location.pathname === '/flashsale/bosd/add' ||
      window.location.pathname.includes('/flashsale/bosd/update')
    ) {
      if (slotType == 'bosd1') {
        url = `${URL.SALETYPE}&sale_type=bosd1`;
      } else if (slotType == 'bosd2') {
        url = `${URL.SALETYPE}&sale_type=bosd2`;
      }
    }
    if (
      window.location.pathname === '/flashsale/bogfg/add' ||
      window.location.pathname.includes('/flashsale/bogfg/update')
    ) {
      url = `${URL.SALETYPE}&sale_type=bosd2`;
    }
  } else if (type === 'BUNDLE') {
    url = URL.ALLBUNDLEDEALS;
  } else if (type === 'COMBO') {
    url = `${URL.GETALLCOMBO}`;
  }

  try {
    const response = await ApiRequest.get(`${url}`);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const getAllDeal = async () => {
  try {
    const response = await ApiRequest.get(`${URL.DEALSALLTYPE}`);
    return response?.data;
  } catch (error) {
    throw error;
  }
};
// All single and bundle parent deal API
export const getAllInventoryMerchantDeals = async (id: number) => {
  try {
    const response = await ApiRequest.get(
      `${URL.COMBINE_DEALS}?merchantid=${id}&active=1&slot_enabled=1`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// All deal API
export const getAllDeals = async () => {
  try {
    const response = await ApiRequest.get(`${URL.ALLDEALS}`);
    // ?lang=en&active=1`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//All deal API for Combo
export const includeDealsForCombo = async () => {
  try {
    const response = await ApiRequest.get(`${URL.ALLDEALSFORCOMBO}`);
    // ?lang=en&active=1`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllPROMO = async () => {
  try {
    const response = await ApiRequest.get(`${URL.ALLPROMOCODE}?active=true`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
