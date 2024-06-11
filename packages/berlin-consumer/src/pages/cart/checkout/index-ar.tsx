import CheckoutCartAr from './CheckoutCart';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
} from '@mui/material';
import css from '../Cart.module.scss';
import { useTranslation } from 'react-i18next';
import PrimaryButton from 'berlin-common/src/components/button/PrimaryButton';
import IndicationBars from '../../../components/indicationBar';
import { useNavigate, useParams } from 'react-router-dom';
import mobIcon from '../../../../assets/mobHeaderIcon.svg';
import { path } from '../../../routes/Routers';
import { HapidoLogo, useWindowSize } from 'berlin-common';
import Apple from '../../../../assets/AuthImg/Apple.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import {
  createPaymentIntent,
  getPaymentData,
} from '../../../services/cartService';
import { fetchData } from '../../../store/slice/CartCount';
import { useDispatch, useSelector } from 'react-redux';
import { mPage, viewPageEvent } from '../../../utils/moEngage';
import { PUBLIC_KEY } from '../../../../../../urlConst';
import Helmet from 'react-helmet';
import getMetaTags from '../../../utils/getMetaTags';
import OpenInApp from '../../../components/openInApp';
import { lang } from '../../../utils/getLang';
import CheckoutFormAr from './paymentStripe-ar';

const stripePromise = loadStripe(PUBLIC_KEY);

const checkoutItemAr = () => {
  const { i18n, t } = useTranslation('translation');
  const currentCity = useSelector((state: any) => state?.cityName?.name);
  const { prevLocation } = useSelector((state: any) => state?.cityName);
  const navigate = useNavigate();
  const { size } = useWindowSize();
  const [optionData, setOptionData] = useState<any>();
  const [option, setOption] = useState<any>();
  const dispatch = useDispatch();
  const [updatedFlag, setUpdatedFlag] = useState<boolean>(false);
  const { cartRes } = useSelector((state: any) => state?.cartItems);
  const param = useParams();

  const [savedCards, setSavedCards] = useState<any>([]);
  const routeBackHandler = () => {
    navigate(-1);
  };
  useEffect(() => {
    getPaymentData()
      .then((res) => {
        const savedCard = res?.data;
        if (savedCard.length > 0) setSavedCards(savedCard);
      })
      .catch((error) => {
        console.log('error', error);
      });

    const payload = {
      isSaveCard: false,
    };

    createPaymentIntent(payload)
      .then((res) => {
        setOptionData(res.data);
        setOption({
          clientSecret: res.data?.clientSecret,
          appearance: { theme: 'stripe' },
        });
        if (res?.data?.updateFlag == true) {
          setUpdatedFlag(res?.data?.updateFlag);
        }
      })
      .catch((error) => {
        setTimeout(() => {
          window.location.href = `${window.location.origin}/${lang}/cart`;
        }, 2000);
        console.log('error', error);
      });
  }, []);

  useEffect(() => {
    viewPageEvent(mPage.checkout, currentCity, prevLocation);
  }, []);
  const urlObject = new URL(window.location.href);
  const baseUrlWithoutQueryString = urlObject.origin + urlObject.pathname;
  const HapidoSiteLogo =
    'https://cdn.hapido.com/site-assets/images/hapido-full-logo-white.jpg';

  // meta tags
  const fullMetaArray = {
    title: 'Checkout - Hapido',
    metaKeywords: 'checkout, payment, order, purchase',
    metaDescription:
      'Complete your purchase securely with our checkout process on Hapido.',
    ogType: 'website',
    ogSiteName: 'hapido.com',
    ogLocale: 'en_ae',
    ogURL: baseUrlWithoutQueryString,
    ogTitle: 'Checkout - Hapido',
    ogDescriptions:
      'Complete your purchase securely with our checkout process on Hapido.',
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

  // console.log('optionData.clientSecret', optionData, option);

  return (
    <>
      {/* <Helmet>
        <title>Checkout - Hapido</title>
        <meta
          name="description"
          content="Complete your purchase securely with our checkout process on Hapido."
        />
        <meta name="keywords" content="checkout, payment, order, purchase" />
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
          content="Checkout - Hapido"
          data-react-helmet="true"
        />
        <meta
          property="og:description"
          content="Complete your purchase securely with our checkout process on Hapido."
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
      {/* <Container maxWidth="xl" className={css.section}>
        {size < 768 ? (
          <Box
            display={'flex'}
            alignItems={'center'}
            pb={1}
            borderBottom={'0.5px solid #707070'}
          >
            <Box mr={2} pb={-1} onClick={() => navigate(-1)}>
              <img loading="lazy" src={mobIcon} alt="" />
            </Box>
            <Box className={css.backHeader}>{t('CART')}</Box>
          </Box>
        ) : (
          <Box mb={2}>
            <div
              onClick={routeBackHandler}
              style={{ marginRight: '10px', cursor: 'pointer' }}
            >
              <ArrowBackIcon />
            </div>
          </Box>
        )}

        <Grid container className={css.resCardCheckout}>
          <Grid
            item
            xl={8}
            lg={8}
            md={7}
            sm={12}
            xs={12}
            className={css.leftCard}
          >
            <IndicationBars
              type="warning"
              message="تم تعديل سلة التسوق حسب التوفر، وتمت إزالة العنصر لأنه تم بيعه"
            />
            <CheckoutCartAr />
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm onPaymentSubmit={() => handlePaymentSubmit()} />
              </Elements>
            )}
          </Grid>

          {couponData.map((item, index) => (
            <Grid
              item
              xl={4}
              lg={4}
              md={5}
              sm={12}
              xs={12}
              className={css.rightCard}
            >
              <Card className={css.cartDesign}>
                <CardContent className={css.top}>
                  <div className={css.displayAround}>
                    <h2 key={index}> {t('SUBTOTAL')} </h2>
                    <h6>
                      {item.AED}{' '}
                      <span className={css.bold}> {item.aed159} </span>
                    </h6>
                  </div>

                  <div className={css.displayAround}>
                    <h2> {t('COUPON_DISCOUNT')} </h2>
                    <h6>
                      {' '}
                      {item.AED} <span> {item.aed10}</span>
                    </h6>
                  </div>

                  <div className={css.couponInput}>
                    <input type="text" placeholder="Enter Your Promo Code!" />
                  </div>

                  <div className={css.subTotalCart}>
                    <h6>{t('GRAND_TOTAL')} </h6>
                    <span className={css.span}>(Inclusive of VAT)</span>
                    <h6>
                      {' '}
                      {item.AED} {item.aed160}
                    </h6>
                  </div>
                  {size < 768 ? (
                    <div className={css.ApplePay}>
                      <div>
                        <img loading="lazy" src={Apple} alt={t('APPLE_LOGO')} />
                      </div>
                      <div className={css.payName}>{t('PAY')}</div>
                    </div>
                  ) : null}

                  <div className={css.resFixCard}>
                    <PrimaryButton
                      label={t('BOOK_NOW')}
                      className={css.priButton}
                      onClick={handlePaymentSubmit} // Call the function directly on button click
                    />
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container> */}
      {size < 768 && <OpenInApp />}

      {optionData?.clientSecret ? (
        <Elements options={option} stripe={stripePromise}>
          <CheckoutFormAr
            savedCards={savedCards}
            setOption={setOption}
            setOptionData={setOptionData}
            checkoutData={optionData}
            clientSecret={optionData.clientSecret}
            updatedFlag={updatedFlag}
          />
        </Elements>
      ) : (
        <Grid
          container
          sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              {t('PLEASE_WAIT')}
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default checkoutItemAr;
