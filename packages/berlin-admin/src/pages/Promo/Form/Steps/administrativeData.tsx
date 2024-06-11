import { Grid, InputLabel, Stack } from '@mui/material';
import {
  CustomSwitchButton,
  MagicDatePicker,
  NormalTextField,
} from 'berlin-common';

const AdministrativeData = ({ formik }: any) => {
  return (
    <>
      <Grid container spacing={3.5}>
        {/* <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Created At</InputLabel>
            <MagicDatePicker
              name="created_at"
              placeholder="Created At"
              formik={formik}
              disabled
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Updated At</InputLabel>
            <MagicDatePicker
              name="updated_at"
              placeholder="Code Expiry Date"
              formik={formik}
              disabled
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Created By</InputLabel>
            <NormalTextField
              disabled
              name="created_by"
              placeholder="Created By"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Updated By</InputLabel>
            <NormalTextField
              disabled={true}
              name="updated_by"
              placeholder="Updated By"
            />
          </Stack>
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Active</InputLabel>
            <CustomSwitchButton name={'active'} formik={formik} label="" />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default AdministrativeData;
