import { useEffect, useState } from 'react';
import GeneralInfo from './GeneralInfo';
import { Form, FormikProvider, useFormik } from 'formik';
import {
  Box,
  Breadcrumbs,
  Button,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';
import MainCard from '../../MainCard';
import MediaAssets from './MediaAssets';
import PricingAndDisplay from './PricingAndDisplay';
import SalesAndLimitInfo from './SalesAndLimitInfo';
import CategoryInfo from './CategoryInfo';
import PromotionAndVisibility from './PromotionAndVisibility';
import ValidityPeriod from './ValidityPeriod';
import AdministrativeData from './AdministrativeData';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { path } from '../../../routes/Routers';
import { initialValues, validationSchema, DealComboI } from './Validation';
import {
  addDealCombo,
  getCombosByIds,
  updateDealComboList,
} from '../../../services/dealComboServices';
import IncludesDeal from './IncludesDeal';
import DealDescription from './DealDescription';
import { setSnackbarConfig } from '../../../store/slice/Loader';
import { useDispatch } from 'react-redux';
import AudienceRecommendation from './AudienceRecommendation';
import Permission from '../../../components/Permission';
import { CircularProgress } from '@mui/material';
import usePermission from '../../../components/Permission/usePermission';
import { constants } from 'berlin-common';
import { getId } from '../../../utils/getIds';
import { WEBSITEHOST } from '../../../../../../urlConst';

const FormDealCombo = () => {
  const [updatedData, setUpdatedData] = useState<any>();
  const [btnLoader, setBtnLoader] = useState(false);
  const { permission } = usePermission('DEAL');
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
  // const [removeDeals, setRemoveDeals] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (value: DealComboI) => {
      const res = value;
      const deal_Ids = res.dealIds.map((e: any, index) => {
        return {
          dealId: e.id,
          priority: index + 1,
        };
      });
      let payLoad = {
        translations: res.translations,
        platform: res?.platform?.id,

        image_ids: getId(selectedImages, 'img'),
        video_ids: getId(selectedVideos, 'vid'),
        image_ids_ar: getId(selectedImagesAr, 'img'),
        video_ids_ar: getId(selectedVideosAr, 'vid'),
        //? IncludesDeal
        dealIds: deal_Ids,

        // ? Pricing and Display Details
        selling_price: parseInt(res.selling_price),
        old_price: parseInt(res.old_price),
        currency: res.currency?.id,
        show_old_price: res.show_old_price,
        // initial_bought_count: parseInt(res.initial_bought_count),

        //? Category Information
        primary_category_id: res.primary_category_id?.id,
        secondary_category_ids: res.secondary_category_ids
          .map((e: any) => e.id)
          .join(','),

        //? selling and limit info
        selling_limit: parseInt(res.selling_limit),
        sold_count: res.sold_count,
        max_limit_per_customer: parseInt(res.max_limit_per_customer),
        min_limit_per_transaction: parseInt(res.min_limit_per_transaction),
        max_limit_per_transaction: parseInt(res.max_limit_per_transaction),

        show_timer: res.show_timer,
        sold_out: res.sold_out,
        priority: res.priority,
        is_featured: res.is_featured,
        deal_active_date: res.deal_active_date,
        deal_end_date: res.deal_end_date,
        notes: res?.notes,
        rating: res?.rating,
        active: res.active,
        deal_descriptions: res.deal_descriptions,
        traveller_types: res.traveller_types
          ? res.traveller_types.map((e) => {
              return { traveller_id: e.id };
            })
          : null,
        deal_tags: value.deal_tags
          ? value.deal_tags.map((e) => {
              return { tag_id: e.id };
            })
          : null,
        is_home_widget_deal: value.is_home_widget_deal,
        home_widget_priority: Boolean(value?.is_home_widget_deal)
          ? value.home_widget_priority
          : null,
        feature_widget_priority: value.feature_widget_priority,
      };
      if (value.initial_bought_count) {
        payLoad['initial_bought_count'] = parseInt(value.initial_bought_count);
      }
      if (id) {
        setBtnLoader(true);
        updateDealComboList({
          ...payLoad,
          // removedealIds: removeDeals,
          id: parseInt(id),
        })
          .then((res) => {
            setBtnLoader(false);
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Deal Combo Updated successfully',
                varient: 'success',
              })
            );
            navigate(path.DEALCOMBOLIST);
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
        addDealCombo(payLoad)
          .then((res) => {
            setBtnLoader(false);
            if (res.data.success === true) {
              dispatch(
                setSnackbarConfig({
                  isOpen: true,
                  message: 'Deal Combo created successfully',
                  varient: 'success',
                })
              );
              navigate(path.DEALCOMBOLIST);
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
  let navigate = useNavigate();

  const handleCancel = () => {
    navigate(path.DEALCOMBOLIST);
  };

  const getDealComboById = () => {
    getCombosByIds(id).then((res) => {
      const data = res.data.data.deal;
      if (data?.images?.length > 0) {
        const imagesList: constants.types.fileType[] = data?.images?.map(
          (item: any) => {
            return {
              ...item,
              id: item?.imageId,
              type: 'image',
            };
          }
        );
        setSelectedImages(imagesList);
      }

      if (data?.videos?.length > 0) {
        const videoList: constants.types.fileType[] = data?.videos?.map(
          (item: any) => {
            return {
              ...item,
              id: item?.videoId,
              type: 'video',
            };
          }
        );
        setSelectedVideos(videoList);
      }

      if (data?.images_ar?.length > 0) {
        const imagesList: any = data?.images_ar?.map((item) => {
          return {
            ...item,
            id: item.imageId,
            type: 'image',
          };
        });
        setSelectedImagesAr(imagesList);
      }

      if (data?.videos_ar?.length > 0) {
        const videoList: any = data?.videos_ar?.map((item) => {
          return {
            ...item,
            id: item.videoId,
            type: 'video',
          };
        });
        setSelectedVideosAr(videoList);
      }
      setUpdatedData(data);
      formik.setFieldValue('platform', {
        label: data.platform,
        id: data.platform,
      });
      formik.setFieldValue('currency', {
        label: data.currency,
        id: data.currency,
      });
      formik.setFieldValue('selling_price', data.selling_price);
      formik.setFieldValue('old_price', data.old_price);
      formik.setFieldValue('show_old_price', data.show_old_price);
      formik.setFieldValue('initial_bought_count', data.initial_bought_count);
      formik.setFieldValue('selling_limit', data.selling_limit);
      formik.setFieldValue('sold_count', data.sold_count);
      formik.setFieldValue('notes', data.notes);
      formik.setFieldValue(
        'max_limit_per_customer',
        data.max_limit_per_customer
      );
      formik.setFieldValue(
        'min_limit_per_transaction',
        data.min_limit_per_transaction
      );
      formik.setFieldValue(
        'max_limit_per_transaction',
        data.max_limit_per_transaction
      );
      formik.setFieldValue('show_timer', data.show_timer);
      formik.setFieldValue('sold_out', data.sold_out);
      formik.setFieldValue('priority', data.priority);
      formik.setFieldValue('is_featured', data.is_featured == 1 ? true : false);
      formik.setFieldValue('deal_active_date', data?.deal_active_date);
      formik.setFieldValue(
        'feature_widget_priority',
        data?.feature_widget_priority
      );
      formik.setFieldValue('deal_end_date', data?.deal_end_date);
      formik.setFieldValue('active', data.active);
      formik.setFieldValue('translations', data.dealcombotranslations);
      formik.setFieldValue('deal_descriptions', data?.deal_descriptions);
      formik.setFieldValue('image_ids', data?.image_ids);
      formik.setFieldValue('video_ids', data?.video_ids);
      formik.setFieldValue('image_ids_ar', data?.image_ids_ar);
      formik.setFieldValue('video_ids_ar', data?.video_ids_ar);
      formik.setFieldValue('rating', data?.rating);

      formik.setFieldValue(
        'is_home_widget_deal',
        data?.is_home_widget_deal == 1 ? true : false
      );
      formik.setFieldValue('home_widget_priority', data?.home_widget_priority);
    });
  };
  useEffect(() => {
    if (id) {
      getDealComboById();
    }
    // else {
    //   getAllDropDown('');
    // }
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

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={path.DEALCOMBOLIST}>
          Deal Combo
        </Link>

        <Typography color="text.primary">
          {id ? 'Update Deal Combo' : 'Add Deal Combo'}
        </Typography>
      </Breadcrumbs>
      <MainCard>
        <Box>
          <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
              {id && (
                <Button
                  variant="outlined"
                  color="secondary"
                  type="reset"
                  sx={{ mr: 1 }}
                  href={`${WEBSITEHOST}/ae-en/c/${updatedData?.slug}/${updatedData?.id}`}
                  target="_blank"
                >
                  Go to Combo deal page
                </Button>
              )}
              <CardHeader title="General Information" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <GeneralInfo formik={formik} />
              </Box>
              <CardHeader title="Deal Description" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <DealDescription formik={formik} permission={permission} />
              </Box>
              {id && (
                <>
                  <CardHeader title="Media Assets" />
                  <Divider />
                  <Box sx={{ p: 2.5 }}>
                    <MediaAssets
                      id={id}
                      selectedImages={selectedImages}
                      setSelectedImages={setSelectedImages}
                      selectedVideos={selectedVideos}
                      setSelectedVideos={setSelectedVideos}
                      selectedImagesAr={selectedImagesAr}
                      setSelectedImagesAr={setSelectedImagesAr}
                      selectedVideosAr={selectedVideosAr}
                      setSelectedVideosAr={setSelectedVideosAr}
                      permission={permission}
                    />
                  </Box>
                </>
              )}

              <CardHeader title="Includes Deal" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <IncludesDeal
                  formik={formik}
                  updatedData={updatedData}
                  // setRemoveDeals={setRemoveDeals}
                  // removeDeals={removeDeals}
                />
              </Box>

              <CardHeader title="Pricing Details" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <PricingAndDisplay formik={formik} />
              </Box>

              <CardHeader title="Category Information" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <CategoryInfo formik={formik} updatedData={updatedData} />
              </Box>

              <CardHeader title="Sales and Limit Information" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <SalesAndLimitInfo />
              </Box>

              <CardHeader title="Promotion and Visibility" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <PromotionAndVisibility formik={formik} />
              </Box>

              <CardHeader title="Validity Periods" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <ValidityPeriod formik={formik} />
              </Box>
              <CardHeader title="Audience Recommendation" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <AudienceRecommendation
                  formik={formik}
                  updatedData={updatedData}
                />
              </Box>

              <CardHeader title="Administrative Data" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <AdministrativeData formik={formik} updatedData={updatedData} />
              </Box>

              <Box sx={{ p: 2.5, textAlign: 'right' }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  type="reset"
                  sx={{ mr: 1 }}
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
                      <>{id ? 'Update' : 'Add'}</>
                    )}
                  </Button>
                )}
              </Box>
            </Form>
          </FormikProvider>
        </Box>
      </MainCard>
    </>
  );
};

export default FormDealCombo;
