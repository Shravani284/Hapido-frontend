import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import ResponsiveMainHeader from '../components/header/ResponsiveMainHeader';
import { useEffect, useState } from 'react';
import FooterAr from '../components/footer/Footer-ar';
import { localeLang } from '../utils/getLang';

const Layout = () => {
  return (
    <>
      <ResponsiveMainHeader />
      <Outlet />
      {localeLang === 'ar' ? <FooterAr /> : <Footer />}
    </>
  );
};

export default Layout;
