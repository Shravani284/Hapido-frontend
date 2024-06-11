import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { LazyLoader } from 'berlin-common';
import PageRoute from './routes/PageRoute';
import ThemeCustomization from './themes';

const BerlinAdmin = () => {
  const isLoading = useSelector((state: any) => state.loader.isLoading);
  console.log({ isLoading });

  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <ThemeCustomization>
          <PageRoute />
        </ThemeCustomization>
      </Suspense>
    </>
  );
};

export default BerlinAdmin;
