import { REGEX } from 'berlin-common/src/constants';

import * as yup from 'yup';

export interface BuyOneGetFreeGiftValue {
  title_en: string;
  title_ar: string;
  tagline_en: string;
  tagline_ar: string;
  // deal_id: null | dropdown;
  free_entitlement: null | dropdown;
  free_promo_code_id: null | dropdown;
  free_deal_type: null | dropdown;
  free_deal_id: null | dropdown;
  free_deal_quantity: null | dropdown;
  min_cart_amount: String;
  exclude_category_ids: [];
  limit_per_customer: String;
  total_voucher_limit: String;
  total_sold_count: String;
  priority: String;
  platform: null | dropdown;
  fs_active_date: Date | String;
  fs_end_date: Date | String;
  image_id: string;
  video_id: string;
  image_id_ar: string;
  video_id_ar: string;
  created_at: Date | null;
  updated_at: Date | null;
  created_by: string;
  updated_by: string;
  active: boolean | number;
}

interface dropdown {
  label: string;
  id: string | number;
}

export interface Translation {
  column_name: string;
  locale: string;
  text: string;
}

export const validationSchema = yup.object({
  title_en: yup.string().required('Title (English) required'),

  title_ar: yup.string().required('Title (Arabic) required'),

  tagline_en: yup.string().required('Tagline (English) required'),

  tagline_ar: yup.string().required('Tagline (Arabic) required'),

  // deal_id: yup
  //   .object()
  //   .shape({
  //     label: yup.string().nullable(),
  //     id: yup.string().nullable(),
  //   })
  //   .required('Deal Id required'),

  free_entitlement: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .required('Free Entitlement required'),

  free_promo_code_id: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .when('free_entitlement', {
      is: (val: dropdown) => val?.id == 'PROMO CODE',
      then: (schema) => schema.required('Free Promo Code Id required'),
      otherwise: (schema) => schema.nullable(),
    }),

  free_deal_type: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .when('free_entitlement', {
      is: (val: dropdown) => val?.id == 'DEAL',
      then: (schema) => schema.required('Free Deal Type required'),
      otherwise: (schema) => schema.nullable(),
    }),

  free_deal_id: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .when('free_entitlement', {
      is: (val: dropdown) => val?.id == 'DEAL',
      then: (schema) => schema.required('Free Deal Id required'),
      otherwise: (schema) => schema.nullable(),
    }),

  free_deal_quantity: yup.string().when('free_entitlement', {
    is: (val: dropdown) => val?.id == 'DEAL',
    then: (schema) => schema.required('Free Deal quantity required'),
    otherwise: (schema) => schema.nullable(),
  }),

  min_cart_amount: yup
    .string()
    .matches(REGEX.NUMBER, 'Please enter valid Min Cart Amount')
    .required('Min Cart Amount is required'),

  limit_per_customer: yup.string().when('free_entitlement', {
    is: (val: any) => val.id == 'DEAL',
    then: (schema) => schema.required('Limit per customer is required'),
    otherwise: (schema) => schema.nullable(),
  }),
  total_voucher_limit: yup
    .string()
    .matches(REGEX.NUMBER, 'Please enter valid Total Voucher Limit')
    .required('Total vouchers available is required'),

  // .required('Limit per customer is required'),

  // .required('Total vouchers available is required'),

  // total_sold_count: yup
  //   .string()
  //   .matches(REGEX.NUMBER, 'Please enter Total Sold Count')
  //   .required('Total Sold Count required'),

  // image_id: yup.string().required('Image ids required'),

  priority: yup
    .string()
    .matches(REGEX.PRIORITY, 'Please enter valid priority')
    .required('Priority required'),
  platform: yup.object().shape({
    label: yup.string().nullable(),
    id: yup.string().nullable(),
  }),

  fs_active_date: yup.date().required('Start Date Required'),

  fs_end_date: yup.date().required('End Date Required'),
});

export const initialValues: BuyOneGetFreeGiftValue = {
  title_en: '',
  title_ar: '',
  tagline_en: '',
  tagline_ar: '',
  // deal_id: null,
  free_entitlement: null,
  free_promo_code_id: null,
  free_deal_type: null,
  free_deal_id: null,
  free_deal_quantity: null,
  min_cart_amount: '',
  exclude_category_ids: [],
  limit_per_customer: '',
  total_voucher_limit: '',
  total_sold_count: '',
  priority: '',
  platform: null,
  fs_active_date: '',
  fs_end_date: '',
  image_id: '',
  video_id: '',
  image_id_ar: '',
  video_id_ar: '',

  //?Administrative Data
  created_at: new Date(),
  updated_at: null,
  created_by: '',
  updated_by: '',
  active: true,
};
