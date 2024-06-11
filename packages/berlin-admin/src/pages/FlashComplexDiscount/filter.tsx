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
  DPflashScopeType,
  MerchantOnboardingStatus,
  PlatformType,
  activeFilterList,
  countryList,
} from '../../data/data';
import { useEffect, useState } from 'react';
import moment from 'moment';
import {
  getAllArea,
  getCategoriesSubCategories,
} from '../../services/dropDownService';
import { useSelector } from 'react-redux';

export function Filter({ formik, filterOpen, setFilterOpen }: any) {
  const [categoriesList, setCatetgoriesList] = useState([]);
  const [areaList, setAreaList] = useState([]);
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

  const getCategoryList = () => {
    getCategoriesSubCategories()
      .then((response) => {
        setCatetgoriesList(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAreaList = (data?: any) => {
    getAllArea()
      .then((res) => {
        setAreaList(res.data.data.allAreas);
        if (data) {
          formik.setFieldValue(
            'area',
            res.data.data.allAreas.find(
              (obj: any) => obj.id === data['area'].id
            )
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCategoryList();
    getAreaList();
  }, []);

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
                <Stack spacing={1}>
                  <InputLabel>Flash Scope</InputLabel>
                  <MagicDropDown
                    name="scope"
                    option={DPflashScopeType}
                    formik={formik}
                    placeholder="Select flash scope"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Area</InputLabel>
                  <MagicDropDown
                    name="areas"
                    option={areaList}
                    formik={formik}
                    placeholder="Select Area"
                    multiple
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Categories</InputLabel>
                  <GroupDropDown
                    name="categories"
                    option={categoriesList}
                    formik={formik}
                    placeholder="Select Categories"
                    multiple
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
                  <MagicDatePicker name="fs_active_date" formik={formik} />
                </Stack>
              </Grid>

              <Grid item mt={1} xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>End Deal Date</InputLabel>
                  <MagicDatePicker
                    name="fs_end_date"
                    formik={formik}
                    disabled={!formik?.values?.fs_active_date}
                    minDate={moment(formik?.values?.fs_active_date)}
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
