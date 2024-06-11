import { Routes, Route, Navigate } from 'react-router-dom';
import { Fragment } from 'react';
import { securedRoutesAdmin, unsecureRoutes } from './Routers';
import { useLocalStorage } from 'berlin-common';
// import Layout from '../layout1';
import MainLayout from '../layout/MainLayout';
import Permission from '../components/Permission';
import { Home, Login, NotFoundPage } from './LazyPath';
const PageRoute = () => {
  const { isTokenValid } = useLocalStorage();

  return (
    <>
      <Routes>
        {isTokenValid === false &&
        <>
         <Route path="/" element={<Login />}>

          {unsecureRoutes?.map(({ path, Component }: any, index: any) => (
            <Fragment key={`${path}-${index}`}>
              <Route path={path} element={<Component />} />
            </Fragment>
          ))}
          </Route>
            <Route path="/*" element={<Login />} />
          </>
          }
        {isTokenValid === true && (
          <>
            <Route path="/" element={<MainLayout />}>
              {securedRoutesAdmin?.map(
                ({ path, Component, role }: any, index: any) => (
                  <Fragment key={`${path}-${index}`}>
                    <Route
                      index={index === 0}
                      path={path}
                      element={
                        <Permission module={role} isRoute={true}>
                          <Component />
                        </Permission>
                      }
                    />
                  </Fragment>
                )
              )}
            </Route>
            <Route path="/*" element={<NotFoundPage />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default PageRoute;
