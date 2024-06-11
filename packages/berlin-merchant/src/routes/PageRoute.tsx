import { Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import { securedRoutesAdmin, unsecureRoutes } from './Routers';
import { useLocalStorage } from 'berlin-common';
import MainLayout from '../layout/MainLayout';

const PageRoute = () => {
  const { isTokenValid } = useLocalStorage();

  return (
    <>
      <Routes>
        {isTokenValid === false &&
          unsecureRoutes?.map(({ path, Component }: any, index: any) => (
            <Fragment key={`${path}-${index}`}>
              <Route path={path} element={<Component />} />
            </Fragment>
          ))}

        {isTokenValid === true && (
          <Route path="/" element={<MainLayout />}>
            {securedRoutesAdmin?.map(({ path, Component }: any, index: any) => (
              <Fragment key={`${path}-${index}`}>
                <Route
                  index={index === 0}
                  path={path}
                  element={<Component />}
                />
              </Fragment>
            ))}
          </Route>
        )}
      </Routes>
    </>
  );
};

export default PageRoute;
