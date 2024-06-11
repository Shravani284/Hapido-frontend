// material-ui
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  InputLabel,
  Stack,
} from '@mui/material';

// third-party
import { FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';

// project imports
import {
  NormalTextField,
  MagicDropDown,
  CustomSwitchButton,
} from 'berlin-common';
import MainCard from '../../MainCard';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { path } from '../../../routes/Routers';
import {
  createCity,
  getCityByID,
  updateCity,
} from '../../../services/cityService';
import useConfig from '../../../hooks/useConfig';
import { TranslationType } from '../../category/constants/types';
import { useDispatch } from 'react-redux';
import { setSnackbarConfig } from '../../../store/slice/Loader';
import { Typography } from '@mui/material';
import { REGEX } from 'berlin-common/src/constants';
import { CircularProgress } from '@mui/material';
import Permission from '../../../components/Permission';
import { getCountryDropDown } from '../../../services/dropDownService';
import usePermission from '../../../components/Permission/usePermission';

// ==============================|| FORMS VALIDATION - ADDRESS ||============================== //

export interface CreateUserValues {
  name_en: string;
  name_ar: string;
  coordinates: string;
  sort: null | string;
  country?: dropDown | null; // Adjusted type
  active: boolean;
}

interface dropDown {
  label: string;
  id: string | number;
}

function CityForm() {
  const { permission } = usePermission('GEOGRAPHY');
  const [countryData, setCountryData] = useState<
    { id: string; label: string }[]
  >([]);

  const { t } = useTranslation('translation');
  const { i18n } = useConfig();
  const params = useParams();
  const [btnLoader, setBtnLoader] = useState(false);
  const cityId: string = params.id ? params.id : '';
  const initialValues: CreateUserValues = {
    name_en: '',
    name_ar: '',
    coordinates: '',
    sort: '',
    country: null,
    active: true,
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object({
      name_en: yup.string().required('Name is required'),
      name_ar: yup.string().required('Name is required'),
      coordinates: yup
        .string()
        .required('Coordinates are required')
        .matches(REGEX.COORDINATES, 'Please enter valid co-ordinates'),
      sort: yup
        .string()
        .matches(REGEX.PRIORITY, 'Please enter valid number')
        .required('Sort is required'),
      country: yup
        .object()
        .shape({
          label: yup.string().required('Country is required'),
          id: yup.string().required('Country is required'),
        })
        .required('Country is required'),
    }),
    onSubmit: async (value) => {
      HandleAddCity(value);
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const HandleCancel = () => {
    navigate(path.CITY);
  };
  useEffect(() => {
    getCountryDropDown()
      .then((res) => {
        if (res.data.success) {
          setCountryData(res.data.data.allCountries);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (cityId) {
      getCityByID(cityId)
        .then((res) => {
          if (res.success) {
            const city = { ...res.data.city };
            if (city.citytranslation.length > 0) {
              const name_en = city.citytranslation.find(
                (ele: TranslationType) => ele.locale === 'en'
              );

              const name_ar = city.citytranslation.find(
                (ele: TranslationType) => ele.locale === 'ar'
              );

              const country_en = city.country.countrytranslation.find(
                (ele: TranslationType) => ele.locale === 'en'
              );

              const country_ar = city.country.countrytranslation.find(
                (ele: TranslationType) => ele.locale === 'ar'
              );

              city.name_en = name_en?.text ?? '';
              city.name_ar = name_ar?.text ?? '';

              city.country.country_en = country_en?.text ?? '';
              city.country.country_ar = country_ar?.text ?? '';
            }
            formik.setValues({
              active: city.active === 1 ? true : false,
              name_en: city.name_en,
              name_ar: city.name_ar,
              coordinates: city?.coordinates,
              sort: city.sort,
              country: {
                id: city.country?.id,
                label:
                  city?.country?.country_en + ',' + city?.country?.country_ar,
              },
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [cityId]);

  const HandleAddCity = async (values: CreateUserValues) => {
    const res: any = values;
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
      sort: res.sort,
      country: { id: res.country.id },
      active: res.active,
    };

    if (cityId) {
      setBtnLoader(true);
      updateCity({ ...payload, id: parseInt(cityId) })
        .then((response) => {
          setBtnLoader(false);
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: 'City updated successfully',
              varient: 'success',
            })
          );
          navigate(path.CITY);
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
      createCity(payload)
        .then((response) => {
          setBtnLoader(false);
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: 'City created successfully',
              varient: 'success',
            })
          );
          navigate(path.CITY);
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
        <Link color="inherit" to={path.CITY}>
          City
        </Link>
        {cityId ? (
          <Typography color="text.primary">Update City</Typography>
        ) : (
          <Typography color="text.primary">Add City</Typography>
        )}
      </Breadcrumbs>
      <MainCard>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3.5}>
              <Grid item xs={12}></Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Name (English)<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField name="name_en" placeholder="Enter name" />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Name (Arabic)<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField name="name_ar" placeholder="Enter name" />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Co-ordinates<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField
                    name="coordinates"
                    placeholder="Enter coordinates"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Sort<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField name="sort" placeholder="Enter sort" />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Country<span className="asterisk">*</span>
                  </InputLabel>
                  <MagicDropDown
                    name="country"
                    option={countryData}
                    label="country"
                    formik={formik}
                    placeholder="Country"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel>Active</InputLabel>
                <CustomSwitchButton name={'active'} formik={formik} label="" />
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
                    {t('CANCEL')}
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
                        <>{cityId ? 'Update' : 'Add'}</>
                      )}
                    </Button>
                  )}{' '}
                </Stack>
              </Grid>
            </Grid>
          </form>
        </FormikProvider>
      </MainCard>
    </>
  );
}

export default CityForm;
