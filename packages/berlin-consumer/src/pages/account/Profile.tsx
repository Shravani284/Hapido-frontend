import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import css from './Account.module.scss';
import { useTranslation } from 'react-i18next';
import {
  HapidoLogo,
  MagicDatePicker,
  MagicPassword,
  MagicTextField,
  useWindowSize,
} from 'berlin-common';
import { Field, FormikProvider, replace, useFormik } from 'formik';
import * as Yup from 'yup';
import PrimaryButton from 'berlin-common/src/components/button/PrimaryButton';
import { useEffect, useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
  NumberOTP,
  changeNumberOTP,
  changePassword,
  deleteUser,
  getAllCategory,
  getUserProfile,
  updateProfile,
} from '../../services/profileService';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbarConfig } from '../../store/slice/Loader';
import ConsumerConfirmBoxAlert from '../../components/ConsumerConfirmBoxAlert';
import OTP from '../../components/authOTP';
import moment from 'moment';
import { logoutHandler } from '../../store/slice/LoginSlice';
import { path } from '../../routes/Routers';
import { useNavigate, useParams } from 'react-router-dom';
import initialiseMoengage, {
  profileUpdateEvent,
  mPage,
  viewPageEvent,
  extendedWindow,
} from '../../utils/moEngage';
import Helmet from 'react-helmet';
import getMetaTags from '../../utils/getMetaTags';
import OpenInApp from '../../components/openInApp';
import { lang } from '../../utils/getLang';

