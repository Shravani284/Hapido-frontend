import { Box, CircularProgress, Grid, InputLabel, Stack } from '@mui/material';
import {
  CustomSwitchButton,
  FileUpload,
  FileUploadAr,
  MagicDropDown,
  NormalTextField,
  constants,
} from 'berlin-common';
import { DealType, PlatformType } from '../../../../data/data';
import { useEffect, useState } from 'react';

import { TranslationType } from '../../../category/constants/types';
import {
  setDropDownValues,
  setMultiDropDownValue,
} from '../../../../utils/dropDown';
import {
  allComboList,
  allBundleList,
  allDealsList,
} from '../../../../services/commonService';
import {
  allDealListDD,
  excludeDealBundle,
} from '../../../../services/dropDownService';
import { FormHelperText } from '@mui/material';

const GeneralInfo = ({
  id,
  formik,
  permission,
  bogoData,
  selectedImages,
  setSelectedImages,
  selectedVideos,
  setSelectedVideos,
  selectedImagesAr,
  setSelectedImagesAr,
  selectedVideosAr,
  setSelectedVideosAr,
}: any) => {
  const [allDealsID, setAllDealsID] = useState([]);
  const [allDeals, setAllDeals] = useState([]);
  const [dealsExclude, setDealsExclude] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getDeals = (data?: any) => {
    if (formik.values?.deal_type?.id) {
      allDealListDD(formik.values?.deal_type?.id)
        .then((res) => {
          if (res?.success == true) {
            setAllDealsID(res?.data?.allDeals);
            if (bogoData) {
              setDropDownValues(
                res?.data?.allDeals,
                bogoData,
                'deal_id',
                formik
              );
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getExcludeDeals = (ExcludeDealsData: any) => {
    const dealID = ExcludeDealsData?.deal_id;
    if (dealID) {
      excludeDealBundle(dealID ? dealID?.id : '')
        .then((res) => {
          setDealsExclude(res?.data?.allDeals);
          if (bogoData) {
            setMultiDropDownValue(
              res?.data?.allDeals,
              bogoData.deal_exclude_option_ids?.split(','),
              'deal_exclude_option_ids',
              formik
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getDeals(formik.values);
  }, [formik.values.deal_type?.id]);

  useEffect(() => {
    getExcludeDeals(formik.values);
  }, [formik.values.deal_id?.id]);

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
              Deal Type<span className="asterisk">*</span>
            </InputLabel>

            <MagicDropDown
              name="deal_type"
              option={DealType}
              label="Deal Type"
              formik={formik}
              placeholder="Select Deal Type"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Deal ID<span className="asterisk">*</span>
            </InputLabel>
            <Box>
              <MagicDropDown
                name="deal_id"
                option={allDealsID}
                label="Deal Type"
                formik={formik}
                placeholder="Select Deal Type"
                onChange={(e) => {
                  formik.setFieldValue('deal_exclude_option_ids', []);
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
        {formik.values?.deal_type?.id === 'BUNDLE' && (
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>Deal Exclude</InputLabel>
              <MagicDropDown
                multiple={true}
                name="deal_exclude_option_ids"
                option={dealsExclude || []}
                label="Select Deal Exclude"
                formik={formik}
                placeholder="Select Select Deal Exclude"
              />
            </Stack>
          </Grid>
        )}
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
                  tableName={{ name: 'flash_bogo', id: id }}
                  onSelect={(data: constants.types.fileType[]) => {
                    setSelectedImages(data);
                  }}
                  multiSelect={false}
                  files={selectedImages}
                  type="image"
                  accept="image/*"
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
                  tableName={{ name: 'flash_bogo', id: id }}
                  onSelect={(data: constants.types.fileType[]) => {
                    setSelectedImagesAr(data);
                  }}
                  multiSelect={false}
                  files={selectedImagesAr}
                  type="image"
                  accept="image/*"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel>Upload Video (Single)</InputLabel>
                <FormHelperText id="standard-weight-helper-text-email-login">
                  {
                    'Note: Video resolution 1637x828, Max Size - 200 MB Per File'
                  }
                </FormHelperText>
                <FileUpload
                  disabled={
                    permission === 'WRITE' || permission === 'FULL'
                      ? false
                      : true
                  }
                  accept={'video/*'}
                  name={'video_id'}
                  tableName={{ name: 'flash_bogo', id: id }}
                  onSelect={(data: constants.types.fileType[]) => {
                    setSelectedVideos(data);
                  }}
                  type="video"
                  multiSelect={false}
                  files={selectedVideos}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel>Upload Video (Arabic) (Single)</InputLabel>
                <FormHelperText id="standard-weight-helper-text-email-login">
                  {
                    'Note: Video resolution 1637x828, Max Size - 200 MB Per File'
                  }
                </FormHelperText>
                <FileUploadAr
                  disabled={
                    permission === 'WRITE' || permission === 'FULL'
                      ? false
                      : true
                  }
                  accept={'video/*'}
                  name={'video_id_ar'}
                  tableName={{ name: 'flash_bogo', id: id }}
                  onSelect={(data: constants.types.fileType[]) => {
                    setSelectedVideosAr(data);
                  }}
                  type="video"
                  multiSelect={false}
                  files={selectedVideosAr}
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
