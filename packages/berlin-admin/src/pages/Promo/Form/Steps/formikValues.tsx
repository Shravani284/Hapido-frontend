import { REGEX } from 'berlin-common/src/constants';
import * as yup from 'yup';

export interface Promo {
  //? general filed
  // promoCode: string;
  value: string;
  currency: null | dropdown;
  coupon_type: null | dropdown;
  coupon_scope: null | dropdown;
  coupon_application_type: null | dropdown;
  code: string;

  //? Coupon Specifics
  deal_id: null | dropdown;
  combo_deal_id: null | dropdown;
  category_id: null | dropdown;
  category?: any;
  deal?: any;
  platform: null | dropdown;
  exclude_deal_ids: string[];
  exclude_combo_ids: string[];
  exclude_applicable_flash_sales: string[];
  exclude_category_ids: string[];

  //  ? limit_per_customer
  limit_per_customer: string;
  limit_per_coupon: string;
  is_reusable: boolean;
  min_cart_amount: string;
  max_discount_cap: string;
  first_purchase_only: boolean;

  //? userSpecific Data
  user_id: null | dropdown;

  //? validity periods
  code_active_date: Date | null;
  code_expiry_date: Date | null;

  // ? usage and statistics
  used_count: string | null;

  //?Administrative Data
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

export const validationSchema = (value) => {
  return yup.object({
    //? general filed
    // promoCode: yup.string().required('Promo code required'),
    value: yup
      .string()
      .when('coupon_application_type', {
        is: (val: any) => val?.id === 'PERCENT',
        then: () =>
          yup
            .string()
            .required('Value is required')
            .matches(REGEX.PERCENTAGE, 'Value must be between 0-100'),
        otherwise: (schema) =>
          schema
            .required('Value is required')
            .matches(REGEX.UNDER100000, 'Value must be under 99999'),
      })
      .required('Value is required'), // done
    currency: yup
      .object()
      .shape({
        label: yup.string().nullable(),
        id: yup.string().nullable(),
      })
      .required('Currency required'), // done
    coupon_type: yup
      .object()
      .shape({
        label: yup.string().nullable(),
        id: yup.string().nullable(),
      })
      .required('Coupon type required'), // done
    coupon_scope: yup
      .object()
      .shape({
        label: yup.string().nullable(),
        id: yup.string().nullable(),
      })
      .required('Coupon Scope required'), // done
    coupon_application_type: yup
      .object()
      .shape({
        label: yup.string().nullable(),
        id: yup.string().nullable(),
      })
      .required('Coupon application type required'), // done

    //? Coupon Specifics
    exclude_deal_ids: yup.array().nullable(),

    deal_id: yup
      .object()
      .shape({
        label: yup.string().nullable(),
        id: yup.string().nullable(),
      })
      .when('coupon_scope', {
        is: (val: dropdown) => val?.id == 'DEAL' && !value.combo_deal_id,
        then: (schema) => schema.required('Deal required'),
        otherwise: (schema) => schema.nullable(),
      }),

    combo_deal_id: yup
      .object()
      .shape({
        label: yup.string().nullable(),
        id: yup.string().nullable(),
      })
      .when('coupon_scope', {
        is: (val: dropdown) => val?.id == 'DEAL' && !value.deal_id,
        then: (schema) => schema.required('Deal Combo required'),
        otherwise: (schema) => schema.nullable(),
      }),

    category_id: yup
      .object()
      .shape({
        label: yup.string().nullable(),
        id: yup.string().nullable(),
      })
      .when('coupon_scope', {
        is: (val: dropdown) => val?.id == 'CATEGORY',
        then: (schema) => schema.required('Category required'),
        otherwise: (schema) => schema.nullable(),
      }),

    platform: yup
      .object()
      .shape({
        label: yup.string().nullable(),
        id: yup.string().nullable(),
      })
      .required('Platform required'),

    //  ? limitation and restrictions
    limit_per_customer: yup
      .string()
      .matches(REGEX.NUMBER, 'Please enter valid Limit Per Customer')
      .nullable(),
    limit_per_coupon: yup
      .string()
      .matches(REGEX.NUMBER, 'Please enter valid Limit Per Coupon')
      .required(' Limit Per Coupon required'),
    min_cart_amount: yup
      .string()
      .matches(REGEX.NUMBER, 'Please enter valid Min Cart Amount')
      .nullable(),
    max_discount_cap: yup
      .string()
      .matches(REGEX.NUMBER, 'Please enter valid Max Discount Cap')
      .nullable(),

    //? validity periods
    code_active_date: yup.date().required('Code Active Date Required'),
    code_expiry_date: yup.date().required('Code Expiry Date Required'),
    code: yup
      .string()
      .matches(REGEX.PROMOCODE, 'Please enter valid Promo Code')
      .required('Promo Code Is Required'),
  });
};

export const initialValues = {
  //? general filed
  // promoCode: '',
  value: '',
  currency: null,
  coupon_type: null,
  coupon_scope: null,
  coupon_application_type: null,
  code: null,

  //? Coupon Specifics
  deal_id: null,
  combo_deal_id: null,
  category_id: null,
  platform: null,
  exclude_deal_ids: [],
  exclude_combo_ids: [],
  exclude_applicable_flash_sales: [],
  exclude_category_ids: [],

  //  ? limit_per_customer
  limit_per_customer: '',
  limit_per_coupon: '',
  is_reusable: false,
  min_cart_amount: '',
  max_discount_cap: '',
  first_purchase_only: false,

  //? userSpecific Data
  user_id: null,

  //? validity periods
  code_active_date: null,
  code_expiry_date: null,

  //   ?usage and statistics
  used_count: null,

  //?Administrative Data
  created_at: new Date(),
  updated_at: null,
  created_by: '',
  updated_by: '',
  active: false,
};

export const steps = [
  {
    label: 'General Information',
  },
  {
    label: 'Coupon Specifics',
  },
  {
    label: 'Limitations & Restrictions',
  },
  {
    label: 'User Specific Data',
  },
  {
    label: 'Validity Periods',
  },
  {
    label: 'Usage & Statistics',
  },
  {
    label: 'Administrative Data',
  },
];
