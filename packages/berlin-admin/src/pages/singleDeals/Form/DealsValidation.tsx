import { REGEX } from 'berlin-common/src/constants';
import * as yup from 'yup';

interface Dropdown {
  id: number | string;
  label: string;
}
interface DealDescriptionTranslation {
  locale: string;
  column_name: string;
  text: string;
}

interface DealDescription {
  translations: DealDescriptionTranslation[];
}
export interface dealsType {
  cloneDeal: Dropdown | null;
  //? General Information
  translations: { column_name: string; locale: string; text: string }[];
  deal_type: Dropdown | null;
  platform: Dropdown | null;

  //? Deal Description
  deal_descriptions: DealDescription[];

  //? Variable Pricing
  selling_price: string;
  old_price: string;
  currency: Dropdown | null;
  commission_percentage: string;
  flat_commission_percentage: string;
  initial_bought_count: string;
  is_inventory_variable_pricing: boolean;
  is_type_variable_pricing: boolean;
  show_old_price: boolean;
  inventory_prices: any[];

  //? Pricing Details
  image_ids: string;
  video_ids: string;
  image_ids_ar: string;
  video_ids_ar: string;

  //? Scheduling And Location
  slot_allow_allocation_days_count: string;
  est_duration_hours: string;
  preferred_time_of_day: Dropdown | null;
  slot_disabled_days: Dropdown[] | [];
  is_location_specific: boolean;
  location_specific: any[];
  is_slot_enabled: Boolean;
  deal_slots: any[];

  //? Category And Vendor
  primary_category_id: Dropdown | null;
  secondary_category_ids: any[];
  merchant_id: Dropdown | null;

  //? Voucher Configuration
  voucher_type: Dropdown | null;
  hapido_fulfilled: boolean;
  template_type: Dropdown | null;
  internal_voucher_limit: string;
  internal_voucher_sold: string;
  max_voucher_per_customer: string;
  low_stock_alert_voucher_count: string;
  min_voucher_per_transaction: string;
  max_voucher_per_transaction: string;

  //? Promotion and Visibility
  priority: string;
  group_priority: string;
  show_timer: boolean;
  is_featured: boolean;
  feature_widget_priority: string;
  sold_out: boolean;
  content_manager_email_triggered: boolean;
  deal_active_date: string;
  deal_end_date: string;
  claim_start_date: string;
  claim_end_date: string;

  //?  Audience Recommendation
  traveller_types: any[];
  active: boolean;
  is_home_widget_deal: boolean;
  home_widget_priority: string;
  deal_type_prices: any[];

  //? Administrative Data
  deal_tags: any[];
  notes: string;
  deal_onboarding_status: null | Dropdown;
  rating: string;
}

