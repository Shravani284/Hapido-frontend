// material-ui
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Button,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

// third-party
import { FormikProvider, useFormik } from 'formik';

// project imports
import MainCard from '../../MainCard';
import { path } from '../../../routes/Routers';
import GeneralInfo from './GeneralInfo';
import PricingDetails from './PricingDetails';
import MediaAssets from './MediaAssets';
import SchedulingAndLocation from './Schedulin';
import CategoryAndVendor from './CategoryAndVendor';
import VoucherConfiguration from './VoucherConfiguration';
import PromotionAndVisibility from './PromotionAndVisibility';
import ValidityPeriods from './ValidityPeriods';
import AudienceRecommendation from './AudienceRecommendation';
import AdministrativeData from './AdministrativeData';
import { dealsType } from './DealsValidation';
import { initialValues } from './DealsValidation';
import { validationSchema } from '../Form/DealsValidation';
import VariablePricing from './VariablePricing';
import {
  createDeals,
  getCloneDeals,
  getDealById,
  updateDeal,
} from '../../../services/dealsService';
import { useDispatch } from 'react-redux';
import { setSnackbarConfig } from '../../../store/slice/Loader';
import { useEffect, useState } from 'react';
import DealDescription from './DealDescription';
import Location from './location';
import moment from 'moment';
import { getAllArea } from '../../../services/dropDownService';
import { getId } from '../../../utils/getIds';
import { MagicDropDown, NormalTextField, constants } from 'berlin-common';
import usePermission from '../../../components/Permission/usePermission';
import { InputLabel } from '@mui/material';
import { PlatformType } from '../../../data/data';
import { error } from 'console';
import { WEBSITEHOST } from '../../../../../../urlConst';

