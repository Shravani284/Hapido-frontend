import { REGEX } from 'berlin-common/src/constants';
import * as yup from 'yup';

export const validationSchema = (id) => {
  return yup.object({
    name_en: yup.string().required('Name English is required').nullable(),
    name_ar: yup.string().required('Name Arabic is required').nullable(),
    tagline_trans_ids_en: yup.string().required('Tagline English is required'),
    description_trans_ids_en: yup
      .string()
      .required('Description English is required'),
    tagline_trans_ids_ar: yup.string().required('Tagline Arabic is required'),
    description_trans_ids_ar: yup
      .string()
      .required('Description Arabic is required'),
    // image_ids: yup
    //   .array()
    //   .min(1, 'image ids field must have at least 1 items')
    //   .required('Image ids required'),
    // image_ids: yup.string().required('Image ids required'),

    // video_ids: yup.array().min(1).required('Video ids required'),
    email: yup
      .string()
      .email('Please enter valid Email')
      .required('Email is required'),
    password: yup.string().when('id', {
      is: (id: number) => !id,
      then: (schema) => schema.required('Password is required'),
      otherwise: (schema) => schema.nullable(),
    }),
    mobile: yup
      .string()
      .required('Mobile No. is required')
      .matches(/^\d{5,}$/, 'Minimum 5 digit required for phone number'),
    mobile_alternate: yup
      .string()
      .matches(/^\d{5,}$/, 'Minimum 5 digit required for phone number')
      .nullable(),

    contact_person_name: yup.string().nullable(),

    contact_person_mobile: yup
      .string()
      .matches(/^\d{5,}$/, 'Minimum 5 digit required for phone number')
      .nullable(),
    coordinates: yup
      .string()
      .required('Coordinates is required')
      .matches(REGEX.COORDINATES, 'Please enter valid co-ordinates'),

    // website: yup.string().required('Website is required'),
    address1: yup
      .string()
      .min(5, 'Address 1 must be at least 5 characters')
      .required('Address 1 is required'),
    address2: yup
      .string()
      .min(5, 'Address 2 must be at least 5 characters')
      .required('Address 2 is required'),
    country_code: yup
      .object()
      .shape({
        label: yup.string().nullable(),
        id: yup.string().nullable(),
      })
      .required('Country is required'),
    merchant_onboarding_status: yup
      .object()
      .shape({
        label: yup.string().nullable(),
        id: yup.string().nullable(),
      })
      .required('Merchant Onboarding Status is required'),
    country_code_alternate: yup
      .object()
      .shape({
        label: yup.string().nullable(),
        id: yup.string().nullable(),
      })
      .nullable(),

    area: yup
      .object()
      .shape({
        label: yup.string().nullable(),
        id: yup.string().nullable(),
      })
      .required('Area is required'),
    hapido_business_userid: yup
      .object()
      .shape({
        label: yup.string().nullable(),
        id: yup.string().nullable(),
      })
      .required('Hapido business user id is required'),
    // categories_interest: yup
    //   .array()
    //   .min(1, 'Categories interest must have atleast 1 item')
    //   .required('Categories interest is required'),
    // merchant_supporting_docs_file_ids: yup
    //   .string()
    //   .required('Merchant supporting docs_file ids required'),
    // image_ids: yup.string().required('Image is required'),
    // video_ids: yup.string().required('Video is required'),
  });
};
