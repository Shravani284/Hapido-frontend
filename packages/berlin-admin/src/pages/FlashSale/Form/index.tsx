// material-ui
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Button,
  CardHeader,
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

import PrimaryDealSelection from '../Form/Steps/PrimaryDealSelection';
import FlashSaleTitle from '../Form/Steps/FlashSaleTitleAndTagline';
import DiscountedDealSelection from '../Form/Steps//DiscountedDealSelection';
import DiscountAndLimitations from '../Form/Steps//DiscountAndLimitations';
import MediaAndPresentation from '../Form/Steps//MediaAndPresentation';
import FlashSaleTiming from '../Form/Steps//FlashSaleTiming';
import AdministrativeData from '../Form/Steps//AdministrativeData';
import {
  FlashSaleValues,
  Translation,
  initialValues,
  validationSchema,
} from '../Form/Steps/initialValues';
import {
  FlashSaleCreate,
  getFlashSaleById,
  updateFlashSale,
} from '../../../services/flashSaleBOSDService';
import { path } from '../../../routes/Routers';
import { setSnackbarConfig } from '../../../store/slice/Loader';
import { useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';
import usePermission from '../../../components/Permission/usePermission';
import { constants } from 'berlin-common';
import { getSigneid } from '../../../utils/getIds';

// ==============================|| FORMS VALIDATION - ADDRESS ||============================== //

function FlashSale() {
  const { permission } = usePermission('FLASH_SALE');
  const [errorMessage, setErrorMessage] = useState('');
  const [UpdateCountryData, setUpdateCountryData] = useState({});
  const [btnLoader, setBtnLoader] = useState(false);
  const [dealList, setDealList] = useState([]);
  const [dealListbyid, setDealListById] = useState([]);
  const [bosdData, setBosdData] = useState();
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
  const FlashSaleId: string = params.id ? params.id : '';

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleAdd(values);
    },
  });
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
  useEffect(() => {
    if (FlashSaleId) {
      getFlashSaleById(FlashSaleId)
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
                flashsale?.videos.map((item: any) => {
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
                flashsale?.videos_ar.map((item: any) => {
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
            setBosdData(flashsale);

            formik?.setValues({
              active: flashsale.active === 1 ? true : false,
              deal_id_1: flashsale.deal_id_1,
              deal_id_1_type: {
                label: flashsale.deal_id_1_type.toUpperCase(),
                id: flashsale.deal_id_1_type.toUpperCase(),
              },
              deal_1_exclude_option_ids: [],
              deal_id_2: flashsale.deal_id_2,
              deal_id_2_type: {
                label: flashsale.deal_id_2_type.toUpperCase(),
                id: flashsale.deal_id_2_type.toUpperCase(),
              },
              deal_2_exclude_option_ids: [],
              limit_per_customer: flashsale.limit_per_customer,
              total_voucher_limit: flashsale.total_voucher_limit,
              image_id: '',
              video_id: '',
              image_id_ar: '',
              video_id_ar: '',
              // image_id: getSigneid(selectedImages, 'img'),
              // video_id: getSigneid(selectedVideos, 'vid'),
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
              second_deal_discount_percent:
                flashsale.second_deal_discount_percent,
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

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdd = async ({
    created_at,
    updated_at,
    created_by,
    updated_by,
    ...value
  }: FlashSaleValues) => {
    const payload = {
      ...value,
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
      deal_id_1: +value.deal_id_1?.id,
      deal_id_2: +value.deal_id_2?.id,
      deal_id_1_type: value.deal_id_1_type?.id,
      deal_id_2_type: value.deal_id_2_type?.id,
      deal_1_exclude_option_ids:
        value?.deal_1_exclude_option_ids.length > 0
          ? value?.deal_1_exclude_option_ids.map((e: any) => e.id).toString()
          : null,
      deal_2_exclude_option_ids:
        value?.deal_2_exclude_option_ids.length > 0
          ? value?.deal_2_exclude_option_ids.map((e: any) => e.id).toString()
          : null,
      second_deal_discount_percent: +value.second_deal_discount_percent,
      limit_per_customer: +value.limit_per_customer,
      total_voucher_limit: +value.total_voucher_limit,
      total_sold_count: +value.total_sold_count,
      priority: +value.priority,
      platform: value.platform?.id,
      fs_active_date: value.fs_active_date,
      fs_end_date: value.fs_end_date,
      soft_delete: false,
    };
    if (FlashSaleId) {
      setBtnLoader(true);
      updateFlashSale({ ...payload, id: +FlashSaleId })
        .then((response) => {
          setBtnLoader(false);
          if (response.data.success === true) {
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Flash Sale updated successfully',
                varient: 'success',
              })
            );
            navigate(path.FLASHSALE);
          }
        })
        .catch((error) => {
          console.log(error.response.data.error.message);
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
      FlashSaleCreate(payload)
        .then((response) => {
          setBtnLoader(false);
          if (response.success === true) {
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Flash Sale created successfully',
                varient: 'success',
              })
            );
            navigate(path.FLASHSALE);
          }
        })
        .catch((error) => {
          setBtnLoader(false);
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: error.response.data.error.message.code
                ? error.response.data.error.message.code
                : 'something went wrong',
              varient: 'error',
            })
          );
        });
    }
  };

  const handleCancel = () => {
    navigate(path.FLASHSALE);
  };
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={path.FLASHSALE}>
          Buy one get second at discount
        </Link>
        {FlashSaleId ? (
          <Typography color="text.primary">
            Update Buy one get second at discount
          </Typography>
        ) : (
          <Typography color="text.primary">
            Add Buy one get second at discount
          </Typography>
        )}
      </Breadcrumbs>
      <MainCard>
        <Box>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <CardHeader title="Flash Sale Title & Tagline" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <FlashSaleTitle formik={formik} dealList={dealList} />
              </Box>

              <CardHeader title="Primary Deal Selection" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <PrimaryDealSelection
                  formik={formik}
                  dealList={dealList}
                  dealListbyid={dealListbyid}
                />
              </Box>

              <CardHeader title="Discounted Deal Selection" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <DiscountedDealSelection
                  formik={formik}
                  dealList={dealList}
                  dealListbyid={dealListbyid}
                />
              </Box>

              <CardHeader title="Discount & Limitations" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <DiscountAndLimitations formik={formik} />
              </Box>

              <CardHeader title="Media & Presentation" />
              <Divider />
              {/* {FlashSaleId && ( */}
              <Box sx={{ p: 2.5 }}>
                <MediaAndPresentation
                  id={FlashSaleId}
                  bosdData={bosdData}
                  dealList={dealList}
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
              {/* )} */}

              <CardHeader title="Flash Sale Timing" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <FlashSaleTiming formik={formik} />
              </Box>

              <CardHeader title="Administrative Data" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <AdministrativeData formik={formik} />
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
                        <>{FlashSaleId ? 'Update' : 'Add'}</>
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
export default FlashSale;
