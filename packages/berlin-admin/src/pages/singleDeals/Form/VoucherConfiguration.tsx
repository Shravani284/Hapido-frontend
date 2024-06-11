import { InputLabel } from '@mui/material';
import { Stack } from '@mui/material';
import { Grid } from '@mui/material';
import {
  CustomSwitchButton,
  MagicDropDown,
  NormalTextField,
} from 'berlin-common';
import { FulfilledTemplate, VoucherType } from '../../../data/data';
import { FormHelperText } from '@mui/material';
const VoucherConfiguration = ({ formik, dealData }: any) => {
  //
  // );
  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Voucher Type<span className="asterisk">*</span>
            </InputLabel>
            <MagicDropDown
              name="voucher_type"
              option={VoucherType}
              label="Voucher Type"
              formik={formik}
              placeholder="Select Voucher Type"
              disabled={formik.values.template_type?.label == 'Merchant'}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Template Type<span className="asterisk">*</span>
            </InputLabel>
            <MagicDropDown
              name="template_type"
              option={FulfilledTemplate}
              label="Template Type"
              formik={formik}
              placeholder="Select Template Type"
            />
          </Stack>
        </Grid>
        {formik?.values?.voucher_type?.id?.toUpperCase() === 'INTERNAL' && (
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>
                Voucher Limit<span className="asterisk">*</span>
              </InputLabel>
              <NormalTextField
                name="internal_voucher_limit"
                placeholder="Enter Voucher Limit"
              />
            </Stack>
          </Grid>
        )}

        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Vouchers Sold</InputLabel>
            <NormalTextField
              name="internal_voucher_sold"
              placeholder="Enter Vouchers Sold"
              disabled
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Voucher Limits Per Customer<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name="max_voucher_per_customer"
              placeholder="Enter Voucher Limits Per Customer"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Min Vouchers Per Transaction</InputLabel>
            <NormalTextField
              name="min_voucher_per_transaction"
              placeholder="Enter Min Vouchers Per Transaction"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Max Vouchers Per Transaction<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name="max_voucher_per_transaction"
              placeholder="Enter Max Vouchers Per Transaction"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Low stock alert voucher count
              {formik.values?.voucher_type?.id?.toUpperCase() ===
                'INTERNAL' && <span className="asterisk">*</span>}
            </InputLabel>
            <NormalTextField
              name="low_stock_alert_voucher_count"
              placeholder="Enter Low stock alert voucher count"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Hapido Fulfilled</InputLabel>
            <FormHelperText id="standard-weight-helper-text-email-login">
              {
                'Note: These are vouchers bought and sold by Hapido, Vat invoice will be sent to customer'
              }
            </FormHelperText>
            <CustomSwitchButton
              name="hapido_fulfilled"
              formik={formik}
              label=""
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default VoucherConfiguration;
