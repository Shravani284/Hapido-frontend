import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Box, Container, Toolbar, Alert } from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';
import Footer from './Footer';
import HorizontalBar from './Drawer/HorizontalBar';
import Breadcrumbs from '../../components/@extended/Breadcrumbs';

// import navigation from 'menu-items';
// import useConfig from 'hooks/useConfig';
// import { dispatch } from 'store';
// import { openDrawer } from 'store/reducers/menu';

// types
import { MenuOrientation } from '../../types/config';
import { Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbarConfig } from '../../store/slice/Loader';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down('xl'));
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));
  const container = false;
  const { snackbarConfig } = useSelector((state: any) => state.loader);
  const dispatch = useDispatch();
  // const { container, miniDrawer, menuOrientation } = useConfig();

  // const isHorizontal =
  //   menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

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
            // ...(container && { px: { xs: 0, sm: 2 } }),
            position: 'relative',
            minHeight: 'calc(100vh - 110px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* <Breadcrumbs
            navigation={navigation}
            title
            titleBottom
            card={false}
            divider={false}
          /> */}
          <Outlet />
          <Footer />
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
