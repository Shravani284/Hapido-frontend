import { ReactNode } from 'react';

// material-ui
import { Box, Grid } from '@mui/material';

// project import
import { authLogo } from 'berlin-common';
import Logo from '../../components/logo';
import AuthCard from './AuthCard';

// assets
import AuthBackground from '../../assets/images/auth/AuthBackground';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }: Props) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AuthBackground />
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{
          minHeight: '90vh',
        }}
      >
        <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
          <img
            src={authLogo}
            alt="Hapido-logo"
            onClick={() => {
              navigate('/');
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              minHeight: {
                xs: 'calc(100vh - 210px)',
                sm: 'calc(100vh - 134px)',
                md: 'calc(100vh - 112px)',
              },
            }}
          >
            <Grid item>
              <AuthCard>{children}</AuthCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default AuthWrapper;
