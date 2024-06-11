// material-ui
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Divider,
  Grid,
  InputLabel,
  Stack,
  Typography,
  Breadcrumbs,
  Alert,
  Box,
} from '@mui/material';
// third-party
import { FormikProvider, useFormik } from 'formik';

// project imports
import {
  NormalTextField,
  MagicDropDown,
  MagicDatePicker,
  CustomSwitchButton,
  GroupDropDown,
} from 'berlin-common';
import MainCard from '../../MainCard';
import {
  CreateUser,
  UpdateUser,
  getAllDepartMent,
  getAllModule,
  getUserByIdAPI,
} from '../../../services/userService';
import { useEffect, useState } from 'react';
import { addressLabel, countryList, genderList } from '../../../data/data';
import {
  CreateUserValues,
  initialValues,
  validationSchema,
} from './initialValues';
import {
  setDropDownValues,
  setMultiDropDownValue,
} from '../../../utils/dropDown';
import { setSnackbarConfig } from '../../../store/slice/Loader';
import { useDispatch } from 'react-redux';

import UserAddress from './UserAddress';
import Module from './module';
import moment from 'moment';
import { CircularProgress } from '@mui/material';
import { path } from '../../../routes/Routers';
import Permission from '../../../components/Permission';
import {
  getCategoriesSubCategories,
  getAllArea,
} from '../../../services/dropDownService';
import usePermission from '../../../components/Permission/usePermission';
import Departments from './Departments';

// ==============================|| FORMS VALIDATION - ADDRESS ||============================== //

