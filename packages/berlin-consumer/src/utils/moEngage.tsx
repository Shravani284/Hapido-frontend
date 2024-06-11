import index from 'berlin-common/src/components/DateFormat';

export const extendedWindow: any = window;
import { localeLang } from '../utils/getLang';

extendedWindow.dataLayer = extendedWindow.dataLayer || [];
const mPage = {
  home: 'Home',
  search: 'Search',
  productDetail: 'Product_details',
  flashSale: 'Flash_Sale',
  menuListing: 'Category_Menu_Listing',
  category: 'Category',
  paymentFailed: 'Payment_Failed',
  paymentComplete: 'Payment_Complete',
  checkout: 'Checkout',
  cart: 'Cart',
  map: 'Address_Map',
  addressEdit: 'Address_Edit',
  address: 'Address',
  voucher: 'Voucher',
  savedCards: 'Saved_Card',
  profile: 'Profile',
};

const initialiseMoengage = () => {
  if (extendedWindow?.Moengage) {
    return extendedWindow.Moengage;
  } else {
    console.error('Moengage object not available');
  }
};
export default initialiseMoengage;

// View page event for all page
const viewPageEvent = (
  page_title: string,
  city_name: string,
  page_referrer: string = ''
) => {
  // const currentPageLocation = window.location.href;
  const currentPageLocation = window.location.href?.split('?')[0];
  const prevPage =
    page_referrer.indexOf('cartitemlist') > -1
      ? ''
      : `${window.location.origin}${page_referrer}`;

  extendedWindow.Moengage.track_event('view_page', {
    page_title,
    page_location: currentPageLocation,
    page_referrer: prevPage,
    localeLang,
    city_name,
  });

  extendedWindow.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
  extendedWindow.dataLayer.push({
    event: 'view_page',
    ecommerce: {
      page_title,
      page_location: currentPageLocation,
      page_referrer: prevPage,
      localeLang,
      city_name,
    },
  });
};

const profileUpdateEvent = (country_code: String) => {
  extendedWindow.Moengage.track_event('profile_update', {
    country_code,
  });
  extendedWindow.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
  extendedWindow.dataLayer.push({
    event: 'profile_update',
    ecommerce: { country_code },
  });
};
const addressAdd = (event, country_name: String) => {
  extendedWindow.Moengage.track_event(event, {
    country_name,
  });
  extendedWindow.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
  extendedWindow.dataLayer.push({
    event,
    ecommerce: { country_name },
  });
};
const mSearch = (search_term: String, city_name: string) => {
  extendedWindow.Moengage.track_event('search', {
    search_term,
    localeLang,
    city_name,
  });
  extendedWindow.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
  extendedWindow.dataLayer.push({
    event: 'search',
    ecommerce: { search_term, localeLang, city_name },
  });
};

//login and registration event
const loginRegisterEvent = (event: string, method: string) => {
  extendedWindow.Moengage.track_event(event, { method });
  extendedWindow.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
  extendedWindow.dataLayer.push({
    event,
    ecommerce: { method },
  });
};

//login_email_otp_success, login_email_otp_fail, login_email_otp_triggered, forgot_pwd Events
const popUpEvents = (event: string) => {
  extendedWindow.Moengage.track_event(event, {});
  extendedWindow.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
  extendedWindow.dataLayer.push({
    event,
    ecommerce: {},
  });
};

// share event
const Share = (method, item_type, item_id, city_name) => {
  const eventObj = {
    method,
    item_type,
    item_id,
    localeLang,
    city_name,
  };
  extendedWindow.Moengage.track_event('share', eventObj);
  extendedWindow.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
  extendedWindow.dataLayer.push({
    event: 'share',
    ecommerce: { eventObj },
  });
};

interface IItem {
  item_id: number;
  item_type: string;
  item_name: string;
  affiliation: string;
  coupon: string;
  discount: number;
  index: number;
  item_category: string;
  item_category2: string;
  item_category3: string;
  item_category4: string;
  item_category5: string;
  item_list_id: number;
  item_list_name: string;
  price_type: string;
  price: number;
  quantity: number;
}

const productDetails = (item = [], event: string) => {
  const eventObjet = item.map((e, index) => {
    const data = {};
    data['index'] = index;
    data['item_list_id'] = 'category_list';
    data['item_list_name'] = 'Category List';
    if (e.id) data['item_id'] = e.id;
    if (e.deal_type) data['item_type'] = e.deal_type;
    if (e.title_label) data['item_name'] = e.title_label;
    if (e.merchant_name) data['affiliation'] = e.merchant_name;
    if (
      event == 'begin_checkout' ||
      event == 'purchase' ||
      event == 'payment_failed' ||
      event == 'view_cart' ||
      event == 'promo_code_apply_success' ||
      event == 'promo_code_apply_fail'
    ) {
      data['coupon'] = e.coupon || '';
      data['discount'] = e.discount || '';
    }
    if (e.primary_category) data['item_category'] = e.primary_category;
    if (e?.secondary_categories?.length > 0) {
      e.secondary_categories.forEach((e, index) => {
        const key = index + 2;
        if (data[`item_category${key}`]) {
          data[`item_category${key}`].push(e);
        } else {
          data[`item_category${key}`] = [];
          data[`item_category${key}`].push(e);
        }
      });
    }
    if (e.price_type) data['price_type'] = e.price_type;
    if (e.price) data['price'] = e.price;
    if (e.quantity) data['quantity'] = e.quantity;

    return data;
  });
  return eventObjet;
};

