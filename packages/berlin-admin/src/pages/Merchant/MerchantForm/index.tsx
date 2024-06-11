import { useEffect, useMemo } from 'react';
// material-ui
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Breadcrumbs,
  Button,
  CircularProgress,
  Divider,
  FormHelperText,
  Grid,
  InputLabel,
  Stack,
  Typography,
} from '@mui/material';

// third-party
import { FormikProvider, useFormik } from 'formik';

// project imports
import {
  NormalTextField,
  MagicDropDown,
  FileUpload,
  CustomSwitchButton,
  constants,
  GroupDropDown,
  MagicDateAndTimePicker,
} from 'berlin-common';
import MainCard from '../../MainCard';
import { useState } from 'react';
import {
  getMerchantByIdAPI,
  merchantCreateApi,
  merchantUpdateApi,
} from '../../../services/merchantService';
import { validationSchema } from './validation';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbarConfig } from '../../../store/slice/Loader';
import {
  setDropDownValues,
  setMultiDropDownValue,
} from '../../../utils/dropDown';
import { countryList, MerchantOnboardingStatus } from '../../../data/data';

import { CloudUploadOutlined } from '@mui/icons-material';
import { path } from '../../../routes/Routers';
import Permission from '../../../components/Permission';
import {
  getAllArea,
  getAllUser,
  getCategoriesSubCategories,
} from '../../../services/dropDownService';
import moment from 'moment';
import usePermission from '../../../components/Permission/usePermission';
import { getId } from '../../../utils/getIds';

// validation schema

// ==============================|| FORMS VALIDATION - ADDRESS ||============================== //

export interface MerchantValues {
  name_en: string;
  tagline_trans_ids_en: string;
  description_trans_ids_en: string;
  name_ar: string;
  tagline_trans_ids_ar: string;
  description_trans_ids_ar: string;
  image_ids: string | null;
  video_ids: string | null;
  email: string;
  password: string | any;
  country_code: Dropdown | null;
  mobile: string | null;
  country_code_alternate: Dropdown | null;
  mobile_alternate: string | null;
  contact_person_name: string;
  contact_person_mobile: string | null;
  area: Dropdown | null;
  coordinates: string;
  website: string;
  address1: string;
  address2: string;
  hapido_business_userid: Dropdown | null;
  categories_interest: string[] | null;
  listing_fee: string | null;
  merchant_active_date: string;
  merchant_expiry_date: string;
  merchant_supporting_docs_file_ids: string | null;
  merchant_onboarding_status: Dropdown | null;
  notes: string;
  active: boolean;
}

interface Dropdown {
  label: string;
  id: string | number;
  coordinates?: string;
}

const initialValues: MerchantValues = {
  name_en: '',
  tagline_trans_ids_en: '',
  description_trans_ids_en: '',
  name_ar: '',
  tagline_trans_ids_ar: '',
  description_trans_ids_ar: '',
  image_ids: '',
  video_ids: '',
  email: '',
  password: '',
  country_code: null,
  mobile: null,
  country_code_alternate: null,
  mobile_alternate: null,
  contact_person_name: '',
  contact_person_mobile: null,
  area: null,
  coordinates: '',
  website: '',
  address1: '',
  address2: '',
  hapido_business_userid: null,
  categories_interest: [],
  listing_fee: '',
  merchant_active_date: '',
  merchant_expiry_date: '',
  merchant_supporting_docs_file_ids: '',
  merchant_onboarding_status: null,
  notes: '',
  active: true,
};

