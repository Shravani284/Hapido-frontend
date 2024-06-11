import { Button, InputLabel, Stack } from '@mui/material';
import { Drawer } from '@mui/material';
import { Box } from '@mui/material';
import { FormikProvider } from 'formik';
import { Grid } from '@mui/material';
import { MagicDatePicker, MagicDropDown, NormalTextField } from 'berlin-common';
import {
  DealType,
  PlatformType,
  PromoType,
  activeFilterList,
} from '../../data/data';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export function Filter({ formik, filterOpen, setFilterOpen }: any) {
  const bogoFilterDetails = useSelector((state: any) => state.filter);
  const { filterDetails } = bogoFilterDetails;
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
                  <InputLabel>Deal Id</InputLabel>
                  <NormalTextField
                    name="dealid"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Enter Deal Id"
                  />
                </Stack>
              </Grid>
              <Grid item mt={1} xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>Entitlement Mode</InputLabel>
                  <MagicDropDown
                    name="entitlement_mode"
                    option={PromoType}
                    formik={formik}
                    placeholder="Select Entitlement Mode"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Platform</InputLabel>
                  <MagicDropDown
                    name="platform"
                    option={PlatformType}
                    formik={formik}
                    placeholder="Select Platform"
                  />
                </Stack>
              </Grid>

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
                    minDate={formik?.values?.active_date}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Active</InputLabel>
                  <MagicDropDown
                    name="active"
                    option={activeFilterList}
                    formik={formik}
                    placeholder="Select active"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} mt={3}>
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
