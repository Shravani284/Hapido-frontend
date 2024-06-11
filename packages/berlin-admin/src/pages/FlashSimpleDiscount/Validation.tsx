import { REGEX } from 'berlin-common/src/constants';
import * as yup from 'yup';

export interface FlashDiscountI {
  translations: { column_name: string; locale: string; text: string }[];
  discount_percent: string;
  flash_scope: null | dropdown;
  category_ids: any;
  deal_type: null | dropdown;
  deal_ids: string[];
  exclude_deal_ids: string[];
  exclude_combo_ids: string[];
  exclude_category_ids: string[];
  image_id: string;
  video_id: string;
  image_id_ar: string;
  video_id_ar: string;
  fs_active_date: Date | null;
  fs_end_date: Date | null;
  platform: null | dropdown;
  active: boolean;
}

export const initialValues: FlashDiscountI = {
  translations: [
    {
      column_name: 'title_trans_ids',
      locale: 'en',
      text: '',
    },
    {
      column_name: 'title_trans_ids',
      locale: 'ar',
      text: '',
    },
    {
      column_name: 'tagline_trans_ids',
      locale: 'en',
      text: '',
    },
    {
      column_name: 'tagline_trans_ids',
      locale: 'ar',
      text: '',
    },
  ],
  discount_percent: '',
  flash_scope: null,
  category_ids: [],
  deal_type: null,
  deal_ids: [],
  exclude_deal_ids: [],
  exclude_combo_ids: [],
  exclude_category_ids: [],
  image_id: '',
  video_id: '',
  image_id_ar: '',
  video_id_ar: '',
  fs_active_date: null,
  fs_end_date: null,
  platform: null,
  active: true,
};

export const validationSchema = yup.object({
  translations: yup.array().of(
    yup.object().shape({
      column_name: yup.string().required(''),
      locale: yup.string().required(''),
      text: yup.string().required('Field is required'),
    })
  ),
  discount_percent: yup
    .string()
    .matches(REGEX.PERCENTAGE, 'Percentage should not be more than 100')
    .required('Discount Percent required'),
  flash_scope: yup.object().shape({
    label: yup.string().nullable(),
    id: yup.string().nullable(),
  }),
  category_ids: yup.array().when('flash_scope', {
    is: (val: dropdown) => val?.id == 'SUBCATEGORY',
    then: (schema) => schema.min(1).required('Category required'),
    otherwise: (schema) => schema.nullable(),
  }),
  deal_type: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .when('flash_scope', {
      is: (val: dropdown) => val?.id == 'DEAL',
      then: (schema) => schema.required('Deal Type required'),
      otherwise: (schema) => schema.nullable(),
    }),

  deal_ids: yup.array().when('flash_scope', {
    is: (val: dropdown) => val?.id == 'DEAL',
    then: (schema) => schema.min(1).required('Deals required'),
    otherwise: (schema) => schema.nullable(),
  }),

  // exclude_deal_ids: yup.array().when('deal_type', {
  //   is: (val: dropdown) => val?.id == 'BUNDLE',
  //   then: (schema) => schema.min(1).required('Deals required'),
  //   otherwise: (schema) => schema.nullable(),
  // }),
  // image_id: yup.string().required('Image ids required'),
  fs_active_date: yup.string().required('Flash Sale Active Date required'),
  fs_end_date: yup.string().required('Flash Sale End Date required'),
  platform: yup.object().shape({
    label: yup.string().nullable(),
    id: yup.string().nullable(),
  }),
});

interface dropdown {
  label: string;
  id: string | number;
}
