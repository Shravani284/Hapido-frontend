import { REGEX } from 'berlin-common/src/constants';

import * as yup from 'yup';

export interface BOGOValues {
  //? general filed
  title_en: string;
  title_ar: string;
  tagline_en: string;
  tagline_ar: string;
  deal_id: null | dropdown;
  deal_type: null | dropdown;
  image_id: string;
  video_id: string;
  image_id_ar: string;
  video_id_ar: string;
  priority: string;
  platform: null | dropdown;
  deal_exclude_option_ids: string[];
  active: boolean;

  //? Deal Specifics
  limit_per_customer: string;
  total_voucher_limit: string;
  total_sold_count: string;

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
  title_en: yup.string().required('Name is required'),
  title_ar: yup.string().required('Name is required'),
  tagline_en: yup.string().required('Tagline is required'),
  tagline_ar: yup.string().required('Tagline is required'),
  deal_id: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .required('Deal id is required'),
  deal_type: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .required('Deal type is required'),
  priority: yup
    .string()
    .matches(REGEX.PRIORITY, 'Please enter valid priority')
    .required('Priority required'),
  platform: yup.object().shape({
    label: yup.string().nullable(),
    id: yup.string().nullable(),
  }),

  // image_id: yup.string().required('Image ids is required'),
  // video_id: yup
  //   .array()
  //   .required('Video ids required')
  //   .min(1, 'Video ids field must have at least 1 items'),
  limit_per_customer: yup
    .string()
    .matches(REGEX.NUMBER, 'Please enter valid value')
    .required('Limit per customer is required'),
  total_voucher_limit: yup
    .string()
    .matches(REGEX.NUMBER, 'Please enter valid value')
    .required('Total voucher limit is required'),
  // total_sold_count: yup.number().required('Total sold count is required'),
  fs_active_date: yup.string().required('Flash sale active date is required'),
  fs_end_date: yup.string().required('Flash sale end date is required'),
});

export const initialValues: BOGOValues = {
  //? general filed
  title_en: '',
  title_ar: '',
  tagline_en: '',
  tagline_ar: '',
  deal_id: null,
  deal_type: null,
  image_id: '',
  video_id: '',
  image_id_ar: '',
  video_id_ar: '',
  priority: '',
  platform: null,
  deal_exclude_option_ids: [],
  active: true,

  //? Deal Specifics
  limit_per_customer: '',
  total_voucher_limit: '',
  total_sold_count: '',

  //? Flash Sale Period
  fs_active_date: '',
  fs_end_date: '',
};
