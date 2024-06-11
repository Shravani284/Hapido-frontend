import { Grid, InputLabel, Stack } from '@mui/material';
import { MagicDateAndTimePicker, MagicDatePicker } from 'berlin-common';
import moment from 'moment';

const ValidityPeriods = ({ formik }: any) => {
  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Deal Active Date & Time<span className="asterisk">*</span>
            </InputLabel>
            <MagicDateAndTimePicker
              name="deal_active_date"
              placeholder="Deal Active Date"
              formik={formik}
              disablePast
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Deal End Date & Time<span className="asterisk">*</span>
            </InputLabel>
            <MagicDateAndTimePicker
              name="deal_end_date"
              placeholder="Deal End Date"
              formik={formik}
              disablePast
              minDate={moment(formik?.values?.deal_active_date)}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default ValidityPeriods;
