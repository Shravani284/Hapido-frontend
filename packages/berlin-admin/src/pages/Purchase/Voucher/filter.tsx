import React, { useEffect } from 'react';
// import { DealType, refundStatus } from '../../data/data';
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
import { DealType, userPlatform, voucherStatus } from '../../../data/data';
import { useSelector } from 'react-redux';

export function Filter({
  formik,
  filterOpen,
  setFilterOpen,
  customerList,
  merchantList,
  dealNames,
}: any) {
  const voucherFilterDetails = useSelector((state: any) => state.filter);
  const { filterDetails } = voucherFilterDetails;
  const setFilterHandler = () => {
    if (filterDetails) {
      Object.keys(filterDetails).forEach((fieldName) => {
        formik.setFieldValue(fieldName, filterDetails?.[fieldName] || null);
      });
    }
  };
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
              <Grid item mt={1} xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>Order Id</InputLabel>
                  <NormalTextField
                    name="order_id"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Order ID"
                  />
                </Stack>
              </Grid>
              <Grid item mt={1} xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>Order Number</InputLabel>
                  <NormalTextField
                    name="order_number"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Order Number"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <InputLabel>User Platform</InputLabel>
                <MagicDropDown
                  label="User Platform"
                  name="user_platform"
                  option={userPlatform}
                  formik={formik}
                  placeholder="User Platform"
                />
              </Grid>

              <Grid item mt={1} xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>Voucher Code</InputLabel>
                  <NormalTextField
                    name="code"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Voucher Code"
                  />
                </Stack>
              </Grid>
              <Grid item mt={1} xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>Voucher Id</InputLabel>
                  <NormalTextField
                    name="voucher_id"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Voucher Id"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Customer Email</InputLabel>
                  <MagicDropDown
                    label="Customer Email"
                    name="userId"
                    option={customerList}
                    formik={formik}
                    placeholder="Customer Email"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Merchant Name</InputLabel>
                  <MagicDropDown
                    label="Merchant Name"
                    name="merchantId"
                    option={merchantList}
                    formik={formik}
                    placeholder="Merchant Name"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Voucher Status</InputLabel>
                  <MagicDropDown
                    label="Voucher Status"
                    name="voucher_status"
                    option={voucherStatus}
                    formik={formik}
                    placeholder="Voucher Status"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Deal Type</InputLabel>
                  <MagicDropDown
                    label="Deal Type"
                    name="deal_type"
                    option={DealType}
                    formik={formik}
                    placeholder="Deal Type"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Deal Name</InputLabel>
                  <MagicDropDown
                    label="Deal Name"
                    name="dealName"
                    option={dealNames}
                    formik={formik}
                    placeholder="Deal Name"
                    disabled={!formik?.values?.deal_type}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={2}>
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

// export default Filter;
