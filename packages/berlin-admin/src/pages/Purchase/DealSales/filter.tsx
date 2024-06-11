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
import { DatePaidFormat } from 'berlin-common/src/components/DateFormat';
import moment from 'moment';

function Filter({
  formik,
  filterOpen,
  setFilterOpen, //   merchantList,
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

  const maxDate = formik.values?.paidStartDate
    ? moment(formik.values?.paidStartDate, 'DD-MM-YYYY').add(15, 'days')
    : null;

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
              <Grid item xs={12} sm={12} mt={1}>
                <InputLabel> Date Paid Range</InputLabel>
                <Stack spacing={1}>
                  <MagicDatePicker
                    label="Start Date"
                    name="paidStartDate"
                    placeholder="Date Created"
                    formik={formik}
                    disableFuture={true}
                  />
                  <MagicDatePicker
                    disabled={!formik?.values?.paidStartDate}
                    label="End Date"
                    name="paidEndDate"
                    placeholder="Date Created"
                    formik={formik}
                    maxDate={maxDate}
                    disableFuture={true}
                    minDate={formik?.values?.paidStartDate}
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
