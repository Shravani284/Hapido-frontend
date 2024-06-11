import { Breadcrumbs, Button, Grid } from '@mui/material';
import { MagicDropDown, NormalTextField } from 'berlin-common';
import MainCard from '../../../components/MainCard';
import { Stack } from '@mui/material';
import { InputLabel } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  bannerPosition,
  updateBanner,
  updateBannerById,
} from '../../../services/bannerService';
import { useEffect, useState } from 'react';
import { path } from '../../../routes/Routers';
import { setSnackbarConfig } from '../../../store/slice/Loader';
import { useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import { placementList } from '../../../data/data';
import { Dropdown } from '../../category/constants/types';
import Permission from '../../../components/Permission';
import { CircularProgress } from '@mui/material';
import usePermission from '../../../components/Permission/usePermission';

export interface bannerPlacement {
  id?: number;
  placement_location: null | Dropdown;
  placement_title: string | null;
  placement_title_ar: string | null;
}

const UploadBanner = () => {
  const { permission } = usePermission('BANNER');
  const navigate = useNavigate();
  const [btnLoader, setBtnLoader] = useState(false);
  const param = useParams();
  const dispatch = useDispatch();
  const bannerId: string = param.id ? param.id : '';
  const validationSchema = yup.object({
    placement_location: yup.object().required('Banner placement is required'),
    placement_title: yup
      .string()
      .required('Banner placement title is required'),
    placement_title_ar: yup
      .string()
      .required('Banner placement arabic title is required'),
  });

  const formik = useFormik({
    initialValues: {
      placement_location: null,
      placement_title: '',
      placement_title_ar: '',
    },
    validationSchema,
    onSubmit: async (value: bannerPlacement) => {
      const res: any = value;
      const payLoad = {
        placement_location: res?.placement_location.id,
        placement_title: res?.placement_title,
        placement_title_ar: res?.placement_title_ar,
      };
      const updatePayLoad = {
        id: parseInt(bannerId),
        placement_location: res?.placement_location.id,
        placement_title: res?.placement_title,
        placement_title_ar: res?.placement_title_ar,
      };
      if (bannerId) {
        setBtnLoader(true);
        updateBanner(updatePayLoad)
          .then((response) => {
            setBtnLoader(false);
            if (response.data.success) {
              dispatch(
                setSnackbarConfig({
                  isOpen: true,
                  message: 'Banner Placement updated successfully',
                  varient: 'success',
                })
              );
              navigate(path.UPLOADBANNERPLACELIST);
            }
          })
          .catch((error) => {
            setBtnLoader(false);
            console.log('error', error);
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
        bannerPosition(payLoad)
          .then((response) => {
            setBtnLoader(false);
            if (response.data.success) {
              dispatch(
                setSnackbarConfig({
                  isOpen: true,
                  message: 'Banner Placement created successfully',
                  varient: 'success',
                })
              );
              navigate(path.UPLOADBANNERPLACELIST);
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
    },
  });
  const handleCancel = () => {
    navigate(path.UPLOADBANNERPLACELIST);
  };

  // Update Banner

  useEffect(() => {
    if (bannerId) {
      updateBannerById(bannerId)
        .then((response) => {
          if (response.data.success) {
            formik.setFieldValue('placement_location', {
              label: response.data.data.banner?.placement_location,
            });
            formik.setFieldValue(
              'placement_title',
              response.data.data.banner?.placement_title
            );
            formik.setFieldValue(
              'placement_title_ar',
              response.data.data.banner?.placement_title_ar
            );
          }
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }, [bannerId]);

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={path.UPLOADBANNERPLACELIST}>
          Banner Placement
        </Link>
        {bannerId ? (
          <Typography color="text.primary">Update Banner Placement</Typography>
        ) : (
          <Typography color="text.primary">Add Banner Placement</Typography>
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
                  <InputLabel>Placement / location</InputLabel>
                  <MagicDropDown
                    name="placement_location"
                    placeholder="Placement"
                    option={placementList}
                    formik={formik}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Placement title (English)<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField
                    name="placement_title"
                    placeholder="Placement title (English)"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Placement title (Arabic)<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField
                    name="placement_title_ar"
                    placeholder="Placement title (Arabic)"
                  />
                </Stack>
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
                        <>{bannerId ? 'Update' : 'Add'}</>
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
};

export default UploadBanner;
