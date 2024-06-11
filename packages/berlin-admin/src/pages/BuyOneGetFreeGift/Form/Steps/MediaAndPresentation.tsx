import { FormHelperText, InputLabel } from '@mui/material';
import { Stack } from '@mui/material';
import { Grid } from '@mui/material';
import {
  CustomSwitchButton,
  FileUpload,
  FileUploadAr,
  MagicDropDown,
  NormalTextField,
  constants,
} from 'berlin-common';
import { PlatformType } from '../../../../data/data';
import { useEffect, useState } from 'react';

const MediaAndPresentation = ({
  id,
  formik,
  permission,
  selectedImages,
  setSelectedImages,
  selectedVideos,
  setSelectedVideos,
  selectedImagesAr,
  setSelectedImagesAr,
  selectedVideosAr,
  setSelectedVideosAr,
}: any) => {
  return (
    <>
      <Grid container spacing={3.5}>
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
                  // tableName="flash_fgift"
                  tableName={{ name: 'flash_fgift', id: id }}
                  onSelect={(data: constants.types.fileType[]) => {
                    setSelectedImages(data);
                  }}
                  files={selectedImages}
                  accept="image/*"
                  type="image"
                  multiSelect={false}
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
                  // tableName="flash_fgift"
                  tableName={{ name: 'flash_fgift', id: id }}
                  onSelect={(data: constants.types.fileType[]) => {
                    setSelectedImagesAr(data);
                  }}
                  files={selectedImagesAr}
                  accept="image/*"
                  type="image"
                  multiSelect={false}
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
                  name={'video_id'}
                  tableName={{ name: 'flash_fgift', id: id }}
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
                    'Note: Video resolution 1637x828, Max Size - 200 MB Per File'
                  }
                </FormHelperText>
                <FileUploadAr
                  disabled={
                    permission === 'WRITE' || permission === 'FULL'
                      ? false
                      : true
                  }
                  name={'video_id_ar'}
                  tableName={{ name: 'flash_fgift', id: id }}
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
              name="platform"
              option={PlatformType}
              label="platform"
              formik={formik}
              placeholder="Select platform"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Active</InputLabel>
            <CustomSwitchButton name={'active'} formik={formik} label="" />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default MediaAndPresentation;
