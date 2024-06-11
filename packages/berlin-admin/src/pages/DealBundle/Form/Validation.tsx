import { REGEX } from 'berlin-common/src/constants';
import * as yup from 'yup';
interface DealDescriptionTranslation {
  locale: string;
  column_name: string;
  text: string;
}
interface Dropdown {
  id: number | string;
  label: string;
}
interface DealDescription {
  translations: DealDescriptionTranslation[];
}
export interface DealBundleI {
  //? General Information
  translations: { column_name: string; locale: string; text: string }[];

  platform: null | dropdown;

  //? Deal Description
  deal_descriptions: DealDescription[];

  //? Media Assets
  image_ids: any[];
  video_ids: any[];
  image_ids_ar: any[];
  video_ids_ar: any[];

  //? Includes Deal
  dealIds: [{}];

  //? Pricing and Display Details
  display_selling_price: string;
  display_old_price: String;
  currency: Dropdown | null;
  show_old_price: boolean;
  initial_bought_count: string;

  //? Category Information
  primary_category_id: null | dropdown;
  secondary_category_ids: any[];

  //? Promotion & Visibility
  show_timer: boolean;
  is_featured: boolean;
  sold_out: boolean;
  priority: string;
  feature_widget_priority: string;

  //? Validity Periods
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

interface dropdown {
  label: string;
  id: string | number;
}

export const validationSchema = yup.object({
  //? General Information

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

  deal_descriptions: yup.array().of(
    yup.object().shape({
      translations: yup.array().of(
        yup.object().shape({
          locale: yup.string().required(), // Validate that 'locale' is a non-empty string
          column_name: yup.string().required(), // Validate that 'column_name' is a non-empty string
          text: yup
            .string()
            .matches(REGEX.INITIALCHAR, 'Field is not valid')
            .required('Field is required'), // Validate that 'text' is a non-empty string
        })
      ),
    })
  ),

  //? Media Assets
  // image_ids: yup.array().min(1).required('Image required'),
  // video_ids: yup.array().min(1).required('Video Required'),

  //? Includes Deal

  dealIds: yup
    .array()
    .of(
      yup.object().shape({
        dealId: yup.string().required('Deal id is required'),
        priority: yup
          .string()
          .matches(REGEX.PRIORITY, 'Please enter valid priority number')
          .required('Priority is required'),
      })
    )
    .min(2, 'Minimum 2 deals required'),

  //? Pricing and Display Details
  display_selling_price: yup
    .string()
    .matches(REGEX.NUMBER, 'Please enter valid Display Selling Price')
    .required('Display Selling Price required'),
  display_old_price: yup
    .string()
    .matches(REGEX.NUMBER, 'Please enter valid Display Selling Price')
    .required('Display Selling Price required'),
  currency: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .required('Currency is required'),
  initial_bought_count: yup
    .string()
    .nullable()
    .matches(REGEX.NUMBER, 'Please enter valid Initial Bought Count'),

  //? Category Information
  primary_category_id: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .required('Primary Category required'),
  // secondary_category_ids: yup.array().min(1),

  //? Promotion & Visibility
  priority: yup
    .string()
    .matches(REGEX.PRIORITY, 'Please enter valid priority')
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

  deal_tags: yup.array().min(1, 'Deal tags is required'),
  home_widget_priority: yup
    .string()
    .matches(REGEX.NUMBER, 'Please enter valid number')
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

export const initialValues: DealBundleI = {
  //? General Information

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
  image_ids: [],
  video_ids: [],
  image_ids_ar: [],
  video_ids_ar: [],

  //? Includes Deal
  dealIds: [{ dealId: '', priority: '' }],

  //? Pricing and Display Details
  display_selling_price: '',
  display_old_price: '',
  currency: null,
  show_old_price: false,
  initial_bought_count: '',

  //? Category Information
  primary_category_id: null,
  secondary_category_ids: [],

  //? Promotion & Visibility
  show_timer: false,
  is_featured: false,
  sold_out: false,
  priority: '',
  feature_widget_priority: '',

  //? Validity Periods
  deal_active_date: null,
  deal_end_date: null,

  //?  Audience Recommendation
  traveller_types: [],
  //? Administrative Data
  notes: '',
  active: true,
  deal_tags: [],
  is_home_widget_deal: false,
  home_widget_priority: '',
  rating: '0',
};
