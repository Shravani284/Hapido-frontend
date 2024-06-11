import { Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import Layout from '../layout';
import { accountRoute, headerLayout, mainRoute, normalLayout } from './Routers';
import HeaderLayout from '../layout/HeaderLayout';
import NormalLayout from '../layout/NormalLayout';
import AccountLayout from '../layout/AccountLayout';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbarConfig } from '../store/slice/Loader';
import { Alert, Snackbar } from '@mui/material';
import { PageNotFound } from './LazyPath';
import wpLogo from '../../../berlin-consumer/assets/whatAppLogo.png';
import { updatePrevPage } from '../store/slice/CityName';
import { lang, localeLang } from '../utils/getLang';

const PageRoute = () => {
  const location = useLocation();
  const { snackbarConfig } = useSelector((state: any) => state.loader);
  const dispatch = useDispatch();

  useEffect(() => {
    if (snackbarConfig.isOpen) {
      const duration = snackbarConfig.autoHideDuration;
      setTimeout(() => {
        dispatch(setSnackbarConfig({ isOpen: false, message: '' }));
      }, duration);
    }
  }, [snackbarConfig]);

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatch(updatePrevPage(location.pathname));
    };
  }, [location.pathname]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={`/${lang}/`} replace />} />
        <Route path="/" element={<Layout />}>
          {mainRoute?.map(({ path, Component }: any, index: any) => (
            <Fragment key={`${path}-${index}`}>
              <Route path={path} element={<Component />} />
            </Fragment>
          ))}
        </Route>
        <Route path="/" element={<HeaderLayout />}>
          {headerLayout?.map(({ path, Component }: any, index: any) => (
            <Fragment key={`${path}-${index}`}>
              <Route path={path} element={<Component />} />
            </Fragment>
          ))}
        </Route>
        <Route path="/" element={<NormalLayout />}>
          {normalLayout?.map(({ path, Component }: any, index: any) => (
            <Fragment key={`${path}-${index}`}>
              <Route path={path} element={<Component />} />
            </Fragment>
          ))}
        </Route>
        <Route path="/" element={<AccountLayout />}>
          {accountRoute?.map(({ path, Component }: any, index: any) => (
            <Fragment key={`${path}-${index}`}>
              <Route path={path} element={<Component />} />
            </Fragment>
          ))}
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
      <Snackbar
        open={snackbarConfig.isOpen}
        autoHideDuration={snackbarConfig.autoHideDuration}
        anchorOrigin={{
          vertical: 'top',
          horizontal: localeLang === 'ar' ? 'left' : 'right',
        }}
        onClose={() =>
          dispatch(setSnackbarConfig({ isOpen: false, message: '' }))
        }
      >
        <Alert
          onClose={() =>
            dispatch(setSnackbarConfig({ isOpen: false, message: '' }))
          }
          severity={snackbarConfig.varient}
          sx={{ width: '100%' }}
        >
          {snackbarConfig.message}
        </Alert>
      </Snackbar>

      {location.pathname.includes('/cart') ||
      location.pathname.includes('/checkout') ? (
        ''
      ) : (
        <div className={localeLang === 'en' ? 'whatAppLogo' : `RTLWhatAppLogo`}>
          <Link to={'https://wa.me/971547246670'} target="_blank">
            <img src={wpLogo} alt="hapido" />
          </Link>
        </div>
      )}
    </>
  );
};

export default PageRoute;
