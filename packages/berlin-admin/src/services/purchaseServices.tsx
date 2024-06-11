import { ApiRequest } from 'berlin-common';
import {
  DatePaidFormat,
  formatDateInDubaiTimeZone,
} from 'berlin-common/src/components/DateFormat';

const URL = {
  GETALLVOUCHER: '/api/v1/admin/voucher',
  GETVOUCHERBYID: '/api/v1/admin/voucher',
  GETMERCHANTDOROPDOWN: '/api/v1/admin/merchant',
  GETALLPAYMENTLOGS: '/api/v1/admin/paymentlogs',
  GETPAYMENTLOGBYID: '/api/v1/admin/paymentlogs',
  //for orders
  GETALLORDERS: '/api/v1/admin/order',
  GETORDERBYID: 'api/v1/admin/order',
  GETALLORDERUTM: '/api/v1/admin/orderutm',
  GETDEALSALES: '/api/v1/admin/dealsales',
  GETACTIVEDEALS: '/api/v1/admin/active/dealsales',
};

export const getAllVoucher = async (
  page: number,
  rowsPerPage: number,
  data: any
) => {
  let url = `?page=${page + 1}&limit=${rowsPerPage}`;
  if (data?.order_number) url += `&ordernumber=${data?.order_number}`;
  if (data?.order_id) url += `&orderid=${data?.order_id}`;
  if (data?.user_platform?.id)
    url += `&user_platform=${data?.user_platform?.id}`;
  if (data?.code) url += `&code=${data?.code}`;
  if (data?.merchantId?.id) url += `&merchantid=${data?.merchantId?.id}`;
  if (data?.userId?.id) url += `&customerid=${data?.userId?.id}`;
  // if (data?.is_booking_slot_voucher) url += `&orderid=${data?.is_booking_slot_voucher}`;
  if (data?.voucher_status?.id)
    url += `&voucherstatus=${data?.voucher_status?.id}`;
  if (data?.voucher_id) url += `&voucherid=${data?.voucher_id}`;
  if (data?.deal_type?.id) url += `&dealtype=${data?.deal_type?.id}`;
  if (data?.deal_type?.id == 'SINGLE') {
    if (data?.dealName?.id) url += `&dealid=${data?.dealName?.id}`;
  } else if (data?.deal_type?.id == 'BUNDLE') {
    if (data?.dealName?.id) url += `&bundleid=${data?.dealName?.id}`;
  } else if (data?.deal_type?.id == 'COMBO') {
    if (data?.dealName?.id) url += `&comboid=${data?.dealName?.id}`;
  }

  const response = await ApiRequest.get(`${URL.GETALLVOUCHER}${url}`);
  return response.data;
};

export const getVoucherById = async (id: any) => {
  const response = await ApiRequest.get(`${URL.GETVOUCHERBYID}/${id}`);
  return response;
};

// export const merchantDropDownApi = async () => {
//   try {
//     const response = await ApiRequest.get(URL.GETMERCHANTDOROPDOWN);
//     const data = response?.data?.data?.marchants.map((item: any) => {
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

export const getAllPaymentLogs = async (
  page: number,
  rowsPerPage: number,
  data: any
) => {
  let url = `?page=${page + 1}&limit=${rowsPerPage}`;
  if (data?.order_number) url += `&ordernumber=${data?.order_number}`;
  if (data?.order_id) url += `&orderid=${data?.order_id}`;
  if (data?.transactionref) url += `&orderid=${data?.transactionref}`;
  if (data?.payment_status?.id)
    url += `&paymentstatus=${data?.payment_status?.id}`;
  if (data?.for?.id) url += `&for=${data?.for?.id}`;
  if (data?.start_date) url += `&start_date=${data?.start_date}`;
  if (data?.end_date) url += `&end_date=${data?.end_date}`;

  const response = await ApiRequest.get(`${URL.GETALLPAYMENTLOGS}${url}`);

  return response.data;
};
export const getPaymentLogById = async (id: any) => {
  const response = await ApiRequest.get(`${URL.GETPAYMENTLOGBYID}/${id}`);
  return response;
};

//for orders
export const getAllOrders = async (
  page: number,
  rowsPerPage: number,
  data: any
) => {
  let url = `?page=${page + 1}&limit=${rowsPerPage}`;
  if (data?.order_number) url += `&ordernumber=${data?.order_number}`;
  if (data?.user_platform?.id)
    url += `&user_platform=${data?.user_platform?.id}`;
  if (data?.order_id) url += `&orderid=${data?.order_id}`;
  if (data?.transactionref) url += `&orderid=${data?.transactionref}`;
  if (data?.user_id?.id) url += `&customerid=${data?.user_id?.id}`;
  if (data?.payment_status?.id)
    url += `&paymentstatus=${data?.payment_status?.id}`;
  if (data?.start_date) url += `&startDate=${data?.start_date}`;
  if (data?.end_date) url += `&endDate=${data?.end_date}`;
  if (data?.paidStartDate) url += `&paidStartDate=${data?.paidStartDate}`;
  if (data?.paidEndDate) url += `&paidEndDate=${data?.paidEndDate}`;

  const response = await ApiRequest.get(`${URL.GETALLORDERS}${url}`);
  return response.data;
};

export const getOrderById = async (id: any) => {
  const response = await ApiRequest.get(`${URL.GETORDERBYID}/${id}`);
  return response;
};

//for order UTM
export const getAllOrderUTM = async (
  page: number,
  rowsPerPage: number,
  data: any
) => {
  let url = `?page=${page + 1}&limit=${rowsPerPage}`;
  if (data?.order_number) url += `&ordernumber=${data?.order_number}`;
  if (data?.order_id) url += `&orderid=${data?.order_id}`;
  if (data?.utm_campaign) url += `&utmcampaign=${data?.utm_campaign}`;
  if (data?.utm_medium) url += `&utmmedium=${data?.utm_medium}`;
  if (data?.utm_source) url += `&utmsource=${data?.utm_source}`;
  // if (data?.start_date) url += `&startDate=${data?.start_date}`;

  const response = await ApiRequest.get(`${URL.GETALLORDERUTM}${url}`);
  return response.data;
};

export const getDealSales = async (paidStartDate: any, paidEndDate: any) => {
  let url = URL.GETDEALSALES;
  if (paidStartDate) {
    url += `?paidStartDate=${DatePaidFormat(paidStartDate)}`;
  } else {
    url += `?paidStartDate=${DatePaidFormat(new Date())}`;
  }
  if (paidEndDate) {
    url += `&paidEndDate=${DatePaidFormat(paidEndDate)}`;
  } else {
    url += `&paidEndDate=${DatePaidFormat(new Date())}`;
  }
  const response = await ApiRequest.get(`${url}`);
  return response;
};
export const getActiveDeals = async () => {
  const response = await ApiRequest.get(`${URL.GETACTIVEDEALS}`);
  return response;
};
