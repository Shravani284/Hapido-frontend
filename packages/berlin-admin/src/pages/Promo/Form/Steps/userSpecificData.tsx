import { Grid, InputLabel, Stack } from '@mui/material';
import { MagicDropDown } from 'berlin-common';

const UserSpecifics = ({ formik, userList }: any) => {
  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>User</InputLabel>
            <MagicDropDown
              name="user_id"
              option={userList}
              label="User"
              formik={formik}
              placeholder="Select User"
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default UserSpecifics;
