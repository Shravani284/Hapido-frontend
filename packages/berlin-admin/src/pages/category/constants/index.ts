import * as yup from 'yup';
import { CategoryFormType, Dropdown } from './types';
import { REGEX } from 'berlin-common/src/constants';

const validationSchema = yup.object({
  isSubCategory: yup.boolean(),
  name_en: yup.string().required('Name (English) is required'),
  name_ar: yup.string().required('Name (Arabic) is required'),
  description_en: yup.string(),
  description_ar: yup.string(),
  meta_title_en: yup.string().required('Meta title (English) is required'),
  meta_title_ar: yup.string().required('Meta title (Arabic) is required'),
  meta_description_en: yup
    .string()
    .required('Meta description (English) is required'),
  meta_description_ar: yup
    .string()
    .required('Meta description (Arabic) is required'),
  meta_keywords_en: yup
    .string()
    .required('Meta key word (English) is required'),
  meta_keywords_ar: yup.string().required('Meta key word (Arabic) is required'),
  meta_deal_title_en: yup
    .string()
    .required('Meta Deal title (English) is required'),
  meta_deal_title_ar: yup
    .string()
    .required('Meta Deal title (Arabic) is required'),
  meta_deal_description_en: yup
    .string()
    .required('Meta deal  description (English) is required'),
  meta_deal_description_ar: yup
    .string()
    .required('Meta deal description (Arabic) is required'),
  meta_deal_keywords_en: yup
    .string()
    .required('Meta deal key word (English) is required'),
  meta_deal_keywords_ar: yup
    .string()
    .required('Meta deal key word (Arabic) is required'),
  parent_category: yup
    .object()
    .shape({
      label: yup.string().required('Parent category is required'),
      id: yup.string().required('Parent category is required'),
    })
    .when('isSubCategory', {
      is: (val: any) => val === true,

      then: (schema) => schema.required('Parent category is required'),

      otherwise: (schema) => schema.nullable(''),
    }),
  show_in_menu: yup.boolean(),
  show_in_featured: yup.boolean(),
  feature_widget_priority: yup
    .string()
    .matches(REGEX.PRIORITY, 'Please enter valid number')
    .when('show_in_featured', {
      is: (val: any) => val === true,
      then: (schema) => schema.required('Feature widget priority is required'),
      otherwise: (schema) => schema.nullable(''),
    }),
  show_in_home_widgets: yup.boolean(),

  home_widget_type: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .when('show_in_home_widgets', {
      is: (val: boolean) => val == true,
      then: (schema) => schema.required('Home widget type is required'),
      otherwise: (schema) => schema.nullable(),
    })
    .when('home_placement_id', {
      is: (val: boolean) => val == true,
      then: (schema) => schema.required('Banner placement is required'),
      otherwise: (schema) => schema.nullable(),
    }),

  // home_widget_type: yup.object().required('Home widget type is required'),
  // image_ids: yup.string().required('Image is required'),
  // video_ids: yup.string(),

  sort: yup
    .string()
    .required('Sort Weightage is required')
    .matches(REGEX.UNDER1000, 'Please enter number upto 999'),
  // home_placement_id: yup
  //   .object()
  //   .shape({
  //     label: yup.string().required('Banner placement is required'),
  //     id: yup.string().required('Banner placement is required'),
  //   })
  //   .required('Banner placement is required'),
  // image_ids: yup.string().required('Image is required'),
  // video_ids: yup.string().required('Video is required'),
});
const initialFormValues: CategoryFormType = {
  isSubCategory: false,
  name_ar: '',
  name_en: '',
  description_ar: '',
  description_en: '',
  meta_title_en: '',
  meta_title_ar: '',
  meta_description_en: '',
  meta_description_ar: '',
  meta_keywords_en: '',
  meta_keywords_ar: '',
  meta_deal_title_en: '',
  meta_deal_title_ar: '',
  meta_deal_description_en: '',
  meta_deal_description_ar: '',
  meta_deal_keywords_en: '',
  meta_deal_keywords_ar: '',
  parent_category: null,
  home_widget_type: null,
  home_placement_id: null,
  show_in_menu: false,
  show_in_featured: false,
  feature_widget_priority: '',
  show_in_home_widgets: false,
  sort: 0,
  active: true,
  image_ids: '',
  video_ids: '',
  image_ids_ar: '',
  video_ids_ar: '',
};
const CategoryHeadCells = [
  'Name',
  'Menu',
  'Featured',
  'Home Widget',
  'sort',
  'Active',
  'Action',
];

const SubCategoryHeadCells = [
  'Name',
  'Description',
  'Parent Category',
  'Attachments',
  'Active',
  'Action',
];

// const activeStatus = [
//   { id: '0', label: 'No' },
//   { id: '1', label: 'Yes' },
// ];

export {
  validationSchema,
  initialFormValues,
  CategoryHeadCells,
  SubCategoryHeadCells,
  // activeStatus,
};
