// material-ui
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';

// third-party
import { FormikProvider, useFormik } from 'formik';

// project imports
import MainCard from '../../MainCard';
import { useCallback, useEffect, useState } from 'react';
import { path } from '../../../routes/Routers';
import GeneralInfo from './Steps/GeneralInfo';
import DealInfo from './Steps/DealInfo';
import FlashSalePeriod from './Steps/FlashSalePeriod';
import { Grid } from '@mui/material';
import { initialValues, validationSchema } from './Steps/formikValidation';
import { useTranslation } from 'react-i18next';
import {
  createBOGO,
  getBOGOByID,
  updateBOGO,
} from '../../../services/flashSaleService';
import { TranslationType } from '../../category/constants/types';
import { CardHeader } from '@mui/material';
import { Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSnackbarConfig } from '../../../store/slice/Loader';
import { Breadcrumbs } from '@mui/material';
import Permission from '../../../components/Permission';
import usePermission from '../../../components/Permission/usePermission';
import { constants } from 'berlin-common';
import { getSigneid } from '../../../utils/getIds';

// ==============================|| FORMS VALIDATION - ADDRESS ||============================== //

export interface Translation {
  locale: string;
  text: string;
}

export interface Role {
  module_id: number;
  access: string;
}

function BOGOForm() {
  const { permission } = usePermission('FLASH_SALE');
  const [bogoData, setBogoData] = useState();
  const [btnLoader, setBtnLoader] = useState(false);
  const params = useParams();
  const BOGOID: string = params.id ? params.id : '';
  const { t } = useTranslation('translation');
  const [selectedImages, setSelectedImages] = useState<
    constants.types.fileType[]
  >([]);
  const [selectedVideos, setSelectedVideos] = useState<
    constants.types.fileType[]
  >([]);
  const [selectedImagesAr, setSelectedImagesAr] = useState<
    constants.types.fileType[]
  >([]);
  const [selectedVideosAr, setSelectedVideosAr] = useState<
    constants.types.fileType[]
  >([]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (value) => {
      handleAddBOGO(value);
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancel = () => {
    navigate(path.BOGOLIST);
  };

  useEffect(() => {
    if (!formik.isSubmitting) return;
    if (Object.keys(formik.errors).length > 0) {
      const firstError = document.querySelector('.Mui-error');

      if (firstError) {
        const offset = -150; // Adjust this value based on your preference
        const scrollToY =
          firstError.getBoundingClientRect().top + window.scrollY + offset;

        window.scrollTo({ top: scrollToY, behavior: 'smooth' });
      }
    }
  }, [formik]);

  const setFormikData = useCallback((BOGO: any) => {
    if (BOGO.translations.length > 0) {
      const title_en = BOGO.translations.find(
        (ele: TranslationType) =>
          ele.locale === 'en' && ele.column_name === 'title_trans_ids'
      );
      const title_ar = BOGO.translations.find(
        (ele: TranslationType) =>
          ele.locale === 'ar' && ele.column_name === 'title_trans_ids'
      );

      const tagline_en = BOGO.translations.find(
        (ele: TranslationType) =>
          ele.locale === 'en' && ele.column_name === 'tagline_trans_ids'
      );
      const tagline_ar = BOGO.translations.find(
        (ele: TranslationType) =>
          ele.locale === 'ar' && ele.column_name === 'tagline_trans_ids'
      );

      BOGO.title_en = title_en?.text ?? '';
      BOGO.title_ar = title_ar?.text ?? '';
      BOGO.tagline_en = tagline_en?.text ?? '';
      BOGO.tagline_ar = tagline_ar?.text ?? '';
    }

    setBogoData(BOGO);

    formik.setValues({
      active: BOGO.active === 1 ? true : false,
      deal_id: BOGO.deal_id,
      deal_type: {
        label: BOGO.deal_type.toUpperCase(),
        id: BOGO.deal_type.toUpperCase(),
      },
      deal_exclude_option_ids: [],
      // ?.map((e: any) => e.id)
      // .join(','),
      limit_per_customer: BOGO.limit_per_customer,
      total_voucher_limit: BOGO.total_voucher_limit,
      total_sold_count: BOGO.total_sold_count,
      image_id: BOGO.images?.map((e: any) => e.imageId)[0],
      video_id: BOGO.videos?.map((e: any) => e.videoId)[0],
      image_id_ar: BOGO.images_ar?.map((e: any) => e.imageId)[0],
      video_id_ar: BOGO.videos_ar?.map((e: any) => e.videoId)[0],
      priority: BOGO.priority,
      platform: {
        label: BOGO.platform.toUpperCase(),
        id: BOGO.platform.toUpperCase(),
      },
      fs_active_date: BOGO.fs_active_date,
      fs_end_date: BOGO.fs_end_date,
      title_en: BOGO.title_en,
      title_ar: BOGO.title_ar,
      tagline_en: BOGO.tagline_en,
      tagline_ar: BOGO.tagline_ar,
    });

    if (BOGO?.images?.length > 0) {
      const imagesList: constants.types.fileType[] = BOGO?.images?.map(
        (item: any) => {
          return {
            ...item,
            id: item.imageId,
            type: 'image',
          };
        }
      );
      setSelectedImages(imagesList);
    }

    if (BOGO?.videos?.length > 0) {
      const imagesList: constants.types.fileType[] = BOGO?.videos.map(
        (item: any) => {
          return {
            ...item,
            id: item.videoId,
            type: 'video',
          };
        }
      );
      setSelectedVideos(imagesList);
    }

    if (BOGO?.videos_ar?.length > 0) {
      const imagesList: constants.types.fileType[] = BOGO?.videos_ar.map(
        (item: any) => {
          return {
            ...item,
            id: item.videoId,
            type: 'video',
          };
        }
      );
      setSelectedVideosAr(imagesList);
    }
    if (BOGO?.images_ar?.length > 0) {
      const imagesList: constants.types.fileType[] = BOGO?.images_ar?.map(
        (item: any) => {
          return {
            ...item,
            id: item.imageId,
            type: 'image',
          };
        }
      );
      setSelectedImagesAr(imagesList);
    }
  }, []);

  useEffect(() => {
    if (BOGOID) {
      getBOGOByID(BOGOID)
        .then((res) => {
          const BOGO = { ...res.data.campaign };

          setFormikData(BOGO);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleAddBOGO = async (value: any) => {
    const res: any = value;
    const payload = {
      active: res.active,
      deal_id: res.deal_id.id,
      deal_type: res.deal_type.id,
      deal_exclude_option_ids:
        res?.deal_exclude_option_ids.length > 0
          ? res?.deal_exclude_option_ids.map((e: any) => e.id).join(',')
          : null,
      limit_per_customer: +res.limit_per_customer,
      total_voucher_limit: +res.total_voucher_limit,
      total_sold_count: +res.total_sold_count,
      image_id: getSigneid(selectedImages),
      video_id: getSigneid(selectedVideos, 'vid'),
      image_id_ar: getSigneid(selectedImagesAr),
      video_id_ar: getSigneid(selectedVideosAr, 'vid'),
      priority: +res.priority,
      platform: res.platform.id,
      fs_active_date: res.fs_active_date,
      fs_end_date: res.fs_end_date,
      translations: [
        {
          column_name: 'title_trans_ids',
          locale: 'en',
          text: res.title_en,
        },
        {
          column_name: 'title_trans_ids',
          locale: 'ar',
          text: res.title_ar,
        },
        {
          column_name: 'tagline_trans_ids',
          locale: 'en',
          text: res.tagline_en,
        },
        {
          column_name: 'tagline_trans_ids',
          locale: 'ar',
          text: res.tagline_ar,
        },
      ],
    };

    if (BOGOID) {
      setBtnLoader(true);
      updateBOGO({ ...payload, id: parseInt(BOGOID) })
        .then((response) => {
          setBtnLoader(false);
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: 'Flash Sale BO-GO updated successfully',
              varient: 'success',
            })
          );
          navigate(path.BOGOLIST);
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
      createBOGO(payload)
        .then((response) => {
          setBtnLoader(false);
          if (response.success === true) {
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Flash Sale BO-GO created successfully',
                varient: 'success',
              })
            );
            navigate(path.BOGOLIST);
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
        <Link color="inherit" to={path.BOGOLIST}>
          Buy one get one
        </Link>
        {BOGOID ? (
          <Typography color="text.primary">Update Buy one get one</Typography>
        ) : (
          <Typography color="text.primary">Add Buy one get one</Typography>
        )}
      </Breadcrumbs>
      <MainCard>
        <Box>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <CardHeader title="General Information" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <GeneralInfo
                  formik={formik}
                  id={BOGOID}
                  bogoData={bogoData}
                  selectedVideos={selectedVideos}
                  setSelectedVideos={setSelectedVideos}
                  selectedImages={selectedImages}
                  setSelectedImages={setSelectedImages}
                  selectedVideosAr={selectedVideosAr}
                  setSelectedVideosAr={setSelectedVideosAr}
                  selectedImagesAr={selectedImagesAr}
                  setSelectedImagesAr={setSelectedImagesAr}
                  permission={permission}
                />
              </Box>
              <CardHeader title=" Deal Information" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <DealInfo formik={formik} />
              </Box>
              <CardHeader title=" Flash Sale Period" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <FlashSalePeriod formik={formik} />
              </Box>

              <Grid sx={{ mt: 3 }} item xs={12}>
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
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Cancel
                  </Button>
                  {/* <Permission module={'FLASH_SALE'}> */}
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
                        <>{BOGOID ? 'Update' : 'Add'}</>
                      )}
                    </Button>
                  )}
                  {/* <Button
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
                      <>{BOGOID ? 'Update' : 'Add'}</>
                    )}
                  </Button> */}
                  {/* </Permission> */}
                </Stack>
              </Grid>
            </form>
          </FormikProvider>
        </Box>
      </MainCard>
    </>
  );
}

export default BOGOForm;
