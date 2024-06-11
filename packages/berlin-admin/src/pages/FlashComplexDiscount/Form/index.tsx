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
import { FormikProvider, useFormik, useFormikContext } from 'formik';

// project imports
import MainCard from '../../MainCard';
import { useCallback, useEffect, useState } from 'react';
import { path } from '../../../routes/Routers';
import GeneralInfo from './Steps/GeneralInfo';
import DealInfo from './Steps/DealInfo';
import FlashSalePeriod from './Steps/FlashSalePeriod';
import { Grid } from '@mui/material';
import { initialValues, validationSchema } from './Steps/formikValidation';
import {
  createDP,
  getDPByID,
  updateDP,
} from '../../../services/flashSaleDPService';
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

function DPForm() {
  const { permission } = usePermission('FLASH_SALE');
  const [dpData, setDpData] = useState();
  const [btnLoader, setBtnLoader] = useState(false);
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
  const params = useParams();
  const DPID: string = params.id ? params.id : '';
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (value) => {
      handleAddDP(value);
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formikone = useFormikContext();

  const handleCancel = () => {
    navigate(path.DPLIST);
  };

  const setFormikData = useCallback((DP: any) => {
    if (DP?.images?.length > 0) {
      const imagesList: constants.types.fileType[] = DP?.images?.map(
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

    if (DP?.videos?.length > 0) {
      const imagesList: constants.types.fileType[] = DP?.videos.map(
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
    if (DP?.images_ar?.length > 0) {
      const imagesList: constants.types.fileType[] = DP?.images_ar?.map(
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

    if (DP?.videos_ar?.length > 0) {
      const imagesList: constants.types.fileType[] = DP?.videos_ar.map(
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

    if (DP.translations.length > 0) {
      const title_en = DP.translations.find(
        (ele: TranslationType) =>
          ele.locale === 'en' && ele.column_name === 'title_trans_ids'
      );
      const title_ar = DP.translations.find(
        (ele: TranslationType) =>
          ele.locale === 'ar' && ele.column_name === 'title_trans_ids'
      );

      const tagline_en = DP.translations.find(
        (ele: TranslationType) =>
          ele.locale === 'en' && ele.column_name === 'tagline_trans_ids'
      );
      const tagline_ar = DP.translations.find(
        (ele: TranslationType) =>
          ele.locale === 'ar' && ele.column_name === 'tagline_trans_ids'
      );

      DP.title_en = title_en?.text ?? '';
      DP.title_ar = title_ar?.text ?? '';
      DP.tagline_en = tagline_en?.text ?? '';
      DP.tagline_ar = tagline_ar?.text ?? '';
    }

    setDpData(DP);

    formik.setValues({
      active: DP.active === 1 ? true : false,
      title_en: DP.title_en,
      title_ar: DP.title_ar,
      tagline_en: DP.tagline_en,
      tagline_ar: DP.tagline_ar,
      flash_scope: {
        label: DP.flash_scope.toUpperCase(),
        id: DP.flash_scope.toUpperCase(),
      },
      category_ids: [],
      exclude_category_ids: [],
      exclude_deal_ids: [],
      exclude_combo_ids: [],
      // ?.map((e: any) => e.id)
      // .join(','),
      area_ids: [],
      price_start: DP.price_start,
      price_end: DP.price_end,
      commission_percentage_start: DP.commission_percentage_start,
      commission_percentage_end: DP.commission_percentage_end,
      discount_percent: DP.discount_percent,
      min_cart_amount: DP.min_cart_amount,
      max_discount_cap: DP.max_discount_cap,
      limit_per_customer: DP.limit_per_customer,
      total_voucher_limit: DP.total_voucher_limit,
      total_sold_count: +DP.total_sold_count,
      priority: DP.priority,
      platform: {
        label: DP.platform.toUpperCase(),
        id: DP.platform.toUpperCase(),
      },
      image_id: '',
      video_id: '',
      image_id_ar: '',
      video_id_ar: '',
      // image_id: parseInt(getSigneid(selectedImages, 'img')),
      // video_id: parseInt(getSigneid(selectedVideos, 'vid')),
      fs_active_date: DP.fs_active_date,
      fs_end_date: DP.fs_end_date,
    });
  }, []);

  useEffect(() => {
    if (DPID) {
      getDPByID(DPID)
        .then((res) => {
          const DP = { ...res.data.campaign };

          setFormikData(DP);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (!formik.isSubmitting) return;
    if (Object.keys(formik.errors).length > 0) {
      const firstError = document.querySelector('.Mui-error');
      if (firstError) {
        const offset = 30; // You may need to adjust this value
        const scrollToY = firstError.getBoundingClientRect().top + 200;
        window.scrollTo({ top: scrollToY, behavior: 'smooth' });
      }
    }
  }, [formik]);

  const handleAddDP = async (value: any) => {
    const res: any = value;
    const payload = {
      active: value.active,
      flash_scope: res.flash_scope.id,
      category_ids:
        res?.category_ids.length > 0
          ? res?.category_ids.map((e: any) => e.id)?.join(',')
          : null,
      exclude_category_ids:
        res?.exclude_category_ids.length > 0
          ? res?.exclude_category_ids.map((e: any) => e.id)?.join(',')
          : null,
      exclude_deal_ids:
        res?.exclude_deal_ids.length > 0
          ? res?.exclude_deal_ids.map((e: any) => e.id)?.join(',')
          : null,
      exclude_combo_ids:
        res?.exclude_combo_ids.length > 0
          ? res?.exclude_combo_ids.map((e: any) => e.id)?.join(',')
          : null,

      area_ids:
        res?.area_ids.length > 0
          ? res?.area_ids.map((e: any) => e.id)?.join(',')
          : null,
      price_start: res.price_start || 0,
      price_end: res.price_end || 0,
      commission_percentage_start: res.commission_percentage_start || 0,
      commission_percentage_end: res.commission_percentage_end || 0,
      discount_percent: res.discount_percent,
      limit_per_customer: res.limit_per_customer,
      total_voucher_limit: res.total_voucher_limit,
      total_sold_count: +res.total_sold_count,
      min_cart_amount: res.min_cart_amount ? +res.min_cart_amount : null,
      max_discount_cap: res.max_discount_cap ? +res.max_discount_cap : null,

      // image_id: res.image_id,
      // video_id: res.video_id || null,
      image_id: parseInt(getSigneid(selectedImages, 'img')),
      video_id: parseInt(getSigneid(selectedVideos, 'vid')),
      image_id_ar: parseInt(getSigneid(selectedImagesAr, 'img')),
      video_id_ar: parseInt(getSigneid(selectedVideosAr, 'vid')),
      priority: res.priority,
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

    if (DPID) {
      setBtnLoader(true);
      updateDP({ ...payload, id: parseInt(DPID) })
        .then((response) => {
          setBtnLoader(false);
          if (response.message) {
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Flash Sale Complex Discount updated successfully',
                varient: 'success',
              })
            );
          }
          navigate(path.DPLIST);
        })
        .catch((error) => {
          setBtnLoader(false);
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: error.response.data.error.message.code
                ? error.response.data.error.message.code
                : 'Something went wrong',
              varient: 'error',
            })
          );
        });
    } else {
      setBtnLoader(true);
      createDP(payload)
        .then((response) => {
          setBtnLoader(false);
          if (response.success === true) {
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Flash Sale Complex Discount created successfully',
                varient: 'success',
              })
            );
            navigate(path.DPLIST);
          }
        })
        .catch((error) => {
          setBtnLoader(false);
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: error.response.data.error.message.code
                ? error.response.data.error.message.code
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
        <Link color="inherit" to={path.DPLIST}>
          Complex Discount
        </Link>
        {DPID ? (
          <Typography color="text.primary">Update Complex Discount</Typography>
        ) : (
          <Typography color="text.primary">Add Complex Discount</Typography>
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
                  dpData={dpData}
                  id={DPID}
                  formik={formik}
                  permission={permission}
                  selectedImages={selectedImages}
                  setSelectedImages={setSelectedImages}
                  selectedVideos={selectedVideos}
                  setSelectedVideos={setSelectedVideos}
                  selectedImagesAr={selectedImagesAr}
                  setSelectedImagesAr={setSelectedImagesAr}
                  selectedVideosAr={selectedVideosAr}
                  setSelectedVideosAr={setSelectedVideosAr}
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
                        <>{DPID ? 'Update' : 'Add'}</>
                      )}
                    </Button>
                  )}
                </Stack>
              </Grid>
            </form>
          </FormikProvider>
        </Box>
      </MainCard>
    </>
  );
}

export default DPForm;
