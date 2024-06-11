import {
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Modal,
  CircularProgress,
} from '@mui/material';
import SingleCarts from './SingleCarts';
import css from './Cart.module.scss';
import { useTranslation } from 'react-i18next';
import PrimaryButton from 'berlin-common/src/components/button/PrimaryButton';
import IndicationBars from '../../components/indicationBar';
import { useNavigate, useParams } from 'react-router-dom';
import mobIcon from '../../../assets/mobHeaderIcon.svg';
import { path } from '../../routes/Routers';
import {
  HapidoLogo,
  MagicTextField,
  SecondaryButton,
  useWindowSize,
} from 'berlin-common';
import { useEffect, useRef, useState } from 'react';
import { redeemCode, resetCode } from '../../services/cartService';
import { lang } from '../../utils/getLang';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../store/slice/CartCount';
import {
  mPage,
  promoCodeEvent,
  viewItemList,
  viewPageEvent,
} from '../../utils/moEngage';
import { setSnackbarConfig } from '../../store/slice/Loader';
import Helmet from 'react-helmet';
import applePay from '../../../assets/ApplePay.png';
import masterCard from '../../../assets/MasterCard.png';
import googlePay from '../../../assets/GooglePay.png';
import visa from '../../../assets/VisaHapido.png';
import getMetaTags from '../../utils/getMetaTags';
import OpenInApp from '../../components/openInApp';

