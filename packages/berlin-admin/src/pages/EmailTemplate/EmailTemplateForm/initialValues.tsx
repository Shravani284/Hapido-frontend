import * as yup from 'yup';
export const initialValues = {
  name: '',
  lang: null,
  subject: '',
  description: '',
  text_part: '',
  active: true,
  html_part: '',
};

export const validationSchema = yup.object({
  name: yup.string().required('Name is required').nullable(),
  lang: yup.object().required('Language is required'),
  subject: yup.string().required('Subject is required'),
  description: yup.string().required('Description is required'),
  text_part: yup.string().required('Text part is required'),
  html_part: yup.string().required('Html part is required'),
});

export interface CreateTemplateValues {
  name: string;
  lang: null | dropdown;
  subject: string;
  description: String;
  text_part: String;
  active: boolean;
  html_part: String;
}
interface dropdown {
  label: string;
  id: string | number;
}
