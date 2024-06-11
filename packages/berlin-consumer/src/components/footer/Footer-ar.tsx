import { Container, Grid, Modal } from '@mui/material';
import { useTranslation } from 'react-i18next';
import css from './FooterStyle.module.scss';
import appIcon from '../../../assets/appIcon.png';
import googlePlay from '../../../assets/googlePlay.png';
import footerBg1 from '../../../assets/footerBg1.png';
import footerlogo from '../../../assets/footerlogo.png';
import footerB from '../../../assets/Requested Logo for web/Footer H.png';
import footerH from '../../../assets/Requested Logo for web/Full logo - SVG - Transparent orange.svg';
import facebook from '../../../assets/facebook.png';
import instagram from '../../../assets/instagram.png';
import applePay from '../../../assets/ApplePay.png';
import masterCard from '../../../assets/MasterCard.png';
import googlePay from '../../../assets/GooglePay.png';
import visa from '../../../assets/VisaHapido.png';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useEffect, useState } from 'react';
import homeIcon from '../../../assets/home.svg';
import CategoriesIcon from '../../../assets/Categories.svg';
import flashSaleIcon from '../../../assets/flashSales.svg';
import ramadanIcon from '../../../assets/Ramadan.svg';
import accountIcon from '../../../assets/account.svg';
import cartIcon from '../../../assets/cart.svg';
import { useWindowSize } from 'berlin-common';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { path } from '../../routes/Routers';
import AuthPopup from '../../pages/auth';
import { toggleDrawer } from '../../store/slice/SliderSlice';
import { useDispatch, useSelector } from 'react-redux';
import MobileSlider from '../AccountSideBar/mobileSlider';
import { lang } from '../../utils/getLang';
import {
  loginPopupChange,
  loginPopupChangeOut,
} from '../../store/slice/LoginSlice';
import { HapidoStaticPages } from '../../services/HomePageServices';
import { fetchData } from '../../store/slice/CartCount';
import MobileSideMenu from '../../pages/account/MobileSideMenu';

