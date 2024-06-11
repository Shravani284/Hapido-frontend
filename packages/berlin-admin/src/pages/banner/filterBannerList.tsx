import React, { useEffect, useState } from 'react';
// import { DealType, refundStatus } from '../../data/data';
import { Button, InputLabel, Stack } from '@mui/material';
import { Drawer } from '@mui/material';
import { Box } from '@mui/material';
import { FormikProvider } from 'formik';
import { Grid } from '@mui/material';
import {
  CustomSwitchButton,
  GroupDropDown,
  MagicDatePicker,
  MagicDropDown,
  NormalTextField,
} from 'berlin-common';
import {
  DealType,
  PlatformType,
  bannerModule,
  activeStatus,
  bannerType,
  targetModule,
} from '../../data/data';

import {
  allDealListDD,
  getAllCities,
  getCategoriesSubCategories,
  tagDropDown,
} from '../../services/dropDownService';
import { bannerPlacementID } from '../../services/dropDownService';
import { useSelector } from 'react-redux';

function Filter({
  formik,
  filterOpen,
  setFilterOpen, // customerList,
  //   dealNames,
} //   merchantList,
: any) {
  const userFilterDetails = useSelector((state: any) => state.filter);
  const [placementList, setPlacementList] = useState<any>([]);
  const [categoryList, setCategoryList] = useState<any>([]);
  // const [dealIdList, setDealIdList] = useState<any>([]);
  const [tagList, setTagList] = useState<any>([]);
  const [cityList, setCityList] = useState<any>([]);
  const [dealNames, setDealNames] = useState<any>([]);

  const setFilterHandler = () => {
    formik.setFieldValue(
      'campaign_name',
      userFilterDetails?.filterDetails?.campaign_name
    );
    formik.setFieldValue(
      'banner_type',
      userFilterDetails?.filterDetails?.banner_type
    );
    formik.setFieldValue(
      'banner_module',
      userFilterDetails?.filterDetails?.banner_module
    );
    formik.setFieldValue(
      'banner_placement_id',
      userFilterDetails?.filterDetails?.banner_placement_id
    );
    formik.setFieldValue(
      'target_module',
      userFilterDetails?.filterDetails?.target_module
    );
    formik.setFieldValue(
      'target_deal_type',
      userFilterDetails?.filterDetails?.target_deal_type
    );
    formik.setFieldValue(
      'target_deal_id',
      userFilterDetails?.filterDetails?.target_deal_id
    );
    formik.setFieldValue(
      'targetcategory',
      userFilterDetails?.filterDetails?.targetcategory
    );
    formik.setFieldValue(
      'target_tag_id',
      userFilterDetails?.filterDetails?.target_tag_id
    );
    formik.setFieldValue(
      'search_term',
      userFilterDetails?.filterDetails?.search_term
    );
    formik.setFieldValue('city_id', userFilterDetails?.filterDetails?.city_id);
    formik.setFieldValue(
      'platform',
      userFilterDetails?.filterDetails?.platform
    );
    formik.setFieldValue('status', userFilterDetails?.filterDetails?.status);
  };

  useEffect(() => {
    setFilterHandler();
  }, [filterOpen]);

  const getAllPlacementId = () => {
    bannerPlacementID()
      .then((response) => {
        const banners = response.data.data?.map((item: any) => {
          return {
            id: item.id,
            label: item.label,
          };
        });
        setPlacementList(banners);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllPlacementId();
  }, []);

  const getCategoryList = () => {
    getCategoriesSubCategories()
      .then((response) => {
        setCategoryList(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCategoryList();
  }, []);

  const getAllTags = () => {
    tagDropDown()
      .then((res) => {
        if (res.success) {
          const allTagList = res?.data?.allTags;
          setTagList(allTagList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllTags();
  }, []);

  const getAllCity = () => {
    getAllCities()
      .then((res) => {
        if (res.success) {
          setCityList(res.data.allCities);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllCity();
  }, []);

  const getDealIds = (data?: any) => {
    if (formik.values?.target_deal_type?.id) {
      allDealListDD(formik.values?.target_deal_type?.id)
        .then((res) => {
          if (res?.success == true) {
            setDealNames(res?.data?.allDeals);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getDealIds();
  }, [formik.values?.target_deal_type?.id]);

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
                  <InputLabel> Campaign Name </InputLabel>
                  <NormalTextField
                    name="campaign_name"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Campaign Name "
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>Banner Type</InputLabel>
                  <MagicDropDown
                    name="banner_type"
                    option={bannerType}
                    label="banner_type"
                    formik={formik}
                    placeholder="Banner Type"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>Banner Module</InputLabel>
                  <MagicDropDown
                    name="banner_module"
                    option={bannerModule}
                    label="banner_module"
                    formik={formik}
                    placeholder="Banner Module"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>Banner Placement</InputLabel>
                  <MagicDropDown
                    name="banner_placement_id"
                    placeholder="Banner Placement"
                    option={placementList}
                    label="banner_placement_id"
                    formik={formik}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>Target Module</InputLabel>
                  <MagicDropDown
                    name="target_module"
                    placeholder="Target Module"
                    option={targetModule}
                    label="Target Module"
                    formik={formik}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>Target Deal Type</InputLabel>
                  {/* <NormalTextField /> */}
                  <MagicDropDown
                    label="Deal Type"
                    name="target_deal_type"
                    option={DealType}
                    formik={formik}
                    placeholder="Deal Type"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>Target Deal Id</InputLabel>
                  {/* <NormalTextField /> */}
                  <MagicDropDown
                    name="target_deal_id"
                    placeholder="Target Deal Id"
                    option={dealNames}
                    label="target_deal_id"
                    formik={formik}
                    // placeholder="Banner Module"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>Target Category</InputLabel>
                  <GroupDropDown
                    name="targetcategory"
                    option={categoryList}
                    label="Target Category"
                    formik={formik}
                    placeholder="Target Category"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>Target Tag</InputLabel>
                  <MagicDropDown
                    name="target_tag_id"
                    placeholder="Target Tag"
                    option={tagList}
                    label="Target Tag"
                    formik={formik}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>Search Term</InputLabel>
                  <NormalTextField
                    name="search_term"
                    placeholder="Search Term"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>City</InputLabel>
                  <MagicDropDown
                    name="city_id"
                    placeholder="City"
                    option={cityList}
                    label="city_id"
                    formik={formik}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>Platform</InputLabel>
                  <MagicDropDown
                    name="platform"
                    placeholder="Platform"
                    option={PlatformType}
                    label="platform"
                    formik={formik}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>Active</InputLabel>
                  <MagicDropDown
                    name="status"
                    placeholder="Status"
                    option={activeStatus}
                    label="Status"
                    formik={formik}
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
