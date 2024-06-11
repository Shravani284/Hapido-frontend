import { REGEX } from 'berlin-common/src/constants';

import * as yup from 'yup';

export interface Root {
  success: boolean;
  data: Data;
}

export interface Data {
  merchants: Merchants;
}

export interface Merchants {
  name: string;
  tagline_trans_ids: string;
  description_trans_ids: string;
  slug: string;
  email: string;
  mobile: string;
  country_code: null | dropdown;
  contact_person_name: string;
  contact_person_mobile: string;
  address1: string;
  address2: string;
  coordinates: string;
  website: string;
  // hapido_business_userid: null | dropdown;
  categories_interest: [];
  listing_fee: null | dropdown;
  merchant_active_date: string;
  merchant_expiry_date: string;
  created_at: Date | null;
  updated_at: Date | null;
  created_by: String;
  updated_by: String;
  merchant_supporting_docs_file_ids: null | dropdown;
  active: boolean;
  activeDealsCount: null | dropdown;
  country: string;
  city: string;
  area: string;
  total_vouchers_sold: string | number;
  hapido_sales_person: string | number;
}

export interface Image {
  imageId: number;
  extfilepathId: number;
  extfilepath: string;
}

export interface Video {
  videoId: number;
  extfilepathId: number;
  extfilepath: string;
}

export interface Merchanttranslation {
  id: number;
  locale: string;
  link_id: number;
  table_name: string;
  column_name: string;
  text: string;
}

export const validationSchema = yup.object({
  // name: yup.string().max(255).required('Name is required.'),
  // tagline_trans_ids: yup.string().max(255).required('Tagline is required.'),
  // description_trans_ids: yup
  //   .string()
  //   .max(255)
  //   .required('Description is required.'),
  // slug: yup.string().max(255).required('slug is required.'),
  // email: yup
  //   .string()
  //   .email('Invalid email address1.')
  //   .max(255)
  //   .required('email is required.'),
  mobile: yup
    .string()
    .matches(/^\d{5,}$/, 'Minimum 5 digit required for phone number')
    .required('Phone number is required'),
  contact_person_name: yup.string().required('contact person name is required'),

  contact_person_mobile: yup
    .string()
    .matches(/^\d{5,}$/, 'Minimum 5 digit required for phone number')
    .required('Phone number is required'),

  address1: yup
    .string()
    .min(5, 'addrees1 to short.')
    .required('Addrees1 is required'),

  address2: yup
    .string()
    .min(5, 'address2 to short.')
    .required('Address2 is required'),

  // coordinates: yup
  //   .string()
  //   .required('coordinates is required')
  //   .matches(REGEX.COORDINATES, 'Please enter valid co-ordinates'),

  website: yup.string().required('website is required'),
  // hapido_business_userid: yup.string().required('business userid is required'),

  categories_interest: yup
    .array()
    .min(1, 'Categories interest must have atleast 1 item')
    .required('Categories interest is required'),
  // listing_fee: yup.string().required('listing fee is required'),
  // merchant_supporting_docs_file_ids: yup
  //   .string()
  //   .required('Supporting File is required'),

  // activeDealsCount: yup
  //   .string()
  //   .max(255)
  //   .required('active Deals Count is required.'),
});

interface dropdown {
  label: string;
  id: string | number;
}
export const initialValues: Merchants = {
  name: '',
  tagline_trans_ids: '',
  description_trans_ids: '',
  slug: '',
  email: '',
  country_code: null,
  mobile: '',
  contact_person_name: '',
  contact_person_mobile: '',
  address1: '',
  address2: '',
  country: '',
  city: '',
  area: '',
  coordinates: '',
  website: '',
  // hapido_business_userid: null,
  categories_interest: [],
  listing_fee: null,
  merchant_active_date: '',
  merchant_expiry_date: '',
  merchant_supporting_docs_file_ids: null,
  activeDealsCount: null,
  total_vouchers_sold: '',
  hapido_sales_person: '',

  //?Administrative Data
  created_at: new Date(),
  updated_at: null,
  created_by: '',
  updated_by: '',
  active: true,
};
