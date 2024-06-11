import { Button, InputLabel, Stack } from '@mui/material';
import { Drawer } from '@mui/material';
import { Box } from '@mui/material';
import { FormikProvider } from 'formik';
import { Grid } from '@mui/material';
import {
  GroupDropDown,
  MagicDatePicker,
  MagicDropDown,
  NormalTextField,
} from 'berlin-common';

import {
  PlatformType,
  activeFilterList,
  featuredList,
  homeWidgetList,
} from '../../data/data';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export function Filter({
  formik,
  filterOpen,
  setFilterOpen,
  dealList,
  categoryList,
}: any) {
  const userFilterDetails = useSelector((state: any) => state?.filter);

  const setFilterHandler = () => {
    formik.setFieldValue(
      'bundleid',
      userFilterDetails?.filterDetails?.bundleid
    );
    formik.setFieldValue('name', userFilterDetails?.filterDetails?.name);
    formik.setFieldValue(
      'bundle_child_id',
      userFilterDetails?.filterDetails?.bundle_child_id
    );
    formik.setFieldValue(
      'categoryid',
      userFilterDetails?.filterDetails?.categoryid
    );
    formik.setFieldValue(
      'featured',
      userFilterDetails?.filterDetails?.featured
    );
    formik.setFieldValue(
      'home_widget',
      userFilterDetails?.filterDetails?.home_widget
    );
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
    formik.setFieldValue('active', userFilterDetails?.filterDetails?.active);
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
                  <InputLabel>Deal Bundle Id</InputLabel>
                  <NormalTextField
                    name="bundleid"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Enter Deal Bundle Id"
                  />
                </Stack>
              </Grid>
              <Grid item mt={1} xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>Deal Bundle Name</InputLabel>
                  <NormalTextField
                    name="name"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Enter Deal Bundle Name"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Bundle Child Deals</InputLabel>
                  <MagicDropDown
                    name="bundle_child_id"
                    option={dealList}
                    formik={formik}
                    placeholder="Select Bundle Child Deals"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Deal Categories</InputLabel>
                  <GroupDropDown
                    name="categoryid"
                    option={categoryList}
                    formik={formik}
                    placeholder="Select Deal Category"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Featured</InputLabel>
                  <MagicDropDown
                    name="featured"
                    option={featuredList}
                    formik={formik}
                    placeholder="Select Featured Status"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Home Widget</InputLabel>
                  <MagicDropDown
                    name="home_widget"
                    option={homeWidgetList}
                    formik={formik}
                    placeholder="Select Home Widget Status"
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
                    minDate={moment(formik?.values?.active_date)}
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
