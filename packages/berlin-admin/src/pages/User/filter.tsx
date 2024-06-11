import React, { useEffect, useState } from 'react';
import { countryList, filterToogleOption, userPlatform } from '../../data/data';
import { Button, InputLabel, Stack } from '@mui/material';
import { Drawer } from '@mui/material';
import { Box } from '@mui/material';
import { FormikProvider } from 'formik';
import { Grid } from '@mui/material';
import {
  CustomSwitchButton,
  MagicDropDown,
  NormalTextField,
} from 'berlin-common';
import { getAllModule } from '../../services/userService';
import { useSelector } from 'react-redux';

function Filter({ formik, filterOpen, setFilterOpen }: any) {
  const userFilterDetails = useSelector((state: any) => state.filter);
  const [roleList, setRoleList] = useState([]);

  const setFilterHandler = () => {
    formik.setFieldValue(
      'first_name',
      userFilterDetails?.filterDetails?.first_name
    );
    formik.setFieldValue(
      'last_name',
      userFilterDetails?.filterDetails?.last_name
    );
    formik.setFieldValue('email', userFilterDetails?.filterDetails?.email);
    formik.setFieldValue(
      'country_code',
      userFilterDetails?.filterDetails?.country_code
    );
    formik.setFieldValue('mobile', userFilterDetails?.filterDetails?.mobile);
    formik.setFieldValue('locale', userFilterDetails?.filterDetails?.locale);
    formik.setFieldValue(
      'module_id',
      userFilterDetails?.filterDetails?.module_id
    );
    formik.setFieldValue(
      'user_platform',
      userFilterDetails?.filterDetails?.user_platform
    );
    formik.setFieldValue('active', userFilterDetails?.filterDetails?.active);
  };

  const getModule = (data?: any) => {
    getAllModule()
      .then((res) => {
        setRoleList(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getModule();
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
              <Grid item mt={1} xs={12} sm={12}>
                <InputLabel>First Name</InputLabel>
                <NormalTextField
                  name="first_name"
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="First Name"
                />
              </Grid>

              <Grid item mt={1} xs={12} sm={12}>
                <InputLabel>Last Name</InputLabel>
                <NormalTextField
                  name="last_name"
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Last Name"
                />
              </Grid>
              <Grid item mt={1} xs={12} sm={12}>
                <InputLabel>Email</InputLabel>
                <NormalTextField
                  name="email"
                  placeholder="Email"
                  id="outlined-basic"
                  variant="outlined"
                />
              </Grid>
              <Grid item mt={1} xs={12} sm={12}>
                <InputLabel>Country Code</InputLabel>
                <MagicDropDown
                  label="Country code"
                  name="country_code"
                  option={countryList.map((item) => {
                    return {
                      id: item?.id,
                      label: `${item?.label}  (+${item?.id})`,
                    };
                  })}
                  formik={formik}
                  placeholder="Country code"
                />
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

              <Grid item mt={1} xs={12} sm={12}>
                <InputLabel>Locale</InputLabel>
                <NormalTextField
                  name="locale"
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Locale"
                />
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <InputLabel>Module</InputLabel>
                <MagicDropDown
                  label="Module"
                  name="module_id"
                  option={roleList}
                  formik={formik}
                  placeholder="Module"
                />
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
                <Stack spacing={1}>
                  <InputLabel>Active</InputLabel>
                  <MagicDropDown
                    label="Active"
                    name="active"
                    option={filterToogleOption}
                    formik={formik}
                    placeholder="Active"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
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