function CreateSingleDealForm() {
  const params = useParams();
  const dealId: string = params.id ? params.id : '';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dealData, setDealData] = useState<any>();
  const [areaList, setAreaList] = useState([]);
  const [btnLoader, setBtnLoader] = useState(false);
  const [removeInventoryPrices, setRemoveInventoryPrices] = useState([]);
  const [removeDealDescription, setRemoveDealDescription] = useState([]);
  const [removeTypePricing, setRemoveTypePricing] = useState([]);
  const [removeDealSlots, setRemoveDealSlots] = useState([]);
  const [removeLocationSpecific, setRemoveLocationSpecific] = useState([]);
  const { permission } = usePermission('DEAL');
  const [isBulkAllocationDone, setIsBulkAllocationDone] = useState(false);
  const [isVariablePricing, setIsVariablePricing] = useState(false);
  const [isDealPricingDone, setIsDealPricingDone] = useState(false);
  const [cloneDealList, setCloneDealList] = useState([]);
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
    validateOnChange: false,
    onSubmit: async (values: dealsType) => {
      const inventoryPricing = [
        ...removeInventoryPrices,
        ...values.inventory_prices,
      ];
      const typePricing = [...removeTypePricing, ...values.deal_type_prices];
      const desc_deal = [...removeDealDescription, ...values.deal_descriptions];
      const DealSlots = [...removeDealSlots, ...values.deal_slots];
      const locationSpecific = [
        ...removeLocationSpecific,
        ...values.location_specific,
      ];

      const payload = {
        translations: values.translations,
        deal_type: 'SINGLE',
        image_ids: !formik?.values?.cloneDeal?.id
          ? getId(selectedImages, 'img')
          : null,
        video_ids: !formik?.values?.cloneDeal?.id
          ? getId(selectedVideos, 'vid')
          : null,
        image_ids_ar: !formik?.values?.cloneDeal?.id
          ? getId(selectedImagesAr, 'img')
          : null,
        video_ids_ar: !formik?.values?.cloneDeal?.id
          ? getId(selectedVideosAr, 'vid')
          : null,
        selling_price: parseInt(values.selling_price),
        old_price: parseInt(values.old_price),
        is_inventory_variable_pricing: values.is_inventory_variable_pricing,
        is_type_variable_pricing: values.is_type_variable_pricing,
        is_location_specific: values?.is_location_specific,
        is_slot_enabled: values.is_slot_enabled,
        slot_allow_allocation_days_count: parseInt(
          values.slot_allow_allocation_days_count
        ),
        slot_disabled_days: values?.slot_disabled_days
          ?.map((e) => e?.id)
          .join(','),
        primary_category_id: values?.primary_category_id?.id,
        secondary_category_ids: values?.secondary_category_ids
          .map((e) => e.id)
          .join(','),
        merchant_id: values?.merchant_id?.id,
        currency: values?.currency?.id,
        commission_percentage: parseFloat(values.commission_percentage),
        flat_commission_percentage: parseFloat(
          values.flat_commission_percentage
        ),
        voucher_type: values?.voucher_type?.id,
        hapido_fulfilled: values?.hapido_fulfilled,
        template_type: values?.template_type?.id,
        internal_voucher_limit: parseInt(values?.internal_voucher_limit),
        internal_voucher_sold: parseInt(values?.internal_voucher_sold),
        max_voucher_per_customer: parseInt(values.max_voucher_per_customer),
        min_voucher_per_transaction: parseInt(
          values.min_voucher_per_transaction
        ),
        max_voucher_per_transaction: parseInt(
          values.max_voucher_per_transaction
        ),
        low_stock_alert_voucher_count: parseInt(
          values.low_stock_alert_voucher_count
        ),
        content_manager_email_triggered: values.content_manager_email_triggered,
        show_timer: values.show_timer,
        show_old_price: values.show_old_price,
        initial_bought_count: values.initial_bought_count
          ? parseInt(values.initial_bought_count)
          : null,
        sold_out: values?.sold_out,
        priority: parseInt(values.priority),
        group_priority: parseInt(values.group_priority),
        is_featured: values.is_featured,
        est_duration_hours: parseInt(values.est_duration_hours),
        preferred_time_of_day: values?.preferred_time_of_day?.id,
        traveller_types: values.traveller_types
          ? values.traveller_types.map((e) => {
              return { traveller_id: e.id };
            })
          : null,
        deal_onboarding_status: values?.deal_onboarding_status?.id,
        platform: values?.platform?.id,
        deal_active_date: values.deal_active_date,
        deal_end_date: values.deal_end_date,
        claim_start_date: values.claim_start_date,
        claim_end_date: values.claim_end_date,
        active: values.active,
        rating: values.rating,
        deal_descriptions: desc_deal,
        notes: values?.notes,
        deal_tags: values.deal_tags
          ? values.deal_tags.map((e) => {
              return { tag_id: e.id };
            })
          : null,
        deal_slots: DealSlots?.map((e) => {
          return {
            ...e,
            end_hour: +e.end_hour,
            end_minute: +e.end_minute,
            start_hour: +e.start_hour,
            start_minute: +e.start_minute,
          };
        }),
        inventory_prices: values.is_inventory_variable_pricing
          ? inventoryPricing?.map((e) => {
              return {
                ...e,
                inventory_max_count: +e.inventory_max_count,
                inventory_min_count: +e.inventory_min_count,
                inventory_sold: !dealId ? 0 : +e.inventory_sold,
                price: +e.price,
              };
            })
          : [],

        location_specific: locationSpecific?.map((e) => {
          let coordinates;
          if (e.coordinates) {
            coordinates = e.coordinates;
          } else {
            let list = areaList.find((area) => area.id === e.area_id);
            coordinates = list?.coordinates;
          }
          return {
            remove: e.remove,
            area_id: e.area_id,
            coordinates: coordinates,
            deal_id: e.deal_id,
            id: e.id,
          };
        }),
        deal_type_prices: values.is_type_variable_pricing
          ? typePricing?.map((e) => {
              return {
                ...e,
                type: e.type,
                price: +e.price,
                inventory_sold: +e.inventory_sold,
              };
            })
          : [],
        is_home_widget_deal: values.is_home_widget_deal,
        home_widget_priority: Boolean(values?.is_home_widget_deal)
          ? values.home_widget_priority
          : null,
        feature_widget_priority: values.feature_widget_priority
          ? values.feature_widget_priority
          : null,
      };
      if (dealId) {
        setBtnLoader(true);
        updateDeal({ ...payload, id: +dealId })
          .then((response) => {
            setBtnLoader(false);
            if (response.data.success) {
              dispatch(
                setSnackbarConfig({
                  isOpen: true,
                  message: 'Deals Updated successfully.',
                  varient: 'success',
                })
              );
              navigate(path.SINGLEDEALS);
            }
          })
          .catch((error) => {
            setBtnLoader(false);
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: error?.response?.data?.error?.message
                  ? error?.response?.data?.error?.message
                  : 'Something went wrong',
                varient: 'error',
              })
            );
          });
      } else {
        setBtnLoader(true);
        createDeals(payload)
          .then((response) => {
            setBtnLoader(false);
            if (response.data.success) {
              dispatch(
                setSnackbarConfig({
                  isOpen: true,
                  message: 'Deals create successfully.',
                  varient: 'success',
                })
              );
              navigate(path.SINGLEDEALS);
            }
          })
          .catch((error) => {
            setBtnLoader(false);
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: error?.response?.data?.error?.message
                  ? error?.response?.data?.error?.message
                  : 'Something went wrong',
                varient: 'error',
              })
            );
          });
      }
    },
  });

  useEffect(() => {
    const dropDown = [
      // 'inventory_prices',
      'deal_type_prices',
      'voucher_type',
      'template_type',
      'traveller_types',
      'deal_onboarding_status',
      'deal_type',
      'platform',
      'preferred_time_of_day',
      'slot_disabled_days',
      'primary_category_id',
      'secondary_category_ids',
      'currency',
      'merchant_id',
      // 'start_hour',
      // 'start_minute',
      'deal_tags',
      'location_specific',
    ];

    if (dealId || formik?.values?.cloneDeal?.id) {
      getDealById(+dealId || formik?.values?.cloneDeal?.id)
        .then((response) => {
          const result = response.data.data.deal;
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
            const imagesList: constants.types.fileType[] =
              result?.images_ar?.map((item: any) => {
                return {
                  ...item,
                  id: item.imageId,
                  type: 'image',
                };
              });
            setSelectedImagesAr(imagesList);
          }

          if (result?.videos_ar?.length > 0) {
            const imagesList: constants.types.fileType[] =
              result?.videos_ar.map((item: any) => {
                return {
                  ...item,
                  id: item.videoId,
                  type: 'video',
                };
              });
            setSelectedVideosAr(imagesList);
          }
          setDealData(result);
          setIsBulkAllocationDone(result?.isBulkAllocationDone);
          setIsVariablePricing(result?.is_inventory_variable_pricing);
          setIsDealPricingDone(result?.isDealPricingDone);
          Object.keys(result)?.map((item) => {
            if (item === 'dealtranslations') {
              formik.setFieldValue('translations', result[item]);
            } else if (
              item === 'image_ids' ||
              item === 'video_ids' ||
              item === 'image_ids_ar' ||
              item === 'video_ids_ar'
            ) {
              formik.setFieldValue(item, result[item]);
            } else if (
              item === 'platform' ||
              item === 'preferred_time_of_day' ||
              item === 'currency' ||
              item === 'merchant_id' ||
              item === 'template_type' ||
              item === 'deal_onboarding_status' ||
              item === 'voucher_type'
            ) {
              formik.setFieldValue(item, {
                label: result[item],
                id: result[item],
              });
            } else if (item === 'slot_disabled_days') {
              if (!result[item]) return;
              formik.setFieldValue(
                item,
                result[item].split(',').map((e) => {
                  return {
                    label: e,
                    id: e,
                  };
                })
              );
            } else if (item === 'location_specific') {
              if (result[item]?.length > 0)
                formik.setFieldValue(item, result[item]);
              else {
                formik.setFieldValue(item, [
                  {
                    area_id: '',
                    coordinates: '',
                  },
                ]);
              }
            } else if (item === 'dealTypePrices') {
              const output = result[item]?.map((item: any) => {
                return {
                  ...item,
                  inventory_sold: !dealId ? 0 : item.inventory_sold,
                  price: item.price,
                  type: item.type,
                  translations: item?.dealtypetranslation?.map(
                    (translation: any) => {
                      return {
                        locale: translation.locale,
                        column_name: translation.column_name,
                        text: translation.text,
                      };
                    }
                  ),
                };
              });
              formik.setFieldValue('deal_type_prices', output);
            } else if (!dropDown.includes(item)) {
              formik.setFieldValue(item, result[item]);
            }
          });
          if (!dealId) {
            formik?.setFieldValue('internal_voucher_sold', 0);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getAreaList();
    if (!dealId) {
      getDeal();
    }
  }, [formik?.values?.cloneDeal?.id]);

  const getAreaList = () => {
    getAllArea()
      .then((res) => {
        setAreaList(res.data.data.allAreas);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!formik.isSubmitting) return;
    if (Object.keys(formik.errors).length > 0) {
      const firstError = document.querySelector('.Mui-error');
      console.log(firstError, 'firstError', Object.keys(formik.errors));

      if (firstError) {
        const offset = -150; // Adjust this value based on your preference
        const scrollToY =
          firstError.getBoundingClientRect().top + window.scrollY + offset;

        window.scrollTo({ top: scrollToY, behavior: 'smooth' });
      }
    }
  }, [formik]);

  // Clone Deal
  const getDeal = () => {
    getCloneDeals()
      .then((res) => {
        const deals = res.data.data.deals;
        setCloneDealList(deals);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  //voucher type disabled
  useEffect(() => {
    if (formik.values?.template_type?.id === 'MERCHANT') {
      formik?.setFieldValue('voucher_type', {
        label: 'External',
        id: 'EXTERNAL',
      });
    }
  }, [formik?.values.template_type]);

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={path.SINGLEDEALS}>
          Single Deal
        </Link>
        <Typography color="text.primary">
          {dealId ? 'Update Deal' : 'Add Deal'}
        </Typography>
      </Breadcrumbs>

      <MainCard>
        <Box>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              {dealId && (
                <Button
                  variant="outlined"
                  color="secondary"
                  type="reset"
                  sx={{ mr: 1 }}
                  href={`${WEBSITEHOST}/ae-en/s/${dealData?.slug}/${dealData?.id}`}
                  target="_blank"
                  // disabled={dealData?.isPartOfCombo == true ? true : false}
                >
                  Go to Singe deal page
                </Button>
              )}
              {!dealId && (
                <Grid container spacing={3.5}>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>Clone Deal</InputLabel>
                      <MagicDropDown
                        name="cloneDeal"
                        option={cloneDealList}
                        formik={formik}
                        placeholder="Select Deal"
                      />
                    </Stack>
                  </Grid>
                </Grid>
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
              <CardHeader title="Pricing Details" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <PricingDetails formik={formik} />
              </Box>
              <CardHeader title="Step Pricing" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <VariablePricing
                  isDealPricingDone={isDealPricingDone}
                  isBulkAllocationDone={isBulkAllocationDone}
                  formik={formik}
                  removeInventoryPrices={removeInventoryPrices}
                  setRemoveInventoryPrices={setRemoveInventoryPrices}
                  removeTypePricing={removeTypePricing}
                  setRemoveTypePricing={setRemoveTypePricing}
                  permission={permission}
                />
              </Box>
              {dealId ? (
                <>
                  <CardHeader title="Media Assets" />
                  <Divider />
                  <Box sx={{ p: 2.5 }}>
                    <MediaAssets
                      id={dealId}
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
              ) : null}
              <CardHeader title="Scheduling " />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <SchedulingAndLocation
                  isBulkAllocationDone={isBulkAllocationDone}
                  formik={formik}
                  removeDealSlots={removeDealSlots}
                  setRemoveDealSlots={setRemoveDealSlots}
                  permission={permission}
                />
              </Box>
              <CardHeader title="Location" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <Location
                  formik={formik}
                  areaList={areaList}
                  removeLocationSpecific={removeLocationSpecific}
                  setRemoveLocationSpecific={setRemoveLocationSpecific}
                  permission={permission}
                />
              </Box>
              <CardHeader title="Category & Vendor" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <CategoryAndVendor formik={formik} dealData={dealData} />
              </Box>
              <CardHeader title="Voucher Configuration" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <VoucherConfiguration formik={formik} dealData={dealData} />
              </Box>
              <CardHeader title="Promotion & Visibility" />
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
                <AudienceRecommendation formik={formik} dealData={dealData} />
              </Box>
              <CardHeader title="Administrative Data" />
              <Divider />
              <Box sx={{ p: 2.5 }}>
                <AdministrativeData formik={formik} dealData={dealData} />
              </Box>
              <Box sx={{ p: 2.5, textAlign: 'right' }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  type="reset"
                  sx={{ mr: 1 }}
                  onClick={() => navigate(path.SINGLEDEALS)}
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
                      <>{dealId ? 'Update' : 'Add'}</>
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