const FooterAr = () => {
  const { t } = useTranslation('translation');
  const [value, setValue] = useState(0);
  const { size } = useWindowSize();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginDetails = localStorage.getItem('loginDetails');
  const { totalCartCount } = useSelector((state: any) => state?.cartItems);

  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const userSignIn = () => {
    handleOpen();
  };
  const handleOpen = () => dispatch(loginPopupChange());
  const handleClose = () => dispatch(loginPopupChangeOut());
  const isLoginPopupOpen = useSelector(
    (state: any) => state.login?.isLoginPopupOpen
  );

  // Login Popup Close
  const loginData = localStorage.getItem('loginDetails');
  useEffect(() => {
    if (loginData) {
      handleClose();
      if (size < 768) {
        dispatch(fetchData({}));
      }
    }
  }, [loginData]);

  // useEffect(() => {
  //   if (isTokenValid) {
  //     dispatch(fetchData({}));
  //   }
  // }, [isTokenValid]);

  const itemData = [
    {
      img: appIcon,
      title: 'appIcon',
    },
    {
      img: googlePlay,
      title: 'googlePlay',
    },
  ];

  const pageIndex = localStorage.getItem('ResponsivePageIndex');
  useEffect(() => {
    setValue(JSON.parse(pageIndex));
  });

  const bottomRouts = (newValue) => {
    localStorage.setItem('ResponsivePageIndex', newValue);
    switch (newValue) {
      case 0:
        navigate(`/${lang}/`);
        break;
      case 1:
        navigate(`/${lang}/menu`);
        break;
      case 2:
        navigate(`/${lang}/flash-sale`);
        break;
      case 4:
        loginDetails ? navigate(`${lang}/cart`) : userSignIn();
        break;
      default:
        break;
    }
  };

  const bottomIndication = (newValue) => {
    setValue(newValue);
    bottomRouts(newValue);
  };

  return (
    <>
      <div className={`${css.footer} RTLComponent`}>
        <Container maxWidth={'xl'}>
          <Grid
            container
            className={size < 768 ? css.centerAlign : css.justify}
          >
            <Grid item lg={6} xs={0} md={6} className={css.footerTop}>
              <div className={`${css.footertopDiv} RTLAlignRight`}>
                <span>{t('CONNECT_WITH_US')}</span>
                {t('HAPIDO_MAIL')}
              </div>
            </Grid>

            <Grid item lg={6} xs={0} md={6}>
              <div className={`${css.socialImg} RTLsocialImg`}>
                <a href="https://www.facebook.com/HapidoUAE/" target="_blank">
                  <img loading="lazy" src={facebook} alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/hapidouae/" target="_blank">
                  <img loading="lazy" src={instagram} alt="instagram" />
                </a>
              </div>
            </Grid>
            {/* // TODO: temp commented
             {size < 768 ? null : (
              <Grid item lg={6} xs={0} md={6}>
                <div className={css.footerImg}>
                  <ImageList>
                    {itemData.map((item) => (
                      <ImageListItem key={item.img}>
                        <img
                          loading="lazy"
                          src={`${item.img}`}
                          srcSet={`${item.img}`}
                          alt={item.title}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </div>
              </Grid>
            )} */}
          </Grid>
          <Grid item lg={12} xs={12} md={12}>
            <hr />
          </Grid>
          {/* 
List your Business
Bulk Booking and Events
Terms & Conditions (This is customers one) */}

          <Grid container>
            <Grid item xl={7} xs={6} md={6} className={css.footerMiddle}>
              <Grid className={css.footerflex}>
                <div className={`${css.footerLink} RTLFooterLink`}>
                  <Link to={`/${lang}/static/about-us`}>{t('ABOUT_US')}</Link>
                  <Link to={`/${lang}/static/contact-us`}>
                    {t('CONTACT_US')}
                  </Link>
                  <Link to={`/${lang}/static/partner-contact`}>
                    {t('LIST_YOUR_BUSINESS')}
                  </Link>
                  <Link to={`/${lang}/static/events-contact`}>
                    {t('BULK_BOKKING_AND_EVENT')}
                  </Link>

                  {/* <Link to={`/${lang}/static/payment_methods`}>
                    {t('PAYMENT_METHODS')}
                  </Link> */}
                  {/* <Link to={`/${lang}/static/hapido_rewards`}>
                    {t('HAPIDO_REWARDS')}
                  </Link> */}
                </div>
                <div className={`${css.footerLink} RTLFooterLink`}>
                  <Link to={`/${lang}/static/privacy-policy`}>
                    {t('PRIVACY_POLICY')}
                  </Link>
                  <Link to={`/${lang}/static/terms-and-conditions-customers`}>
                    {t('TERMS_and_CONDITIONS')}
                  </Link>
                  <Link to={`/${lang}/static/terms-and-conditions-promoters`}>
                    {t('TERMS_and_CONDITIONS_PROMOTER')}
                  </Link>

                  {/* <Link to={`/${lang}/static/delivery_policy`}>
                    {t('DELIVERY_POLICY')}
                  </Link> */}
                  {/* <Link to={`/${lang}/static/refund`}>
                    {t('REFUND_/_RETURN_and_CANCELLATION')}
                  </Link> */}
                  {/* <Link to={`/${lang}/static/disclaimer`}>
                    {t('DISCLAIMER')}
                  </Link> */}
                  {/* <Link to={`/${lang}/static/faq`}>
                    {t('HAPIDO_REWARDS_FAQ')}
                  </Link> */}
                </div>
              </Grid>
            </Grid>

            <Grid
              item
              xl={5}
              xs={6}
              md={6}
              className={`${css.footerLogo} RTLFooterLogo`}
            >
              <img loading="lazy" src={footerB} alt={t(`FOOTER_ICON`)} />
            </Grid>
          </Grid>

          <Grid item lg={12} xs={12} md={12}>
            <hr />
          </Grid>

          <Grid container>
            <Grid item lg={12} xs={12} md={6}>
              <div className={css.footerLlogo}>
                <img loading="lazy" src={footerH} alt={t(`FOOTERLOGO`)} />
              </div>
              {/* {size < 768 ? (
                <ImageList className={css.resAppStore}>
                  {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        loading="lazy"
                        src={`${item.img}`}
                        srcSet={`${item.img}`}
                        alt={item.title}
                        style={{
                          maxWidth: '100%',
                          width: '100px',
                          height: 'auto',
                        }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              ) : null} */}
            </Grid>
          </Grid>

          <Grid container className={`${css.justify} ${css.cashAndVisa}`}>
            <Grid item lg={5} xs={0} md={4}>
              <div className={css.footerBottom}>
                <img loading="lazy" src={visa} alt={t(`VISA`)} />
                <img loading="lazy" src={masterCard} alt={t(`MASTERCARD`)} />
                <img loading="lazy" src={applePay} alt={t(`APPLEPAY`)} />
                <img loading="lazy" src={googlePay} alt={t(`GOOGLEPAY`)} />
              </div>
            </Grid>

            <Grid item lg={7} xs={0} md={8}>
              <span className={`${css.copyright} RTLCopyWright`}>
                {/* {t('COPYRIGHT')} &copy; {new Date().getFullYear()} {t('RIGHTS')} */}
                {t('COPYRIGHT')} &copy; 2024 {t('RIGHTS')}
              </span>
            </Grid>
          </Grid>
        </Container>
      </div>
      {size < 768 ? (
        <>
          <Box
            width={'100%'}
            position={'fixed'}
            bottom={'0'}
            zIndex={'1'}
            className={`${css.bottomNavigation} RTLMobileFooter`}
          >
            <BottomNavigation
              showLabels
              value={value}
              // onChange={(e, newValue) => bottomIndication(newValue)}
            >
              <NavLink
                to={'/'}
                className={({ isActive }) =>
                  isActive ? css.bottomNavigationActive : 'undefined'
                }
              >
                <BottomNavigationAction
                  label={t('HOME')}
                  icon={<img loading="lazy" src={homeIcon} alt={t('HOME')} />}
                />
              </NavLink>

              {/* //TODO: temp commented and added smooth scroll               
              <NavLink
                to={`/${lang}/menu`}
                className={({ isActive }) =>
                  isActive ? css.bottomNavigationActive : 'undefined'
                }
              >
                <BottomNavigationAction
                  label={t('CATEGORIES')}
                  icon={
                    <img
                      loading="lazy"
                      src={CategoriesIcon}
                      alt={t('CATEGORIES')}
                    />
                  }
                />
              </NavLink> */}
              <a
                onClick={() => {
                  // Get the current element
                  navigate(`/${lang}/`);
                  setTimeout(() => {
                    const element = document.getElementById('GoTop');
                    if (element) {
                      const rect = element.getBoundingClientRect();
                      window.scrollTo({
                        top: window.scrollY + rect.top - 70,
                        behavior: 'smooth',
                      });
                    }
                  }, 1000);
                }}
              >
                <BottomNavigationAction
                  label={t('CATEGORIES')}
                  icon={
                    <img
                      loading="lazy"
                      src={CategoriesIcon}
                      alt={t('CATEGORIES')}
                    />
                  }
                />
              </a>
              <NavLink
                to={`/${lang}/flash-sale`}
                className={({ isActive }) =>
                  isActive ? css.bottomNavigationActive : 'undefined'
                }
              >
                <BottomNavigationAction
                  label={t('FLASH_SALE')}
                  icon={
                    <img
                      loading="lazy"
                      src={flashSaleIcon}
                      alt={t('FLASH_SALE')}
                    />
                  }
                />
              </NavLink>
              {loginDetails ? (
                <Link to={`/${lang}/account`}>
                  <BottomNavigationAction
                    // onClick={() => dispatch(toggleDrawer(true))}

                    label={t('ACCOUNT')}
                    icon={
                      <img
                        loading="lazy"
                        src={accountIcon}
                        alt={t('ACCOUNT')}
                      />
                    }
                  />
                </Link>
              ) : (
                <Link to={''}>
                  <BottomNavigationAction
                    onClick={() => userSignIn()}
                    label={t('SIGN_IN')}
                    icon={
                      <img
                        loading="lazy"
                        src={accountIcon}
                        alt={t('SIGN_IN')}
                      />
                    }
                  />
                </Link>
              )}
              {loginDetails ? (
                <NavLink
                  to={`${lang}/cart`}
                  className={({ isActive }) =>
                    isActive ? css.bottomNavigationActive : 'undefined'
                  }
                >
                  <BottomNavigationAction
                    label={`${t('CART')} (${totalCartCount})`}
                    icon={<img loading="lazy" src={cartIcon} alt={t('CART')} />}
                  />
                </NavLink>
              ) : (
                <div onClick={() => userSignIn()}>
                  <BottomNavigationAction
                    label={`${t('CART')} (${totalCartCount})`}
                    icon={<img loading="lazy" src={cartIcon} alt={t('CART')} />}
                  />
                </div>
              )}
            </BottomNavigation>
          </Box>
          {/* Auth Model */}
          <Modal
            open={isLoginPopupOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={css.loginModel}>
              <AuthPopup />
            </Box>
          </Modal>
        </>
      ) : (
        ''
      )}
      {/* {loginDetails && <MobileSideMenu />} */}
    </>
  );
};

export default FooterAr;
