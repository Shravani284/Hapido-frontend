// material-ui
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  CardHeader,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material';

// third-party
import { FormikProvider, useFormik } from 'formik';

// project imports
import MainCard from '../../MainCard';
import { useEffect, useState } from 'react';

import { path } from '../../../routes/Routers';
import GeneralInfo from './Steps/GeneralInfo';
import MediaAssets from './Steps/MediaAssets';
import CategoryInformation from './Steps/CategoryInformation';
import PricingAndDisplayDetails from './Steps/PricingAndDisplayDetails';
import PromotionAndVisibility from './Steps/PromotionAndVisibility';
import ValidityPeriods from './Steps/ValidityPeriods';
import AdministrativeData from './Steps/AdministrativeData';
import { DealBundleI, initialValues, validationSchema } from './Validation';
import {
  addDealBundle,
  getDealBundleByID,
  updateDealBundle,
} from '../../../services/dealBundleService';
import IncludesDeal from './Steps/IncludesDeal';
import {
  setDropDownValues,
  setMultiDropDownValue,
} from '../../../utils/dropDown';
import { useDispatch } from 'react-redux';
import { setSnackbarConfig } from '../../../store/slice/Loader';
import { Breadcrumbs } from '@mui/material';
import DealDescription from './Steps/DealDescription';
import AudienceRecommendation from './Steps/AudienceRecommendation';
import Permission from '../../../components/Permission';
import { getCategoriesSubCategories } from '../../../services/dropDownService';
import usePermission from '../../../components/Permission/usePermission';
import { constants } from 'berlin-common';
import { getId } from '../../../utils/getIds';
import { WEBSITEHOST } from '../../../../../../urlConst';

// ==============================|| FORMS VALIDATION - ADDRESS ||============================== //

function CreateSingleDealForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const { permission } = usePermission('DEAL');
  const [dealDetails, setDealDetails] = useState<any>();
  const [primaryCategory, setPrimaryCategory] = useState([]);
  const [removeDeals, setremoveDeals] = useState([]);
  const [removeDealDescription, setRemoveDealDescription] = useState([]);
  const params = useParams();
  const [btnLoader, setBtnLoader] = useState(false);
  const dispatch = useDispatch();
  const dealBundleId: string = params.id ? params.id : '';
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
    initialValues,
    validationSchema,
    onSubmit: async (value) => {
      handleAdd(value);
    },
  });
  let navigate = useNavigate();
  const handleAdd = async (value: DealBundleI) => {
    const deal = value.dealIds.map((i: any) => {
      return { dealId: i.dealId, priority: i.priority };
    });
    const desc_deal = [...removeDealDescription, ...value?.deal_descriptions];

    const payLoad = {
      dealIds: deal,
      image_ids: getId(selectedImages, 'img'),
      video_ids: getId(selectedVideos, 'vid'),
      image_ids_ar: getId(selectedImagesAr, 'img'),
      video_ids_ar: getId(selectedVideosAr, 'vid'),
      display_selling_price: value.display_selling_price
        ? +value.display_selling_price
        : value.display_selling_price,
      display_old_price: value.display_old_price,
      primary_category_id: value.primary_category_id
        ? value.primary_category_id.id
        : null,
      secondary_category_ids: value.secondary_category_ids
        .map((e) => e.id)
        ?.join(','),
      currency: value?.currency?.id,
      show_timer: value.show_timer,
      show_old_price: value.show_old_price,
      initial_bought_count: value.initial_bought_count
        ? parseInt(value.initial_bought_count)
        : null,
      sold_out: value.sold_out,
      priority: parseInt(value.priority),
      is_featured: value.is_featured,
      platform: value.platform ? value.platform.id : null,
      deal_active_date: value.deal_active_date,
      deal_end_date: value.deal_end_date,
      active: value?.active,
      translations: value.translations,
      deal_descriptions: desc_deal,
      notes: value?.notes,
      rating: value?.rating,
      deal_tags: value.deal_tags
        ? value.deal_tags.map((e) => {
            return { tag_id: e.id };
          })
        : null,
      is_home_widget_deal: value.is_home_widget_deal,
      home_widget_priority: Boolean(value?.is_home_widget_deal)
        ? value.home_widget_priority
        : null,

      traveller_types: value.traveller_types
        ? value.traveller_types.map((e) => {
            return { traveller_id: e.id };
          })
        : null,
      feature_widget_priority: value.feature_widget_priority,
    };

    if (!dealBundleId) {
      //? ADD Record
      setBtnLoader(true);
      addDealBundle(payLoad)
        .then((response) => {
          setBtnLoader(false);
          if (response.success === true) {
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Deal Bundle created successfully',
                varient: 'success',
              })
            );
            navigate(path.DEALBUNDLE);
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
      updateDealBundle({
        ...payLoad,
        removedealIds: removeDeals,
        id: +dealBundleId,
      })
        .then((response) => {
          setBtnLoader(false);
          if (response.success === true) {
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Deal Bundle updated successfully',
                varient: 'success',
              })
            );
            navigate(path.DEALBUNDLE);
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

  const dealBundleDetail = () => {
    const dropdown = [
      'platform',
      'dealIds',
      'primary_category_id',
      'secondary_category_ids',
      'dealBundletranslations',
      'traveller_types',
      'deal_tags',
      'currency',
    ];
    getDealBundleByID(dealBundleId)
      .then((response) => {
        const result = response?.data?.deal;
        if (result?.images?.length > 0) {
          const imagesList: constants.types.fileType[] = result?.images?.map(
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
        if (result?.videos?.length > 0) {
          const imagesList: constants.types.fileType[] = result?.videos.map(
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

        if (result?.images_ar?.length > 0) {
          const imagesList: constants.types.fileType[] = result?.images_ar?.map(
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

        if (result?.videos_ar?.length > 0) {
          const imagesList: constants.types.fileType[] = result?.videos_ar.map(
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
        setDealDetails(result);
        const key = Object.keys(result);
        key.forEach((name) => {
          if (
            name === 'image_ids' ||
            name === 'video_ids' ||
            name === 'image_ids_ar' ||
            name === 'video_ids_ar'
          ) {
            formik.setFieldValue(name, result[name].split(','));
          } else if (name === 'dealIds') {
            const data = result[name].map((e: any) => {
              return { dealId: e.id, priority: e.priority };
            });
            formik.setFieldValue(name, data);
          } else if (name === 'currency') {
            formik.setFieldValue(name, {
              label: result[name],
              id: result[name],
            });
          } else if (!dropdown.includes(name)) {
            formik.setFieldValue(name, result[name]);
          } else if (name === 'dealBundletranslations') {
            formik.setFieldValue('translations', result[name]);
          }
        });
        formik.setFieldValue('platform', {
          label: result.platform,
          id: result.platform,
        });
        formik.setFieldValue(
          'home_widget_priority',
          result?.home_widget_priority
        );
        getCategory(result);
      })
      .catch((error) => {
        setErrorMessage(
          error.response.data.error.message || 'Something went wrong'
        );
      });
  };

  // Primary Categories Dropdown
  const getCategory = (dealDetails?: any) => {
    getCategoriesSubCategories()
      .then((res) => {
        setPrimaryCategory(res);
        if (dealDetails) {
          setDropDownValues(res, dealDetails, 'primary_category_id', formik);
          setMultiDropDownValue(
            res,
            dealDetails.secondary_category_ids.split(','),
            'secondary_category_ids',
            formik
          );
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    if (dealBundleId) {
      dealBundleDetail();
    } else {
      getCategory('');
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

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={path.DEALBUNDLE}>
          Deal Bundle
        </Link>
        <Typography color="text.primary">
          {dealBundleId ? 'Update Deal Bundle' : 'Add Deal Bundle'}
        </Typography>
      </Breadcrumbs>
      <MainCard>
        <Box>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              {dealBundleId && (
                <Button
                  variant="outlined"
                  color="secondary"
                  type="reset"
                  sx={{ mr: 1 }}
                  href={`${WEBSITEHOST}/ae-en/b/${dealDetails?.slug}/${dealDetails?.id}`}
                  target="_blank"
                >
                  Go to Bundle deal page
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
                <DealDescription
                  formik={formik}
                  removeDealDescription={removeDealDescription}
                  setRemoveDealDescription={setRemoveDealDescription}
                  permission={permission}
                />
              </Box>
              {dealBundleId && (
                <>
                  <CardHeader title="Media Assets" />
                  <Divider />
                  <Box sx={{ p: 2.5 }}>
                    <MediaAssets
                      id={dealBundleId}
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
                  dealDetails={dealDetails}
                  setremoveDeals={setremoveDeals}
                  removeDeals={removeDeals}
                  permission={permission}
                />
              </Box>
              <CardHeader title="Pricing Details" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <PricingAndDisplayDetails formik={formik} />
              </Box>
              <CardHeader title="Category Information" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <CategoryInformation
                  formik={formik}
                  primaryCategory={primaryCategory}
                />
              </Box>
              <CardHeader title="Promotion and Visibility" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <PromotionAndVisibility formik={formik} />
              </Box>
              <CardHeader title="Validity Periods" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <ValidityPeriods formik={formik} />
              </Box>
              <CardHeader title="Audience Recommendation" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <AudienceRecommendation
                  formik={formik}
                  dealDetails={dealDetails}
                />
              </Box>

              <CardHeader title="Administrative Data" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <AdministrativeData formik={formik} dealDetails={dealDetails} />
              </Box>
              <Box sx={{ p: 2.5, textAlign: 'right' }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  type="reset"
                  sx={{ mr: 1 }}
                  onClick={() => navigate(path.DEALBUNDLE)}
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
                      <>{dealBundleId ? 'Update' : 'Add'}</>
                    )}
                  </Button>
                )}
              </Box>
            </form>
          </FormikProvider>
        </Box>
      </MainCard>
    </>
  );
}

export default CreateSingleDealForm;
