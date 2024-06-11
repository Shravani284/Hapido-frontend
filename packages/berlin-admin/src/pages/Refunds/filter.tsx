import React, { useEffect } from 'react';
import { DealType, refundStatus } from '../../data/data';
import { Button, InputLabel, Stack } from '@mui/material';
import { Drawer } from '@mui/material';
import { Box } from '@mui/material';
import { FormikProvider } from 'formik';
import { Grid } from '@mui/material';
import { MagicDropDown, NormalTextField } from 'berlin-common';
import { useSelector } from 'react-redux';

function Filter({
  formik,
  filterOpen,
  setFilterOpen,
  customerList,
  dealNames,
  merchantList,
}: any) {
  const refundFilterDetails = useSelector((state: any) => state.filter);
  const { filterDetails } = refundFilterDetails;
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
                  <InputLabel>Voucher ID</InputLabel>
                  <NormalTextField
                    name="voucher_id"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Voucher ID"
                  />
                </Stack>
              </Grid>

              <Grid item mt={1} xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>Order ID</InputLabel>
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
                <Stack spacing={1}>
                  <InputLabel>Customer Name</InputLabel>
                  <MagicDropDown
                    label="Customer Name"
                    name="userId"
                    option={customerList}
                    formik={formik}
                    placeholder="Customer Name"
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
                    disabled={!formik?.values?.deal_type}
                    placeholder="Deal Name"
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
                  <InputLabel>Refund Status</InputLabel>
                  <MagicDropDown
                    label="Select Refund"
                    name="refund_status"
                    option={refundStatus}
                    formik={formik}
                    placeholder="Select Refund"
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
