// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthWrapper from '../../sections/auth/AuthWrapper';
import AuthLogin from '../../sections/auth/auth-forms/AuthLogin';
import { useTranslation } from 'react-i18next';

// ================================|| LOGIN ||================================ //

const Login = () => {
  const { t } = useTranslation('translation');
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h3">{t('ADMIN_LOGIN')}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
