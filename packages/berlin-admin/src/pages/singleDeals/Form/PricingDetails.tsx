import { Grid, InputLabel, Stack } from '@mui/material';
import {
  CustomSwitchButton,
  MagicDropDown,
  NormalTextField,
} from 'berlin-common';
import React from 'react';
import { CurrencyType, DealType, PlatformType } from '../../../data/data';

const PricingDetails = ({ formik }: any) => {
  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Selling Price<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name="selling_price"
              placeholder="Enter Selling Price"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Old Price<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField name="old_price" placeholder="Enter Old Price" />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Currency<span className="asterisk">*</span>
            </InputLabel>

            <MagicDropDown
              name="currency"
              option={CurrencyType}
              label="currency"
              formik={formik}
              placeholder="Enter Currency"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Commission (%)<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name="commission_percentage"
              placeholder="Enter Commission (%)"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Net Payout<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name="flat_commission_percentage"
              placeholder="Enter Net Payout"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Initial Bought Count</InputLabel>
            <NormalTextField
              name="initial_bought_count"
              placeholder="Enter Initial Bought Count"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>Show Old Price</InputLabel>

          <CustomSwitchButton name="show_old_price" formik={formik} label="" />
        </Grid>
      </Grid>
    </>
  );
};

export default PricingDetails;
