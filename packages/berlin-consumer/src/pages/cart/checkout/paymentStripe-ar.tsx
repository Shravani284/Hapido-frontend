import React, { useEffect, useRef, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement,
} from '@stripe/react-stripe-js';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  Switch,
  CircularProgress,
  Modal,
  Typography,
  useMediaQuery,
  Stack,
  Dialog,
  IconButton,
} from '@mui/material';
import css from '../Cart.module.scss';
import { useTranslation } from 'react-i18next';
// import { couponData } from '../../../../../data';
import PrimaryButton from 'berlin-common/src/components/button/PrimaryButton';
import IndicationBars from '../../../components/indicationBar';
import { useNavigate } from 'react-router-dom';
import mobIcon from '../../../../assets/mobHeaderIcon.svg';
import { path } from '../../../routes/Routers';
import { useWindowSize } from 'berlin-common';
import Apple from '../../../../assets/AuthImg/Apple.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import creditCard from '../../../../assets/creditCard.png';
import FailedCard from '../../../../assets/checkout/FailedCard.png';
import masterCard from '../../../../assets/MasterCard.png';
import visa from '../../../../assets/VisaHapido.png';
// import { useEffect, useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { lang } from '../../../utils/getLang';
import { useTheme } from 'styled-components';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../store/slice/CartCount';
import { viewItemList } from '../../../utils/moEngage';
import { setDetails } from '../../../store/slice/PaymentDetails';
import {
  createPaymentIntent,
  updatePaymentIntent,
} from '../../../services/cartService';
import { setSnackbarConfig } from '../../../store/slice/Loader';
import CheckoutCartAr from './CheckoutCart-ar';
const cardImages = {
  visa: visa,
  mastercard: masterCard,
};

