import React, { useEffect } from 'react';
// import { DealType, refundStatus } from '../../data/data';
import { Button, InputLabel, Stack } from '@mui/material';
import { Drawer } from '@mui/material';
import { Box } from '@mui/material';
import { FormikProvider } from 'formik';
import { Grid } from '@mui/material';
import { NormalTextField } from 'berlin-common';
import { useSelector } from 'react-redux';

export function Filter({ formik, filterOpen, setFilterOpen }: any) {
  const orderUtmFilterDetails = useSelector((state: any) => state.filter);
  const { filterDetails } = orderUtmFilterDetails;
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
              <Grid item mt={1} xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>UTM Campaign</InputLabel>
                  <NormalTextField
                    name="utm_campaign"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="UTM Campaign"
                  />
                </Stack>
              </Grid>
              <Grid item mt={1} xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>UTM Medium</InputLabel>
                  <NormalTextField
                    name="utm_medium"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="UTM Medium"
                  />
                </Stack>
              </Grid>
              <Grid item mt={1} xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>UTM Source</InputLabel>
                  <NormalTextField
                    name="utm_source"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="UTM Source"
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
