// material-ui
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  InputLabel,
  Stack,
  Typography,
} from '@mui/material';

// third-party
import { FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';

// project imports
import { CustomSwitchButton, NormalTextField } from 'berlin-common';
import MainCard from '../../MainCard';
import { useEffect, useState } from 'react';
import {
  addCountry,
  getCountryById,
  updateCountry,
} from '../../../services/geoGraphyService';
import { path } from '../../../routes/Routers';
import { TranslationType } from '../../category/constants/types';
import { useDispatch } from 'react-redux';
import { setSnackbarConfig } from '../../../store/slice/Loader';
import { REGEX } from 'berlin-common/src/constants';
import { CircularProgress } from '@mui/material';
import Permission from '../../../components/Permission';
import usePermission from '../../../components/Permission/usePermission';

// ==============================|| FORMS VALIDATION - ADDRESS ||============================== //

export interface addCountryType {
  name_ar: string;
  name_en: string;
  coordinates: string;
  active: boolean;
  sort: string;
}

export interface Translation {
  locale: string;
  text: string;
}

export interface Role {
  module_id: number;
  access: string;
}

function form() {
  const { permission } = usePermission('GEOGRAPHY');
  const params = useParams();
  const countryId: string = params.id ? params.id : '';
  const [btnLoader, setBtnLoader] = useState(false);

  const formik = useFormik({
    initialValues: {
      name_en: '',
      name_ar: '',
      coordinates: '',
      active: true,
      sort: '',
    },
    validationSchema: yup.object({
      name_en: yup.string().required('Name (English) is required'),
      name_ar: yup.string().required('Name (Arabic) is required'),
      coordinates: yup
        .string()
        .required('Coordinates is required')
        .matches(REGEX.COORDINATES, 'Please enter valid co-ordinates'),
      sort: yup
        .string()
        .matches(REGEX.PRIORITY, 'Please enter valid number')
        .required('Sort is required'),
    }),
    onSubmit: async (value) => {
      handleAddCountry(value);
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(path.COUNTRYLIST);
  };

  useEffect(() => {
    if (countryId) {
      getCountryById(countryId)
        .then((response) => {
          const country = { ...response.data.data.country };
          if (country.translations.length > 0) {
            const name_en = country.translations.find(
              (ele: TranslationType) => ele.locale === 'en'
            );

            const name_ar = country.translations.find(
              (ele: TranslationType) => ele.locale === 'ar'
            );

            country.name_en = name_en?.text ?? '';
            country.name_ar = name_ar?.text ?? '';
          }

          formik.setValues({
            name_en: country.name_en,
            name_ar: country.name_ar,
            coordinates: country.coordinates,
            active: country.active === 1 ? true : false,
            sort: country.sort,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleAddCountry = async (value: addCountryType) => {
    const res: any = value;
    const payload = {
      translations: [
        {
          column_name: 'name_trans_ids',
          locale: 'en',
          text: res.name_en,
        },
        {
          column_name: 'name_trans_ids',
          locale: 'ar',
          text: res.name_ar,
        },
      ],
      coordinates: res.coordinates,
      active: res.active,
      sort: res.sort,
    };

    if (countryId) {
      setBtnLoader(true);
      updateCountry({ ...payload, id: parseInt(countryId) })
        .then((response) => {
          setBtnLoader(false);
          if (response.data.success === true) {
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Country updated successfully',
                varient: 'success',
              })
            );
            navigate(path.COUNTRYLIST);
          }
        })
        .catch((error) => {
          setBtnLoader(false);
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: error.response.data.error.message
                ? error.response.data.error.message
                : 'Something went wrong',
              varient: 'error',
            })
          );
        });
    } else {
      setBtnLoader(true);
      addCountry(payload)
        .then((response) => {
          setBtnLoader(false);
          if (response.data.success === true) {
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Country created successfully',
                varient: 'success',
              })
            );
            navigate(path.COUNTRYLIST);
          }
        })
        .catch((error) => {
          setBtnLoader(false);
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: error.response.data.error.message
                ? error.response.data.error.message
                : 'Something went wrong',
              varient: 'error',
            })
          );
        });
    }
  };

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={path.COUNTRYLIST}>
          Country
        </Link>
        {countryId ? (
          <Typography color="text.primary">Update Country</Typography>
        ) : (
          <Typography color="text.primary">Add Country</Typography>
        )}
      </Breadcrumbs>
      <MainCard>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3.5}>
              <Grid item xs={12}>
                {/* <GoogleMaps formik={formik} /> */}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Name (English)<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField
                    name="name_en"
                    placeholder="Name Trans ids"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Name (Arabic)<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField
                    name="name_ar"
                    placeholder="Name Trans ids"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Coordinates ("latitude, longitude")
                    <span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField
                    name="coordinates"
                    placeholder="Coordinates"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel>Active</InputLabel>
                <CustomSwitchButton name={'active'} formik={formik} label="" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Sort<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField name="sort" placeholder="Sort" />
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
                    onClick={handleCancel}
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
                        <>{countryId ? 'Update' : 'Add'}</>
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
