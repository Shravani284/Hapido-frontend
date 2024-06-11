import { FormHelperText } from '@mui/material';
import { Grid, InputLabel, Stack } from '@mui/material';
import { FileUpload, FileUploadAr, constants } from 'berlin-common';
import { useEffect, useState } from 'react';

const MediaAssets = ({
  id,
  selectedImages,
  setSelectedImages,
  selectedVideos,
  setSelectedVideos,
  selectedImagesAr,
  setSelectedImagesAr,
  selectedVideosAr,
  setSelectedVideosAr,
  permission,
}: any) => {
  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Upload Image (Multiple)</InputLabel>
            <FormHelperText id="standard-weight-helper-text-email-login">
              {
                'Note:- First image will be used in listings - upload resolution 350x350,for other images upload 1637x628, Max Size - 10 MB Per File'
              }
            </FormHelperText>
            <FileUpload
              disabled={
                permission === 'WRITE' || permission === 'FULL' ? false : true
              }
              name={'image_ids'}
              // tableName="deal_combo"
              tableName={{ name: 'deal_combo', id: id }}
              onSelect={(data: constants.types.fileType[]) => {
                setSelectedImages(data);
              }}
              files={selectedImages}
              accept="image/*"
              type="image"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack spacing={1}>
            <InputLabel>Upload Video (Multiple)</InputLabel>
            <FormHelperText id="standard-weight-helper-text-email-login">
              {'Note:- Video resolution 1637x828, Max Size - 200 MB Per File'}
            </FormHelperText>
            <FileUpload
              disabled={
                permission === 'WRITE' || permission === 'FULL' ? false : true
              }
              name={'video_ids'}
              tableName={{ name: 'deal_combo', id: id }}
              onSelect={(data: constants.types.fileType[]) => {
                setSelectedVideos(data);
              }}
              files={selectedVideos}
              accept="video/*"
              type="video"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Upload Image (Arabic) (Multiple)</InputLabel>
            <FormHelperText id="standard-weight-helper-text-email-login">
              {
                'Note:- First image will be used in listings - upload resolution 350x350,for other images upload 1637x628, Max Size - 10 MB Per File'
              }
            </FormHelperText>
            <FileUploadAr
              disabled={
                permission === 'WRITE' || permission === 'FULL' ? false : true
              }
              name={'image_ids_ar'}
              // tableName="deal_combo"
              tableName={{ name: 'deal_combo', id: id }}
              onSelect={(data: constants.types.fileType[]) => {
                setSelectedImagesAr(data);
              }}
              files={selectedImagesAr}
              accept="image/*"
              type="image"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack spacing={1}>
            <InputLabel>Upload Video (Arabic) (Multiple)</InputLabel>
            <FormHelperText id="standard-weight-helper-text-email-login">
              {'Note:- Video resolution 1637x828, Max Size - 200 MB Per File'}
            </FormHelperText>
            <FileUploadAr
              disabled={
                permission === 'WRITE' || permission === 'FULL' ? false : true
              }
              name={'video_ids_ar'}
              tableName={{ name: 'deal_combo', id: id }}
              onSelect={(data: constants.types.fileType[]) => {
                setSelectedVideosAr(data);
              }}
              files={selectedVideosAr}
              accept="video/*"
              type="video"
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default MediaAssets;
