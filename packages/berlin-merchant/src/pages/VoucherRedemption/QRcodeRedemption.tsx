import { Button, InputLabel, Stack } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { Grid } from '@mui/material';
import { NormalTextField } from 'berlin-common';
import MainCard from '../../components/MainCard';
import { path } from '../../routes/Routers';
import { useNavigate } from 'react-router-dom';

function QRcodeRedemption() {
  const formik = useFormik({
    initialValues: {
      code: '',
      comments: '',
    },

    onSubmit: async (value) => {
      //   handleAdd(value);
    },
  });
  const navigate = useNavigate();
  return (
    <MainCard title="QR Code Redemption">
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3.5}>
            <Grid item mt={1} xs={6} sm={6}>
              <Stack spacing={1}>
                <InputLabel>Voucher Code</InputLabel>
                <NormalTextField
                  name="code"
                  id="outlined-basic"
                  variant="outlined"
                  disabled
                />
              </Stack>
            </Grid>
            <Grid item mt={1} xs={6} sm={6}>
              <Stack spacing={1}>
                <InputLabel>Comments</InputLabel>
                <NormalTextField
                  name="comments"
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Enter Comments"
                />
              </Stack>
            </Grid>

            <Grid item xs={12} sm={12} mt={1}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="right"
                spacing={2}
                mr={2}
                mb={2}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  type="reset"
                  onClick={() => navigate(path.VOUCHER_REDEMPTION)}
                >
                  Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Redeem
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </FormikProvider>
    </MainCard>
  );
}

export default QRcodeRedemption;
