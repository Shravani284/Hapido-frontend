import React, { useEffect, useState } from 'react';
import {
  PlatformType,
  activeStatus,
  activeTorF,
  countryList,
  couponScope,
  couponType,
  filterToogleOption,
  firstPurchase,
  promoReusable,
} from '../../data/data';
import { Button, InputLabel, Stack } from '@mui/material';
import { Drawer } from '@mui/material';
import { Box } from '@mui/material';
import { FormikProvider } from 'formik';
import { Grid } from '@mui/material';
import {
  CustomSwitchButton,
  MagicDatePicker,
  MagicDropDown,
  NormalTextField,
} from 'berlin-common';
import { getAllModule } from '../../services/userService';
import { getAllUser } from '../../services/dropDownService';
// import { getAllUser } from '../../services/commonService';
import moment from 'moment';
import { useSelector } from 'react-redux';

function Filter({ formik, filterOpen, setFilterOpen }: any) {
  const userFilterDetails = useSelector((state: any) => state?.filter);
  const [userList, setUserList] = useState([]);

  const setFilterHandler = () => {
    formik.setFieldValue('code', userFilterDetails?.filterDetails?.code);
    formik.setFieldValue(
      'coupon_type',
      userFilterDetails?.filterDetails?.coupon_type
    );
    formik.setFieldValue(
      'coupon_scope',
      userFilterDetails?.filterDetails?.coupon_scope
    );
    formik.setFieldValue(
      'is_reusable',
      userFilterDetails?.filterDetails?.is_reusable
    );
    formik.setFieldValue(
      'first_purchase_only',
      userFilterDetails?.filterDetails?.first_purchase_only
    );
    formik.setFieldValue('user_id', userFilterDetails?.filterDetails?.user_id);
    formik.setFieldValue(
      'platform',
      userFilterDetails?.filterDetails?.platform
    );
    formik.setFieldValue(
      'active_date',
      userFilterDetails?.filterDetails?.active_date
    );
    formik.setFieldValue(
      'end_date',
      userFilterDetails?.filterDetails?.end_date
    );
    formik.setFieldValue('Active', userFilterDetails?.filterDetails?.active);
  };

  const getUserList = () => {
    getAllUser()
      .then((res) => {
        setUserList(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    setFilterHandler();
  }, [filterOpen]);

  return (
    <Drawer
      anchor={'right'}
      open={filterOpen}
      onClose={() => setFilterOpen(false)}
    >
      <Box p={2}>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container width={200}>
              <Grid item mt={2} xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel> Promo Code </InputLabel>
                  <NormalTextField
                    name="code"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Promo Code"
                  />
                </Stack>
              </Grid>
              <Grid item mt={2} xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>
                    Coupon Type<span className="asterisk">*</span>
                  </InputLabel>
                  <MagicDropDown
                    name="coupon_type"
                    option={couponType}
                    label="Coupon Type"
                    formik={formik}
                    placeholder="Select Coupon Type"
                  />
                </Stack>
              </Grid>
              <Grid item mt={2} xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>
                    Coupon Scope<span className="asterisk">*</span>
                  </InputLabel>
                  <MagicDropDown
                    name="coupon_scope"
                    option={couponScope}
                    label="Enter Coupon Scope"
                    formik={formik}
                    placeholder="Coupon Scope"
                  />
                </Stack>
              </Grid>
              <Grid item mt={2} xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>
                    Coupon Reusability<span className="asterisk">*</span>
                  </InputLabel>
                  <MagicDropDown
                    name="is_reusable"
                    option={promoReusable}
                    label="Coupon Reusability"
                    formik={formik}
                    placeholder="Coupon Reusability"
                  />
                </Stack>
              </Grid>
              <Grid item mt={2} xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>
                    First Purchase Only<span className="asterisk">*</span>
                  </InputLabel>
                  <MagicDropDown
                    name="first_purchase_only"
                    option={firstPurchase}
                    label="First Purchase Only"
                    formik={formik}
                    placeholder="First Purchase Only"
                  />
                </Stack>
              </Grid>
              <Grid item mt={2} xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>User</InputLabel>
                  <MagicDropDown
                    name="user_id"
                    option={userList}
                    label="User"
                    formik={formik}
                    placeholder="Select User"
                  />
                </Stack>
              </Grid>

              <Grid item mt={2} xs={12} sm={12}>
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

              {/* <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Status</InputLabel>
                  <MagicDropDown
                    label="Status"
                    name="status"
                    option={activeStatus}
                    formik={formik}
                    placeholder="Status"
                  />
                </Stack>
              </Grid> */}
              <Grid item mt={2} xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>Start Deal Date</InputLabel>
                  <MagicDatePicker name="active_date" formik={formik} />
                </Stack>
              </Grid>
              <Grid item mt={1} xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>End Deal Date</InputLabel>
                  <MagicDatePicker
                    name="end_date"
                    formik={formik}
                    disabled={!formik?.values?.active_date}
                    minDate={moment(formik?.values?.active_date)}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Active</InputLabel>
                  <MagicDropDown
                    label="Active"
                    name="active"
                    option={activeTorF}
                    formik={formik}
                    placeholder="Active"
                  />
                </Stack>
              </Grid>

              <Grid item mt={2} xs={12} sm={12}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={2}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      formik.resetForm();
                      formik.handleSubmit();
                    }}
                  >
                    Reset
                  </Button>
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </FormikProvider>
      </Box>
    </Drawer>
  );
}

export default Filter;
