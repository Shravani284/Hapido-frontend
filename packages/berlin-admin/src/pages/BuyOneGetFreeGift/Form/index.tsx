// material-ui
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

// third-party
import { FormikProvider, useFormik } from 'formik';

// project imports
import MainCard from '../../MainCard';
import { useEffect, useState } from 'react';

import FlashSaleTitle from './Steps/FlashsaleOffer';
import {
  BuyOneGetFreeGiftValue,
  Translation,
  initialValues,
  validationSchema,
} from '../Form/Steps/initialValues';
import { path } from '../../../routes/Routers';
import { setSnackbarConfig } from '../../../store/slice/Loader';
import { useDispatch } from 'react-redux';

import {
  BogfgCreate,
  getBogfgById,
  updateBogfg,
} from '../../../services/BOGFGService';
import MediaAndPresentation from './Steps/MediaAndPresentation';
import { CardHeader } from '@mui/material';
import FlashSaleTiming from './Steps/FlashSaleTiming';
import DiscountAndLimitations from './Steps/DiscountAndLimitations';
import PrimaryDealSelection from './Steps/PrimaryDealSelection';
import { CircularProgress } from '@mui/material';
import usePermission from '../../../components/Permission/usePermission';
import { constants } from 'berlin-common';
import { getSigneid } from '../../../utils/getIds';

// ==============================|| FORMS VALIDATION - ADDRESS ||============================== //

