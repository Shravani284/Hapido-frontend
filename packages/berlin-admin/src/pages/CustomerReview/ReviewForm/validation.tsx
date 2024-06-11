import * as yup from 'yup';

export const validationSchema = yup.object({
  order_id: yup
    .number()
    .typeError('Must be a positive number.')
    .positive('Must be a positive number.')
    .required('Order Id is required')
    .nullable(),
  user_id: yup
    .number()
    .typeError('Must be a positive number.')
    .positive('Must be a positive number.')
    .required('User Id is required')
    .nullable(),
  review_title: yup.string().required('Title is required'),
  review_description: yup.string().required('Description is required'),
  review_stars: yup
    .number()
    .typeError('Must be a positive number.')
    .min(0, 'Stars range is 0 to 5')
    .max(5, 'Stars range is 0 to 5')
    .required('Stars required'),
  approval_status: yup
    .object()
    .shape({
      label: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .required('Approval status is required'),
});
