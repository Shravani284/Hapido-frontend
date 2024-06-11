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
  FulfilledTemplate,
  PlatformType,
  VoucherType,
  activeFilterList,
  onboardingStatus,
  partOfGroups,
  yesNoList,
} from '../../data/data';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export function Filter({
  formik,
  filterOpen,
  setFilterOpen,
  merchantDropDown,
  categoryList,
}: any) {
  const userFilterDetails = useSelector((state: any) => state?.filter);
  const setFilterHandler = () => {
    formik.setFieldValue('dealid', userFilterDetails?.filterDetails?.dealid);
    formik.setFieldValue('name', userFilterDetails?.filterDetails?.name);
    formik.setFieldValue(
      'inventory_pricing',
      userFilterDetails?.filterDetails?.inventory_pricing
    );
    formik.setFieldValue(
      'type_pricing',
      userFilterDetails?.filterDetails?.type_pricing
    );
    formik.setFieldValue(
      'booking_deal',
      userFilterDetails?.filterDetails?.booking_deal
    );
    formik.setFieldValue(
      'categoryid',
      userFilterDetails?.filterDetails?.categoryid
    );
    formik.setFieldValue(
      'merchantid',
      userFilterDetails?.filterDetails?.merchantid
    );
    formik.setFieldValue(
      'voucher_type',
      userFilterDetails?.filterDetails?.voucher_type
    );
    formik.setFieldValue(
      'hapido_fulfilled',
      userFilterDetails?.filterDetails?.hapido_fulfilled
    );
    formik.setFieldValue(
      'template_type',
      userFilterDetails?.filterDetails?.template_type
    );
    formik.setFieldValue(
      'part_of_groups',
      userFilterDetails?.filterDetails?.part_of_groups
    );
    formik.setFieldValue(
      'not_part_of_groups',
      userFilterDetails?.filterDetails?.not_part_of_groups
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
      'onboarding_status',
      userFilterDetails?.filterDetails?.onboarding_status
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
                  <InputLabel>Deal Name</InputLabel>
                  <NormalTextField
                    name="name"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Enter Deal Name"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Inventory Variable Pricing</InputLabel>
                  <MagicDropDown
                    name="inventory_pricing"
                    option={yesNoList}
                    formik={formik}
                    placeholder="Select Type Inventory Pricing"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Type Inventory Pricing</InputLabel>
                  <MagicDropDown
                    name="type_pricing"
                    option={yesNoList}
                    formik={formik}
                    placeholder="Select Type Inventory Pricing"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Booking Deal</InputLabel>
                  <MagicDropDown
                    name="booking_deal"
                    option={yesNoList}
                    formik={formik}
                    placeholder="Select Booking Deal"
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
                  <InputLabel>Merchant</InputLabel>
                  <MagicDropDown
                    name="merchantid"
                    option={merchantDropDown}
                    formik={formik}
                    placeholder="Select Merchant"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Voucher Type</InputLabel>
                  <MagicDropDown
                    name="voucher_type"
                    option={VoucherType}
                    formik={formik}
                    placeholder="Select Voucher Type"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Hapido Fulfilled</InputLabel>
                  <MagicDropDown
                    name="hapido_fulfilled"
                    option={yesNoList}
                    formik={formik}
                    placeholder="Select Hapido Fulfilled"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Template Type</InputLabel>
                  <MagicDropDown
                    name="template_type"
                    option={FulfilledTemplate}
                    formik={formik}
                    placeholder="Select Template Type"
                  />
                </Stack>
              </Grid>
              {/* TODO */}
              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Part of group</InputLabel>
                  <MagicDropDown
                    name="groupType"
                    option={partOfGroups}
                    formik={formik}
                    placeholder="Select part of group"
                    multiple
                  />
                </Stack>
              </Grid>
              {/* TODO */}
              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Not Part of group </InputLabel>
                  <MagicDropDown
                    name="excludedGroup"
                    option={partOfGroups}
                    formik={formik}
                    placeholder="Select Not Part of group"
                    multiple
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Featured</InputLabel>
                  <MagicDropDown
                    name="featured"
                    option={yesNoList}
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
                    option={yesNoList}
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

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Deal Onboarding Status</InputLabel>
                  <MagicDropDown
                    name="onboarding_status"
                    option={onboardingStatus}
                    formik={formik}
                    placeholder="Select Deal Onboarding Status"
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
