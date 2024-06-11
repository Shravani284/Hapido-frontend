import { Outlet, useNavigate } from 'react-router-dom';
import ResponsiveMainHeader from '../components/header/ResponsiveMainHeader';
import AccountSideBar from '../components/AccountSideBar';
import { Container, Grid } from '@mui/material';
import { useLocalStorage, useWindowSize } from 'berlin-common';
import { useEffect } from 'react';
import { path } from '../routes/Routers';
import { lang } from '../utils/getLang';

const AccountLayout = () => {
  const { size } = useWindowSize();
  const { isTokenValid } = useLocalStorage();
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenValid === false) {
      navigate(`/${lang}/`);
    }
  }, [isTokenValid]);
  return (
    <>
      {size < 768 ? (
        <>
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12} sm={12}>
                <AccountSideBar />
                <Outlet />
              </Grid>
            </Grid>
          </Container>
        </>
      ) : (
        <>
          <ResponsiveMainHeader />
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              <Grid item xs={12} lg={3} xl={3} md={3} sm={4}>
                <AccountSideBar />
              </Grid>
              <Grid item xs={12} lg={9} xl={9} md={9} sm={8}>
                <Outlet />
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </>
  );
};

export default AccountLayout;
