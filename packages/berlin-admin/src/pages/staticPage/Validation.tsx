import { REGEX } from 'berlin-common/src/constants';
import * as yup from 'yup';

export interface FlashDiscountI {
  name: string;
  url_slug: null | dropdown;
  inject_js: string;
  inject_css: string;
  translations: { column_name: string; locale: string; text: string }[];
  metaData: {
    meta_for: string;
    translations: { column_name: string; locale: string; text: string }[];
  };
  updated_at: string;
  updated_by: string;
  active: boolean;
}

export const initialValues: FlashDiscountI = {
  name: '',
  url_slug: null,
  inject_js: '',
  inject_css: '',
  translations: [
    {
      column_name: 'content_trans_ids',
      locale: 'en',
      text: '',
    },
    {
      column_name: 'content_trans_ids',
      locale: 'ar',
      text: '',
    },
  ],
  metaData: {
    meta_for: 'STATIC',
    translations: [
      {
        column_name: 'title',
        locale: 'en',
        text: '',
      },
      {
        column_name: 'title',
        locale: 'ar',
        text: '',
      },
      {
        column_name: 'description',
        locale: 'en',
        text: '',
      },
      {
        column_name: 'description',
        locale: 'ar',
        text: '',
      },
      {
        column_name: 'keywords',
        locale: 'en',
        text: '',
      },
      {
        column_name: 'keywords',
        locale: 'ar',
        text: '',
      },
    ],
  },
  updated_at: '',
  updated_by: '',
  active: true,
};

// name: value.name,
//   url_slug: value.url_slug?.id,
//   translations: value.translations,

export const validationSchema = yup.object({
  name: yup.string().required('Page name is required'),
  // translations: yup.array().of(
  //   yup.object().shape({
  //     column_name: yup.string().required(''),
  //     locale: yup.string().required(''),
  //     text: yup.string().required('Field is required'),
  //   })
  // ),
  url_slug: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .required('URL slug is required'),
});

interface dropdown {
  label: string;
  id: string | number;
}
