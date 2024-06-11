// import { Link, useLocation } from 'react-router-dom';
import { path } from '../../routes/Routers';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import css from './AccountSideBar.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutHandler } from '../../store/slice/LoginSlice';
import React, { useState } from 'react';
import { useWindowSize } from 'berlin-common';
import ConsumerConfirmBoxAlert from '../ConsumerConfirmBoxAlert';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import voucherIcon from '../../../assets/voucherIcon.png';
import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { toggleDrawer } from '../../store/slice/SliderSlice';
import MobileSlider from './mobileSlider';
import MobileSideMenu from '../../pages/account/MobileSideMenu';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { lang } from '../../utils/getLang';
import initialiseMoengage from '../../utils/moEngage';

const AccountSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const location = useLocation();
  const { size } = useWindowSize();
  const { t, i18n } = useTranslation('translation');
  const Moengage: any = initialiseMoengage();

  const logoutPopup = () => {
    setModalOpen(true);
  };
  const logoutPageHandler = () => {
    dispatch(logoutHandler());
    setModalOpen(false);
    Moengage.destroy_session();
    navigate(`/${lang}/`);
  };

  const sidebarNavItems = [
    {
      display: t(`MY_PROFILE`),
      icon: <PersonOutlineOutlinedIcon />,
      to: '/profile',
      section: `/${lang}/profile`,
    },
    {
      display: t(`MY_ADDRESS`),
      icon: <HomeOutlinedIcon />,
      to: `address`,
      section: `/${lang}/addresses`,
    },

    {
      display: t(`MY_VOUCHERS`),
      // icon: <img loading="lazy" src={voucherIcon} width={24} />,
      icon: <ConfirmationNumberOutlinedIcon />,
      to: '/vouchers',
      section: `/${lang}/vouchers`,
    },

    // {
    //   display: t(`MY_SAVED_CARDS`),
    //   icon: <CreditCardIcon />,
    //   to: '/savedCard',
    //   section: `/${lang}/payments`,
    // },
  ];

  return (
    <>
      {size < 768 ? (
        <>
          <div className={css.accountHeading}>
            {/* <Button onClick={() => navigate(-1)}>
              <ArrowBackIosIcon />
            </Button> */}
            {/* <MobileSideMenu /> */}
          </div>
        </>
      ) : (
        <div className={css.sidebar}>
          <ul className={css.sidebarList}>
            {sidebarNavItems.map((val, index) => {
              const isActive = val.section === location.pathname;
              return (
                <Link to={`${val.section}`}>
                  <li
                    key={index}
                    // onClick={() => navigate(val.section)}
                    // className={css.row}
                    className={`${isActive ? css.active : css.row}`}
                  >
                    <div className={`${css.icon} RTLIcon`}>{val.icon}</div>
                    <div className={css.text}>{val.display}</div>
                  </li>
                </Link>
              );
            })}
            <li className={css.row} onClick={() => logoutPopup()}>
              <div className={css.icon}>
                <LogoutOutlinedIcon />
              </div>
              <div className={css.text}>{t(`LOGOUT`)}</div>
            </li>
          </ul>
          <ConsumerConfirmBoxAlert
            title={t(`ARE_YOU_SURE_YOU_WANT_TO_LOGOUT`)}
            handleClose={() => setModalOpen(false)}
            message={''}
            open={modalOpen}
            submitHandler={logoutPageHandler}
          />
        </div>
      )}
    </>
  );
};

export default AccountSideBar;
