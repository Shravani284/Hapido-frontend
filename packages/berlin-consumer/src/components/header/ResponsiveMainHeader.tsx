import { useWindowSize } from 'berlin-common';
import MainHeader from './MainHeader';
import MobileMainHeader from './MobileMainHeader';
import { useEffect, useState } from 'react';
import MobileMainHeaderAr from './MobileMainHeader-ar';
import MainHeaderAr from './MainHeader-ar';
import { localeLang } from '../../utils/getLang';

const ResponsiveMainHeader = () => {
  const { size } = useWindowSize();

  return (
    <>
      {localeLang === 'ar' ? (
        size < 768 ? (
          <MobileMainHeaderAr />
        ) : (
          <MainHeaderAr />
        )
      ) : size < 768 ? (
        <MobileMainHeader />
      ) : (
        <MainHeader />
      )}
    </>
  );

  // size < 768 ? <MobileMainHeader /> : <MainHeader />;
};

export default ResponsiveMainHeader;
