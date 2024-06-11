import { Grid, InputLabel, Stack } from '@mui/material';
import moment from 'moment';
import { MagicDateAndTimePicker, MagicDatePicker } from 'berlin-common';

const ValidityPeriods = ({ formik }: any) => {
  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Code Active Date & Time<span className="asterisk">*</span>
            </InputLabel>
            <MagicDateAndTimePicker
              name="code_active_date"
              placeholder="Code Active Date"
              formik={formik}
              disablePast
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Code Expiry Date & Time<span className="asterisk">*</span>
            </InputLabel>
            <MagicDateAndTimePicker
              name="code_expiry_date"
              placeholder="Code Expiry Date"
              formik={formik}
              disablePast
              minDate={moment(formik?.values?.code_active_date)}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default ValidityPeriods;
