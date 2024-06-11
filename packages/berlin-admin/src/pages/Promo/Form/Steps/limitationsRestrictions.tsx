import { Grid, InputLabel, Stack } from '@mui/material';
import { CustomSwitchButton, NormalTextField } from 'berlin-common';
import { useState } from 'react';

const LimitationsAndRestrictions = ({ formik }: any) => {
  // const [value, setValue] = useState(false);
  return (
    <>
      <Grid container spacing={3.5}>
        {/* <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Limit Per Customer</InputLabel>
            <NormalTextField
              name="limit_per_customer"
              placeholder="Limit Per Customer"
            />
          </Stack>
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Limit Per Coupon<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name="limit_per_coupon"
              placeholder="Limit Per coupon"
            />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Min Cart Amount</InputLabel>
            <NormalTextField
              name="min_cart_amount"
              placeholder="Min Cart Amount"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Max Discount Cap</InputLabel>
            <NormalTextField
              name="max_discount_cap"
              placeholder="Max Discount Cap"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>First Purchase Only</InputLabel>
            <CustomSwitchButton
              name={'first_purchase_only'}
              formik={formik}
              label=""
              // disabled={value}
              // onChange={(e) => {
              //   if (e.target.checked) {
              //     formik.setFieldValue('is_reusable', false);
              //   }
              // }}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Is Reusable</InputLabel>
            <CustomSwitchButton
              name={'is_reusable'}
              formik={formik}
              label=""
              // onChange={(e) => {
              //   if (e.target.checked) {
              //     formik.setFieldValue('first_purchase_only', false);
              // setValue(true);
              // }
              // else {
              // setValue(false);
              // }
              // }}
            />
          </Stack>
        </Grid>
        {formik.values.is_reusable && (
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>Limit Per Customer</InputLabel>
              <NormalTextField
                name="limit_per_customer"
                placeholder="Limit Per Customer"
              />
            </Stack>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default LimitationsAndRestrictions;
