import { InputLabel } from '@mui/material';
import { Stack } from '@mui/material';
import { Grid } from '@mui/material';
import moment from 'moment';
import { MagicDateAndTimePicker } from 'berlin-common';

const FlashSaleTiming = ({ formik }: any) => {
  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Start Date & Time<span className="asterisk">*</span>
            </InputLabel>
            <MagicDateAndTimePicker
              name="fs_active_date"
              formik={formik}
              disablePast
              placeholder="Start Date & Time"
            />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              End Date & Time<span className="asterisk">*</span>
            </InputLabel>
            <MagicDateAndTimePicker
              name="fs_end_date"
              formik={formik}
              placeholder="End Date & Time"
              disablePast
              minDate={moment(formik?.values?.fs_active_date)}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default FlashSaleTiming;
