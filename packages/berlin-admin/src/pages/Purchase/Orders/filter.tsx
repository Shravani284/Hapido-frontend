import React, { useEffect } from 'react';
// import { DealType, refundStatus } from '../../data/data';
import { Button, InputLabel, Stack } from '@mui/material';
import { Drawer } from '@mui/material';
import { Box } from '@mui/material';
import { FormikProvider } from 'formik';
import { Grid } from '@mui/material';
import { MagicDatePicker, MagicDropDown, NormalTextField } from 'berlin-common';
import { paymentStatus, userPlatform } from '../../../data/data';
import { useSelector } from 'react-redux';

function Filter({
  formik,
  filterOpen,
  setFilterOpen,
  customerList, //   dealNames,
  //   merchantList,
}: any) {
  const orderFilterDetails = useSelector((state: any) => state.filter);
  const { filterDetails } = orderFilterDetails;
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
                  <InputLabel> Order ID</InputLabel>
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
                  <InputLabel> Order Number</InputLabel>
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

              <Grid item xs={12} sm={12} mt={1}>
                <InputLabel> Date Created Range</InputLabel>
                <Stack spacing={1}>
                  <MagicDatePicker
                    label="Start Date"
                    name="start_date"
                    placeholder="Date Created"
                    formik={formik}
                  />
                  <MagicDatePicker
                    label="End Date"
                    name="end_date"
                    placeholder="Date Created"
                    formik={formik}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} mt={1}>
                <InputLabel> Date Paid Range</InputLabel>
                <Stack spacing={1}>
                  <MagicDatePicker
                    label="Start Date"
                    name="paidStartDate"
                    placeholder="Date Created"
                    formik={formik}
                  />
                  <MagicDatePicker
                    label="End Date"
                    name="paidEndDate"
                    placeholder="Date Created"
                    formik={formik}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Payment Status</InputLabel>
                  <MagicDropDown
                    label="Payment Status"
                    name="payment_status"
                    option={paymentStatus}
                    formik={formik}
                    placeholder="Payment Status"
                  />
                </Stack>
              </Grid>

              <Grid item mt={1} xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>Transaction Reference</InputLabel>
                  <NormalTextField
                    name="transaction_reference"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Transaction Reference"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Customer Email</InputLabel>
                  <MagicDropDown
                    label="Customer Email"
                    name="user_id"
                    option={customerList}
                    formik={formik}
                    placeholder="Customer Email"
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

export default Filter;
