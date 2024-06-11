import { REGEX } from 'berlin-common/src/constants';

import * as yup from 'yup';

export interface FlashSaleValues {
  //? general filed
  title_en: string;
  title_ar: string;
  tagline_en: string;
  tagline_ar: string;
  deal_id_1_type: null | dropdown;
  deal_id_1: null | dropdown;
  deal_1_exclude_option_ids: String[];
  deal_id_2: null | dropdown;
  deal_id_2_type: null | dropdown;
  deal_2_exclude_option_ids: String[];
  second_deal_discount_percent: String;
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
  active: boolean;
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
  title_en: yup.string().required('Title (English) is required'),

  title_ar: yup.string().required('Title (Arabic) is required'),

  tagline_en: yup.string().required('Tagline (English) is required'),

  tagline_ar: yup.string().required('Tagline (Arabic) is required'),

  deal_id_1_type: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .required('Deal type 1 is required'),

  deal_id_1: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .required('Deal selection 1 is required'),

  // deal_1_exclude_option_ids: yup.array().nullable(),
  // .required('Deal selection 1 is required'),

  deal_id_2_type: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .required('Deal type 2 is required'),

  deal_id_2: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .required('Deal selection 2 is required'),

  second_deal_discount_percent: yup
    .string()
    .matches(REGEX.PERCENTAGE, 'Please enter valid Discount Percentage')
    .required('Discount percentage is required'),

  limit_per_customer: yup
    .string()
    .matches(REGEX.NUMBER, 'Please enter valid value')
    .required('Limit per customer is required'),

  total_voucher_limit: yup
    .string()
    .matches(REGEX.NUMBER, 'Please enter valid value')
    .required('Total vouchers available is required'),

  priority: yup
    .string()
    .matches(REGEX.PRIORITY, 'Please enter valid priority')
    .required('Priority required'),
  platform: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .required('Platform is required'),

  fs_active_date: yup.date().required('Start date is required'),

  fs_end_date: yup.date().required('End date is required'),
});

export const initialValues: FlashSaleValues = {
  title_en: '',
  title_ar: '',
  tagline_en: '',
  tagline_ar: '',
  deal_id_1: null,
  deal_id_1_type: null,
  deal_id_2: null,
  deal_id_2_type: null,
  deal_2_exclude_option_ids: [],
  deal_1_exclude_option_ids: [],
  second_deal_discount_percent: '',
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
