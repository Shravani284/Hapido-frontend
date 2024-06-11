// material-ui
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Divider,
  Grid,
  InputLabel,
  Stack,
  Typography,
  Breadcrumbs,
} from '@mui/material';
// third-party
import { FormikProvider, useFormik } from 'formik';

// project imports
import {
  NormalTextField,
  MagicDatePicker,
  CustomSwitchButton,
  MagicDateAndTimePicker,
} from 'berlin-common';
import MainCard from '../../MainCard';
import { useEffect, useState } from 'react';
import { path } from '../../../routes/Routers';
import {
  CreateCronJobsValues,
  initialValues,
  validationSchema,
} from './initialValues';
import { setSnackbarConfig } from '../../../store/slice/Loader';
import { useDispatch } from 'react-redux';
import {
  createCronJobs,
  getCronJobsById,
  updatecronJobs,
} from '../../../services/cronJobsService';
import { CircularProgress } from '@mui/material';
import usePermission from '../../../components/Permission/usePermission';
import moment from 'moment';

// ==============================|| FORMS VALIDATION - ADDRESS ||============================== //

function form() {
  const { permission } = usePermission('CRON_JOB');

  const navigate = useNavigate();
  const params = useParams();
  const [btnLoader, setBtnLoader] = useState(false);
  const cronJobsId: string = params.id ? params.id : '';
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleAdd(values);
    },
  });

  const HandleCancel = () => {
    navigate(path.CRONJOBSLIST);
  };

  useEffect(() => {
    if (cronJobsId) {
      getCronJobsById(cronJobsId)
        .then((response) => {
          if (response) {
            const cronJobId = { ...response.data.data.cronJob };

            formik.setValues({
              active: cronJobId.active,
              name: cronJobId.name,
              code: cronJobId.code,
              time_interval: cronJobId.time_interval,
              active_from: cronJobId.active_from,
              active_to: cronJobId.active_to,
              last_run_at: cronJobId.last_run_at,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleAdd = async (values: CreateCronJobsValues) => {
    const res: any = values;
    const payload = {
      ...values,
      name: res.name,
      code: res.code,
      time_interval: res.time_interval,
      active_from: res.active_from,
      active_to: res.active_to,
      last_run_at: res.last_run_at,
    };

    if (cronJobsId) {
      setBtnLoader(true);
      updatecronJobs({ ...payload, id: +cronJobsId })
        .then((response) => {
          setBtnLoader(false);
          if (response.data.success === true) {
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Cron Job updated successfully',
                varient: 'success',
              })
            );
            navigate(path.CRONJOBSLIST);
          }
        })
        .catch((error) => {
          setBtnLoader(false);
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: error.response.data.error.message
                ? error.response.data.error.message
                : 'something went wrong',
              varient: 'error',
            })
          );
        });
    } else {
      setBtnLoader(true);
      createCronJobs(payload)
        .then((response) => {
          setBtnLoader(false);
          if (response.success === true) {
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Cron Job created successfully',
                varient: 'success',
              })
            );
            navigate(path.CRONJOBSLIST);
          }
        })
        .catch((error) => {
          setBtnLoader(false);
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: error.response.data.error.message
                ? error.response.data.error.message
                : 'something went wrong',
              varient: 'error',
            })
          );
        });
    }
  };

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={path.CRONJOBSLIST}>
          Cron Job
        </Link>
        {cronJobsId ? (
          <Typography color="text.primary">Update Cron Job</Typography>
        ) : (
          <Typography color="text.primary">Add Cron Job</Typography>
        )}
      </Breadcrumbs>
      <MainCard>
        {/* <DatePicker /> */}

        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3.5}>
              <Grid item xs={12}>
                {/* <GoogleMaps formik={formik} /> */}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Name<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField name="name" placeholder="Name" />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Code<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField
                    name="code"
                    placeholder="Code"
                    multiline={true}
                    rows={5}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Time Interval<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField
                    name="time_interval"
                    placeholder="Time Interval"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Active From<span className="asterisk">*</span>
                  </InputLabel>
                  <MagicDateAndTimePicker
                    name="active_from"
                    formik={formik}
                    placeholder="Active From"
                    disablePast
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Active To<span className="asterisk">*</span>
                  </InputLabel>
                  <MagicDateAndTimePicker
                    name="active_to"
                    formik={formik}
                    placeholder="Active To"
                    disablePast
                    minDate={moment(formik.values.active_from)}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Last Run At</InputLabel>
                  <MagicDateAndTimePicker
                    name="last_run_at"
                    formik={formik}
                    placeholder="Last Run At"
                    disabled
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Active<span className="asterisk">*</span>
                  </InputLabel>
                  <CustomSwitchButton
                    name={'active'}
                    formik={formik}
                    label=""
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={2}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    type="reset"
                    onClick={HandleCancel}
                  >
                    Cancel
                  </Button>
                  {(permission === 'WRITE' || permission === 'FULL') && (
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={btnLoader}
                    >
                      {btnLoader ? (
                        <CircularProgress
                          color="secondary"
                          style={{ margin: '3px 10px' }}
                          size={18}
                        />
                      ) : (
                        <>{cronJobsId ? 'Update' : 'Add'}</>
                      )}
                    </Button>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </form>
        </FormikProvider>
      </MainCard>
    </>
  );
}

export default form;
