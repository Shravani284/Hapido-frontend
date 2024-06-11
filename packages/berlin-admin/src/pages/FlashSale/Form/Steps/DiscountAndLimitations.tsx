import { Grid, InputLabel, Stack } from '@mui/material';
import { NormalTextField } from 'berlin-common';
// import { PreferredTime } from '../../../data/data';

const DiscountAndLimitations = ({ formik }: any) => {
  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Discount Percentage<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              // type="number"
              name="second_deal_discount_percent"
              placeholder="Discount Percentage"
            />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Limit Per Customer<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              // type="number"
              name="limit_per_customer"
              placeholder="Limit Per Customer"
            />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Total Vouchers Available<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              // type="number"
              name="total_voucher_limit"
              placeholder="Total Vouchers Available"
            />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Total Voucher Sold</InputLabel>
            <NormalTextField
              // type="number"
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