function BOGFGForm() {
  const { permission } = usePermission('FLASH_SALE');
  const [dealListbyid, setDealListById] = useState([]);
  const [freeGiftsData, setFreeGiftsData] = useState();
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
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const buyId: string = params.id ? params.id : '';
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleAdd(values);
    },
  });
  useEffect(() => {
    if (buyId) {
      getBogfgById(buyId)
        .then((response) => {
          if (response) {
            const flashsale = { ...response.data.data.campaign };
            if (flashsale?.images?.length > 0) {
              const imagesList: constants.types.fileType[] =
                flashsale?.images?.map((item: any) => {
                  return {
                    ...item,
                    id: item.imageId,
                    type: 'image',
                  };
                });
              setSelectedImages(imagesList);
            }

            if (flashsale?.videos?.length > 0) {
              const videoList: constants.types.fileType[] =
                flashsale?.videos?.map((item: any) => {
                  return {
                    ...item,
                    id: item.videoId,
                    type: 'video',
                  };
                });
              setSelectedVideos(videoList);
            }
            if (flashsale?.images_ar?.length > 0) {
              const imagesList: constants.types.fileType[] =
                flashsale?.images_ar?.map((item: any) => {
                  return {
                    ...item,
                    id: item.imageId,
                    type: 'image',
                  };
                });
              setSelectedImagesAr(imagesList);
            }

            if (flashsale?.videos_ar?.length > 0) {
              const videoList: constants.types.fileType[] =
                flashsale?.videos_ar?.map((item: any) => {
                  return {
                    ...item,
                    id: item.videoId,
                    type: 'video',
                  };
                });
              setSelectedVideosAr(videoList);
            }
            setDealListById(flashsale);

            if (flashsale.translations.length > 0) {
              const title_en = flashsale.translations.find(
                (ele: Translation) =>
                  ele.locale === 'en' && ele.column_name === 'title_trans_ids'
              );

              const title_ar = flashsale.translations.find(
                (ele: Translation) =>
                  ele.locale === 'ar' && ele.column_name === 'title_trans_ids'
              );

              const tagline_en = flashsale.translations.find(
                (ele: Translation) =>
                  ele.locale === 'en' && ele.column_name === 'tagline_trans_ids'
              );

              const tagline_ar = flashsale.translations.find(
                (ele: Translation) =>
                  ele.locale === 'ar' && ele.column_name === 'tagline_trans_ids'
              );

              flashsale.title_en = title_en?.text ?? '';
              flashsale.title_ar = title_ar?.text ?? '';
              flashsale.tagline_en = tagline_en?.text ?? '';
              flashsale.tagline_ar = tagline_ar?.text ?? '';
            }

            setFreeGiftsData(flashsale);

            formik.setValues({
              active: flashsale.active == 1 ? true : false,
              // deal_id: flashsale.deal_id,
              free_entitlement: {
                label: flashsale.free_entitlement.toUpperCase(),
                id: flashsale.free_entitlement.toUpperCase(),
              },
              free_promo_code_id: flashsale.free_promo_code_id,
              free_deal_type: {
                label: flashsale.free_deal_type.toUpperCase(),
                id: flashsale.free_deal_type.toUpperCase(),
              },
              free_deal_id: flashsale.free_deal_id,
              free_deal_quantity: flashsale.free_deal_quantity,
              min_cart_amount: flashsale.min_cart_amount,
              exclude_category_ids: [],
              limit_per_customer: flashsale.limit_per_customer,
              total_voucher_limit: flashsale.total_voucher_limit,
              image_id: '',
              video_id: '',
              image_id_ar: '',
              video_id_ar: '',
              priority: flashsale.priority,
              platform: {
                label: flashsale.platform.toUpperCase(),
                id: flashsale.platform.toUpperCase(),
              },
              fs_active_date: flashsale.fs_active_date,
              fs_end_date: flashsale.fs_end_date,
              title_en: flashsale.title_en,
              title_ar: flashsale.title_ar,
              tagline_en: flashsale.tagline_en,
              tagline_ar: flashsale.tagline_ar,
              total_sold_count: flashsale.total_sold_count,
              created_at: flashsale.created_at,
              updated_at: flashsale.updated_at,
              created_by: flashsale.created_by,
              updated_by: flashsale.updated_by,
            });
          }
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
        const offset = -150; // Adjust this value based on your preference
        const scrollToY =
          firstError.getBoundingClientRect().top + window.scrollY + offset;

        window.scrollTo({ top: scrollToY, behavior: 'smooth' });
      }
    }
  }, [formik]);

  const handleAdd = async (value: BuyOneGetFreeGiftValue) => {
    const payload = {
      translations: [
        {
          column_name: 'title_trans_ids',
          locale: 'en',
          text: value.title_en,
        },
        {
          column_name: 'title_trans_ids',
          locale: 'ar',
          text: value.title_ar,
        },
        {
          column_name: 'tagline_trans_ids',
          locale: 'en',
          text: value.tagline_en,
        },
        {
          column_name: 'tagline_trans_ids',
          locale: 'ar',
          text: value.tagline_ar,
        },
      ],
      // image_id: +value.image_id,
      // video_id: value.video_id ? +value.video_id : null,
      image_id: parseInt(getSigneid(selectedImages, 'img')),
      video_id: parseInt(getSigneid(selectedVideos, 'vid')),
      image_id_ar: parseInt(getSigneid(selectedImagesAr, 'img')),
      video_id_ar: parseInt(getSigneid(selectedVideosAr, 'vid')),
      // deal_id: value.deal_id?.id,
      free_entitlement: value.free_entitlement?.id,
      free_promo_code_id: value.free_promo_code_id?.id,
      free_deal_type: value.free_deal_type?.id,
      free_deal_id: +value.free_deal_id?.id,
      free_deal_quantity: +value.free_deal_quantity,
      min_cart_amount: +value.min_cart_amount,
      exclude_category_ids:
        value?.exclude_category_ids.length > 0
          ? value?.exclude_category_ids.map((e: any) => e.id)?.join(',')
          : null,
      limit_per_customer: +value.limit_per_customer,
      total_voucher_limit: +value.total_voucher_limit,
      total_sold_count: +value.total_sold_count,
      priority: +value.priority,
      platform: value.platform?.id,
      fs_active_date: value.fs_active_date,
      fs_end_date: value.fs_end_date,
      active: value.active == 1 ? true : false,
    };
    if (buyId) {
      setBtnLoader(true);
      updateBogfg({ ...payload, id: +buyId })
        .then((response) => {
          setBtnLoader(false);
          if (response.data.success === true) {
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: response.data.message
                  ? response.data.message
                  : 'something went wong',
                varient: 'success',
              })
            );
            navigate(path.BOGFG);
          }
        })
        .catch((error) => {
          setBtnLoader(false);
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: error.response.data.error.message
                ? error.response.data.error.message
                : 'something went wong',
              varient: 'error',
            })
          );
        });
    } else {
      setBtnLoader(true);
      BogfgCreate(payload)
        .then((response) => {
          setBtnLoader(false);
          if (response.success === true) {
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: response.message
                  ? response.message
                  : 'something went wong',
                varient: 'success',
              })
            );
            navigate(path.BOGFG);
          }
        })
        .catch((error) => {
          setBtnLoader(false);
          setSnackbarConfig({
            isOpen: true,
            message: error.response.data.error.message
              ? error.response.data.error.message
              : 'something went wong',
            varient: 'error',
          });
        });
    }
  };

  const handleCancel = () => {
    navigate(path.BOGFG);
  };
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={path.BOGFG}>
          Buy One Get Free Gift
        </Link>
        {buyId ? (
          <Typography color="text.primary">
            Update Buy One Get Free Gift
          </Typography>
        ) : (
          <Typography color="text.primary">
            Add Buy One Get Free Gift
          </Typography>
        )}
      </Breadcrumbs>
      <MainCard>
        <Box>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <CardHeader title="Flash Sale BOGFG Title & Tagline" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <FlashSaleTitle />
              </Box>

              <CardHeader title="Flash Sale BOGFG Deal Selection" />

              <Divider />
              <Box sx={{ p: 2.5 }}>
                <PrimaryDealSelection
                  formik={formik}
                  freeGiftsData={freeGiftsData}
                />
              </Box>

              <CardHeader title="Flash Sale BOGFG Discount And Limitations" />

              <Divider />
              <Box sx={{ p: 2.5 }}>
                <DiscountAndLimitations formik={formik} />
              </Box>

              <CardHeader title="Flash Sale BOGFG Media And Presentation" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <MediaAndPresentation
                  formik={formik}
                  id={buyId}
                  permission={permission}
                  freeGiftsData={freeGiftsData}
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

              <CardHeader title="Flash Sale BOGFG Timing" />

              <Divider />
              <Box sx={{ p: 2.5 }}>
                <FlashSaleTiming formik={formik} />
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
                        <>{buyId ? 'Update' : 'Add'}</>
                      )}
                    </Button>
                  )}

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
export default BOGFGForm;
