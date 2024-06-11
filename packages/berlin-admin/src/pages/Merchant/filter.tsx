import { Button, InputLabel, Stack } from '@mui/material';
import { Drawer } from '@mui/material';
import { Box } from '@mui/material';
import { FormikProvider } from 'formik';
import { Grid } from '@mui/material';
import { MagicDropDown, NormalTextField } from 'berlin-common';
import { MerchantOnboardingStatus, countryList } from '../../data/data';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export function Filter({
  formik,
  filterOpen,
  setFilterOpen,
  userList,
  areaList,
  cityList,
}: any) {
  const userFilterDetails = useSelector((state: any) => state?.filter);

  const setFilterHandler = () => {
    formik.setFieldValue('name', userFilterDetails?.filterDetails?.name);
    formik.setFieldValue('email', userFilterDetails?.filterDetails?.email);
    formik.setFieldValue(
      'country_code',
      userFilterDetails?.filterDetails?.country_code
    );
    formik.setFieldValue('mobile', userFilterDetails?.filterDetails?.mobile);
    formik.setFieldValue(
      'onBoardingStatus',
      userFilterDetails?.filterDetails?.onBoardingStatus
    );
    formik.setFieldValue(
      'hapidoBusinessUserId',
      userFilterDetails?.filterDetails?.hapidoBusinessUserId
    );
    formik.setFieldValue('areaId', userFilterDetails?.filterDetails?.areaId);
    formik.setFieldValue('cityId', userFilterDetails?.filterDetails?.cityId);
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
                <InputLabel>Name</InputLabel>
                <NormalTextField
                  name="name"
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Name"
                />
              </Grid>
              <Grid item mt={1} xs={12} sm={12}>
                <InputLabel>Email</InputLabel>
                <NormalTextField
                  name="email"
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Email"
                />
              </Grid>
              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Country Name</InputLabel>
                  <MagicDropDown
                    name="country_code"
                    placeholder="Select Country Code"
                    option={countryList.map((i: any) => {
                      return {
                        id: i?.id,
                        label: `${i?.label} (+${i?.id})`,
                      };
                    })}
                    formik={formik}
                  />
                </Stack>
              </Grid>
              <Grid item mt={1} xs={12} sm={12}>
                <InputLabel>Mobile Number</InputLabel>
                <NormalTextField
                  name="mobile"
                  placeholder="Mobile"
                  id="outlined-basic"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Onboarding Status </InputLabel>
                  <MagicDropDown
                    name="onBoardingStatus"
                    placeholder="Select Onboarding Status"
                    option={MerchantOnboardingStatus}
                    formik={formik}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Hapido Business User</InputLabel>
                  <MagicDropDown
                    name="hapidoBusinessUserId"
                    option={userList}
                    formik={formik}
                    placeholder="Select Hapido Business User"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Area</InputLabel>
                  <MagicDropDown
                    name="areaId"
                    option={areaList}
                    formik={formik}
                    placeholder="Select Area"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>City</InputLabel>
                  <MagicDropDown
                    name="cityId"
                    option={cityList}
                    formik={formik}
                    placeholder="Select City"
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
