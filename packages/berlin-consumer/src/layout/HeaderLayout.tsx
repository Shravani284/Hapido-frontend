import { Outlet, useNavigate } from 'react-router-dom';
import ResponsiveMainHeader from '../components/header/ResponsiveMainHeader';
import { useLocalStorage, useWindowSize } from 'berlin-common';
import { useEffect } from 'react';
import { path } from '../routes/Routers';
import { lang } from '../utils/getLang';

const HeaderLayout = () => {
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
      {size < 768 ? ' ' : <ResponsiveMainHeader />}
      <Outlet />
    </>
  );
};

export default HeaderLayout;
