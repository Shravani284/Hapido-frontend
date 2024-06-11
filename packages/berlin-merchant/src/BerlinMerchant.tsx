import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import PageRoute from './routes/PageRoute';
import ThemeCustomization from './themes';
import { LazyLoader } from 'berlin-common';

const BerlinAdmin = () => {
  const isLoading = useSelector((state: any) => state.loader.isLoading);
  console.log({ isLoading });

  return (
    <>
      {/* <p style={{ color: constants.colors.blackColor }}>Hello</p> */}
      <Suspense fallback={<LazyLoader />}>
        <ThemeCustomization>
          <PageRoute />
        </ThemeCustomization>
      </Suspense>
    </>
  );
};

export default BerlinAdmin;
