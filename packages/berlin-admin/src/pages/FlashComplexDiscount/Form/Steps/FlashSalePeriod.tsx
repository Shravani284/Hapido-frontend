import { Grid, InputLabel, Stack } from '@mui/material';
import { MagicDateAndTimePicker, MagicDatePicker } from 'berlin-common';
import moment from 'moment';

const FlashSalePeriod = ({ formik }: any) => {
  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Flash Sale Active Date & Time<span className="asterisk">*</span>
            </InputLabel>
            <MagicDateAndTimePicker
              name="fs_active_date"
              formik={formik}
              disablePast
              placeholder=" Flash Sale Active Date"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Flash Sale End Date & Time<span className="asterisk">*</span>
            </InputLabel>
            <MagicDateAndTimePicker
              name="fs_end_date"
              formik={formik}
              disablePast
              placeholder="Flash Sale End Date"
              minDate={moment(formik.values.fs_active_date)}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default FlashSalePeriod;