interface IValues {
  firstName: string;
  lastName: string;
  birthDate: Date | null;
  gender: any;
  email: string;
  mobileNo: string;
  category: string;
  locale: string;
  attempt: string;
  country_code: string;
}
export interface NoOTPVerify {
  attempt: number | string;
}
interface PValues {
  currentPass: string;
  newPass: string;
}
const Profile = () => {
  const { t, i18n } = useTranslation('translation');
  const currentCity = useSelector((state: any) => state?.cityName?.name);
  const dispatch = useDispatch();
  const [countryCode, setCountryCode] = useState('971');
  const [changeNumber, setChangeNumber] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const [profileData, setProfileData] = useState<any>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { size } = useWindowSize();
  const [openOTPPopup, setOpenOTPPopup] = useState(false);
  const handleClose = () => setOpenOTPPopup(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const param = useParams();
  const Moengage: any = initialiseMoengage();

  // Create state to track selected categories
  const [selectedCategories, setSelectedCategories] = useState([]);
  useEffect(() => {
    if (profileData?.categories_interest) {
      setSelectedCategories(
        profileData?.categories_interest
          ?.split(',')
          ?.map((categoryId: any) => categoryId.trim())
      );
    }
  }, [profileData?.categories_interest]);

  const handleCategoryChange = (event: any) => {
    const categoryId = event.target.value;
    const updatedCategories: any = [...selectedCategories];

    if (event.target.checked) {
      updatedCategories?.push(categoryId);
    } else {
      const index = updatedCategories?.indexOf(categoryId);
      if (index !== -1) {
        updatedCategories?.splice(index, 1);
      }
    }

    setSelectedCategories(updatedCategories);
  };

  let initialValue: IValues = {
    firstName: '',
    lastName: '',
    birthDate: null,
    gender: '',
    email: '',
    mobileNo: '',
    category: '',
    locale: '',
    attempt: '',
    country_code: '',
  };

  const schema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, t('TOO_SHORT'))
      .required(t('ENTER_NAME'))
      .matches(/^[A-Za-z\s]+$/, t('ENTER_VALID_NAME')),
    lastName: Yup.string()
      .min(2, t('TOO_SHORT'))
      .required(t('LAST_NAME_MANDATORY'))
      .matches(/^[A-Za-z\s]+$/, t('ENTER_VALID_NAME')),
    // email: Yup.string()
    //   .email(t('ENTER_VALID_EMAIL'))
    //   .required(t('ENTER_EMAIL')),
    // mobileNo: Yup.string()
    //   .required('Phone Number is required'),
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: schema,
    validateOnMount: true,
    onSubmit: (values) => {
      submitHandler(values);
    },
  });

  let passInitialValue: PValues = {
    currentPass: '',
    newPass: '',
  };

  const passSchema = Yup.object().shape({
    currentPass: Yup.string()
      .required(t('ENTER_PASSWORD'))
      .min(6, t('MUST_6_CHART'))
      .matches(/^[^\s]+$/, t('SPEC_IS_NOT_ALLOW')),
    // .matches(/[a-z]/, t('ONE_LOWERCASE'))
    // .matches(/[0-9]/, t('ONE_NUMBER'))
    // .matches(/[@$!%*#?&]+/, t('ONE_SPECIAL_CHART')),
    newPass: Yup.string()
      .required(t('ENTER_PASSWORD'))
      .min(6, t('MUST_6_CHART'))
      .matches(/^[^\s]+$/, t('SPEC_IS_NOT_ALLOW')),
    // .matches(/[a-z]/, t('ONE_LOWERCASE'))
    // .matches(/[0-9]/, t('ONE_NUMBER'))
    // .matches(/[@$!%*#?&]+/, t('ONE_SPECIAL_CHART')),
  });

  const passwordFormik = useFormik({
    initialValues: passInitialValue,
    validationSchema: passSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      submitPassHandler(values);
    },
  });

  const submitPassHandler = (values: any) => {
    const res: any = values;
    const payload = {
      currentpassword: res.currentPass,
      password: res.newPass,
    };
    changePassword(payload)
      .then((response) => {
        if (response.success == true) {
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: t(`PASSWORD_CHANGE_SUCCESSFULLY`),
              varient: 'success',
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: error?.response?.data?.error?.message
              ? error?.response?.data?.error?.message
              : t(`SOMETHING_WENT_WRONG`),
            varient: 'error',
          })
        );
      });
  };

  const submitHandler = (values: any) => {
    const res: any = values;
    const fullMobile = res.mobileNo;
    const phoneNumberWithoutCountryCode = fullMobile?.replace(countryCode, '');
    const countryCodeWithoutPlus = countryCode?.replace('+', '');

    const payload = {
      id: profileData?.id,
      first_name: res.firstName.trim(),
      last_name: res.lastName.trim(),
      dob: res.birthDate,
      gender: res.gender,
      email: res.email,
      mobile: phoneNumberWithoutCountryCode,
      categories_interest: selectedCategories?.join(','),
      locale: res.locale,
      country_code: countryCodeWithoutPlus,
    };

    updateProfile(payload)
      .then((response) => {
        if (response?.success) {
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: t(`PROFILE_UPDATED_SUCCESSFULLY`),
              varient: 'success',
            })
          );
          if (payload.mobile) {
            localStorage.setItem(
              'mobileNumber',
              JSON.stringify(`${payload.country_code}${payload.mobile}`)
            );
          }

          const selectedCatId = categoryList?.filter((item) => {
            let intnum = item?.id.toString();
            return selectedCategories?.includes(intnum);
          });
          const selectedCatName = selectedCatId?.map((item) => item?.label);
          profileUpdateEvent(payload?.country_code);
          Moengage.add_unique_user_id(payload?.email)
            .then(() => {
              Moengage.add_first_name(payload?.first_name);
              Moengage.add_last_name(payload?.last_name);
              Moengage.add_email(payload?.email);
              Moengage.add_user_name(payload?.email);
              if (payload?.mobile) Moengage.add_mobile(payload?.mobile);
              if (payload?.gender) Moengage.add_gender(payload?.gender);
              if (payload?.dob) Moengage.add_birthday(payload?.dob);
              Moengage.add_user_attribute(
                'categories_interest',
                selectedCatName
              );
            })
            .catch((error) => {
              console.log(error, 'error');
            });
        }
      })
      .catch((error) => {
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: error?.response?.data?.error?.message
              ? error?.response?.data?.error?.message
              : t(`SOMETHING_WENT_WRONG`),
            varient: 'error',
          })
        );
      });
  };

  const handleCountryChange = (country: any) => {
    if (country) {
      const country_Code = getCountryCallingCode(country);
      setCountryCode(`+${country_Code}`);
    }
  };

  const gelCategoryData = () => {
    getAllCategory()
      .then((res) => {
        setCategoryList(res?.data?.category);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserData = () => {
    getUserProfile()
      .then((res) => {
        const userProfile = res?.data?.user;
        setProfileData(userProfile);

        const phoneNumberWithCountryCode = userProfile.mobile
          ? `+${
              userProfile?.country_code ? userProfile?.country_code : 971
            }${userProfile?.mobile}`
          : null;
        formik.setValues({
          firstName: userProfile?.first_name,
          lastName: userProfile?.last_name,
          birthDate: userProfile?.dob,
          gender: userProfile?.gender,
          email: userProfile?.email,
          mobileNo: phoneNumberWithCountryCode,
          category: userProfile?.categories_interest,
          locale: userProfile?.locale,
          attempt: '',
          country_code: userProfile?.country_code,
        });
        // setCountryCode(`+${userProfile?.country_code}`);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserData();
    gelCategoryData();
  }, []);

  const deleteUserAccount = () => {
    setModalOpen(true);
  };

  const handleUserDelete = () => {
    const payLoad = {
      id: profileData?.id,
      soft_delete: true,
    };

    deleteUser(payLoad)
      .then((response) => {
        if (response.success) {
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: response?.message
                ? response?.message
                : t(`USER_ACCOUNT_DELETED_SUCCESSFULLY`),
              varient: 'success',
            })
          );
          dispatch(logoutHandler());
          navigate(`/${lang}/`);

          setModalOpen(false);
        }
        setModalOpen(false);
      })
      .catch((error) => {
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: error?.response?.data?.error?.message
              ? error?.response?.data?.error?.message
              : t(`SOMETHING_WENT_WRONG`),
            varient: 'error',
          })
        );
      });
  };

  useEffect(() => {
    const Mobile = formik.values?.mobileNo?.replace('+', '');
    const oldMobile = profileData?.country_code + profileData?.mobile;

    if (oldMobile === Mobile) {
      setOpenOTPPopup(false);
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formik.values.mobileNo]);

  const setChangeNumberBtn = () => {
    formik.setFieldValue('attempt', '');
    setChangeNumber(false);
    setOpenOTPPopup(false);
  };

  const saveNumber = (mobile: string) => {
    if (!mobile.includes('null')) {
      const oldMobile = profileData?.country_code + profileData?.mobile;

      // console.log('oldMobile', oldMobile);

      const OTPMobile = mobile?.replace('+', '');

      // console.log('OTPMobile', OTPMobile);

      if (oldMobile != OTPMobile) {
        NumberOTP(OTPMobile)
          .then((res) => {
            if (res.success) {
              dispatch(
                setSnackbarConfig({
                  isOpen: true,
                  message: res.message,
                  varient: 'success',
                })
              );
              setChangeNumber(true);
              setOpenOTPPopup(true);
              setIsDisabled(true);
            }
          })
          .catch((error) => {
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: error.response.data.error.message
                  ? error.response.data.error.message
                  : t(`SOMETHING_WENT_WRONG`),
                varient: 'error',
              })
            );
            console.log(error);
          });
      } else {
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: t(`PLEASE_CHANGE_MOBILE_NUMBER_AND_THEN_SAVE`),
            varient: 'warning',
          })
        );
      }
    } else {
      dispatch(
        setSnackbarConfig({
          isOpen: true,
          message: t(`PLEASE_ENTER_VALID_MOBILE_NUMBER`),
          varient: 'warning',
        })
      );
    }
  };

  const submitOTP = async (payLoad: NoOTPVerify) => {
    changeNumberOTP(payLoad)
      .then((res) => {
        if (res.success) {
          formik.handleSubmit();
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: res.message,
              varient: 'success',
            })
          );
          setIsDisabled(false);
          setOpenOTPPopup(false);
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: error.response.data.error.message
              ? error.response.data.error.message
              : t(`SOMETHING_WENT_WRONG`),
            varient: 'error',
          })
        );
      });
  };

  useEffect(() => {
    viewPageEvent(mPage.profile, currentCity);
  }, []);

  const urlObject = new URL(window.location.href);
  const baseUrlWithoutQueryString = urlObject.origin + urlObject.pathname;
  const HapidoSiteLogo =
    'https://cdn.hapido.com/site-assets/images/hapido-full-logo-white.jpg';

  const fullMetaArray = {
    title: 'My Profile - Hapido',
    metaKeywords: 'profile, user account, settings, personal information',
    metaDescription:
      'Manage your profile settings and personal information on Hapido. Update your account details, preferences, and more.',
    ogType: 'website',
    ogSiteName: 'hapido.com',
    ogLocale: 'en_ae',
    ogURL: baseUrlWithoutQueryString,
    ogTitle: 'My Profile - Hapido',
    ogDescriptions:
      'Manage your profile settings and personal information on Hapido. Update your account details, preferences, and more.',
    ogImageWidth: '350',
    ogImageHeight: '350',
    ogImage: HapidoSiteLogo,
    twitterSite: '@hapido',
    twitterCreator: '@hapido',
    twitterImage: HapidoSiteLogo,
    twitterCard: HapidoSiteLogo,
  };

  useEffect(() => {
    getMetaTags(fullMetaArray);
  }, [param]);

  return (
    <>
      {/* User Information */}
      {size < 768 && <OpenInApp />}
      <Card
        variant="outlined"
        className={size < 767 ? css.mobileProfile : css.profileCart}
      >
        {size < 767 && (
          <>
            <div className={css.accountHeading}>
              <Button onClick={() => navigate(-1)}>
                <ArrowBackIosIcon />
              </Button>
              {/* <MobileSideMenu /> */}
            </div>
            <div className={css.accountHeader}>
              <p className={css.accountTitle}>{t(`PROFILE`)}</p>
            </div>
          </>
        )}
        <div className={css.accountMobTopSet}>
          <FormikProvider value={formik}>
            <h1>{t('USER_INFORMATION')}</h1>
            <form onSubmit={formik.handleSubmit} className="form">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} lg={6} xl={6}>
                  <MagicTextField
                    label={t('FIRST_NAME')}
                    placeholder={t('FIRST_NAME_PLACEHOLDER')}
                    type="text"
                    name="firstName"
                    id="firstName"
                  />
                </Grid>

                <Grid item xs={12} sm={12} lg={6} xl={6}>
                  <MagicTextField
                    label={t('LAST_NAME')}
                    placeholder={t('ENTER_YOUR_LAST_NAME')}
                    type="text"
                    name="lastName"
                    id="lastName"
                  />
                </Grid>

                <Grid item xs={12} sm={12} lg={6} xl={6}>
                  <Stack className={css.DOB} spacing={1}>
                    <MagicDatePicker
                      label={t('DOB')}
                      name="birthDate"
                      placeholder={t('DOB_PLACEHOLDER')}
                      formik={formik}
                      maxDate={moment()}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={12} lg={6} xl={6}>
                  <label>{t('GENDER')}</label>
                  <div role="group" className={css.radioField}>
                    <label>
                      <Field type="radio" name="gender" value="M" />
                      {t('MALE')}
                    </label>
                    <label className={css.leftSpace}>
                      <Field type="radio" name="gender" value="F" />
                      {t('FEMALE')}
                    </label>
                  </div>
                </Grid>

                <Grid item xs={12} sm={12} lg={12} xl={12}>
                  <MagicTextField
                    label={t('EMAIL_ADDRESS')}
                    placeholder={t('E_MAIL_PLACEHOLDER')}
                    type="email"
                    name="email"
                    id="email"
                    disabled={true}
                    className={css.emailField}
                  />
                </Grid>

                <Grid item xs={12} sm={12} lg={12} xl={12}>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <label>{t('MOBILE_NUMBER')}</label>
                    {changeNumber ? (
                      <div
                        className={css.changeNumber}
                        onClick={() => setChangeNumberBtn()}
                      >
                        {t('CHANGE_NO')}
                      </div>
                    ) : (
                      <div
                        className={`${css.changeNumber}`}
                        onClick={() => saveNumber(formik.values.mobileNo)}
                      >
                        {t('SEND_OTP')}
                      </div>
                    )}
                  </Box>
                  <div
                    className={`${css.numberMain} ${
                      !changeNumber && css.fieldHighlight
                    }`}
                  >
                    <div className={css.countryFlag}>
                      <PhoneInput
                        international
                        placeholder={t('MOBILE_NUMBER')}
                        countryCallingCodeEditable={false}
                        value={formik.values.mobileNo}
                        name="mobileNo"
                        onChange={(value) =>
                          formik.setFieldValue('mobileNo', value)
                        }
                        formik={formik}
                        id="mobileNo"
                        disabled={changeNumber}
                        defaultCountry="AE"
                        country={'US'}
                        onCountryChange={handleCountryChange}
                      />
                    </div>

                    {/* <span className={css.code}>{countryCode}</span> */}
                  </div>
                  {openOTPPopup && (
                    <Box mt={2}>
                      <span className={css.checkMail}>
                        {t('CHECK_MSG_AND_VERIFICATION')}
                      </span>
                      <OTP name="attempt" formik={formik} />
                      <PrimaryButton
                        type="button"
                        onClick={() =>
                          submitOTP({ attempt: formik.values.attempt })
                        }
                        label={t('SUBMIT')}
                      />
                    </Box>
                  )}

                  {formik.touched.mobileNo && formik.errors.mobileNo && (
                    <p className={css.errors}>{formik.errors.mobileNo}</p>
                  )}
                </Grid>

                <Grid item xs={12} sm={12} lg={12} xl={12}>
                  <label>{t('CATEGORIES_OF_INTEREST')}</label>

                  <div className={css.categoryInterest}>
                    {categoryList?.map(
                      (item: { id: number; label: string }) => {
                        return (
                          <div
                            className={css.categoryInterestItem}
                            key={item.id}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={selectedCategories?.includes(
                                    item?.id.toString()
                                  )}
                                  onChange={handleCategoryChange}
                                  value={item.id.toString()}
                                  sx={{
                                    color: 'red',
                                    '&.Mui-checked': {
                                      color: 'red',
                                    },
                                  }}
                                />
                              }
                              label={item.label}
                            />
                          </div>
                        );
                      }
                    )}
                  </div>
                </Grid>

                <Grid item xs={12} sm={12} lg={8} xl={8}>
                  <label>{t('LANGUAGE')}</label>

                  <Select
                    className={css.langSelect}
                    name="locale"
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={formik.values.locale}
                    onChange={(e) =>
                      formik.setFieldValue('locale', e.target.value)
                    }
                  >
                    <MenuItem className={css.optionSelect} value={1}>
                      {t('ENGLISH')}
                    </MenuItem>
                    <MenuItem className={css.optionSelect} value={2}>
                      {t('ARABIC')}
                    </MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12} sm={12} lg={4} xl={4} className={css.btn}>
                  <PrimaryButton
                    // isDisabled={isDisabled}
                    label={t('SAVE_CHANGES')}
                    type="submit"
                  />
                </Grid>
              </Grid>
            </form>
          </FormikProvider>
        </div>
      </Card>

      <Card
        variant="outlined"
        className={size < 600 ? css.mobileProfile : css.profileCart}
      >
        <h1>{t('UPDATE_PASSWORD')}</h1>
        <FormikProvider value={passwordFormik}>
          <form onSubmit={passwordFormik.handleSubmit} className="form">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} lg={4} xl={4}>
                <MagicPassword
                  label={t('CURRENT_PASSWORD')}
                  placeholder={t('CURRENT_PASS_PLACEHOLDER')}
                  type="text"
                  name="currentPass"
                  id="currentPass"
                />
              </Grid>

              <Grid item xs={12} sm={12} lg={4} xl={4}>
                <MagicPassword
                  label={t('NEW_PASSWORD')}
                  placeholder={t('NEW_PASS_PLACEHOLDER')}
                  name="newPass"
                  id="newPass"
                />
              </Grid>

              <Grid item xs={12} sm={12} lg={4} xl={4} className={css.btn}>
                <PrimaryButton label={t('UPDATE_PASSWORD')} type="submit" />
              </Grid>
            </Grid>
          </form>
        </FormikProvider>
      </Card>
      <Box className={size < 768 ? css.mobileDeleteBtn : css.deleteBtn}>
        <button onClick={() => deleteUserAccount()}>
          {t('DELETE_ACCOUNT')}
        </button>
      </Box>

      <ConsumerConfirmBoxAlert
        title={t(`DELETE_ACCOUNT`)}
        handleClose={() => setModalOpen(false)}
        message={t(`DO_YOU_WANT_TO_DELETE_THIS_ACCOUNT?`)}
        open={modalOpen}
        submitHandler={handleUserDelete}
      />
    </>
  );
};
export default Profile;
