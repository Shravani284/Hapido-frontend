import {
  Breadcrumbs,
  Button,
  Stack,
  Grid,
  Typography,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { path } from '../../routes/Routers';
import MainCard from '../MainCard';
import {
  CustomSwitchButton,
  FileUpload,
  FileUploadAr,
  GroupDropDown,
  MagicDateAndTimePicker,
  MagicDropDown,
  NormalTextField,
  constants,
} from 'berlin-common';
import { Form, FormikProvider, useFormik } from 'formik';
import { FlashDiscountI, initialValues, validationSchema } from './Validation';
import {
  DealType,
  dealTypeMobile,
  FlashScope,
  PlatformType,
} from '../../data/data';
import {
  addFlashDiscount,
  getFlashDiscountById,
  updateFlashDiscount,
} from '../../services/flashDiscountService';
import useConfig from '../../hooks/useConfig';
import { useDispatch } from 'react-redux';
import { TranslationType } from '../category/constants/types';
import { setMultiDropDownValue } from '../../utils/dropDown';
import { setSnackbarConfig } from '../../store/slice/Loader';
import Permission from '../../components/Permission';
import {
  allDealListDD,
  allExcludeCombinedDeals,
  allExcludeComboList,
  getCategoriesSubCategories,
} from '../../services/dropDownService';
import moment from 'moment';
import usePermission from '../../components/Permission/usePermission';
import { getSigneid } from '../../utils/getIds';
import { FormHelperText } from '@mui/material';

const FlashDiscountForm = () => {
  const { permission } = usePermission('FLASH_SALE');
  const [categoryList, setCategoryList] = useState([]);
  const [allDealsID, setAllDealsID] = useState([]);
  const [dealsExclude, setDealsExclude] = useState([]);
  const [categoryDealsExclude, setCategoryDealsExclude] = useState([]);
  const [discountData, setDiscountData] = useState<any>();
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
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n } = useConfig();
  const [dealExcludeList, setDealExcludeList] = useState([]);
  const [dealExcludeCombo, setDealExcludeCombo] = useState([]);
  const [resData, setResData] = useState();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: async (value: FlashDiscountI) => {
      const response = value;

      const payLoad = {
        translations: response.translations,
        discount_percent: parseInt(response.discount_percent),
        flash_scope: response.flash_scope?.id,
        category_ids: response.category_ids.map((e: any) => e.id).join(','),
        deal_type: response.deal_type?.id || '',
        deal_ids: response.deal_ids.map((e: any) => e.id).join(','),
        exclude_deal_ids: response.exclude_deal_ids
          .map((e: any) => e.id)
          .join(','),
        exclude_combo_ids: response.exclude_combo_ids
          .map((e: any) => e.id)
          .join(','),
        exclude_category_ids: response.exclude_category_ids
          .map((e: any) => e.id)
          .join(','),
        image_id: getSigneid(selectedImages),
        video_id: getSigneid(selectedVideos),
        image_id_ar: getSigneid(selectedImagesAr),
        video_id_ar: getSigneid(selectedVideosAr),
        fs_active_date: response.fs_active_date,
        fs_end_date: response.fs_end_date,
        platform: response.platform.id,
        active: response.active,
      };
      setBtnLoader(true);

      id
        ? updateFlashDiscount({ ...payLoad, id: parseInt(id) })
            .then((response) => {
              if (response.data.success === true) {
                setBtnLoader(false);
                dispatch(
                  setSnackbarConfig({
                    isOpen: true,
                    message: 'Flash Discount updated successfully',
                    varient: 'success',
                  })
                );
                navigate(path.FLASHDISCOUNT);
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
            })
        : addFlashDiscount(payLoad)
            .then((response) => {
              if (response.data.success === true) {
                setBtnLoader(false);

                dispatch(
                  setSnackbarConfig({
                    isOpen: true,
                    message: 'Flash Discount created successfully',
                    varient: 'success',
                  })
                );
                navigate(path.FLASHDISCOUNT);
              }
            })
            .catch((error) => {
              console.log('error', error);
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
    },
  });

  const enTitle = formik.values.translations.findIndex(
    (e: any) => e.column_name === 'title_trans_ids' && e.locale === 'en'
  );
  const arTitle = formik.values.translations.findIndex(
    (e: any) => e.column_name === 'title_trans_ids' && e.locale === 'ar'
  );
  const enTag = formik.values.translations.findIndex(
    (e: any) => e.column_name === 'tagline_trans_ids' && e.locale === 'en'
  );
  const arTag = formik.values.translations.findIndex(
    (e: any) => e.column_name === 'tagline_trans_ids' && e.locale === 'ar'
  );

  const getCategoryList = () => {
    formik.setFieldValue('category_ids', []);
    formik.setFieldValue('exclude_category_ids', []);

    getCategoriesSubCategories()
      .then((response) => {
        setCategoryList(response);
        if (discountData) {
          setMultiDropDownValue(
            response,
            discountData?.category_ids?.split(','),
            'category_ids',
            formik
          );
          setMultiDropDownValue(
            response,
            discountData.exclude_category_ids?.split(','),
            'exclude_category_ids',
            formik
          );
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (id) {
      if (discountData) {
        getCategoryList();
      }
    } else {
      getCategoryList();
    }
  }, [discountData]);

  const dealTypeData = (item: any) => {
    const obj = { ...item };
    if (item.translations.length > 0) {
      const title_en = item.translations.find(
        (ele: TranslationType) =>
          ele.locale === 'en' && ele.column_name === 'title_trans_ids'
      );
      // const title_ar = item.translations.find(
      //   (ele: TranslationType) =>
      //     ele.locale === 'ar' && ele.column_name === 'title_trans_ids'
      // );

      obj.label = `${title_en?.text ?? ''}`;
    }
    return {
      id: item.id,
      label: obj.label,
    };
  };

  const getDeals = (formikData: any) => {
    const dealType = formikData.deal_type?.id;
    formik.setFieldValue('deal_ids', []);
    formik.setFieldValue('exclude_deal_ids', []);

    if (dealType) {
      // setLoading(true);
      allDealListDD(dealType)
        .then((response) => {
          const allDeal = response?.data?.allDeals;

          setAllDealsID(allDeal);
          //   setLoading(false);
          if (discountData) {
            setMultiDropDownValue(
              allDeal,
              discountData?.deal_ids?.split(','),
              'deal_ids',
              formik
            );
          }
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  };

  useEffect(() => {
    getDeals(formik.values);
  }, [formik.values.deal_type?.id]);

  const getExcludeDeals = (ExcludeDealsData: any) => {
    const dealID = ExcludeDealsData?.deal_ids;
    // if (dealID) {
    const exclude_dealID = allDealsID?.filter((elem: any) => {
      return dealID.every((ele: any) => {
        return !(ele.id === elem.id) && !(ele.label === elem.label);
      });
    });

    setDealsExclude(exclude_dealID);
    if (discountData) {
      setMultiDropDownValue(
        exclude_dealID,
        discountData.exclude_deal_ids.split(','),
        'exclude_deal_ids',
        formik
      );
    }
  };

  const getFlashDiscountsByIds = () => {
    const dropdown = [
      'flash_scope',
      'category_ids',
      'deal_type',
      'deal_ids',
      'exclude_deal_ids',
      'exclude_combo_ids',
      'platform',
      'exclude_category_ids',
    ];
    getFlashDiscountById(id)
      .then((response) => {
        const result = response.data.data.getFlashDiscounts;
        setDiscountData(result);
        const key = Object.keys(result);
        key.forEach((name) => {
          if (
            name === 'image_id' ||
            name === 'video_id' ||
            name === 'image_id_ar' ||
            name === 'video_id_ar'
          ) {
            formik.setFieldValue(name, result[name]);
          } else if (!dropdown.includes(name)) {
            formik.setFieldValue(name, result[name]);
          } else if (
            name === 'flash_scope' ||
            name === 'deal_type' ||
            name === 'platform'
          ) {
            formik.setFieldValue(name, {
              label: result[name],
              id: result[name],
            });
          }
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    if (id) {
      getFlashDiscountsByIds();
    }
  }, []);

  useEffect(() => {
    formik.setFieldValue('exclude_deal_ids', []);
    // getExcludeDeals(formik.values);
  }, [formik.values.deal_ids]);

  useEffect(() => {
    if (formik.values.deal_type?.id === 'BUNDLE') {
      getExcludeDeals(formik.values);
    }
  }, [formik.values.deal_ids]);

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

  const getExcludeDealList = (data?: any) => {
    const categoryID = formik?.values?.category_ids
      .map((i: any) => {
        return i.id;
      })
      .join(',');
    allExcludeCombinedDeals(categoryID)
      .then((res) => {
        if (res?.success == true) {
          const dealExcludeList = res.data?.deals.map((e: any) => {
            return {
              label: e.label,
              id: e.id,
            };
          });
          setDealExcludeList(dealExcludeList);
          if (discountData) {
            setMultiDropDownValue(
              dealExcludeList,
              discountData?.exclude_deal_ids?.split(','),
              'exclude_deal_ids',
              formik
            );
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getExcludeComboList = (data?: any) => {
    const categoryID = formik?.values?.category_ids
      .map((i: any) => {
        return i.id;
      })
      .join(',');
    allExcludeComboList(categoryID)
      .then((res) => {
        const dealExcludeCombo = res.data.allDeals.map((item: any) => {
          return {
            label: item.label,
            id: item.id,
          };
        });
        setDealExcludeCombo(dealExcludeCombo);
        if (discountData) {
          setMultiDropDownValue(
            dealExcludeCombo,
            discountData?.exclude_combo_ids?.split(','),
            'exclude_combo_ids',
            formik
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!id) {
      formik.setFieldValue('deal_type', null);
    }

    if (formik?.values?.flash_scope?.id === 'SUBCATEGORY') {
      getExcludeDealList();
      getExcludeComboList();
    }
  }, [formik.values.flash_scope, formik.values.category_ids, id]);

  const handleCancel = () => {
    navigate(path.FLASHDISCOUNT);
  };
  useEffect(() => {
    if (id && discountData) {
      if (discountData?.images?.length > 0) {
        const imagesList: constants.types.fileType[] =
          discountData?.images?.map((item: any) => {
            return {
              ...item,
              id: item.imageId,
              url: item.extfilepath,
              type: 'image',
            };
          });
        setSelectedImages(imagesList);
      }

      if (discountData?.videos?.length > 0) {
        const videoList: constants.types.fileType[] = discountData?.videos.map(
          (item: any) => {
            return {
              ...item,
              id: item.videoId,
              url: item.extfilepath,
              type: 'video',
            };
          }
        );
        setSelectedVideos(videoList);
      }
      if (discountData?.images_ar?.length > 0) {
        const imagesList: constants.types.fileType[] =
          discountData?.images_ar?.map((item: any) => {
            return {
              ...item,
              id: item.imageId,
              url: item.extfilepath,
              type: 'image',
            };
          });
        setSelectedImagesAr(imagesList);
      }

      if (discountData?.videos_ar?.length > 0) {
        const videoList: constants.types.fileType[] =
          discountData?.videos_ar.map((item: any) => {
            return {
              ...item,
              id: item.videoId,
              url: item.extfilepath,
              type: 'video',
            };
          });
        setSelectedVideosAr(videoList);
      }
    }
  }, [discountData]);

  return (
    <>
      <div>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" to={path.FLASHDISCOUNT}>
            Simple Discount List
          </Link>
          {id ? (
            <Typography color="text.primary">Update Simple Discount</Typography>
          ) : (
            <Typography color="text.primary">Add Simple Discount</Typography>
          )}
        </Breadcrumbs>

        <MainCard>
          <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3.5}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>
                      Title(English)<span className="asterisk">*</span>
                    </InputLabel>
                    <NormalTextField
                      name={`translations[${enTitle}].text`}
                      placeholder="Enter Tagline (English)"
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>
                      Title(Arabic)<span className="asterisk">*</span>
                    </InputLabel>
                    <NormalTextField
                      name={`translations[${arTitle}].text`}
                      placeholder="Enter Tagline (Arabic)"
                      multiline={false}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>
                      Tagline(English)<span className="asterisk">*</span>
                    </InputLabel>
                    <NormalTextField
                      name={`translations[${enTag}].text`}
                      placeholder="Enter Tagline"
                      multiline={false}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>
                      Tagline(Arabic)<span className="asterisk">*</span>
                    </InputLabel>
                    <NormalTextField
                      name={`translations[${arTag}].text`}
                      placeholder="Enter Tagline (Arabic)"
                      multiline={false}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>
                      Discount Percent<span className="asterisk">*</span>
                    </InputLabel>
                    <NormalTextField
                      name="discount_percent"
                      placeholder="Enter Discount Percent"
                      multiline={false}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>
                      Flash Scope<span className="asterisk">*</span>
                    </InputLabel>
                    <MagicDropDown
                      multiple={false}
                      name="flash_scope"
                      option={FlashScope}
                      label="Select Flash Scope"
                      formik={formik}
                      placeholder="Select Platform"
                    />
                  </Stack>
                </Grid>

                {formik.values?.flash_scope?.id &&
                formik.values?.flash_scope?.id != 'ALL' ? (
                  <>
                    {formik.values?.flash_scope?.id !== 'DEAL' && (
                      <>
                        <Grid item xs={12} sm={6}>
                          <Stack spacing={1}>
                            <InputLabel>
                              Categories<span className="asterisk">*</span>
                            </InputLabel>
                            <GroupDropDown
                              name="category_ids"
                              option={categoryList}
                              label="Categories"
                              formik={formik}
                              placeholder="Select Categories"
                              multiple
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Stack spacing={1}>
                            <InputLabel>Exclude Deals</InputLabel>
                            <MagicDropDown
                              name="exclude_deal_ids"
                              option={dealExcludeList}
                              label="Exclude Deal"
                              formik={formik}
                              placeholder="Select Deals to be excluded"
                              multiple
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Stack spacing={1}>
                            <InputLabel>Exclude Combo Deals</InputLabel>
                            <MagicDropDown
                              name="exclude_combo_ids"
                              option={dealExcludeCombo}
                              label="Exclude Combo Deal"
                              formik={formik}
                              placeholder="Select Combo Deals to be excluded"
                              multiple
                            />
                          </Stack>
                        </Grid>
                      </>
                    )}
                    {formik.values?.flash_scope?.id !== 'SUBCATEGORY' && (
                      <>
                        <Grid item xs={12} sm={6}>
                          <Stack spacing={1}>
                            <InputLabel>
                              Deal Type<span className="asterisk">*</span>
                            </InputLabel>
                            <MagicDropDown
                              name="deal_type"
                              option={dealTypeMobile}
                              label="Deal Type"
                              formik={formik}
                              placeholder="Select Deal Type"
                              multiple={false}
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Stack spacing={1}>
                            <InputLabel>
                              Deals<span className="asterisk">*</span>
                            </InputLabel>
                            <MagicDropDown
                              name="deal_ids"
                              option={allDealsID}
                              label="Deal Ids"
                              formik={formik}
                              placeholder="Select Deals"
                              multiple
                            />
                          </Stack>
                        </Grid>

                        {/* {formik.values?.deal_type?.id === 'BUNDLE' && (
                          <Grid item xs={12} sm={6}>
                            <Stack spacing={1}>
                              <InputLabel>
                                Exclude Deals
                                <span className="asterisk">*</span>
                              </InputLabel>
                              <MagicDropDown
                                name="exclude_deal_ids"
                                option={dealsExclude || []}
                                label="Exclude Deal"
                                formik={formik}
                                placeholder="Select Deals to be excluded"
                                multiple
                              />
                            </Stack>
                          </Grid>
                        )} */}
                      </>
                    )}
                  </>
                ) : (
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>Exclude Categories</InputLabel>
                      <GroupDropDown
                        name="exclude_category_ids"
                        option={categoryList}
                        label="Enter Category"
                        formik={formik}
                        placeholder="Select Category"
                        multiple={true}
                      />
                    </Stack>
                  </Grid>
                )}
                {id && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel>Upload Image (Single)</InputLabel>
                        <FormHelperText id="standard-weight-helper-text-email-login">
                          {
                            'Note: Image resolution 350x350,Max Size - 10 MB Per File'
                          }
                        </FormHelperText>
                        <FileUpload
                          disabled={
                            permission === 'WRITE' || permission === 'FULL'
                              ? false
                              : true
                          }
                          name={'image_id'}
                          tableName={{ name: 'flash_app_discount', id: id }}
                          onSelect={(data: constants.types.fileType[]) => {
                            setSelectedImages(data);
                          }}
                          multiSelect={false}
                          files={selectedImages}
                          type={'image'}
                          accept="image/*"
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel>Upload Image (Arabic) (Single)</InputLabel>
                        <FormHelperText id="standard-weight-helper-text-email-login">
                          {
                            'Note: Image resolution 350x350,Max Size - 10 MB Per File'
                          }
                        </FormHelperText>
                        <FileUploadAr
                          disabled={
                            permission === 'WRITE' || permission === 'FULL'
                              ? false
                              : true
                          }
                          name={'image_id_ar'}
                          tableName={{ name: 'flash_app_discount', id: id }}
                          onSelect={(data: constants.types.fileType[]) => {
                            setSelectedImagesAr(data);
                          }}
                          multiSelect={false}
                          files={selectedImagesAr}
                          type={'image'}
                          accept="image/*"
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel>Upload Video (Single)</InputLabel>
                        <FormHelperText id="standard-weight-helper-text-email-login">
                          {
                            'Note: Video resolution 1637x828, Max Size - 200 MB Per File'
                          }
                        </FormHelperText>
                        <FileUpload
                          disabled={
                            permission === 'WRITE' || permission === 'FULL'
                              ? false
                              : true
                          }
                          type={'video'}
                          accept={'video/*'}
                          name={'video_id'}
                          tableName={{ name: 'flash_app_discount', id: id }}
                          onSelect={(data: constants.types.fileType[]) => {
                            setSelectedVideos(data);
                          }}
                          multiSelect={false}
                          files={selectedVideos}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel>Upload Video (Arabic) (Single)</InputLabel>
                        <FormHelperText id="standard-weight-helper-text-email-login">
                          {
                            'Note: Video resolution 1637x828, Max Size - 200 MB Per File'
                          }
                        </FormHelperText>
                        <FileUploadAr
                          disabled={
                            permission === 'WRITE' || permission === 'FULL'
                              ? false
                              : true
                          }
                          type={'video'}
                          accept={'video/*'}
                          name={'video_id_ar'}
                          tableName={{ name: 'flash_app_discount', id: id }}
                          onSelect={(data: constants.types.fileType[]) => {
                            setSelectedVideosAr(data);
                          }}
                          multiSelect={false}
                          files={selectedVideosAr}
                        />
                      </Stack>
                    </Grid>
                  </>
                )}

                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>
                      Flash Sale Active Date & Time
                      <span className="asterisk">*</span>
                    </InputLabel>
                    <MagicDateAndTimePicker
                      name="fs_active_date"
                      formik={formik}
                      disablePast
                      placeholder=" Flash Sale Active Date"
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>
                      Flash Sale End Date & Time
                      <span className="asterisk">*</span>
                    </InputLabel>
                    <MagicDateAndTimePicker
                      name="fs_end_date"
                      formik={formik}
                      disablePast
                      placeholder="Flash Sale End Date"
                      minDate={moment(formik.values.fs_active_date)}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>
                      Platform<span className="asterisk">*</span>
                    </InputLabel>
                    <MagicDropDown
                      multiple={false}
                      name="platform"
                      option={PlatformType}
                      label="Select Platform"
                      formik={formik}
                      placeholder="Select Platform"
                    />
                  </Stack>
                </Grid>

                {/* Active */}
                <Grid item xs={12} sm={3}>
                  <InputLabel>Active</InputLabel>
                  <CustomSwitchButton
                    name={'active'}
                    formik={formik}
                    label=""
                  />
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
                          <>{id ? 'Update' : 'Add'}</>
                        )}
                      </Button>
                    )}

                    {/* </Permission> */}
                  </Stack>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </MainCard>
      </div>
    </>
  );
};

export default FlashDiscountForm;