export const initialValues = {
  cloneDeal: null,
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
  deal_type: { label: ' SINGLE', id: 'SINGLE' },
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

  //? Variable pricing
  selling_price: '',
  old_price: '',
  currency: null,
  commission_percentage: '',
  flat_commission_percentage: '',
  initial_bought_count: '',
  is_inventory_variable_pricing: false,
  is_type_variable_pricing: false,
  show_old_price: false,
  inventory_prices: [],

  //? Pricing Details,
  image_ids: '',
  video_ids: '',
  image_ids_ar: '',
  video_ids_ar: '',

  //? Scheduling And Location
  slot_allow_allocation_days_count: '',
  est_duration_hours: '',
  preferred_time_of_day: null,
  slot_disabled_days: [],
  location_specific: [
    {
      area_id: '',
      coordinates: '',
    },
  ],
  is_location_specific: false,
  is_slot_enabled: false,
  deal_slots: [],

  //? Category And Vendor
  primary_category_id: null,
  secondary_category_ids: [],
  merchant_id: null,

  //? Voucher Configuration
  voucher_type: null,
  hapido_fulfilled: false,
  template_type: null,
  internal_voucher_limit: '',
  internal_voucher_sold: '',
  max_voucher_per_customer: '',
  low_stock_alert_voucher_count: '',
  min_voucher_per_transaction: '',
  max_voucher_per_transaction: '',

  //? Promotion and Visibility
  priority: '',
  group_priority: '',
  show_timer: false,
  is_featured: false,
  feature_widget_priority: '',
  sold_out: false,
  content_manager_email_triggered: false,
  deal_active_date: '',
  deal_end_date: '',
  claim_start_date: '',
  claim_end_date: '',

  //?  Audience Recommendation
  traveller_types: [],
  deal_type_prices: [],

  //? Administrative Data
  active: true,
  is_home_widget_deal: false,
  home_widget_priority: '',
  deal_tags: [],
  notes: '',
  deal_onboarding_status: null,
  rating: '0',
};

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
    .required('Platform is required'),

  //? Deal Description
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

  //? Variable Pricing
  selling_price: yup.number().required('Selling price is required'),
  old_price: yup.number().required('Old price is required'),
  currency: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .required('Currency is required'),
  commission_percentage: yup
    .string()
    .matches(REGEX.PERCENTAGE, 'Please enter valid number')
    .required('Commission is required'),
  // flat_commission_percentage: yup
  //   .number()
  //   .required('Flat commission is required'),
  flat_commission_percentage: yup
    .number()
    .required('Flat commission is required')
    .min(0, 'Flat commission must be at least 0')
    .max(9999.99, 'Flat commission cannot exceed 9999.99')
    .transform((originalValue, originalObject) => {
      // Ensure the value is a valid number with up to 2 decimal places
      const parsedValue = parseFloat(originalValue);
      return isNaN(parsedValue)
        ? undefined
        : parseFloat(parsedValue.toFixed(2));
    }),
  // initial_bought_count: yup
  //   .number()
  //   .required('Initial bought Count is required'),

  inventory_prices: yup
    .array()
    .when('is_inventory_variable_pricing', (active, schema) => {
      if (active[0]) {
        return schema.of(
          yup.object().shape({
            inventory_min_count: yup
              .number()
              .min(1, 'Inventory min count must have at least 1 items')
              .required('Inventory min count is required'),
            inventory_max_count: yup
              .number()
              .min(1, 'Inventory max count must have at least 1 items')
              .integer('Please enter a whole number')
              .moreThan(
                yup.ref('inventory_min_count'),
                'Max count must be greater than or equal to min count'
              )
              .required('Inventory max count is required'),
            price: yup
              .string()
              .matches(REGEX.NUMBER, 'Please enter valid number')
              .min(1, 'Price must have at least 1 items')
              .required('Price is required'),
          })
        );
      }
      return schema.of(
        yup.object().shape({
          inventory_min_count: yup.number().nullable(),
          inventory_max_count: yup.number().nullable(),
          price: yup.string().nullable(),
        })
      );
    }),

  deal_type_prices: yup
    .array()
    .when('is_type_variable_pricing', (active, schema) => {
      if (active[0]) {
        return schema
          .of(
            yup.object().shape({
              price: yup
                .string()
                .matches(REGEX.NUMBER, 'Please enter valid number')
                .min(1, 'Price must have at least 1 items')
                .required('Price is required'),
              type: yup.string().required('Type is required'),

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
          )
          .min(1, 'filed is required');
      }
      return schema.of(
        yup.object().shape({
          price: yup.string().nullable(),
          type: yup.string().nullable(),

          translations: yup.array().of(
            yup.object().shape({
              locale: yup.string().nullable(), // Validate that 'locale' is a non-empty string
              column_name: yup.string().nullable(), // Validate that 'column_name' is a non-empty string
              text: yup.string().nullable(), // Validate that 'text' is a non-empty string
            })
          ),
        })
      ); // No validation for deal_slots when active is false
    }),

  //? Pricing Details,
  // image_ids: yup.string().required('Image is required'),
  // video_ids: yup.string().required('Video is required'),

  //? Scheduling And Location
  slot_allow_allocation_days_count: yup.number().when('is_slot_enabled', {
    is: (val: any) => val === true,
    then: (schema) => schema.required('Slot allocation days is required'),
    otherwise: (schema) => schema.nullable(''),
  }),
  // est_duration_hours: yup
  //   .number()
  //   .required('Estimated duration (Hours) is required'),

  // preferred_time_of_day: yup
  //   .object()
  //   .shape({
  //     label: yup.string().nullable(),
  //     id: yup.string().nullable(),
  //   })
  //   .required('Platform is required'),

  deal_slots: yup.array().when('is_slot_enabled', (active, schema) => {
    if (active[0]) {
      return schema.of(
        yup.object().shape({
          start_hour: yup.string().required('Start hour is required'),
          start_minute: yup.string().required('Start minute is required'),
          end_hour: yup.string().required('End hour is required'),
          end_minute: yup.string().required('End minute is required'),
        })
      );
    }
    return schema.of(
      yup.object().shape({
        start_hour: yup.string().nullable('Start hour is required'),
        start_minute: yup.string().nullable('Start minute is required'),
        end_hour: yup.string().nullable('End hour is required'),
        end_minute: yup.string().nullable('End minute is required'),
      })
    ); // No validation for deal_slots when active is false
  }),

  location_specific: yup.array().of(
    yup.object().shape({
      area_id: yup.string().required('Area is required'),
      coordinates: yup.string().nullable(),
    })
  ),

  // ? Category And Vendor
  primary_category_id: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .required('Primary categories is required'),
  // secondary_category_ids: yup
  //   .array()
  //   .min(1, 'Secondary Category field must have at least 1 items')
  //   .required('Secondary categories is required'),
  merchant_id: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .required('Merchant is required'),

  //? Voucher Configuration
  voucher_type: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .required('Voucher type is required'),
  template_type: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .required('Template type is required'),
  internal_voucher_limit: yup
    .number()
    .typeError('Please enter valid number')
    .when('voucher_type', {
      is: (val: any) => val?.id == 'INTERNAL',
      then: (schema) => schema.required('Voucher limit is required'),
      otherwise: (schema) => schema.nullable(''),
    }),
  // .required('Voucher limit is required'),
  // show_timer: yup.string().required('Show timer is required'),
  // internal_voucher_sold: yup.string().required('Vouchers Sold is required'),
  max_voucher_per_customer: yup
    .number()
    .typeError('Please enter valid number')
    .required('Voucher limits Per customer is required'),

  low_stock_alert_voucher_count: yup
    .number()
    .typeError('Please enter valid number')
    .min(0, 'Low Stock alert voucher count must be at least 1')
    .integer('Please enter a whole number')

    .when('voucher_type', {
      is: (val: any) => val?.id?.toUpperCase() == 'INTERNAL',
      then: (schema) =>
        schema
          .required('Low Stock alert voucher count is required')
          .max(
            yup.ref('internal_voucher_limit'),
            'Low Stock alert voucher count must be less than or equal to the internal voucher limit'
          ),
      otherwise: (schema) => schema.nullable(''),
    }),
  // .required('Low Stock alert voucher count is required'),

  // min_voucher_per_transaction: yup
  //   .string()
  //   .matches(REGEX.MINVOUCHER, 'Please enter valid priority')
  //   .required('Min vouchers per transaction is required'),
  max_voucher_per_transaction: yup
    .string()
    .matches(REGEX.MAXVOUCHER, 'Please enter valid voucher')
    .required('Max vouchers per transaction is required'),

  //? Promotion and Visibility
  priority: yup
    .string()
    .matches(REGEX.PRIORITY, 'Please enter valid priority number')
    .required('Priority is required'),
  group_priority: yup
    .string()
    .matches(REGEX.PRIORITY, 'Please enter valid group priority')
    .nullable(),
  deal_active_date: yup.string().required('Deals active date is required'),
  deal_end_date: yup.string().required('Deals end date is required'),
  claim_start_date: yup.string().required('Claim start date is required'),
  claim_end_date: yup.string().required('Claim end date is required'),
  feature_widget_priority: yup
    .string()
    .matches(REGEX.PRIORITY, 'Please enter valid number')
    .when('is_featured', {
      is: (val: any) => val === true,
      then: (schema) => schema.required('Feature widget priority is required'),
      otherwise: (schema) => schema.nullable(''),
    }),

  //?  Audience Recommendation
  traveller_types: yup
    .array()
    .min(1, 'Suggested traveler type must have at least 1 items')
    .required('Suggested traveler type is required'),

  //? Administrative data
  deal_tags: yup
    .array()
    .min(1, 'Deal tags must have at least 1 items')
    .required('Deal tags is required'),
  home_widget_priority: yup
    .string()
    .matches(REGEX.PRIORITY, 'Please enter valid number')
    .when('is_home_widget_deal', {
      is: (val: any) => val === true,
      then: (schema) => schema.required('Home widget priority is required'),
      otherwise: (schema) => schema.nullable(''),
    }),
  deal_onboarding_status: yup
    .object()
    .shape({
      label: yup.string().required('Deal onboarding status is required'),
      id: yup.string().required('Deal onboarding status is required'),
    })
    .required('Deal onboarding status is required'),
  rating: yup
    .string()
    .matches(/^[0-5](\.[0-9])?$/, 'Please Add valid Rating')
    .required('Rating is required'),
});
