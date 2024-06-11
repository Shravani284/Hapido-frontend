import { InputLabel, Stack } from '@mui/material';
import { Box, Grid } from '@mui/material';
import { MagicDropDown, NormalTextField } from 'berlin-common';
import React from 'react';
import { country_code } from '../../data/data';

const PersonalInfo = ({ formik }: any) => {
  return (
    <Box sx={{ p: 2.5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Name</InputLabel>
            <NormalTextField name="name" placeholder="Name" disabled />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Email</InputLabel>
            <NormalTextField name="email" placeholder="Email" disabled />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Country Code<span className="asterisk">*</span>
            </InputLabel>
            <MagicDropDown
              name="country_code"
              placeholder=" Country Code"
              option={country_code.map((i: any) => {
                return {
                  id: i?.id,
                  label: `${i?.label} (+${i?.id})`,
                };
              })}
              label="Deal Type"
              formik={formik}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Mobile<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField name="mobile" placeholder="Mobile" />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalInfo;