function form() {
  const { permission } = usePermission('USER');
  const [categoryList, setCategoryList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [departMent, setDepartMent] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [areaCordinateList, setAreaCordinateList] = useState();
  const [btnLoader, setBtnLoader] = useState(false);
  const [getPersonDetails, setGetPersonDetails] = useState<any>();
  const [userDetails, setUserDetails] = useState<any>();

  const navigate = useNavigate();
  const params = useParams();
  const userId: string = params.id ? params.id : '';
  const dispatch = useDispatch();
  let isWebSiteUser = false;
  if (userDetails?.roles?.length == 0 && userId) {
    isWebSiteUser = true;
  }
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema(userId, isWebSiteUser),
    onSubmit: async (values) => {
      handleAdd(values);
    },
  });

  const HandleCancel = () => {
    navigate('/users');
  };

  const departMentList = (data: any) => {
    getAllDepartMent()
      .then((response) => {
        setDepartMent(
          response.data?.departments?.map((e: any) => {
            return {
              ...e,
              label: e.department_name,
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAdd = async ({
    password,
    mobile,
    dob,
    ...values
  }: CreateUserValues) => {
    let address: any = [];
    values?.addresses?.map(
      (item: any) =>
        address?.push({
          address_label: item?.address_label,
          is_primary: item?.is_primary,
          address1: item?.address1,
          address2: item?.address2,
          area_id: item?.area_id,
          id: item?.id,
          coordinates: item?.coordinates,
          user_id: userId,
        })
    );
    // const roles: any = [];
    const gender: any = values.gender;

    const res: any = values;
    const payload: any = {
      ...values,
      currency: 'AED',
      locale: 1,
      gender: gender?.id,
      country_code: res.country_code?.id,
      flagged: values.flagged,
      flagged_reason: values.flagged_reason,
      addresses: address,
      roles: values?.roles,
      departments: values?.departments,
      marketing_consent: values?.marketing_consent,
      categories_interest: res.categories_interest
        .map((e: any) => e.id)
        .join(','),
    };

    if (mobile) {
      payload.mobile = mobile;
    }
    if (dob) {
      payload.dob = dob;
    }
    // if (values?.mobile) {payload?.mobile = values?.mobile};
    if (password) {
      payload.password = password;
    }

    if (userId) {
      let userData: any = { ...payload };
      setBtnLoader(true);
      if (
        payload?.email === getPersonDetails?.email &&
        payload?.mobile === getPersonDetails?.mobile
      ) {
        delete userData?.email;
        delete userData?.mobile;
      } else if (payload?.mobile === getPersonDetails?.mobile) {
        delete userData?.mobile;
      } else if (payload?.email === getPersonDetails?.email) {
        delete userData?.email;
      } else {
        userData = payload;
      }

      UpdateUser({ ...userData, id: parseInt(userId) })
        .then((response) => {
          setBtnLoader(false);
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: 'User updated successfully',
              varient: 'success',
            })
          );
          navigate('/users');
        })
        .catch((error) => {
          setBtnLoader(false);
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: error.response.data.error.message.code
                ? error.response.data.error.message.code
                : error.response.data.error.message,
              varient: 'error',
            })
          );
        });
    } else {
      setBtnLoader(true);
      CreateUser({ ...payload })
        .then((response) => {
          setBtnLoader(false);
          navigate('/users');
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: 'User created successfully',
              varient: 'success',
            })
          );
        })
        .catch((error) => {
          setBtnLoader(false);
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: error.response.data.error.message.code
                ? error.response.data.error.message.code
                : error.response.data.error.message,
              varient: 'error',
            })
          );
        });
    }
  };
  // Primary Categories Dropdown
  const getPrimaryCategory = (data?: any) => {
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
        console.log('error', error);
      });
  };

  // get all roles
  const getModule = (data?: any) => {
    getAllModule()
      .then((res) => {
        setRoleList(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // feach all dropdown list
  const feachDropDownData = (data: any) => {
    getPrimaryCategory(data);
    getModule(data);
    departMentList(data);
  };

  //get user Detail in update form
  const getUserDetail = (id: any) => {
    getUserByIdAPI(id)
      .then((res) => {
        const userData = res.data.data.user;
        let personData: any = {
          email: userData?.email,
          mobile: userData?.mobile,
        };
        setGetPersonDetails(personData);
        feachDropDownData(userData);
        setUserDetails(userData);
        Object.keys(userData).forEach((item) => {
          if (
            item === 'flagged' ||
            item === 'active' ||
            item === 'marketing_consent'
          ) {
            formik.setFieldValue(item, userData[item] === 0 ? false : true);
          } else if (
            item !== 'categories_interest' &&
            item !== 'roles' &&
            item !== 'gender' &&
            item !== 'country_code' &&
            item !== 'employeeDepartments' &&
            item !== 'addresses'
          ) {
            formik.setFieldValue(item, userData[item]);
          }
        });
        formik.setFieldValue(
          'roles',
          userData?.roles?.length > 0
            ? userData?.roles
            : [{ module_id: '', access: '' }]
        );

        setDropDownValues(genderList, userData, 'gender', formik);
        setDropDownValues(countryList, userData, 'country_code', formik);
        if (userData.addresses.length > 0) {
          formik.setFieldValue('addresses', userData.addresses);
        }
        const data = userData?.employeeDepartments?.map((e) => {
          return {
            ...e,
            departmentId: e.department_id,
            designation: e.designation,
          };
        });
        formik.setFieldValue(
          'departments',
          data.length > 0 ? data : [{ departmentId: '', designation: '' }]
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (userId) {
      getUserDetail(userId);
    } else {
      feachDropDownData('');
    }
  }, [userId]);

  const getArea = () => {
    getAllArea()
      .then((res) => {
        setAreaList(res.data?.data?.allAreas);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getArea();
  }, [userId]);

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
        <Link color="inherit" to={path.USERLIST}>
          Users
        </Link>
        {userId ? (
          <Typography color="text.primary">Update User</Typography>
        ) : (
          <Typography color="text.primary">Add User</Typography>
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
                    First Name<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField name="first_name" placeholder="First Name" />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Last Name<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField name="last_name" placeholder="Last Name" />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Date Of Birth</InputLabel>
                  <MagicDatePicker
                    name="dob"
                    formik={formik}
                    placeholder="Date Of Birth"
                    maxDate={moment()}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Gender</InputLabel>
                  <MagicDropDown
                    name="gender"
                    option={genderList}
                    label="gender"
                    formik={formik}
                    placeholder="Gender"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Country Code</InputLabel>
                  <MagicDropDown
                    name="country_code"
                    option={countryList.map((item) => {
                      return {
                        id: item?.id,
                        label: `${item?.label}  (+${item?.id})`,
                      };
                    })}
                    label="country_code"
                    formik={formik}
                    placeholder="Country code"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Mobile No.</InputLabel>
                  <NormalTextField name="mobile" placeholder="Mobile" />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Email<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField
                    name="email"
                    placeholder="Email"
                    disabled={userId && true}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Password{!userId && <span className="asterisk">*</span>}
                  </InputLabel>
                  <NormalTextField name="password" placeholder="Password" />
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
              {userDetails?.roles?.length == 0 ? (
                ''
              ) : (
                <Grid item xs={12} sm={6}>
                  <Module
                    formik={formik}
                    roleList={roleList}
                    permission={permission}
                    disable={userDetails?.roles?.length == 0 ? true : false}
                  />
                </Grid>
              )}
              {/* <Grid item xs={12} sm={6}>
                <Module
                  formik={formik}
                  roleList={roleList}
                  permission={permission}
                  disable={userDetails?.roles?.length == 0 ? true : false}
                />
              </Grid> */}
              {userDetails?.roles?.length == 0 ? (
                ''
              ) : (
                <Grid item xs={12} sm={6}>
                  <Departments
                    formik={formik}
                    roleList={departMent}
                    permission={permission}
                    disable={
                      userDetails?.employeeDepartments?.length == 0
                        ? true
                        : false
                    }
                  />
                </Grid>
              )}

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Active</InputLabel>
                  <CustomSwitchButton
                    name={'active'}
                    formik={formik}
                    label=""
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel> Marketing consent</InputLabel>
                  <CustomSwitchButton
                    name="marketing_consent"
                    formik={formik}
                    label=""
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Flagged</InputLabel>
                  <CustomSwitchButton
                    name={'flagged'}
                    formik={formik}
                    label=""
                  />
                </Stack>
              </Grid>
              {formik.values.flagged && (
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>Flagged Reason</InputLabel>
                    <NormalTextField
                      name="flagged_reason"
                      placeholder="Flagged Reason"
                    />
                  </Stack>
                </Grid>
              )}
              {userDetails?.roles?.length == 0 ? (
                ''
              ) : (
                <Grid item xs={12}>
                  <UserAddress
                    formik={formik}
                    areaList={areaList}
                    permission={permission}
                  />
                </Grid>
              )}

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
                    onClick={HandleCancel}
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
                        <>{userId ? 'Update' : 'Add'}</>
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

export default form;
