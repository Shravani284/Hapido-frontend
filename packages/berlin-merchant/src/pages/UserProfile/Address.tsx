import { Stack } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Box, Grid } from '@mui/material';
import {
  CustomSwitchButton,
  MagicDatePicker,
  NormalTextField,
} from 'berlin-common';
import React from 'react';

const Address = ({ formik }: any) => {
  return (
    <Box sx={{ p: 2.5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Address1<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              multiline
              rows={3}
              name="address1"
              placeholder="addrees1"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Address2<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              multiline
              rows={3}
              name="address2"
              placeholder="address2"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Country</InputLabel>
            <NormalTextField name="country" placeholder="country" disabled />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>City</InputLabel>
            <NormalTextField name="city" placeholder="city" disabled />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Area</InputLabel>
            <NormalTextField name="area" placeholder="area" disabled />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Coordinates</InputLabel>
            <NormalTextField
              name="coordinates"
              placeholder="coordinates"
              disabled
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Address;
