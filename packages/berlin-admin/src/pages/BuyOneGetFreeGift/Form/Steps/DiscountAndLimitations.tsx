import { Grid, InputLabel, Stack } from '@mui/material';
import { NormalTextField } from 'berlin-common';

const DiscountAndLimitations = ({ formik }: any) => {
  return (
    <>
      <Grid container spacing={3.5}>
        {formik.values.free_entitlement?.id !== 'PROMO CODE' && (
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>
                Limit Per Customer<span className="asterisk">*</span>
              </InputLabel>
              <NormalTextField
                name="limit_per_customer"
                placeholder="Limit Per Customer"
              />
            </Stack>
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Total Vouchers Available<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name="total_voucher_limit"
              placeholder="Total Vouchers Available"
            />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Total Voucher Sold</InputLabel>
            <NormalTextField
              name="total_sold_count"
              placeholder="Total Voucher Sold"
              disabled
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default DiscountAndLimitations;
