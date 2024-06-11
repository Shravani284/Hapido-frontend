import { REGEX } from 'berlin-common/src/constants';
import * as yup from 'yup';
interface DealDescriptionTranslation {
  locale: string;
  column_name: string;
  text: string;
}

interface DealDescription {
  translations: DealDescriptionTranslation[];
}
export interface DealComboI {
  //? General Information
  translations: { column_name: string; locale: string; text: string }[];

  platform: null | dropdown;

  //? Deal Description
  deal_descriptions: DealDescription[];

  //? Media Assets
  image_ids: string;
  video_ids: string;
  image_ids_ar: string;
  video_ids_ar: string;

  //? Include deals
  dealIds: any[];

  //? Pricing and Display Details
  selling_price: string;
  old_price: string;
  currency: null | dropdown;
  show_old_price: boolean;
  initial_bought_count?: string;

  //? Category Information
  primary_category_id: null | dropdown;
  secondary_category_ids: any[];

  //?====> SalesAndLimitInfo
  selling_limit: string;
  sold_count: number;
  max_limit_per_customer: string;
  min_limit_per_transaction: string;
  max_limit_per_transaction: string;

  //? Promotion & Visibility
  show_timer: boolean;
  is_featured: boolean;
  sold_out: boolean;
  priority: string;
  feature_widget_priority: string;

  //? Validity PeriodsClaimEndDate
  deal_active_date: Date | null;
  deal_end_date: Date | null;

  //?  Audience Recommendation
  traveller_types: any[];
  //? Administrative Data
  active: boolean;
  deal_tags: any[];
  home_widget_priority: string;
  is_home_widget_deal: boolean;
  notes: string;
  rating: string;
}

export const initialValues = {
  //? GeneralInfo
  //   bundleID: '',
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
  platform: null,

  //? Deal Description
  deal_descriptions: [
    {
      translations: [
        {
          locale: 'en',
          column_name: 'description_title_trans_ids',
          text: '',
        },
        {
          locale: 'en',
          column_name: 'description_detail_trans_ids',
          text: '',
        },
        {
          locale: 'ar',
          column_name: 'description_title_trans_ids',
          text: '',
        },
        {
          locale: 'ar',
          column_name: 'description_detail_trans_ids',
          text: '',
        },
      ],
    },
  ],

  //? Media Assets
  image_ids: '',
  video_ids: '',
  image_ids_ar: '',
  video_ids_ar: '',

  //includes deal
  dealIds: [],

  //? Pricing and Display Details
  selling_price: '',
  old_price: '',
  currency: null,
  show_old_price: false,
  initial_bought_count: '',

  //? Category Information
  primary_category_id: null,
  secondary_category_ids: [],

  //?====> SalesAndLimitInfo
  selling_limit: '',
  sold_count: 0,
  max_limit_per_customer: '',
  min_limit_per_transaction: '',
  max_limit_per_transaction: '',

  //? PromotionAndVisibility
  show_timer: false,
  is_featured: false,
  sold_out: false,
  priority: '',
  feature_widget_priority: '',

  //? ValidityPeriod
  deal_active_date: null,
  deal_end_date: null,

  //?  Audience Recommendation
  traveller_types: [],
  //? AdministrativeData
  deal_tags: [],
  active: true,
  is_home_widget_deal: false,
  home_widget_priority: '',
  notes: '',
  rating: '0',
};
interface dropdown {
  label: string;
  id: string | number;
}

export const validationSchema = yup.object({
  //?====> General Information
  //   bundleID: '',
  translations: yup.array().of(
    yup.object().shape({
      column_name: yup.string().required(''),
      locale: yup.string().required(''),
      text: yup
        .string()
        .matches(REGEX.INITIALCHAR, 'Field is not valid')
        .required('Field is required'),
    })
  ),
  platform: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .required('Platform required'),

  //?====> Deal Description
  deal_descriptions: yup.array().of(
    yup.object().shape({
      translations: yup.array().of(
        yup.object().shape({
          locale: yup.string().required(), // Validate that 'locale' is a non-empty string
          column_name: yup.string().required(),
          // Validate that 'column_name' is a non-empty string
          text: yup
            .string()
            .matches(REGEX.INITIALCHAR, 'Field is not valid')
            .required('Field is Required'), // Validate that 'text' is a non-empty string
        })
      ),
    })
  ),

  //?====> MediaAssets
  // image_ids: yup.string().required('Image Required'),
  // video_ids: yup.string().required('Video Required'),

  dealIds: yup.array().min(1),

  //?====> Pricing and Display Details
  selling_price: yup
    .string()
    .matches(REGEX.NUMBER, 'Please enter valid Selling Price')
    .required('Selling Price required'),
  old_price: yup
    .string()
    .matches(REGEX.NUMBER, 'Please enter valid Price')
    .required(' Old Price required'),
  currency: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .required('Currency is required'),
  // initial_bought_count: yup
  //   .string()
  //   .matches(REGEX.NUMBER, 'Please enter valid Initial Bought Count')
  //   .required('Initial Bought Count required'),

  //?====>Category Information
  primary_category_id: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .required('Primary Category required'),
  // secondary_category_ids: yup.array().min(1),

  //?====> SalesAndLimitInfo
  selling_limit: yup
    .string()
    .matches(REGEX.NUMBER, 'Please enter valid Selling Limit')
    .required('Selling limit required'),
  max_limit_per_customer: yup
    .string()
    .matches(REGEX.NUMBER, 'Please enter valid value')
    .required('Max limit per customer required'),
  min_limit_per_transaction: yup
    .string()
    .matches(REGEX.NUMBER, 'Please enter valid value')
    .nullable(),
  max_limit_per_transaction: yup
    .string()
    .matches(REGEX.NUMBER, 'Please enter valid value')
    .required('Max limit per transaction required'),

  //?====> PromotionAndVisibility
  priority: yup
    .string()
    .matches(REGEX.PRIORITY, 'Please enter valid priority number')
    .required('Priority required'),
  feature_widget_priority: yup
    .string()
    .matches(REGEX.PRIORITY, 'Please enter valid number')
    .when('is_featured', {
      is: (val: any) => val === true,
      then: (schema) => schema.required('Feature widget priority is required'),
      otherwise: (schema) => schema.nullable(''),
    }),

  //? Validity Periods
  deal_active_date: yup.date().required('Deal Active Date Required'),
  deal_end_date: yup.date().required('Deal End Date Required'),

  //?  Audience Recommendation
  traveller_types: yup
    .array()
    .min(1, 'Suggested traveler type must have at least 1 items')
    .required('Suggested traveler type is required'),

  //? Administrative Data
  deal_tags: yup.array().min(1),
  home_widget_priority: yup
    .string()
    .matches(REGEX.PRIORITY, 'Please enter valid number')
    .when('is_home_widget_deal', {
      is: (val: any) => val === true,
      then: (schema) => schema.required('Home widget priority is required'),
      otherwise: (schema) => schema.nullable(''),
    }),
  rating: yup
    .string()
    .matches(/^[0-5](\.[0-9])?$/, 'Please Add valid Rating')
    .required('Rating is required'),
});
