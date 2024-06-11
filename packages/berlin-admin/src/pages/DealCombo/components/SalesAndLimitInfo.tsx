import { Grid, InputLabel, Stack } from '@mui/material';
import { NormalTextField } from 'berlin-common';

const SalesAndLimitInfo = () => {
  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Selling Limit<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField name="selling_limit" placeholder="Selling Limit" />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Sold Count</InputLabel>
            <NormalTextField
              name="sold_count"
              placeholder="Sold Count"
              // value="100"
              disabled
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Max Limit Per Customer<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name="max_limit_per_customer"
              placeholder="Max Limit Per Customer"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Min limit Per Transaction</InputLabel>
            <NormalTextField
              name="min_limit_per_transaction"
              placeholder="Min limit Per Transaction"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Max Limit Per Transaction<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name="max_limit_per_transaction"
              placeholder="Max Limit Per Transaction"
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default SalesAndLimitInfo;