const getMoengageroductDetails = (item = [], event: string) => {
  let data: any = {
    item_id: [],
    item_type: [],
    item_name: [],
    affiliation: [],
    item_coupon: [],
    item_discount: [],
    index: [],
    item_category: [],
    item_list_id: [],
    item_list_name: [],
    price_type: [],
    price: [],
    quantity: [],
  };
  let maxCount = 0;
  let test = {};

  item.forEach((e, index) => {
    data['index'].push(index);
    if (e.id) data['item_id'].push(e.id);
    if (e.deal_type) data['item_type'].push(e.deal_type);
    if (e.title_label) data['item_name'].push(e.title_label);
    if (e.merchant_name) data['affiliation'].push(e.merchant_name);
    if (
      event == 'begin_checkout' ||
      event == 'purchase' ||
      event == 'payment_failed' ||
      event == 'view_cart' ||
      event == 'promo_code_apply_success' ||
      event == 'promo_code_apply_fail'
    ) {
      data['item_coupon'].push(e.coupon);
      data['item_discount'].push(e.discount);
    }
    if (e.item_list_id) data['item_list_id'].push(e.item_list_id);

    if (e.item_list_name) data['item_list_name'].push(e.item_list_name);

    if (e.primary_category) data['item_category'].push(e.primary_category);
    // if (e?.secondary_categories?.length > 0) {
    //   e.secondary_categories.forEach((e, index) => {
    //     const key = index + 2;
    //     if (data[`item_category${key}`]) {
    //       data[`item_category${key}`].push(e);
    //     } else {
    //       data[`item_category${key}`] = [];
    //       data[`item_category${key}`].push(e);
    //     }
    //   });
    // }

    if (e?.secondary_categories) {
      let tempCount = e.secondary_categories?.length;
      if (maxCount < tempCount) {
        maxCount = tempCount;
      }
    }
    if (e.price_type) data['price_type'].push(e.price_type);
    if (e.price) data['price'].push(e.price);
    if (e.quantity) data['quantity'].push(e.quantity);
  });

  for (let i = 0; i < maxCount; i++) {
    test[`item_category${i + 2}`] = [];
  }
  let keys = Object.keys(test);
  for (let i = 0; i < maxCount; i++) {
    for (let j = 0; j < item.length; j++) {
      if (item[j]?.secondary_categories) {
        const catName = item[j]?.secondary_categories[i]
          ? item[j]?.secondary_categories[i]
          : '';
        test[keys[i]].push(catName);
      } else {
        test[keys[i]].push('');
      }
    }
  }
  Object.keys(data).forEach((e) => {
    if (!data[e].length) {
      delete data[e];
    }
  });
  let finalObj = { ...data, ...test };
  return finalObj;
};
// category/subcat and Product detail page listing page
const viewItemList = (data, city_name, event) => {
  const allData = { ...data };
  let items = getMoengageroductDetails(allData.items, event);
  let gtmItems = productDetails(allData.items, event);
  delete allData.items;
  const eventObjet = {
    ...allData,
    localeLang,
    ...items,
    city_name,
  };
  // console.log('obj', eventObjet, event);
  extendedWindow.Moengage.track_event(event, eventObjet);
  const tagObject = {
    ...allData,
    localeLang,
    items: Object.values(gtmItems),
    city_name,
  };
  // if (event === 'purchase') {
  extendedWindow.dataLayer = extendedWindow.dataLayer || [];
  extendedWindow.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
  extendedWindow.dataLayer.push({
    event: event,
    ecommerce: tagObject,
  });
  // console.log('dataLayer', extendedWindow.dataLayer);
  // console.log('purchase gtm called', tagObject, event);
  // }
};

const mDeleteCart = (currency, item_type, item_id, city_name) => {
  extendedWindow.Moengage.track_event('remove_from_cart', {
    currency,
    item_type,
    item_id,
    localeLang,
    city_name,
  });
  extendedWindow.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
  extendedWindow.dataLayer.push({
    event: 'remove_from_cart',
    ecommerce: { currency, item_type, item_id, localeLang, city_name },
  });
};

// Promo code success/fail events
const promoCodeEvent = (event, currency, coupon, discount, city_name) => {
  extendedWindow.Moengage.track_event(event, {
    currency,
    coupon,
    discount,
    city_name,
  });
  extendedWindow.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
  extendedWindow.dataLayer.push({
    event: event,
    ecommerce: { currency, coupon, discount, city_name },
  });
};

export {
  viewPageEvent,
  loginRegisterEvent,
  mPage,
  profileUpdateEvent,
  mSearch,
  addressAdd,
  popUpEvents,
  Share,
  viewItemList,
  mDeleteCart,
  promoCodeEvent,
};
