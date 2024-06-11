import { REGEX } from 'berlin-common/src/constants';

import * as yup from 'yup';

export interface DPValues {
  //? general filed
  title_en: string;
  title_ar: string;
  tagline_en: string;
  tagline_ar: string;
  flash_scope: null | dropdown;
  category_ids: [];
  exclude_category_ids: [];
  exclude_deal_ids: [];
  exclude_combo_ids: [];
  area_ids: [];
  price_start: string;
  price_end: string;
  commission_percentage_start: string;
  commission_percentage_end: string;
  discount_percent: string;
  priority: string;
  platform: null | dropdown;
  image_id: string;
  video_id: string;
  image_id_ar: string;
  video_id_ar: string;
  active: boolean;

  //? Deal Specifics
  limit_per_customer: string;
  total_voucher_limit: string;
  total_sold_count: number;
  min_cart_amount: string;
  max_discount_cap: string;

  //? Flash Sale Period
  fs_active_date: string | Date;
  fs_end_date: string | Date;

  //? Administrative Data
}

interface dropdown {
  label: string;
  id: string | number;
}

export const validationSchema = yup.object({
  //? general filed
  title_en: yup.string().required('Name required'),
  title_ar: yup.string().required('Name required'),
  tagline_en: yup.string().required('Name required'),
  tagline_ar: yup.string().required('Name required'),

  flash_scope: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .required('Flash Scope required'),

  category_ids: yup.array().when('flash_scope', {
    is: (val: dropdown) => val?.id == 'CATEGORY',
    then: (schema) =>
      schema
        .min(1, 'Minimum 1 Category Id required')
        .required('Category Ids required'),
    otherwise: (schema) => schema.nullable(),
  }),
  area_ids: yup.array().when('flash_scope', {
    is: (val: dropdown) => val?.id == 'AREA',
    then: (schema) =>
      schema.min(1, 'Minimum 1 Area Id required').required('Area Ids required'),
    otherwise: (schema) => schema.nullable(),
  }),

  price_start: yup.number().when('flash_scope', {
    is: (val: dropdown) => val?.id == 'PRICE',
    then: (schema) => schema.required('Price start required'),
    otherwise: (schema) => schema.nullable(),
  }),
  price_end: yup.number().when('flash_scope', {
    is: (val: dropdown) => val?.id == 'PRICE',
    then: (schema) => schema.required('Price end required'),
    otherwise: (schema) => schema.nullable(),
  }),

  commission_percentage_start: yup.number().when('flash_scope', {
    is: (val: dropdown) => val?.id == 'COMMISSION_PERCENT',
    then: (schema) =>
      schema
        .min(0, 'Commission percent must be at least 0')
        .max(100, 'Commission percent must not exceed 100')
        .required('Commission Percentage start required'),
    otherwise: (schema) => schema.nullable(),
  }),
  commission_percentage_end: yup.number().when('flash_scope', {
    is: (val: dropdown) => val?.id == 'COMMISSION_PERCENT',
    then: (schema) =>
      schema
        .min(0, 'Commission percent must be at least 0')
        .max(100, 'Commission percent must not exceed 100')
        .required('Commission Percentage end required'),
    otherwise: (schema) => schema.nullable(),
  }),

  discount_percent: yup
    .string()
    .matches(REGEX.PERCENTAGE, 'Please enter Discount percent between 0-100')
    .required('Min Discount percent required'),

  priority: yup
    .string()
    .matches(REGEX.PRIORITY, 'Please enter valid priority')
    .required('Priority required'),
  platform: yup.object().shape({
    label: yup.string().nullable(),
    id: yup.string().nullable(),
  }),

  // image_id: yup.string().required('Image ids required'),
  // video_id: yup.string().nullable(),
  limit_per_customer: yup.number().required('Limit Per Customer required'),
  total_voucher_limit: yup.number().required('Total Voucher Limit required'),
  total_sold_count: yup.number().nullable(),
  // min_cart_amount: yup
  //   .string()
  //   .matches(REGEX.NUMBER, 'Please enter valid Min Cart Amount'),
  // //   .required('Min Cart Amount required'),
  // max_discount_cap: yup
  //   .string()
  //   .matches(REGEX.NUMBER, 'Please enter valid Max Discount Cap'),
  //   .required('Max Discount Cap required'),

  min_cart_amount: yup
    .string()
    .matches(REGEX.FLASHSALEDISCOUNT, 'Please enter valid Min Cart Amount')
    .test(
      'isInRange',
      'Min Per Deal Value must be in the range 1 to 9999',
      (value) => {
        if (value) {
          const numberValue = parseInt(value, 10);
          return numberValue >= 1 && numberValue <= 9999;
        }
        return true; // Pass validation if value is null or empty
      }
    )
    .nullable(), // Allows passing null as a valid value

  max_discount_cap: yup
    .string()
    .matches(REGEX.FLASHSALEDISCOUNT, 'Please enter valid Max Discount Cap')
    .test(
      'isInRange',
      'Max Per Deal Discount must be in the range 1 to 9999',
      (value) => {
        if (value) {
          const numberValue = parseInt(value, 10);
          return numberValue >= 1 && numberValue <= 9999;
        }
        return true; // Pass validation if value is null or empty
      }
    )
    .nullable(), // Allows passing null as a valid value
  fs_active_date: yup.string().required('Flash Sale Active Date required'),
  fs_end_date: yup.string().required('Flash Sale End Date required'),
});

export const initialValues: DPValues = {
  //? general filed
  title_en: '',
  title_ar: '',
  tagline_en: '',
  tagline_ar: '',
  flash_scope: null,
  category_ids: [],
  exclude_category_ids: [],
  exclude_deal_ids: [],
  exclude_combo_ids: [],
  area_ids: [],
  price_start: '',
  price_end: '',
  commission_percentage_start: '',
  commission_percentage_end: '',
  discount_percent: '',
  priority: '',
  platform: null,
  image_id: '',
  video_id: '',
  image_id_ar: '',
  video_id_ar: '',
  active: true,

  //? Deal Specifics
  limit_per_customer: '',
  total_voucher_limit: '',
  total_sold_count: null,
  min_cart_amount: '',
  max_discount_cap: '',

  //? Flash Sale Period
  fs_active_date: '',
  fs_end_date: '',
};
