import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  useMediaQuery,
  Box,
  Container,
  Toolbar,
  Snackbar,
  Alert,
} from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';
import Footer from './Footer';

// types
import { setSnackbarConfig } from '../../store/slice/Loader';
import { useDispatch, useSelector } from 'react-redux';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down('xl'));
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));
  const { snackbarConfig } = useSelector((state: any) => state.loader);
  const dispatch = useDispatch();
  const container = false;

  // set media wise responsive drawer
  useEffect(() => {
    // if (!miniDrawer) {
    //   dispatch(openDrawer(!matchDownXL));
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownXL]);
  useEffect(() => {
    if (snackbarConfig.isOpen) {
      const duration = snackbarConfig.autoHideDuration;
      setTimeout(() => {
        dispatch(setSnackbarConfig({ isOpen: false, message: '' }));
      }, duration);
    }
  }, [snackbarConfig]);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header />
      <Drawer />

      <Box
        component="main"
        sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}
      >
        <Toolbar sx={{ mt: 'inherit' }} />
        <Container
          maxWidth={container ? 'xl' : false}
          sx={{
            position: 'relative',
            minHeight: 'calc(100vh - 110px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Outlet />
          {/* <Footer /> */}
        </Container>
        <Snackbar
          open={snackbarConfig.isOpen}
          autoHideDuration={snackbarConfig.autoHideDuration}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <Alert severity={snackbarConfig.varient} sx={{ width: '100%' }}>
            {snackbarConfig.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default MainLayout;
