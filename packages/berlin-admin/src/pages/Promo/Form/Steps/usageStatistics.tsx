import { Grid, InputLabel, Stack } from '@mui/material';
import {
  CustomSwitchButton,
  MagicDropDown,
  NormalTextField,
} from 'berlin-common';

const UsageAndStatistics = ({ formik }: any) => {
  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Used Count</InputLabel>
            <NormalTextField
              name="used_count"
              placeholder="Used Count"
              disabled={true}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default UsageAndStatistics;