function merchantForm() {
  const { permission } = usePermission('MERCHANT');
  const { id } = useParams();
  const [userList, setUserList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [merchantData, setMerchantData] = useState<any>([]);
  const [btnLoader, setBtnLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getPersonDetails, setGetPersonDetails] = useState<any>();
  const [selectedImages, setSelectedImages] = useState<
    constants.types.fileType[]
  >([]);
  const [selectedDoc, setSelectedDoc] = useState<constants.types.fileType[]>(
    []
  );
  const [selectedVideos, setSelectedVideos] = useState<
    constants.types.fileType[]
  >([]);
  const [coordinates, setCoordinates] = useState<string>('');
  const CHARACTER_LIMIT = 20;
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema(id),
    onSubmit: async (value) => {
      handleAdd(value);
    },
  });

  const HandleCancle = () => {
    navigate('/merchant');
  };
  const disabledStatus = ['REJECTED', 'REQUIRE_DOCUMENTS', 'APPROVED'];
  const dept = useSelector((store: any) => store?.login?.loginDetails);

  const handleAdd = async ({ password, ...value }: MerchantValues) => {
    const res: any = value;
    const payload: any = {
      ...value,
      translations: [
        {
          column_name: 'name',
          locale: 'en',
          text: value.name_en,
        },
        {
          column_name: 'name',
          locale: 'ar',
          text: value.name_ar,
        },
        {
          column_name: 'tagline_trans_ids',
          locale: 'en',
          text: value.tagline_trans_ids_en,
        },
        {
          column_name: 'tagline_trans_ids',
          locale: 'ar',
          text: value.tagline_trans_ids_ar,
        },
        {
          column_name: 'description_trans_ids',
          locale: 'en',
          text: value.description_trans_ids_en,
        },
        {
          column_name: 'description_trans_ids',
          locale: 'ar',
          text: value.description_trans_ids_ar,
        },
      ],
      image_ids: getId(selectedImages),
      video_ids: getId(selectedVideos, 'vid'),
      email: value.email,
      // password: password,
      country_code: parseInt(res.country_code.id),
      mobile: parseInt(value.mobile),
      country_code_alternate: parseInt(res.country_code_alternate.id),
      mobile_alternate: parseInt(value.mobile_alternate),
      contact_person_name: value.contact_person_name,
      contact_person_mobile: parseInt(value.contact_person_mobile),
      area: res.area.id,
      coordinates: value.coordinates,
      website: value.website,
      address1: value.address1,
      address2: value.address2,
      hapido_business_userid: res.hapido_business_userid.id,
      categories_interest: res.categories_interest
        .map((e: any) => e.id)
        .join(','),
      listing_fee: value.listing_fee ? +value.listing_fee : value.listing_fee,
      merchant_active_date: value.merchant_active_date,
      merchant_expiry_date: value.merchant_expiry_date,
      merchant_supporting_docs_file_ids: getId(selectedDoc, 'docMulti'),
      merchant_onboarding_status: res.merchant_onboarding_status.id,
      notes: value.notes,
      active: res.active,
    };

    if (password) {
      payload.password = password;
    }

    if (id) {
      let userData: any = { ...payload };
      setBtnLoader(true);
      if (payload?.mobile == getPersonDetails?.mobile) {
        delete userData?.mobile;
      }
      if (payload?.email == getPersonDetails?.email) {
        delete userData?.email;
      }
      // setBtnLoader(true);
      merchantUpdateApi({ ...userData, id: +id })
        .then((response: any) => {
          setBtnLoader(false);
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: 'Merchant updated successfully',
              varient: 'success',
            })
          );
          navigate('/merchant');
        })
        .catch((error: any) => {
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
      merchantCreateApi({ ...payload })
        .then((response: any) => {
          setBtnLoader(false);
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: 'Merchant created successfully',
              varient: 'success',
            })
          );
          navigate('/merchant');
        })
        .catch((error: any) => {
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

  const getUserList = (data?: any) => {
    getAllUser()
      .then((res) => {
        setUserList(res);

        if (data) {
          setDropDownValues(res, data, 'hapido_business_userid', formik);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCategoryList = (data?: any) => {
    getCategoriesSubCategories()
      .then((res) => {
        setCategoryList(res);
        if (data) {
          setMultiDropDownValue(
            res,
            data?.categories_interest?.split(','),
            'categories_interest',
            formik
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAreaList = (data?: any) => {
    getAllArea()
      .then((response) => {
        setAreaList(response.data.data.allAreas);
        if (data) {
          formik.setFieldValue(
            'area',
            response.data.data.allAreas.find(
              (obj: any) => obj.id === data['area'].id
            )
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const feachDropDownData = (data: any) => {
    getUserList(data);
    // getCountryList(data);
    getCategoryList(data);
    getAreaList(data);
  };
  const getMerchantDetail = (id: any) => {
    getMerchantByIdAPI(id)
      .then((res) => {
        const data = res.data.data.merchants;
        setGetPersonDetails(data);
        // wait for reponse then call all list api
        const country = countryList.find((e) => +e.id === data.country_code);
        formik.setFieldValue('country_code', {
          id: country?.id,
          label: country?.label + ' (+' + country?.id + ')',
        });

        const alternateCountry = countryList.find(
          (e) => +e.id === data.country_code_alternate
        );
        formik.setFieldValue('country_code_alternate', {
          id: alternateCountry?.id,
          label: alternateCountry?.label + ' (+' + alternateCountry?.id + ')',
        });

        const onboardingStatus = MerchantOnboardingStatus.find(
          (e) => e.id === data.merchant_onboarding_status
        );

        formik.setFieldValue('merchant_onboarding_status', {
          id: onboardingStatus?.id,
          label: onboardingStatus?.label,
        });

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
          const videoList: constants.types.fileType[] = data?.videos.map(
            (item: any) => {
              return {
                ...item,
                id: item.videoId,
                type: 'video',
              };
            }
          );
          setSelectedVideos(videoList);
        }

        if (data?.docs?.length > 0) {
          const docList: constants.types.fileType[] = data?.docs.map(
            (item: any) => {
              return {
                ...item,
                id: item.docId,
                type: 'doc',
              };
            }
          );
          setSelectedDoc(docList);
        }

        feachDropDownData(data);
        Object.keys(data).forEach((item) => {
          if (
            item === 'merchant_supporting_docs_file_ids' ||
            item === 'image_ids' ||
            item === 'video_ids'
          ) {
            formik.setFieldValue(item, data[item]);
          } else if (item === 'active') {
            formik.setFieldValue(item, data[item] === 1 ? true : false);
          } else if (
            item !== 'categories_interest' &&
            item !== 'hapido_business_userid' &&
            item !== 'area' &&
            item !== 'country_code' &&
            item !== 'country_code_alternate' &&
            item !== 'merchant_onboarding_status'
          ) {
            formik.setFieldValue(item, data[item]);
          }
        });

        data.merchanttranslation.forEach((e: any) => {
          if (e.column_name === 'name' && e.locale === 'en') {
            formik.setFieldValue('name_en', e.text);
          } else if (e.column_name === 'name' && e.locale === 'ar') {
            formik.setFieldValue('name_ar', e.text);
          } else if (
            e.column_name === 'tagline_trans_ids' &&
            e.locale === 'en'
          ) {
            formik.setFieldValue('tagline_trans_ids_en', e.text);
          } else if (
            e.column_name === 'tagline_trans_ids' &&
            e.locale === 'ar'
          ) {
            formik.setFieldValue('tagline_trans_ids_ar', e.text);
          } else if (
            e.column_name === 'description_trans_ids' &&
            e.locale === 'en'
          ) {
            formik.setFieldValue('description_trans_ids_en', e.text);
          } else if (
            e.column_name === 'description_trans_ids' &&
            e.locale === 'ar'
          ) {
            formik.setFieldValue('description_trans_ids_ar', e.text);
          }
        });
        setMerchantData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (id) {
      getMerchantDetail(id);
    } else {
      feachDropDownData('');
    }
  }, [id]);
  useEffect(() => {
    const temp = areaList?.find(
      (e) => e.id === formik.values?.area?.id && e.coordinates
    );
    setCoordinates(temp?.coordinates);
  }, [formik.values.area]);

  useEffect(() => {
    formik.setFieldValue('coordinates', formik.values?.area?.coordinates);
  }, [formik.values?.area]);

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
        <Link color="inherit" to={path.MERCHANTLIST}>
          Merchant
        </Link>
        {id ? (
          <Typography color="text.primary">Update Merchant</Typography>
        ) : (
          <Typography color="text.primary">Add Merchant</Typography>
        )}
      </Breadcrumbs>
      <MainCard>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3.5}>
              <Grid item xs={12}></Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Name (English)<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField name="name_en" placeholder="Name" />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Name (Arabic)<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField name="name_ar" placeholder="Name" />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Tagline (English)<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField
                    name="tagline_trans_ids_en"
                    placeholder="Tag Line English"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Tagline (Arabic)<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField
                    name="tagline_trans_ids_ar"
                    placeholder="Tag Line Arabic"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Description Trans (English)
                    <span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField
                    name="description_trans_ids_en"
                    placeholder="Description Trans English"
                    multiline={true}
                    rows={4}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Description Trans (Arabic)
                    <span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField
                    name="description_trans_ids_ar"
                    placeholder="Description Trans Arabic"
                    multiline={true}
                    rows={4}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Email<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField name="email" placeholder="Email" />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Password{!id && <span className="asterisk">*</span>}
                  </InputLabel>
                  <NormalTextField name="password" placeholder="Password" />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Merchant Country Code<span className="asterisk">*</span>
                  </InputLabel>
                  <MagicDropDown
                    name="country_code"
                    placeholder="Select Merchant Country Code"
                    option={countryList.map((i: any) => {
                      return {
                        id: i?.id,
                        label: `${i?.label} (+${i?.id})`,
                      };
                    })}
                    label="Deal Type"
                    formik={formik}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Merchant Mobile No.<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField
                    name="mobile"
                    placeholder="Enter Merchant Mobile No."
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Alternate Country Code</InputLabel>
                  <MagicDropDown
                    name="country_code_alternate"
                    placeholder="Select Alternate Country Code"
                    option={countryList.map((i: any) => {
                      return {
                        id: i?.id,
                        label: `${i?.label} (+${i?.id})`,
                      };
                    })}
                    label="Deal Type"
                    formik={formik}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Alternate Mobile No.</InputLabel>
                  <NormalTextField
                    name="mobile_alternate"
                    placeholder="Enter Alternate Mobile No."
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Contact Person Name</InputLabel>
                  <NormalTextField
                    name="contact_person_name"
                    placeholder="Contact Person Name"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Contact Person Mobile</InputLabel>
                  <NormalTextField
                    name="contact_person_mobile"
                    placeholder="Contact Person Mobile"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Area<span className="asterisk">*</span>
                  </InputLabel>
                  <MagicDropDown
                    name="area"
                    option={areaList}
                    label="Select Area"
                    formik={formik}
                    placeholder="Area"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Coordinates<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField
                    name="coordinates"
                    placeholder="Coordinates"
                    value={coordinates}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Website</InputLabel>
                  <NormalTextField name="website" placeholder="Website" />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Address 1<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField name="address1" placeholder="Address1" />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Address 2<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField name="address2" placeholder="Address2" />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Hapido Business User<span className="asterisk">*</span>
                  </InputLabel>
                  <MagicDropDown
                    name="hapido_business_userid"
                    option={userList}
                    label="Select Hapido Business User id"
                    formik={formik}
                    placeholder="Hapido Business User"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Categories Interest</InputLabel>
                  <GroupDropDown
                    name="categories_interest"
                    option={categoryList}
                    label="Categories Interest"
                    formik={formik}
                    multiple={true}
                    placeholder="Categories Interest"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Merchant Onboarding Status </InputLabel>
                  <MagicDropDown
                    name="merchant_onboarding_status"
                    placeholder="Select Merchant Onboarding Status"
                    option={MerchantOnboardingStatus}
                    formik={formik}
                    disabledOption={
                      dept.departments.every(
                        (department) =>
                          department.department_name ===
                            'BUSINESS_DEVELOPMENT' &&
                          department.designation === 'EXECUTIVE'
                      )
                        ? disabledStatus
                        : []
                    }
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Listing Fee</InputLabel>
                  <NormalTextField
                    name="listing_fee"
                    placeholder="Listing Fee"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Merchant Active Date & Time</InputLabel>
                  <MagicDateAndTimePicker
                    name="merchant_active_date"
                    placeholder="Merchant Active Date"
                    formik={formik}
                    disablePast
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Merchant Expiry Date & Time</InputLabel>
                  <MagicDateAndTimePicker
                    name="merchant_expiry_date"
                    placeholder="Merchant Expiry Date"
                    formik={formik}
                    disablePast
                    minDate={moment(formik?.values?.merchant_active_date)}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Note</InputLabel>
                  <NormalTextField
                    name="notes"
                    placeholder="Enter Note"
                    multiline={true}
                    rows={3}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel>Active</InputLabel>
                <CustomSwitchButton name="active" formik={formik} label="" />
              </Grid>
              {id ? (
                <>
                  <Grid item xs={12} sm={4}>
                    <Stack spacing={1}>
                      <InputLabel>
                        Merchant Supporting Docs File (Multiple)
                      </InputLabel>
                      <FormHelperText id="standard-weight-helper-text-email-login">
                        {'Note:- Max Size - 10 MB Per File'}
                      </FormHelperText>
                      <FileUpload
                        disabled={
                          permission === 'WRITE' || permission === 'FULL'
                            ? false
                            : true
                        }
                        name={'merchant_supporting_docs_file_ids'}
                        tableName={{ name: 'merchant', id: id }}
                        onSelect={(data: constants.types.fileType[]) => {
                          setSelectedDoc(data);
                        }}
                        files={selectedDoc}
                        type={'doc'}
                        accept="image/*, application/pdf"
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Stack spacing={1}>
                      <InputLabel>Upload Image (Multiple)</InputLabel>
                      <FormHelperText id="standard-weight-helper-text-email-login">
                        {'Note:- Max Size - 10 MB Per File'}
                      </FormHelperText>
                      <FileUpload
                        name={'image_ids'}
                        tableName={{ name: 'merchant', id: id }}
                        onSelect={(data: constants.types.fileType[]) => {
                          setSelectedImages(data);
                        }}
                        files={selectedImages}
                        accept="image/*"
                        type="image"
                        disabled={
                          permission === 'WRITE' || permission === 'FULL'
                            ? false
                            : true
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Stack spacing={1}>
                      <InputLabel>Upload Video (Multiple)</InputLabel>
                      <FormHelperText id="standard-weight-helper-text-email-login">
                        {'Note:- Max Size - 200 MB Per File'}
                      </FormHelperText>
                      <FileUpload
                        disabled={
                          permission === 'WRITE' || permission === 'FULL'
                            ? false
                            : true
                        }
                        type="video"
                        accept="video/*"
                        name={'video_ids'}
                        tableName={{ name: 'merchant', id: id }}
                        onSelect={(data: constants.types.fileType[]) => {
                          setSelectedVideos(data);
                        }}
                        files={selectedVideos}
                      />
                    </Stack>
                  </Grid>{' '}
                </>
              ) : null}
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
                    onClick={HandleCancle}
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
                </Stack>
              </Grid>
            </Grid>
          </form>
        </FormikProvider>
      </MainCard>
    </>
  );
}

export default merchantForm;
