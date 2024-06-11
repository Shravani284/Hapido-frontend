import { Box, CircularProgress, Grid, InputLabel, Stack } from '@mui/material';
import {
  CustomSwitchButton,
  FileUpload,
  FileUploadAr,
  GroupDropDown,
  MagicDropDown,
  NormalTextField,
  constants,
} from 'berlin-common';
import { DPflashScopeType, PlatformType } from '../../../../data/data';
import { useEffect, useState } from 'react';

import { TranslationType } from '../../../category/constants/types';
import {
  setDropDownValues,
  setMultiDropDownValue,
} from '../../../../utils/dropDown';
import {
  allCombinedDeals,
  allComboList,
  allExcludeCombinedDeals,
  allExcludeComboList,
  getAllArea,
  getCategoriesSubCategories,
} from '../../../../services/dropDownService';
import { useParams } from 'react-router-dom';
import { FormHelperText } from '@mui/material';

const GeneralInfo = ({
  dpData,
  id,
  permission,
  formik,
  selectedImages,
  setSelectedImages,
  selectedVideos,
  setSelectedVideos,
  selectedImagesAr,
  setSelectedImagesAr,
  selectedVideosAr,
  setSelectedVideosAr,
}: any) => {
  const params = useParams();
  const DPID: string = params.id ? params.id : '';
  const [allCategory, setAllCategory] = useState([]);
  const [allAreaIds, setAllAreaIds] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [primaryCategory, setPrimaryCategory] = useState([]);

  const [dealExcludeList, setDealExcludeList] = useState([]);
  const [dealExcludeCombo, setDealExcludeCombo] = useState([]);

  const dropDownData = (item: any) => {
    const obj = { ...item };
    if (item.areatranslation.length > 0) {
      const title_en = item.areatranslation.find(
        (ele: TranslationType) =>
          ele.locale === 'en' && ele.column_name === 'name_trans_ids'
      );
      const title_ar = item.areatranslation.find(
        (ele: TranslationType) =>
          ele.locale === 'ar' && ele.column_name === 'name_trans_ids'
      );

      obj.label = `${title_en?.text ?? ''} ${title_ar?.text ?? ''}`;
    }
    return {
      id: item.id,
      label: obj.label,
    };
  };

  const getDropDown = (formikData: any) => {
    const dropDown = formikData.flash_scope?.id;

    formik.setFieldValue('category_ids', []);
    formik.setFieldValue('area_ids', []);

    if (dropDown) {
      setLoading(true);
      getCategoriesSubCategories()
        .then((response) => {
          setAllCategory(response);
          if (dropDown === 'CATEGORY') setAllAreaIds([]);

          if (dpData) {
            if (dpData.category_ids) {
              setMultiDropDownValue(
                response,
                dpData.category_ids.split(','),
                'category_ids',
                formik
              );
            }
            if (dpData.exclude_category_ids) {
              setMultiDropDownValue(
                response,
                dpData.exclude_category_ids?.split(','),
                'exclude_category_ids',
                formik
              );
            }
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log('error', error);
          setLoading(false);
        });

      if (dropDown === 'AREA') {
        setLoading(true);
        getAllArea()
          .then((res) => {
            setAllAreaIds(res.data.data.allAreas);
            setAllCategory([]);

            if (dpData) {
              setMultiDropDownValue(
                res.data.data.allAreas,
                dpData.area_ids.split(','),
                'area_ids',
                formik
              );
            }
            setLoading(false);
          })
          .catch((error) => {
            console.log('error', error);
            setLoading(false);
          });
      }
    } else {
      // Handle other cases if needed
      setLoading(false);
    }
  };

  useEffect(() => {
    getDropDown(formik.values);
  }, [formik.values.flash_scope?.id]);

  const getExcludeDealList = (data?: any) => {
    const categoryID = formik?.values?.category_ids
      .map((i: any) => {
        return i.id;
      })
      .join(',');

    allExcludeCombinedDeals(categoryID)
      .then((res) => {
        if (res?.success == true) {
          const dealExcludeList = res.data?.deals.map((e: any) => {
            return {
              label: e.label,
              id: e.id,
            };
          });
          setDealExcludeList(dealExcludeList);
          if (data) {
            setMultiDropDownValue(
              dealExcludeList,
              data.exclude_deal_ids?.split(','),
              'exclude_deal_ids',
              formik
            );
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getExcludeComboList = (data: any) => {
    const categoryID = formik?.values?.category_ids
      .map((i: any) => {
        return i.id;
      })
      .join(',');
    allExcludeComboList(categoryID)
      .then((res) => {
        const dealExcludeCombo = res.data.allDeals.map((item: any) => {
          return {
            label: item.label,
            id: item.id,
          };
        });
        setDealExcludeCombo(dealExcludeCombo);
        if (data) {
          setMultiDropDownValue(
            dealExcludeCombo,
            data.exclude_combo_ids.split(','),
            'exclude_combo_ids',
            formik
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (DPID) {
      if (dpData) {
        getExcludeDealList(dpData);
        getExcludeComboList(dpData);
      }
    } else {
      getExcludeDealList('');
      getExcludeComboList('');
    }
  }, [formik.values.category_ids, DPID]);

  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Title(English)<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name="title_en"
              placeholder="Enter Title (English)"
              multiline={false}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Title(Arabic)<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name="title_ar"
              placeholder="Enter Title (Arabic)"
              multiline={false}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Tagline(English)<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name="tagline_en"
              placeholder="Enter Tagline"
              multiline={false}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Tagline(Arabic)<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name="tagline_ar"
              placeholder="Enter Tagline (Arabic)"
              multiline={false}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Flash Scope<span className="asterisk">*</span>
            </InputLabel>
            <MagicDropDown
              name="flash_scope"
              option={DPflashScopeType}
              label="Flash Scope"
              formik={formik}
              placeholder="Select Flash Scope"
            />
          </Stack>
        </Grid>

        {formik.values?.flash_scope?.id === 'CATEGORY' && (
          <>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel>
                  Category Ids<span className="asterisk">*</span>
                </InputLabel>
                <Box>
                  <GroupDropDown
                    name="category_ids"
                    option={allCategory}
                    formik={formik}
                    multiple
                    placeholder="Select Categories"
                    onChange={() => {
                      formik.setFieldValue('exclude_deal_ids', []);
                      formik.setFieldValue('exclude_combo_ids', []);
                    }}
                  />
                  {isLoading && (
                    <CircularProgress
                      sx={{
                        position: 'absolute',
                        right: '70px',
                        marginTop: '-26px',
                        color: 'red',
                      }}
                      color="secondary"
                      style={{ marginRight: 5 }}
                      size={15}
                    />
                  )}
                </Box>
              </Stack>
            </Grid>

            {/* Drop downs to be added  ======>*/}

            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel>Exclude Deals</InputLabel>
                <MagicDropDown
                  name="exclude_deal_ids"
                  option={dealExcludeList}
                  label="Exclude Deal"
                  formik={formik}
                  placeholder="Select Deals to be excluded"
                  multiple
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel>Exclude Combo Deals</InputLabel>
                <MagicDropDown
                  name="exclude_combo_ids"
                  option={dealExcludeCombo}
                  label="Exclude Combo Deal"
                  formik={formik}
                  placeholder="Select Combo Deals to be excluded"
                  multiple
                />
              </Stack>
            </Grid>
          </>
        )}

        {formik.values?.flash_scope?.id === 'AREA' && (
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>
                Area<span className="asterisk">*</span>
              </InputLabel>
              <Box>
                <MagicDropDown
                  name="area_ids"
                  option={allAreaIds}
                  label="Area"
                  formik={formik}
                  placeholder="Select Area"
                  multiple
                />
                {isLoading && (
                  <CircularProgress
                    sx={{
                      position: 'absolute',
                      right: '70px',
                      marginTop: '-26px',
                      color: 'red',
                    }}
                    color="secondary"
                    style={{ marginRight: 5 }}
                    size={15}
                  />
                )}
              </Box>
            </Stack>
          </Grid>
        )}

        {formik.values?.flash_scope?.id === 'PRICE' && (
          <>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel>
                  Price Start<span className="asterisk">*</span>
                </InputLabel>
                <NormalTextField
                  name="price_start"
                  placeholder="Price Start Amount"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel>
                  Price End<span className="asterisk">*</span>
                </InputLabel>
                <NormalTextField
                  name="price_end"
                  placeholder="Price End Amount"
                />
              </Stack>
            </Grid>
          </>
        )}

        {formik.values?.flash_scope?.id === 'COMMISSION_PERCENT' && (
          <>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel>
                  Commission Percentage Start<span className="asterisk">*</span>
                </InputLabel>
                <NormalTextField
                  name="commission_percentage_start"
                  placeholder="Commission Percentage Start"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel>
                  Commission Percentage End<span className="asterisk">*</span>
                </InputLabel>
                <NormalTextField
                  name="commission_percentage_end"
                  placeholder="Commission Percentage End"
                />
              </Stack>
            </Grid>
          </>
        )}
        {formik.values?.flash_scope?.id !== 'CATEGORY' &&
          formik.values?.flash_scope !== null && (
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel>Exclude Categories</InputLabel>
                <GroupDropDown
                  name="exclude_category_ids"
                  option={allCategory}
                  label="Enter Category"
                  formik={formik}
                  placeholder="Select Category"
                  multiple={true}
                />
              </Stack>
            </Grid>
          )}
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Discount Percent<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name="discount_percent"
              placeholder=" Discount Percent"
            />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Priority<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField name="priority" placeholder="Priority" />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Platform<span className="asterisk">*</span>
            </InputLabel>
            <MagicDropDown
              multiple={false}
              name="platform"
              option={PlatformType}
              label="Select Platform"
              formik={formik}
              placeholder="Select Platform"
            />
          </Stack>
        </Grid>
        {id && (
          <>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel>Upload Image (Single)</InputLabel>
                <FormHelperText id="standard-weight-helper-text-email-login">
                  {'Note: Image resolution 350x350, Max Size - 10 MB Per File'}
                </FormHelperText>
                <FileUpload
                  disabled={
                    permission === 'WRITE' || permission === 'FULL'
                      ? false
                      : true
                  }
                  name={'image_id'}
                  // tableName="flash_dp"
                  tableName={{ name: 'flash_dp', id: id }}
                  onSelect={(data: constants.types.fileType[]) => {
                    setSelectedImages(data);
                  }}
                  multiSelect={false}
                  files={selectedImages}
                  accept="image/*"
                  type="image"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel>Upload Image (Arabic) (Single)</InputLabel>
                <FormHelperText id="standard-weight-helper-text-email-login">
                  {'Note: Image resolution 350x350, Max Size - 10 MB Per File'}
                </FormHelperText>
                <FileUploadAr
                  disabled={
                    permission === 'WRITE' || permission === 'FULL'
                      ? false
                      : true
                  }
                  name={'image_id_ar'}
                  // tableName="flash_dp"
                  tableName={{ name: 'flash_dp', id: id }}
                  onSelect={(data: constants.types.fileType[]) => {
                    setSelectedImagesAr(data);
                  }}
                  multiSelect={false}
                  files={selectedImagesAr}
                  accept="image/*"
                  type="image"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel>Upload Video (Single)</InputLabel>
                <FormHelperText id="standard-weight-helper-text-email-login">
                  {
                    'Note: Video resolution 1637x828,  Max Size - 200 MB Per File'
                  }
                </FormHelperText>
                <FileUpload
                  disabled={
                    permission === 'WRITE' || permission === 'FULL'
                      ? false
                      : true
                  }
                  name={'video_id'}
                  tableName={{ name: 'flash_dp', id: id }}
                  onSelect={(data: constants.types.fileType[]) => {
                    setSelectedVideos(data);
                  }}
                  multiSelect={false}
                  files={selectedVideos}
                  accept="video/*"
                  type="video"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel>Upload Video (Arabic) (Single)</InputLabel>
                <FormHelperText id="standard-weight-helper-text-email-login">
                  {
                    'Note: Video resolution 1637x828,  Max Size - 200 MB Per File'
                  }
                </FormHelperText>
                <FileUploadAr
                  disabled={
                    permission === 'WRITE' || permission === 'FULL'
                      ? false
                      : true
                  }
                  name={'video_id_ar'}
                  tableName={{ name: 'flash_dp', id: id }}
                  onSelect={(data: constants.types.fileType[]) => {
                    setSelectedVideosAr(data);
                  }}
                  multiSelect={false}
                  files={selectedVideosAr}
                  accept="video/*"
                  type="video"
                />
              </Stack>
            </Grid>
          </>
        )}
        <Grid item xs={12} sm={3}>
          <InputLabel>Active</InputLabel>
          <CustomSwitchButton name={'active'} formik={formik} label="" />
        </Grid>
      </Grid>
    </>
  );
};

export default GeneralInfo;
