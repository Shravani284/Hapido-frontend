import { path } from '../../routes/Routers';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import css from './mobileSideMenu.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutHandler } from '../../store/slice/LoginSlice';
import React, { useEffect, useState } from 'react';
import { useWindowSize } from 'berlin-common';
import ConsumerConfirmBoxAlert from '../../components/ConsumerConfirmBoxAlert';
import { useLocation } from 'react-router-dom';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import TranslateIcon from '@mui/icons-material/Translate';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Box, Button, Divider, SwipeableDrawer } from '@mui/material';
import { useTranslation } from 'react-i18next';
import voucherIcon from '../../../assets/voucherIcon.png';
import { toggleDrawer } from '../../store/slice/SliderSlice';
import { lang } from '../../utils/getLang';
import PeopleIcon from '@mui/icons-material/People';

function MobileSideMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<any>();
  const location = useLocation();
  const currentPath = location.pathname;
  const { size } = useWindowSize();
  const { t, i18n } = useTranslation('translation');
  const { isOpen } = useSelector((store: any) => store.Slider);

  const toggle =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      dispatch(toggleDrawer(open));
    };
  const sidebarNavItems = [
    {
      display: 'My Profile',
      icon: <PersonOutlineOutlinedIcon />,
      to: `/${lang}/profile`,
      section: `/${lang}/profile`,
    },
    {
      display: 'My Address',
      icon: <HomeOutlinedIcon />,
      to: `/${lang}/address`,
      section: `/${lang}/addresses`,
    },

    {
      display: 'My Vouchers',
      icon: <img loading="lazy" src={voucherIcon} width={24} />,
      to: `/${lang}vouchers`,
      section: `/${lang}/vouchers`,
    },

    // TODO: temp hide
    // {
    //   display: 'My Saved Cards',
    //   icon: <CreditCardIcon />,
    //   to: `/${lang}/savedCard`,
    //   section: `${lang}/payments`,
    // },
  ];

  const sidebarFooterItems = [
    {
      display: t('ABOUT_US'),
      icon: <PeopleIcon />,
      to: `/${lang}/static/about-us`,
      section: `/${lang}/static/about-us`,
    },
    {
      display: t('CONTACT_US'),
      icon: <ChatBubbleOutlineOutlinedIcon />,
      to: `/${lang}/static/contact-us`,
      section: `/${lang}/static/contact-us`,
    },

    {
      display: t('LIST_YOUR_BUSINESS'),
      icon: <FavoriteBorderOutlinedIcon />,
      to: `/${lang}/static/partner-contact`,
      section: `/${lang}/static/partner-contact`,
    },

    {
      display: t('BULK_BOKKING_AND_EVENT'),
      icon: <ShoppingCartOutlinedIcon />,
      to: `/${lang}/static/events-contact`,
      section: `/${lang}/static/events-contact`,
    },
    {
      display: t('PRIVACY_POLICY'),
      icon: <PolicyOutlinedIcon />,
      to: `/${lang}/static/privacy-policy`,
      section: `/${lang}/static/privacy-policy`,
    },

    {
      display: t('TERMS_and_CONDITIONS'),
      icon: <DescriptionOutlinedIcon />,
      to: `/${lang}/static/terms-and-conditions-customers`,
      section: `/${lang}/static/terms-and-conditions-customers`,
    },
    {
      display: t('TERMS_and_CONDITIONS_PROMOTER'),
      icon: <NoteAltOutlinedIcon />,
      to: `/${lang}/static/terms-and-conditions-promoters`,
      section: `/${lang}/static/terms-and-conditions-promoters`,
    },
  ];

  const changeLang_ar = () => {
    i18n.changeLanguage('ar');
    const newPath = currentPath.replace('/ae-en/', '/ae-ar/');
    navigate(newPath, { replace: true });
    window.location.reload();
  };

  const changeLang_en = () => {
    i18n.changeLanguage('en');
    const newPath = currentPath.replace('/ae-ar/', '/ae-en/');
    navigate(newPath, { replace: true });
    window.location.reload();
  };

  const logoutPopup = () => {
    setModalOpen(true);
  };

  const logoutPageHandler = () => {
    dispatch(logoutHandler());
    setModalOpen(false);
    navigate(`/${lang}/`);
  };

  useEffect(() => {
    const storedData = localStorage.getItem('loginDetails');
    if (storedData) {
      setUserDetails(JSON.parse(storedData));
    }
  }, []);

  const myAccountFooterLink = (path: string) => {
    return `${path}`;
  };

  const myAccountLink = (path: string) => {
    return `${path}`;
  };

  const list = () => (
    <Box
    // sx={{ width: size }}
    // role="presentation"
    // onClick={toggle(false)}
    // onKeyDown={toggle(false)}
    >
      <div className={css.sidebarMobile}>
        <div>
          <p className={css.userName}>
            {t('HELLO')} {userDetails?.first_name}
          </p>
          <p className={css.userEmail}> {userDetails?.email}</p>
          <div
            onClick={() => {
              toggle(false);
              setTimeout(() => {
                navigate(`/${lang}/`);
              }, 500);
            }}
            className={css.closeDrawer}
          >
            <CloseIcon style={{ fontSize: '25px' }} />
          </div>
        </div>
        <Divider style={{ margin: '15px 0' }} />
        <label className={css.sidebarMenuTitle}>My Account</label>
        <ul className={css.sidebarList}>
          {sidebarNavItems.map((val, index) => {
            const isActive = val.to === location.pathname;
            return (
              <Link key={index} to={myAccountLink(val.section)}>
                <li
                  // onClick={() => {
                  //   toggle(false);
                  //   setTimeout(() => {
                  //     navigate(val.section);
                  //   }, 500);
                  // }}
                  className={`${css.row} ${isActive ? css.active : ''}`}
                >
                  <div className={css.icon}>{val.icon}</div>
                  <div className={css.text}>{val.display}</div>
                  <div className={css.rightIcon}>
                    <ArrowForwardIosIcon style={{ fontSize: '15px' }} />
                  </div>
                </li>
              </Link>
            );
          })}
          <li
            style={{ marginBottom: '24px' }}
            className={css.row}
            onClick={() => logoutPopup()}
          >
            <div className={css.icon}>
              <LogoutOutlinedIcon />
            </div>
            <div className={css.text}>Logout</div>
          </li>
        </ul>
        <hr />
        {/* <label className={css.sidebarMenuTitle}>My Account</label> */}
        <ul className={css.sidebarList}>
          {sidebarFooterItems.map((val, index) => {
            const isActive = val.to === location.pathname;
            return (
              <Link key={index} to={myAccountFooterLink(val.section)}>
                <li
                  // onClick={() => {
                  //   toggle(false);
                  //   setTimeout(() => {
                  //     navigate(val.section);
                  //   }, 500);
                  // }}
                  className={`${css.row} ${isActive ? css.active : ''}`}
                >
                  <div className={css.icon}>{val.icon}</div>
                  <div className={css.text}>{val.display}</div>
                  <div className={css.rightIcon}>
                    <ArrowForwardIosIcon style={{ fontSize: '15px' }} />
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <ConsumerConfirmBoxAlert
        title={t(`ARE_YOU_SURE_YOU_WANT_TO_LOGOUT`)}
        handleClose={() => setModalOpen(false)}
        message={''}
        open={modalOpen}
        submitHandler={logoutPageHandler}
      />
    </Box>
  );

  return <div className={css.accountHeading}>{list()}</div>;
}

export default MobileSideMenu;
