import { Grid, InputLabel, Stack } from '@mui/material';
import { NormalTextField } from 'berlin-common';

const DealInfo = ({}: any) => {
  return (
    <>
      <Grid container spacing={3.5}>
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
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Total Voucher Limit<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name="total_voucher_limit"
              placeholder="Total Voucher Limit"
              multiline={false}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Total Sold Count</InputLabel>
            <NormalTextField
              name="total_sold_count"
              placeholder="Total Sold Count"
              disabled={true}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Min Per Deal Value</InputLabel>
            <NormalTextField
              name="min_cart_amount"
              placeholder="Min Per Deal Value"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Max Per Deal Discount</InputLabel>
            <NormalTextField
              name="max_discount_cap"
              placeholder="Max Per Deal Discount"
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default DealInfo;