const CartList = () => {
  const { cartItems, cartRes } = useSelector((state: any) => state?.cartItems);
  const [flag, setFlag] = useState<boolean>(false);
  const { i18n, t } = useTranslation('translation');
  const currentCity = useSelector((state: any) => state?.cityName?.name);
  const { prevLocation } = useSelector((state: any) => state?.cityName);
  const navigate = useNavigate();
  const { size } = useWindowSize();
  const param = useParams();

  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState<any>();
  const [couponMsg, setCouponMsg] = useState<any>();
  const [errorMsg, setErrorMsg] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponText, setCouponText] = useState('');

  useEffect(() => {
    dispatch(fetchData({}));
    setCouponCode(couponText);
  }, []);
  const [isViewItemCall, setIsViewItemCall] = useState(false);
  useEffect(() => {
    setCouponText(cartRes.coupon_code);
    if (cartItems.length > 0 && isViewItemCall === false) {
      setIsViewItemCall(true);
      viewItemList(
        {
          currency: cartItems[0]?.items[0]?.currency,
          value: cartRes?.subTotal,
          items: cartItems?.map((e) => {
            return {
              ...e,
              title_label: e.deal_title,

              id:
                e.deal_type == 'SINGLE'
                  ? e?.items[0]?.deal_id
                  : e?.deal_combo_id,
              merchant_name: e?.items[0]?.merchant_name,
              coupon: e?.items[0]?.coupon_code_applied,
              discount:
                e?.deal_type == 'COMBO'
                  ? e?.discount_amount
                  : e?.items[0]?.coupon_discount,
              primary_category: e?.items[0]?.primary_category,
              secondary_categories: e?.items[0]?.secondary_categories,
              price_type:
                e?.deal_type == 'COMBO' || e?.items[0]?.deal_type == 'BUNDLE'
                  ? e?.items[0]?.price_type
                  : e?.items
                      .map((e) => {
                        return e?.price_type;
                      })
                      .join(','),
              price: cartRes?.grandTotal,
              quantity:
                e?.deal_type == 'COMBO' || e?.items[0]?.deal_type == 'BUNDLE'
                  ? e?.items[0]?.quantity
                  : e?.items
                      .map((e) => {
                        return e?.quantity;
                      })
                      .reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue,
                        0
                      ),
            };
          }),
          discount: cartRes?.discount,
          coupon: cartRes?.coupon_code,
        },
        currentCity,
        'view_cart'
      );
      // if (cartRes?.qualifiedGift?.message) {
      //   dispatch(
      //     setSnackbarConfig({
      //       isOpen: true,
      //       message: cartRes.qualifiedGift.message,
      //       varient: 'success',
      //     })
      //   );
      // }
    }
  }, [cartItems]);

  // Redeem
  const onChangeHandler = (e) => {
    const uppercaseText = e.target.value
      .toUpperCase()
      .replace(/\s/g, '')
      .replace(/[^a-zA-Z0-9]/g, '');
    setCouponCode(uppercaseText);
  };

  const refreshHandler = () => {
    window.location.reload();
  };

  const handleRedeem = () => {
    const payload = {
      promoCode: couponCode,
      platform: 'WEB',
    };
    if (couponText) {
      resetCode()
        .then((res) => {
          setCouponCode('');
          setErrorMsg(false);
          dispatch(fetchData({}));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      redeemCode(payload)
        .then((res) => {
          if (res.success == true) {
            let discountRes = res.data.discount;
            promoCodeEvent(
              'promo_code_apply_success',
              cartItems[0]?.items[0]?.currency,
              couponCode,
              discountRes,
              currentCity
            );
            dispatch(fetchData({}));
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: res.message && res.message,
                varient: 'success',
              })
            );
          }
        })
        .catch((error) => {
          promoCodeEvent(
            'promo_code_apply_fail',
            cartItems[0]?.items[0]?.currency,
            couponCode,
            cartRes.discount,
            currentCity
          );
          console.log(error);
          setErrMsg(error.response.data.error.message);
          setErrorMsg(true);
        });
      setErrorMsg(false);
    }
  };

  const recieveError = (sendErr) => {
    setErrMsg(sendErr);
  };

  useEffect(() => {
    viewPageEvent(mPage.cart, currentCity, prevLocation);
  }, []);
  const urlObject = new URL(window.location.href);
  const baseUrlWithoutQueryString = urlObject.origin + urlObject.pathname;
  const HapidoSiteLogo =
    'https://cdn.hapido.com/site-assets/images/hapido-full-logo-white.jpg';

  // meta tags
  const fullMetaArray = {
    title: 'Cart - Hapido',
    metaKeywords: 'shopping cart, deals, checkout',
    metaDescription:
      'Review and edit the deals in your shopping cart on Hapido.',
    ogType: 'website',
    ogSiteName: 'hapido.com',
    ogLocale: 'en_ae',
    ogURL: baseUrlWithoutQueryString,
    ogTitle: 'Cart - Hapido',
    ogDescriptions:
      'Review and edit the deals in your shopping cart on Hapido.',
    ogImageWidth: '350',
    ogImageHeight: '350',
    ogImage: HapidoSiteLogo,
    twitterSite: '@hapido',
    twitterCreator: '@hapido',
    twitterImage: HapidoSiteLogo,
    twitterCard: HapidoSiteLogo,
  };

  useEffect(() => {
    getMetaTags(fullMetaArray);
  }, [param]);

  return (
    <>
      {/* <Helmet>
        <title>Cart - Hapido</title>
        <meta
          name="description"
          content="Review and edit the deals in your shopping cart on Hapido."
        />
        <meta name="keywords" content="shopping cart, deals, checkout" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="hapido.com" />
        <meta property="og:locale" content="en_ae" />
        <meta
          property="og:url"
          content={baseUrlWithoutQueryString}
          data-react-helmet="true"
        />
        <meta
          property="og:title"
          content="Cart - Hapido"
          data-react-helmet="true"
        />
        <meta
          property="og:description"
          content="Review and edit the deals in your shopping cart on Hapido."
          data-react-helmet="true"
        />
        <meta property="og:image:width" content="350" />
        <meta property="og:image:height" content="350" />
        <meta
          property="og:image"
          content={HapidoLogo}
          data-react-helmet="true"
        />
        {/* <!-- Twitter -->
        <meta name="twitter:site" content="@hapido" />
        <meta name="twitter:creator" content="@hapido" />
        <meta
          name="twitter:image"
          content={HapidoLogo}
          data-react-helmet="true"
        />
        <meta
          name="twitter:card"
          content={HapidoLogo}
          data-react-helmet="true"
        />
      </Helmet> */}
      {size < 768 && <OpenInApp />}

      <Container maxWidth="xl" className={css.section}>
        {size < 768 ? (
          <Box
            display={'flex'}
            pb={1}
            borderBottom={'0.5px solid #707070'}
            alignItems={'center'}
          >
            <Box mr={2} pb={-1} onClick={() => navigate(-1)}>
              <img
                style={{ marginLeft: '15px' }}
                loading="lazy"
                src={mobIcon}
                alt=""
              />
            </Box>
            <Box className={css.backHeader}>{t('CART')}</Box>
          </Box>
        ) : (
          ''
        )}
      </Container>
      {cartItems.length > 0 ? (
        <Container maxWidth="xl" className={css.section}>
          <div className={css.offerImage}>
            <a href={`/${lang}/static/mobile-app`} target="_blank">
              <img
                loading="lazy"
                src={
                  'https://cdn.hapido.com/onsite-banners/sale/discount-coupon/flat10/1152x135-desktop-banner.jpg'
                }
                alt="Hapido"
              />
            </a>
          </div>
          <Grid container className={css.subSection}>
            <Grid
              item
              xl={8}
              lg={8}
              md={7}
              sm={12}
              xs={12}
              className={css.leftCard}
            >
              {(flag || errMsg) && (
                <IndicationBars
                  type="warning"
                  message="Cart adjusted as per availability, item removed as sold out"
                />
              )}

              {/* {cartData} */}

              <>
                {cartItems?.map((item, index) => (
                  <>
                    <div key={index}>
                      <SingleCarts
                        key={index}
                        cardIndex={index}
                        item={item}
                        setErrorMsg={setErrorMsg}
                        setCouponCode={setCouponCode}
                        recieveError={recieveError}
                      />
                    </div>
                  </>
                ))}
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <div className={css.noItemsInCart}>
                    <div className={css.addMoreBtn}>
                      <button
                        className={css.addDealsButton}
                        onClick={() => navigate(`/${lang}/`)}
                      >
                        {t('ADD_NEW_DEALS')}
                      </button>
                    </div>
                  </div>
                </Box>
              </>
            </Grid>
            <Grid
              item
              xl={4}
              lg={4}
              md={5}
              sm={12}
              xs={12}
              className={css.rightCard}
            >
              <div className={css.positionContainer}>
                <Card className={css.cartDesign}>
                  <CardContent>
                    <h1> {t('COUPON')} </h1>

                    <div className={css.form}>
                      <input
                        type="text"
                        value={couponCode ? couponCode : cartRes.coupon_code}
                        onChange={onChangeHandler}
                        placeholder={t('REDEEM_CODE').toUpperCase()}
                        disabled={cartRes.coupon_code ? true : false}
                      />
                      {/* )} */}
                      <button onClick={() => handleRedeem()}>
                        {cartRes.coupon_code ? t('RESET') : t('REDEEM')}
                      </button>
                    </div>
                    {errorMsg == true && (
                      <div className={css.errMsg}>{errMsg}</div>
                    )}
                    {couponMsg && (
                      <div className={css.successMsg}>{couponMsg}</div>
                    )}
                  </CardContent>
                </Card>

                <Card className={`${css.cartDesign} ${css.resCard}`}>
                  <CardContent className={css.top}>
                    <div className={css.displayAround}>
                      <h2> {t('SUBTOTAL')} </h2>
                      <h6>
                        {cartItems[0]?.items[0]?.currency}
                        <span className={css.bold}>{cartRes.grandTotal}</span>
                      </h6>
                    </div>
                    {cartRes.discount > 0 && (
                      <div className={css.displayAround}>
                        <h2> {t('COUPON_DISCOUNT')} </h2>
                        <h6>
                          {cartItems[0]?.items[0]?.currency}
                          <span className={css.bold}>{cartRes.discount}</span>
                        </h6>
                      </div>
                    )}
                    <div className={css.subTotalCart}>
                      <h6>{t('GRAND_TOTAL')} </h6>
                      <span className={css.span}>{t('INCLUSIVE_OF_VAT')}</span>
                      <h6>
                        {cartItems[0]?.items[0]?.currency} {cartRes.subTotal}
                      </h6>
                    </div>
                    <div className={css.resFixCard}>
                      <PrimaryButton
                        label={t('BOOK_NOW')}
                        type="submit"
                        className={css.priButton}
                        onClick={() => navigate(`/${lang}/checkout`)}
                      />
                    </div>
                    {/* <Grid item lg={5} xs={0} md={4}> */}
                    <div className={css.cashAndVisa}>
                      <img loading="lazy" src={visa} alt={t('VISA')} />
                      <img
                        loading="lazy"
                        src={masterCard}
                        alt={t('MASTERCARD')}
                      />
                      <img loading="lazy" src={applePay} alt={t('APPLEPAY')} />
                      <img
                        loading="lazy"
                        src={googlePay}
                        alt={t('GOOGLEPAY')}
                      />
                    </div>
                    {/* </Grid> */}
                  </CardContent>
                </Card>
              </div>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Box
          width={'100vw'}
          height={'80vh'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <div className={css.noItemsInCart}>
            <Box my={4} className={css.noItems}>
              {t('YOU_HAVE_NO_ITEM_IN_CART')}
            </Box>
            <div className={css.addMoreBtn}>
              <PrimaryButton
                className={css.priButton}
                label={t('ADD_ITEMS')}
                onClick={() => navigate(`/${lang}/`)}
              />
            </div>
          </div>
        </Box>
      )}
    </>
  );
};

export default CartList;
