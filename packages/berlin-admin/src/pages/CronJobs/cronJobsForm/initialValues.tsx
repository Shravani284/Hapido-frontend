import * as yup from 'yup';
export const initialValues = {
  name: '',
  code: '',
  time_interval: null,
  active_from: null,
  active_to: null,
  last_run_at: null,
  active: true,
};

export const validationSchema = yup.object({
  name: yup.string().required('Name required').nullable(),
  code: yup.string().required('Code required'),
  time_interval: yup.string().required('Time Interval required'),
  active_from: yup.date().required('Active From required'),
  active_to: yup.date().required('Active To required'),
  // last_run_at: yup.date().required('Last Run At required'),
});

export interface CreateCronJobsValues {
  name: string;
  code: string;
  time_interval: null;
  active_to: Date | null;
  active_from: Date | null;
  last_run_at: Date | null;
}