export default function CheckoutFormAr({
  setOptionData,
  setOption,
  savedCards,
  clientSecret,
  checkoutData,
  updatedFlag,
}: any) {
  const { cartRes, cartItems } = useSelector((state: any) => state?.cartItems);
  const currentCity = useSelector((state: any) => state?.cityName?.name);
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation('translation');
  const [flag, setFlag] = useState<boolean>(false);
  const navigate = useNavigate();
  const { size } = useWindowSize();
  const stripe = useStripe();
  const elements = useElements();
  const cardRef = useRef(null);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [objData, setObjData] = useState<any>();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const selectedButtonRef = useRef(null);

  // const handleToggleForm = () => {
  //   setIsExpanded(!isExpanded);
  // };

  const routeBackHandler = () => {
    navigate(-1);
  };

  const handleSaveCardToggle = (e) => {
    setSaveCard(e.target.checked);
    const payload = {
      paymentIntentId: checkoutData?.transactionId,
      isSaveCard: e.target.checked,
    };
    updatePaymentIntent(payload)
      .then((res) => {
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: t('CHANGES_APPLIED'),
            varient: 'success',
          })
        );
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Retrieve the PaymentIntent
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage(t('SUCCESS_PAYMENT_RECEIVED'));
          // setObjData({ ...objData, tax: 0, payment_method: 'stripecard.ae',transaction_id:checkoutData?.transactionId });
          break;
        case 'processing':
          setMessage(
            t('PAYMENT_PROCESSING_WELL_UPDATE_YOU_WHEN_PAYMENT_IS_RECEIVED')
          );
          break;
        case 'requires_payment_method':
          break;
        default:
          setMessage(t('SOMETHING_WENT_WRONG'));
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const eventObj = {
      currency: cartItems[0]?.items[0]?.currency,
      value: checkoutData?.discountedTotalAmount,
      items: cartItems.map((e) => {
        return {
          ...e,
          title_label: e.deal_title,
          //TODO
          id: e.deal_type == 'SINGLE' ? e?.items[0]?.deal_id : e?.deal_combo_id,
          merchant_name: e?.items[0]?.merchant_name,
          coupon: e?.items[0]?.coupon_code_applied,
          discount: e?.items[0]?.coupon_discount,
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
          price: e.total_price,
          quantity:
            e?.deal_type == 'COMBO' || e?.items[0]?.deal_type == 'BUNDLE'
              ? e?.items[0]?.quantity
              : e?.items
                  .map((e) => {
                    return e?.quantity;
                  })
                  .reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
                  ),
        };
      }),
      coupon: cartRes.coupon_code,
      discount: checkoutData?.totalOfDiscount,
      value_no_discount: checkoutData?.totalAmount,
    };
    // setObjData(eventObj);
    // setObjData({
    //   ...eventObj,
    // });

    // dispatch(
    //   setDetails({
    //     ...eventObj,
    //     tax: 0,
    //     payment_method: 'stripecard.ae',
    //     transaction_id: checkoutData?.transactionId,
    //   })
    // );
    const data = {
      ...eventObj,
      tax: 0,
      payment_method: 'stripecard.ae',
      transaction_id: checkoutData?.transactionId,
    };

    localStorage.setItem('GFTUJNBGH', JSON.stringify(data));

    viewItemList(eventObj, currentCity, 'begin_checkout');
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    if (selectedPaymentMethodId) {
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: selectedPaymentMethodId,
        return_url: `${window.location.origin}/${lang}/cartitemlist/PaymentSuccess`,
      });
      var failedData;
      if (error) {
        setMessage(error.message);
        failedData = { ...data, payment_response: error.message };
        setIsLoading(false);
        // window.location.href = `${window.location.origin}/${lang}/cartitemlist/PaymentFailed`;
        viewItemList(failedData, currentCity, 'payment_failed');
      } else {
        setIsLoading(false);
        window.location.href = `${window.location.origin}/${lang}/cartitemlist/PaymentSuccess`;
      }

      setIsLoading(false);
    } else {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/${lang}/cartitemlist/PaymentSuccess`,
        },
      });
      if (error) {
        setIsLoading(false);
        setMessage(error.message);
        // window.location.href = `${window.location.origin}/${lang}/cartitemlist/PaymentFailed`;
      } else {
        setIsLoading(false);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [open]);
  // function disableSaveCard(e) {
  //   console.log('event', e);
  //   const selectedButton = e.target.closest('.tab');

  //   console.log('selectedButton', selectedButton);

  //   if (!selectedButton) return;

  //   if (selectedButton.id === 'card-tab') {
  //     setSelectedMethod(true);
  //   } else {
  //     setSelectedMethod(false);
  //     const payload = {
  //       paymentIntentId: checkoutData?.transactionId,
  //       isSaveCard: false,
  //     };
  //     updatePaymentIntent(payload)
  //       .then((res) => {
  //         dispatch(
  //           setSnackbarConfig({
  //             isOpen: true,
  //             message: 'Changes applied',
  //             varient: 'success',
  //           })
  //         );
  //       })
  //       .catch((error) => {
  //         console.log('error', error);
  //       });
  //   }
  // }

  // const tabs = document.querySelectorAll(
  //   '#card-tab, #google_pay-tab, #apple_pay-tab'
  // );
  // Array.from(tabs).forEach((tab: HTMLElement) => {
  //   tab.onclick = function (e) {
  //     disableSaveCard(e);
  //   };
  // });

  // const handleClick = (event) => {
  //   console.log('event=', event);
  //   const selectedButton = event.target.closest('.tab');
  //   console.log('selectedButton=', selectedButton);

  //   if (!selectedButton) return;

  //   if (selectedButton.id === 'card-tab') {
  //     setSelectedMethod(true);
  //   } else if (selectedMethod) {
  //     setSelectedMethod(false);
  //     const payload = {
  //       paymentIntentId: checkoutData?.transactionId,
  //       isSaveCard: false,
  //     };
  //     updatePaymentIntent(payload)
  //       .then((res) => {
  //         dispatch(
  //           setSnackbarConfig({
  //             isOpen: true,
  //             message: 'Changes applied',
  //             varient: 'success',
  //           })
  //         );
  //       })
  //       .catch((error) => {
  //         console.log('error', error);
  //       });
  //   }
  // };

  // // document.addselectedButtonListener('click', handleClick);

  // const cardTab = document.getElementById('elementId');
  // if (typeof cardTab != 'undefined' && cardTab != null) {
  //   cardTab.addEventListener('click', handleClick);
  // }

  // const googleTab = document.getElementById('elementId');
  // if (typeof googleTab != 'undefined' && googleTab != null) {
  //   googleTab.addEventListener('click', handleClick);
  // }

  // const appleTab = document.getElementById('elementId');
  // if (typeof appleTab != 'undefined' && appleTab != null) {
  //   appleTab.addEventListener('click', handleClick);
  // }

  const removeSelectedCard = () => {
    const savedCardsContainer = document.querySelector('.savedCards');

    if (savedCardsContainer) {
      const savedPaymentMethods =
        savedCardsContainer.querySelectorAll('.savePM');
      savedPaymentMethods.forEach((paymentMethod) => {
        if (paymentMethod.classList.contains('selected')) {
          setIsExpanded(true);
          setSelectedPaymentMethodId(null);
          paymentMethod.classList.remove('selected');
        }
      });
    } else {
      console.log('Saved cards container not found');
    }
  };
  useEffect(() => {
    if (selectedPaymentMethodId) {
      setIsExpanded(false);
      // const payload = {
      //   paymentIntentId: checkoutData?.transactionId,
      //   isSaveCard: false,
      // };
      // updatePaymentIntent(payload)
      //   .then((res) => {
      //     dispatch(
      //       setSnackbarConfig({
      //         isOpen: true,
      //         message: 'Changes applied',
      //         varient: 'success',
      //       })
      //     );
      //   })
      //   .catch((error) => {
      //     console.log('error', error);
      //   });
    }
  }, [selectedPaymentMethodId]);

  return (
    <>
      <form
        className={css.paymentStripe}
        id="payment-form"
        onSubmit={handleSubmit}
      >
        {size < 768 ? (
          <p className={css.mobprivacyPolicyText}>
            {t('LENIENCE_AND_PRIVACY_POLICY')}
          </p>
        ) : (
          ''
        )}
        <Container maxWidth="xl" className={css.section}>
          {size < 768 ? (
            <Box
              display={'flex'}
              alignItems={'center'}
              pb={1}
              borderBottom={'0.5px solid #707070'}
            >
              <Box mr={2} pb={-1} onClick={() => navigate(-1)}>
                <img
                  className="RTLBackArrow"
                  loading="lazy"
                  src={mobIcon}
                  alt=""
                />
              </Box>
              <Box className={`${css.backHeader} RTLBackHeader`}>
                {t('CART')}
              </Box>
            </Box>
          ) : (
            <Box mb={2} mt={2}>
              <div
                onClick={routeBackHandler}
                style={{
                  marginRight: '10px',
                  cursor: 'pointer',
                }}
              >
                <ArrowForwardIcon />
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
              {updatedFlag && (
                <IndicationBars
                  type="warning"
                  message={t(
                    'CART_ADJUSTED_AS_PER_AVAILABILITY_ITEM_REMOVED_AS_SOLD_OUT'
                  )}
                />
              )}

              <CheckoutCartAr />
              {savedCards?.length > 0 && (
                <Card className={css.saveCardDesign}>
                  <div className={`${css.savedCards} savedCards`}>
                    <div
                      className={`${css.headingSavedCards} RTLHeadingSavedCards`}
                    >
                      <h2>{t('SAVED_CARDS')}</h2>
                      <img loading="lazy" src={creditCard} />
                    </div>
                    {savedCards?.length > 0 ? (
                      savedCards?.map((paymentMethod, index) => (
                        <SavedPaymentMethod
                          cardRef={cardRef}
                          key={index}
                          paymentMethod={paymentMethod}
                          selected={
                            selectedPaymentMethodId === paymentMethod?.id
                          }
                          onChange={() =>
                            setSelectedPaymentMethodId(paymentMethod?.id)
                          }
                        />
                      ))
                    ) : (
                      <div style={{ textAlign: 'center', opacity: '0.6' }}>
                        {/* Currently, there are no saved cards available */}
                        {t(
                          'UNFORTUNATELY_THERE_ARE_NO_SAVED_CARDS_AVAILABLE_AT_THE_MOMENT'
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              )}

              <Card
                onClick={removeSelectedCard}
                className={`${css.cartDesign} ${css.stripeCard}`}
              >
                <CardContent style={{ padding: '10px' }}>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    className={css.title}
                  >
                    <div style={{ display: 'flex' }}>
                      <h1>{t('ADD_NEW_CARD')}</h1>
                      <img loading="lazy" src={creditCard} />
                    </div>
                    <div>{!isExpanded && <AddCircleOutlineOutlinedIcon />}</div>
                  </Grid>
                  {isExpanded && (
                    <div
                      ref={selectedButtonRef}
                      className={`payment-element-container `}
                    >
                      <form onSubmit={handleSubmit}>
                        <PaymentElement />
                      </form>
                      {selectedMethod && (
                        <Grid className={css.switchButton}>
                          <Switch
                            checked={saveCard}
                            onChange={handleSaveCardToggle}
                          />
                          <Typography>
                            {t('SAVE_CARD_FOR_FUTURE_USE')}
                          </Typography>
                        </Grid>
                      )}
                      {message && (
                        <div className={css.cardError}>
                          {/* {t('PAYMENT_FAILED_TRA_NOW')} // TODO: If error msg need... */}
                          <br />
                          {message}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* {couponData.map((item, index) => ( */}
            <Grid
              item
              xl={4}
              lg={4}
              md={5}
              sm={12}
              xs={12}
              className={`${css.rightCard} RTLrightCard`}
            >
              <div className={css.positionContainerCart}>
                <Card className={css.cartDesign}>
                  <CardContent className={css.top}>
                    <div className={css.displayAround}>
                      <h2> {t('SUBTOTAL')} </h2>
                      <h6>
                        <span className={css.bold}>
                          {checkoutData?.totalAmount}
                        </span>
                        {checkoutData?.currency.toUpperCase()}
                      </h6>
                    </div>
                    {checkoutData?.totalOfDiscount &&
                    checkoutData?.totalOfDiscount > 0 ? (
                      <div className={css.displayAround}>
                        <h2> {t('COUPON_DISCOUNT')} </h2>
                        <h6>
                          <span>{checkoutData?.totalOfDiscount}</span>
                          {checkoutData?.currency.toUpperCase()}
                        </h6>
                      </div>
                    ) : (
                      ''
                    )}
                    {/* //TODO: temp commented
                  <div className={css.couponInput}>
                    <input type="text" placeholder="Enter Your Promo Code!" />
                  </div> */}

                    <div className={css.subTotalCart}>
                      <h6>{t('GRAND_TOTAL')}&nbsp;</h6>
                      <span className={css.span}>{t('INCLUSIVE_OF_VAT')}</span>
                      <h6>
                        {checkoutData?.discountedTotalAmount}
                        {checkoutData?.currency.toUpperCase()}
                      </h6>
                    </div>
                    <button
                      className={css.payNowBtn}
                      disabled={isLoading || !stripe || !elements}
                      id="submit"
                    >
                      <span id="button-text">
                        {isLoading ? (
                          <CircularProgress
                            style={{ color: '#ffffff', padding: '5px' }}
                          />
                        ) : (
                          t('PAY_NOW')
                        )}
                      </span>
                    </button>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            {/* ))} */}
          </Grid>
        </Container>
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ maxWidth: '700px' }} className={css.paymentModel}>
          <Card sx={{ padding: '30px 20px', borderRadius: '20px' }}>
            <Stack spacing={2} alignItems="center">
              <Box
                sx={{
                  textAlign: 'center',
                  position: 'relative',
                  width: { xs: 320, sm: 450 },
                }}
              >
                <img
                  src={FailedCard}
                  alt={t('ORDER_COMPLETE')}
                  style={{ width: '300px' }}
                />
              </Box>
              <Typography align="center">
                {t('PAYMENT_FAILED_TRA_NOW')}
              </Typography>
              <Box sx={{ px: 1, pb: 2 }}>
                <Typography align="center" color="textSecondary">
                  {message}
                </Typography>
                <Stack direction="row" justifyContent="center" spacing={3}>
                  {t('PLEASE_WAIT_WHILE_REDIRECTING')}
                </Stack>
              </Box>
            </Stack>
          </Card>
        </Box>
      </Modal>
    </>
  );
}

const SavedPaymentMethod = ({ paymentMethod, selected, onChange, cardRef }) => {
  const currentDate = new Date();
  const { exp_month, exp_year } = paymentMethod?.card;
  const expirationDate = new Date(exp_year, exp_month, 1);
  const isExpired = expirationDate < currentDate;
  const { i18n, t } = useTranslation('translation');

  return (
    <label htmlFor={paymentMethod.id}>
      <div
        ref={cardRef}
        className={`${css.savedPaymentMethod} savePM ${
          selected ? 'selected' : ''
        } ${isExpired ? 'isExpired' : ''}`}
      >
        <div className={`${css.paymentMethodDetails}`}>
          <div>
            <input
              type="radio"
              id={paymentMethod.id}
              value={paymentMethod.id}
              checked={selected}
              onChange={() => onChange(paymentMethod?.id)}
              disabled={isExpired}
            />
          </div>

          <div className={css.brandName}>
            {Object.keys(cardImages).map(
              (brand) =>
                paymentMethod?.card?.brand.toLowerCase() === brand && (
                  <span key={brand}>
                    {cardImages[brand] ? (
                      <img loading="lazy" src={cardImages[brand]} alt={brand} />
                    ) : (
                      <label htmlFor={paymentMethod?.id}>{brand}</label>
                    )}
                  </span>
                )
            )}
          </div>
          <div className={css.cardNumber}>
            {t('ENDING_IN')} <strong>{paymentMethod?.card?.last4}</strong>
          </div>

          {isExpired ? t('EXPIRED') : null}
        </div>
      </div>
    </label>
  );
};
