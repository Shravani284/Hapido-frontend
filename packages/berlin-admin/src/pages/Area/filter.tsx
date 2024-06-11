import { useEffect, useState } from 'react';
import { Button, InputLabel, Stack } from '@mui/material';
import { Drawer } from '@mui/material';
import { Box } from '@mui/material';
import { Field, FormikProvider } from 'formik';
import { Grid } from '@mui/material';
import { MagicDropDown, NormalTextField } from 'berlin-common';
import { activeFilterList, filterCountrySort } from '../../data/data';
import { getCityDropDown } from '../../services/geoGraphyService';
import useConfig from '../../hooks/useConfig';
import {
  getAllCities,
  getCountryDropDown,
} from '../../services/dropDownService';
import { useSelector } from 'react-redux';

function AreaFilter({ formik, filterOpen, setFilterOpen }: any) {
  const userFilterDetails = useSelector((state: any) => state.filter);
  const [countryData, setCountryData] = useState<
    { id: string; label: string }[]
  >([]);
  const [cityList, setCityList] = useState([]);
  const [filterCityList, setFilterCityList] = useState([]);

  const { i18n } = useConfig();

  const setFilterHandler = () => {
    formik.setFieldValue(
      'areaName',
      userFilterDetails?.filterDetails?.areaName
    );
    formik.setFieldValue(
      'filterSort',
      userFilterDetails?.filterDetails?.filterSort
    );
    formik.setFieldValue(
      'filterCountry',
      userFilterDetails?.filterDetails?.filterCountry
    );
    formik.setFieldValue(
      'filterCity',
      userFilterDetails?.filterDetails?.filterCity
    );
    formik.setFieldValue(
      'filterStatus',
      userFilterDetails?.filterDetails?.filterStatus
    );
  };

  useEffect(() => {
    setFilterHandler();
  }, [filterOpen]);

  useEffect(() => {
    getCountryDropDown()
      .then((res) => {
        if (res.data.success) {
          setCountryData(res.data.data.allCountries);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    getAllCities()
      .then((res) => {
        if (res.success) {
          setCityList(res.data.allCities);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const finalcity = () => {
    setFilterCityList(
      cityList.filter((i) => i.countryId == formik.values.filterCountry?.id)
    );
  };
  useEffect(() => {
    finalcity();
  }, [formik.values.filterCountry]);
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
                  <InputLabel>Area Name</InputLabel>
                  <NormalTextField
                    name="areaName"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Enter Area Name"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Sort</InputLabel>
                  <MagicDropDown
                    label="Sort"
                    name="filterSort"
                    option={filterCountrySort}
                    formik={formik}
                    placeholder="Select Sort"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Select Country</InputLabel>
                  <MagicDropDown
                    label="Select Country"
                    name="filterCountry"
                    option={countryData}
                    formik={formik}
                    placeholder="Select Country"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Select City</InputLabel>
                  <MagicDropDown
                    label="Select City"
                    name="filterCity"
                    option={filterCityList}
                    formik={formik}
                    placeholder="Select City"
                    disabled={!formik.values.filterCountry}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Area Status</InputLabel>
                  <MagicDropDown
                    label="Area Status"
                    name="filterStatus"
                    option={activeFilterList}
                    formik={formik}
                    placeholder="Select Area Status"
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

export default AreaFilter;
