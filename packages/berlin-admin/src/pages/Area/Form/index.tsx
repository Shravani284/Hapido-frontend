// material-ui
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  CircularProgress,
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
import { path } from '../../../routes/Routers';
import {
  AddArea,
  getAreaByID,
  getCity,
  getCityDropDown,
  updateArea,
} from '../../../services/areaService';
import useConfig from '../../../hooks/useConfig';
import { TranslationType } from '../../category/constants/types';
import { useDispatch } from 'react-redux';
import { setSnackbarConfig } from '../../../store/slice/Loader';
import { Breadcrumbs } from '@mui/material';
import { Typography } from '@mui/material';
import { REGEX } from 'berlin-common/src/constants';
import usePermission from '../../../components/Permission/usePermission';

// ==============================|| FORMS VALIDATION - ADDRESS ||============================== //

export interface CreateAreaValues {
  name_en: string;
  name_ar: string;
  coordinates: string;
  sort: string;
  city: null | dropDown; // Adjusted type
  active: boolean;
}

interface dropDown {
  label: string;
  id: string | number;
}

function AreaForm() {
  const { permission } = usePermission('GEOGRAPHY');
  const params = useParams();
  const dispatch = useDispatch();
  const areaId: string = params.id ? params.id : '';
  const [cityList, setCityList] = useState([]);
  const [btnLoader, setBtnLoader] = useState(false);
  const { i18n } = useConfig();
  const initialValues: CreateAreaValues = {
    name_en: '',
    name_ar: '',
    coordinates: '',
    sort: '',
    city: null,
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
        .required('Sort is required')
        .matches(REGEX.PRIORITY, 'Please enter valid number'),
      city: yup
        .object()
        .shape({
          label: yup.string().required('City is required'),
          id: yup.string().required('City is required'),
        })
        .required('City is required'),
    }),

    onSubmit: (value) => {
      handleAddArea(value);
    },
  });

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(path.AREA);
  };

  useEffect(() => {
    getCityDropDown()
      .then((res) => {
        if (res.success) {
          const cityName = res?.data?.allCities?.map((item: any) => {
            const name: string[] = [];
            if (item?.citytranslation?.length > 0) {
              item?.citytranslation?.forEach((item: any) => {
                if (item?.locale == 'en') {
                  name.push(item.text);
                }
              });
            }
            if (item?.country?.countrytranslation?.length > 0) {
              item?.country?.countrytranslation?.forEach((item: any) => {
                if (item?.locale == 'en') {
                  name.push(item.text);
                }
              });
            }
            return {
              id: item.id,
              label: name.join(' - '),
            };
          });

          setCityList(cityName);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (areaId) {
      getAreaByID(areaId)
        .then((res) => {
          if (res.success) {
            const area = { ...res.data.area };
            if (area.areatranslation.length > 0) {
              const name_en = area.areatranslation.find(
                (ele: TranslationType) => ele.locale === 'en'
              );

              const name_ar = area.areatranslation.find(
                (ele: TranslationType) => ele.locale === 'ar'
              );

              const city_en = area.city.citytranslation.find(
                (ele: TranslationType) => ele.locale === 'en'
              );

              const city_ar = area.city.citytranslation.find(
                (ele: TranslationType) => ele.locale === 'ar'
              );

              area.name_en = name_en?.text ?? '';
              area.name_ar = name_ar?.text ?? '';

              area.city.city_en = city_en?.text ?? '';
              area.city.city_ar = city_ar?.text ?? '';
            }

            formik.setValues({
              name_en: area.name_en,
              name_ar: area.name_ar,
              coordinates: area.coordinates,
              sort: area.sort,
              city: {
                id: area?.city.id,
                label: area.city.city_en + ', ' + area.city.city_ar,
              },
              active: area.active === 1 ? true : false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          setBtnLoader(false);
        });
    }
  }, [areaId]);

  const handleAddArea = async (values: CreateAreaValues) => {
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
      city: res.city.id,
      active: res.active,
    };

    if (areaId) {
      setBtnLoader(true);
      updateArea({ ...payload, id: parseInt(areaId) })
        .then((response) => {
          setBtnLoader(false);
          if (response.data.success) {
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Area updated successfully',
                varient: 'success',
              })
            );
            navigate(path.AREA);
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
          navigate(path.AREA);
        });
    } else {
      setBtnLoader(true);
      AddArea(payload)
        .then((response) => {
          setBtnLoader(false);
          if (response.success) {
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Area created successfully',
                varient: 'success',
              })
            );
            navigate(path.AREA);
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
        <Link color="inherit" to={path.AREA}>
          Area
        </Link>
        {areaId ? (
          <Typography color="text.primary">Update Area</Typography>
        ) : (
          <Typography color="text.primary">Add Area</Typography>
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
                    City<span className="asterisk">*</span>
                  </InputLabel>
                  <MagicDropDown
                    name="city"
                    option={cityList}
                    label="City"
                    formik={formik}
                    placeholder="City"
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
                        <>{areaId ? 'Update' : 'Add'}</>
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

export default AreaForm;
