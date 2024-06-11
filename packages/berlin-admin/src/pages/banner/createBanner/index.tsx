import React, { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

// third-party
import { FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';
import useConfig from '../../../hooks/useConfig';

// material-ui
import {
  Button,
  Divider,
  Grid,
  InputLabel,
  Stack,
  Typography,
} from '@mui/material';

// project imports
import {
  CustomSwitchButton,
  FileUpload,
  FileUploadAr,
  GroupDropDown,
  MagicDateAndTimePicker,
  MagicDatePicker,
  MagicDropDown,
  NormalTextField,
  constants,
} from 'berlin-common';
import {
  bannerType,
  bannerModule,
  PlatformType,
  targetModule,
  DealType,
} from '../../../data/data';
import MainCard from '../../MainCard';
import {
  createBanner,
  getByIdBanner,
  updateBannerList,
} from '../../../services/bannerService';
import { path } from '../../../routes/Routers';
import { useDispatch } from 'react-redux';
import { setSnackbarConfig } from '../../../store/slice/Loader';
import { Breadcrumbs } from '@mui/material';
import { REGEX } from 'berlin-common/src/constants';
import { CircularProgress } from '@mui/material';
import {
  getAllCities,
  bannerPlacementID,
  getCategoriesSubCategories,
  tagDropDown,
  allDealListDD,
} from '../../../services/dropDownService';
import moment from 'moment';
import usePermission from '../../../components/Permission/usePermission';
import { getSigneid } from '../../../utils/getIds';
import { FormHelperText } from '@mui/material';
import { setMultiDropDownValue } from '../../../utils/dropDown';

const CreateBanner = () => {
  const { permission } = usePermission('BANNER');
  const [cityList, setCityList] = useState<any>([]);
  const [placementList, setPlacementList] = useState<any>([]);
  const [categoryList, setCategoryList] = useState<any>([]);
  const [tagList, setTagList] = useState<any>([]);
  const [bannerData, setBannerData] = useState<any>([]);
  const [dealNames, setDealNames] = useState<any>([]);
  const [btnLoader, setBtnLoader] = useState(false);

  const [selectedImages, setSelectedImages] = useState<
    constants.types.fileType[]
  >([]);
  const [selectedImagesAr, setSelectedImagesAr] = useState<
    constants.types.fileType[]
  >([]);
  const [selectedVideos, setSelectedVideos] = useState<
    constants.types.fileType[]
  >([]);
  const [selectedVideosAr, setSelectedVideosAr] = useState<
    constants.types.fileType[]
  >([]);
  // const [active, setActive] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { i18n } = useConfig();
  // const sortRegExp = /^\\*[0-9]?$/;

  // Banner validations
  const validationSchema = yup.object({
    campaign_name: yup.string().required('Campaign name is required'),
    campaign_name_ar: yup.string().required('Campaign name arabic is required'),
    banner_type: yup
      .object()
      .shape({ label: yup.string().required('Banner type is required') })
      .required('Banner type is required'),
    banner_module: yup.object().required('Banner module is required'),
    banner_placement_id: yup.object().required('Banner placement is required'),
    target_module: yup.object().required('Target module is required'),
    target_deal_type: yup.object().when('target_module', {
      is: (val: any) => val?.id == 'DEAL',
      then: (schema) => schema.required('Deal Type is required'),
      otherwise: (schema) => schema.nullable(),
    }),
    target_deal_id: yup.object().when('target_module', {
      is: (val: any) => val?.id == 'DEAL',
      then: (schema) => schema.required('Target deal is required'),
      otherwise: (schema) => schema.nullable(),
    }),
    targetcategory: yup.object().when('target_module', {
      is: (val: any) => val?.id == 'CATEGORY-SUBCAT',
      then: (schema) => schema.required('Target category is required'),
      otherwise: (schema) => schema.nullable(),
    }),
    target_tag_id: yup.object().when('target_module', {
      is: (val: any) => val?.id == 'TAG',
      then: (schema) => schema.required('Target tag is required'),
      otherwise: (schema) => schema.nullable(),
    }),
    search_term: yup.string().when('target_module', {
      is: (val: any) => val?.id == 'SEARCH',
      then: (schema) => schema.required('Search Term required'),
      otherwise: (schema) => schema.nullable(),
    }),
    // required('Search term is required'),
    // banner_info: yup.string().required('Banner info is required'),
    // image_id: yup.string().required('Image ids is required'),
    link_url: yup.string().url('Link URL'),
    cities: yup
      .array()
      .min(1, 'City must have at least 1 items')
      .required('City is required'),
    banner_active_date: yup.string().required('Banner active date is required'),
    banner_expiry_date: yup.string().required('Banner expiry date is required'),
    // platform: yup.string().required(''),
    sort: yup
      .string()
      .matches(REGEX.PRIORITY, 'Sort is not valid')
      .required('Sort is required'),
    // active: yup.object().required('Select an option'),
  });

  const formik = useFormik({
    initialValues: {
      campaign_name: '',
      campaign_name_ar: '',
      banner_type: null,
      banner_module: { label: 'HOME', id: 'HOME' },
      banner_placement_id: null,
      target_module: null,
      target_deal_type: null,
      target_deal_id: null,
      targetcategory: null,
      target_tag_id: null,
      search_term: '',
      banner_info: '',
      image_id: null,
      video_id: null,
      image_id_ar: null,
      video_id_ar: null,
      link_url: '',
      cities: [],
      banner_active_date: '',
      banner_expiry_date: '',
      platform: null,
      sort: '',
      active: true,
    },
    validationSchema,
    onSubmit: async (value: any) => {
      const response = value;
      const payLoad = {
        campaign_name: response?.campaign_name,
        campaign_name_ar: response?.campaign_name_ar,
        banner_type: response?.banner_type?.label,
        banner_module: response?.banner_module?.label,
        banner_placement_id: parseInt(response?.banner_placement_id?.id),
        target_module: response?.target_module?.id,
        target_deal_type:
          formik?.values?.target_module?.id === 'DEAL'
            ? response?.target_deal_type?.id
            : null,
        target_deal_id:
          formik?.values?.target_module?.id === 'DEAL'
            ? parseInt(response?.target_deal_id?.id)
            : null,
        targetcategory:
          formik?.values?.target_module?.id === 'CATEGORY-SUBCAT'
            ? parseInt(response?.targetcategory?.id)
            : null,
        target_tag_id:
          formik?.values?.target_module?.id === 'TAG'
            ? parseInt(response?.target_tag_id?.id)
            : null,
        search_term:
          formik?.values?.target_module?.id === 'SEARCH'
            ? response?.search_term
            : null,
        banner_info: response?.banner_info,
        // image_id: response?.image_id,
        // video_id: response?.video_id,
        image_id: getSigneid(selectedImages, 'img'),
        video_id: getSigneid(selectedVideos, 'vid'),
        image_id_ar: getSigneid(selectedImagesAr, 'img'),
        video_id_ar: getSigneid(selectedVideosAr, 'vid'),
        link_url: response?.link_url,
        cities: response?.cities
          ? response.cities.map((e) => {
              return { id: e.id };
            })
          : null,
        banner_active_date: response?.banner_active_date,
        banner_expiry_date: response?.banner_expiry_date,
        platform: response?.platform?.id,
        sort: parseInt(response?.sort),
        active: response?.active,
      };
      if (id) {
        setBtnLoader(true);
        updateBannerList({ ...payLoad, id: parseInt(id) })
          .then((response) => {
            setBtnLoader(false);
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Banner updated successfully',
                varient: 'success',
              })
            );
            navigate(path.BANNERLIST);
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
        createBanner(payLoad)
          .then((response) => {
            setBtnLoader(false);
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Banner created successfully',
                varient: 'success',
              })
            );
            navigate(path.BANNERLIST);
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

  const setDropDownValues = (
    res: any[],
    data: any,
    name: string,
    formik: any,
    key: string = ''
  ) => {
    formik.setFieldValue(
      name,
      res?.find((obj: any) => {
        return obj.id === data[key ? key : name];
      })
    );
  };

  //api for city names
  const getAllCity = (data: any) => {
    getAllCities()
      .then((res) => {
        if (res.success) {
          setCityList(res.data.allCities);
        }
        if (data) {
          setMultiDropDownValue(
            res.data.allCities,
            data.bannerCities.map((e: any) => e.city_id),
            'cities',
            formik
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //api for placement ids
  const getAllPlacementId = (data: any) => {
    bannerPlacementID()
      .then((response) => {
        const banners = response.data.data?.map((item: any) => {
          return {
            id: item.id,
            label: item.label,
          };
        });
        setPlacementList(banners);
        if (data) {
          setDropDownValues(banners, data, 'banner_placement_id', formik);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDealIds = (data?: any) => {
    if (formik.values?.target_deal_type?.id) {
      allDealListDD(formik.values?.target_deal_type?.id)
        .then((res) => {
          if (res?.success == true) {
            setDealNames(res?.data?.allDeals);
            if (res) {
              const result =
                res?.data?.allDeals.find(
                  (e) => bannerData?.target_deal_id == e.id
                ) || null;
              formik.setFieldValue('target_deal_id', result);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //api for category list
  const getCategoryList = (data: any) => {
    getCategoriesSubCategories() // const data = response.data.data.users.map((item: any) => {
      .then((response) => {
        setCategoryList(response);
        if (data) {
          const result =
            response?.find((e) => data?.targetcategory?.id == e.id) || null;
          formik.setFieldValue('targetcategory', result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllTags = (data: any) => {
    tagDropDown()
      .then((res) => {
        if (res?.success) {
          const allTagList = res?.data?.allTags;
          setTagList(allTagList);
          if (data) {
            setDropDownValues(allTagList, data, 'target_tag_id', formik);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //get data in input fields for updating
  const getSingleBanner = () => {
    getByIdBanner(id)
      .then((response) => {
        const data = response.data.data.getBanner;
        if (data?.images?.length > 0) {
          const imagesList: constants.types.fileType[] = data?.images?.map(
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

        if (data?.videos?.length > 0) {
          const imagesList: constants.types.fileType[] = data?.videos_ar?.map(
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
        if (data?.images?.length > 0) {
          const imagesList: constants.types.fileType[] = data?.images_ar?.map(
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

        if (data?.videos?.length > 0) {
          const imagesList: constants.types.fileType[] = data?.videos?.map(
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
        formik.setFieldValue('campaign_name', data.campaign_name);
        formik.setFieldValue('campaign_name_ar', data.campaign_name_ar);
        formik.setFieldValue('target_deal_type', {
          label: data.target_deal_type,
          id: data.target_deal_type,
        });
        formik.setFieldValue('banner_type', {
          label: data.banner_type,
          id: data.banner_type,
        });
        formik.setFieldValue('banner_module', {
          label: data.banner_module,
          id: data.banner_module,
        });
        formik.setFieldValue('platform', {
          label: data.platform,
          id: data.platform,
        });
        formik.setFieldValue('target_module', {
          label: data.target_module,
          id: data.target_module,
        });
        formik.setFieldValue('search_term', data.search_term);
        formik.setFieldValue('banner_info', data.banner_info);
        // formik.setFieldValue('image_id', data.image_id);
        // formik.setFieldValue('video_id', data.video_id);
        formik.setFieldValue('link_url', data.link_url);

        formik.setFieldValue('banner_active_date', data.banner_active_date);
        formik.setFieldValue('banner_expiry_date', data.banner_expiry_date);
        formik.setFieldValue('sort', data.sort);
        formik.setFieldValue('active', data.active);
        getAllDropDown(data);
        setBannerData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //get data in input fields for drop down
  const getAllDropDown = (data: any) => {
    getAllCity(data);
    getAllPlacementId(data);
    getCategoryList(data);
    getDealIds(data);
    getAllTags(data);
  };

  //condition for getting data to update and and getting data to create banner
  useEffect(() => {
    if (id) {
      getSingleBanner();
    } else {
      getAllDropDown('');
    }
  }, []);

  useEffect(() => {
    getDealIds();
  }, [formik.values?.target_deal_type?.id]);

  //navigation for cancel button
  const handleCancel = () => {
    navigate(path.BANNERLIST);
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

  const note = useMemo(() => {
    switch (formik?.values?.banner_type?.label) {
      case 'HORIZONTAL_FLAT':
      case 'MEGASALE_BANNER':
      case 'FLASH_BANNERS':
        return 'Upload resolution 1632x440';
      case 'EXCLUSIVE_PROMO':
        return 'Upload resolution 410x185';
      case 'CIRCLE_BANNER':
        return 'Upload resolution 520x520';
      case 'MIXED_BANNER':
        return 'If this is first banner upload resolution 400x800 else Upload resolution 300x300';
    }
  }, [formik?.values?.banner_type]);

  return (
    <>
      <div>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" to={path.BANNERLIST}>
            Banner
          </Link>
          {id ? (
            <Typography color="text.primary">Update Banner</Typography>
          ) : (
            <Typography color="text.primary">Add Banner</Typography>
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
                    <InputLabel>
                      Campaign Name (English)<span className="asterisk">*</span>
                    </InputLabel>
                    <NormalTextField
                      name="campaign_name"
                      placeholder="Campaign Name (English)"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>
                      Campaign Name (Arabic)<span className="asterisk">*</span>
                    </InputLabel>
                    <NormalTextField
                      name="campaign_name_ar"
                      placeholder="Campaign Name (Arabic)"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>
                      Banner Type<span className="asterisk">*</span>
                    </InputLabel>

                    <MagicDropDown
                      name="banner_type"
                      option={bannerType}
                      label="banner_type"
                      formik={formik}
                      placeholder="Banner Type"
                    />
                    <FormHelperText id="standard-weight-helper-text-email-login">
                      {'Note: This has relevant design associated.'}
                    </FormHelperText>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>
                      Banner Module<span className="asterisk">*</span>
                    </InputLabel>

                    <MagicDropDown
                      name="banner_module"
                      option={bannerModule}
                      label="banner_module"
                      formik={formik}
                      placeholder="Banner Module"
                    />
                    <FormHelperText id="standard-weight-helper-text-email-login">
                      {'Note: This is the page where the banner will show.'}
                    </FormHelperText>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>
                      Banner Placement<span className="asterisk">*</span>
                    </InputLabel>
                    <MagicDropDown
                      name="banner_placement_id"
                      placeholder="Banner Placement "
                      option={placementList}
                      label="banner_placement_id"
                      formik={formik}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>
                      Target Module<span className="asterisk">*</span>
                    </InputLabel>

                    <MagicDropDown
                      name="target_module"
                      placeholder="Target Module"
                      option={targetModule}
                      label="Target Module"
                      formik={formik}
                    />
                    <FormHelperText id="standard-weight-helper-text-email-login">
                      {'Note: The location where banner click will land.'}
                    </FormHelperText>
                  </Stack>
                </Grid>

                {formik?.values?.target_module?.id === 'DEAL' && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel>
                          Target Deal Type<span className="asterisk">*</span>
                        </InputLabel>
                        {/* <NormalTextField /> */}
                        <MagicDropDown
                          label="Deal Type"
                          name="target_deal_type"
                          option={DealType}
                          formik={formik}
                          placeholder="Deal Type"
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel>
                          Target Deal Name<span className="asterisk">*</span>
                        </InputLabel>
                        {/* <NormalTextField /> */}
                        <MagicDropDown
                          name="target_deal_id"
                          placeholder="Target Deal Name"
                          option={dealNames}
                          label="target_deal_id"
                          formik={formik}
                          // placeholder="Banner Module"
                        />
                      </Stack>
                    </Grid>
                  </>
                )}
                {formik?.values?.target_module?.id === 'CATEGORY-SUBCAT' && (
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>
                        Target Category<span className="asterisk">*</span>
                      </InputLabel>
                      <GroupDropDown
                        name="targetcategory"
                        option={categoryList}
                        label="Target Category"
                        formik={formik}
                        // multiple={true}
                        placeholder="Target Category"
                      />
                    </Stack>
                  </Grid>
                )}
                {/* {formik?.values?.target_module?.id === 'TAG' && (
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>
                        Target Tag<span className="asterisk">*</span>
                      </InputLabel>
                      <MagicDropDown
                        name="target_tag_id"
                        placeholder="Target Tag"
                        option={tagList}
                        label="Target Tag"
                        formik={formik}
                      />
                    </Stack>
                  </Grid>
                )} */}
                {formik?.values?.target_module?.id === 'SEARCH' && (
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>
                        Search Term<span className="asterisk">*</span>
                      </InputLabel>
                      <NormalTextField
                        name="search_term"
                        placeholder="Search Term"
                      />
                    </Stack>
                  </Grid>
                )}

                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>Banner Info</InputLabel>
                    <NormalTextField
                      name="banner_info"
                      placeholder="Banner Info"
                      multiline={true}
                      rows={5}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>Link Url</InputLabel>
                    <NormalTextField name="link_url" placeholder="Link Url" />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>
                      City <span className="asterisk">*</span>
                    </InputLabel>
                    <MagicDropDown
                      name="cities"
                      placeholder="Select Cities"
                      option={cityList}
                      label="cities"
                      formik={formik}
                      multiple
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>
                      Banner Active Date & Time
                      <span className="asterisk">*</span>
                    </InputLabel>
                    <MagicDateAndTimePicker
                      name="banner_active_date"
                      disablePast
                      // label="Banner Active Date"
                      formik={formik}
                      placeholder="Banner Active Date"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>
                      Banner Expiry Date & Time
                      <span className="asterisk">*</span>
                    </InputLabel>
                    <MagicDateAndTimePicker
                      name="banner_expiry_date"
                      // label="Banner Expiry Date"
                      formik={formik}
                      placeholder="banner_expiry_date"
                      disablePast
                      minDate={moment(formik?.values?.banner_active_date)}
                    />
                  </Stack>
                </Grid>

                {id && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel>Upload Image (Single)</InputLabel>
                        <FormHelperText id="standard-weight-helper-text-email-login">
                          Note:
                          {note}
                        </FormHelperText>
                        <FileUpload
                          disabled={
                            permission === 'WRITE' || permission === 'FULL'
                              ? false
                              : true
                          }
                          name={'image_id'}
                          // tableName="banner"
                          tableName={{ name: 'banner', id: id }}
                          onSelect={(data: constants.types.fileType[]) => {
                            setSelectedImages(data);
                          }}
                          files={selectedImages}
                          multiSelect={false}
                          accept="image/*"
                          type="image"
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel>Upload Image (Arabic) (Single)</InputLabel>
                        <FormHelperText id="standard-weight-helper-text-email-login">
                          Note:
                          {note}
                        </FormHelperText>
                        <FileUploadAr
                          disabled={
                            permission === 'WRITE' || permission === 'FULL'
                              ? false
                              : true
                          }
                          name={'image_id_ar'}
                          // tableName="banner"
                          tableName={{ name: 'banner', id: id }}
                          onSelect={(data: constants.types.fileType[]) => {
                            setSelectedImagesAr(data);
                          }}
                          files={selectedImagesAr}
                          multiSelect={false}
                          accept="image/*"
                          type="image"
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel>Upload Video (Single)</InputLabel>
                        <FormHelperText id="standard-weight-helper-text-email-login">
                          Note:
                          {note}
                        </FormHelperText>
                        <FileUpload
                          disabled={
                            permission === 'WRITE' || permission === 'FULL'
                              ? false
                              : true
                          }
                          name={'video_id'}
                          // tableName="banner"
                          tableName={{ name: 'banner', id: id }}
                          onSelect={(data: constants.types.fileType[]) => {
                            setSelectedVideos(data);
                          }}
                          files={selectedVideos}
                          multiSelect={false}
                          accept="video/*"
                          type="video"
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel>Upload Video (Arabic) (Single)</InputLabel>
                        <FormHelperText id="standard-weight-helper-text-email-login">
                          Note:
                          {note}
                        </FormHelperText>
                        <FileUploadAr
                          disabled={
                            permission === 'WRITE' || permission === 'FULL'
                              ? false
                              : true
                          }
                          name={'video_id_ar'}
                          // tableName="banner"
                          tableName={{ name: 'banner', id: id }}
                          onSelect={(data: constants.types.fileType[]) => {
                            setSelectedVideosAr(data);
                          }}
                          files={selectedVideosAr}
                          multiSelect={false}
                          accept="video/*"
                          type="video"
                        />
                      </Stack>
                    </Grid>
                  </>
                )}
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>Platform</InputLabel>
                    <MagicDropDown
                      name="platform"
                      placeholder="Platform"
                      option={PlatformType}
                      label="platform"
                      formik={formik}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>
                      Sort<span className="asterisk">*</span>
                    </InputLabel>
                    <NormalTextField name="sort" placeholder="Sort" />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel>
                      Active<span className="asterisk">*</span>
                    </InputLabel>
                    <CustomSwitchButton
                      name="active"
                      formik={formik}
                      label=""
                    />
                  </Grid>
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
                          <>{id ? 'Update' : 'Add'}</>
                        )}
                      </Button>
                    )}{' '}
                  </Stack>
                </Grid>
              </Grid>
            </form>
          </FormikProvider>
        </MainCard>
      </div>
    </>
  );
};

export default CreateBanner;
