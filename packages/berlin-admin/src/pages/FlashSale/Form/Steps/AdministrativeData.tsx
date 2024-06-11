import { Grid, InputLabel, Stack } from '@mui/material';
import {
  CheckBoxField,
  CustomSwitchButton,
  MagicDatePicker,
  NormalTextField,
} from 'berlin-common';

const AdministrativeData = ({ formik }: any) => {
  return (
    <>
      <>
        <Grid container spacing={3.5}>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>Active</InputLabel>
              <CustomSwitchButton name={'active'} formik={formik} label="" />
            </Stack>
          </Grid>
        </Grid>
      </>
    </>
  );
};

export default AdministrativeData;
