import * as yup from 'yup';
export const initialValues = {
  first_name: '',
  last_name: '',
  dob: '',
  gender: null,
  mobile: '',
  country_code: null,
  email: '',
  password: '',
  categories_interest: [],
  roles: [
    {
      module_id: '',
      access: '',
    },
  ],
  departments: [
    {
      departmentId: '',
      designation: '',
    },
  ],
  flagged_reason: '',
  flagged: false,
  active: true,

  //? addresses
  addresses: [
    {
      address_label: '',
      is_primary: false,
      address1: '',
      address2: '',
      area_id: null,
    },
  ],
  marketing_consent: false,
};

export const validationSchema = (id: any, isWebSiteUser: any) => {
  return yup.object({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    dob: yup.date().nullable(),
    // gender: yup
    //   .object()
    //   .shape({
    //     label: yup.string().nullable(),
    //     id: yup.string().nullable(),
    //   })
    //   .required('Gender is required'),
    mobile: yup
      .string()
      .matches(/^\d{5,}$/, 'Minimum 5 digit required for phone number')
      .nullable(),
    // country_code: yup
    //   .object()
    //   .shape({
    //     label: yup.string().nullable(),
    //     id: yup.string().nullable(),
    //   })
    //   .required('Country code is required'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email is required'),
    password: yup.string().when('id', {
      is: (id: number) => !id,
      then: (schema) => schema.required('Password is required'),
      otherwise: (schema) => schema.nullable(),
    }),
    roles: yup.array().of(
      yup.object().shape({
        module_id: isWebSiteUser
          ? yup.mixed()
          : yup.mixed().required('Module is required'),
        access: isWebSiteUser
          ? yup.mixed()
          : yup.mixed().required('Access is required'),
      })
    ),
    departments: yup.array().of(
      yup.object().shape({
        departmentId: isWebSiteUser
          ? yup.mixed()
          : yup.mixed().required('department is required'),
        designation: isWebSiteUser
          ? yup.mixed()
          : yup.mixed().required('designation is required'),
      })
    ),
    // .required('Role is required')
    // .min(1, 'Atleast 1 role is required'),
    flagged: yup.boolean(),
    flagged_reason: yup.string().when('flagged', {
      is: true, // alternatively: (val) => val == true
      then: (schema) => schema.required('Must provide a flagged reason'),
      otherwise: (schema) => schema.nullable(),
    }),
    addresses: yup.array().of(
      yup.object().shape({
        address_label: isWebSiteUser
          ? yup.mixed().nullable()
          : yup.mixed().required('Address label is required'),
        address1: isWebSiteUser
          ? yup.mixed().nullable()
          : yup.string().required('Address line is required'),
        address2: isWebSiteUser
          ? yup.mixed().nullable()
          : yup.string().required('Address line is required'),
        area_id: isWebSiteUser
          ? yup.mixed().nullable()
          : yup.mixed().required('Area is required'),
      })
    ),
  });
};

export interface CreateUserValues {
  addresses: any;
  first_name: string;
  last_name: string;
  dob: Date | string;
  gender: { label: string; id: string } | null;
  mobile: string;
  country_code: string | null;
  email: string;
  password: string | any;
  categories_interest: string[] | null;
  currency?: string;
  locale?: number;
  flagged: boolean;
  roles: Role[];
  departments: departments[];
  // module_id?: number;
  // access?: string;
  flagged_reason?: string;
  address_label?: string;
  area_id?: null | number;
  coordinates?: string;
  is_primary?: boolean;
  marketing_consent: boolean;
}

export interface Role {
  module_id: any;
  access: any;
}
export interface departments {
  departmentId: any;
  designation: any;
}
