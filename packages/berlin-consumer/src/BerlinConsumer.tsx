import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LazyLoader, constants, i18n } from 'berlin-common';
import PageRoute from './routes/PageRoute';
import { lang, localeLang } from './utils/getLang';
import useClassObserver from './layout/UseClassObserver';

const BerlinConsumer = () => {
  // const isLoading = useSelector((state: any) => state.loader.isLoading);

  // useClassObserver(['lang-en', 'lang-ar'], () => {
  //   window.location.reload();
  // });

  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <PageRoute />
      </Suspense>
    </>
  );
};

export default BerlinConsumer;
