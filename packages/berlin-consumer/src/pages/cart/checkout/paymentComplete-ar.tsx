import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Card,
  Dialog,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';

// third-party
// import { Chance } from 'chance';

// project imports
// import MainCard from 'components/MainCard';
// import { PopupTransition } from 'components/@extended/Transitions';

// assets
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useEffect, useState } from 'react';
import { lang } from '../../../utils/getLang';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  extendedWindow,
  mPage,
  viewItemList,
  viewPageEvent,
} from '../../../utils/moEngage';
import { useStripe } from '@stripe/react-stripe-js';

// const chance = new Chance();

// ==============================|| CHECKOUT - ORDER COMPLETE ||============================== //

// const OrderComplete = ({ open }: { open: boolean }) => {
const OrderCompleteAr = () => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const { t, i18n } = useTranslation('translation');
  const currentCity = useSelector((state: any) => state?.cityName?.name);
  const { prevLocation } = useSelector((state: any) => state?.cityName);
  const { cartRes, cartItems } = useSelector((state: any) => state?.cartItems);
  const { item } = useSelector((store: any) => store.productDetails);
  useEffect(() => {
    if (open) {
      // Set a timer for 3 seconds
      setTimeout(() => {
        window.location.href = `${window.location.origin}/${lang}/vouchers`;
      }, 3000);
    }
    viewPageEvent(mPage.paymentComplete, currentCity, prevLocation);
    const data = localStorage.getItem('GFTUJNBGH')
      ? JSON.parse(localStorage.getItem('GFTUJNBGH'))
      : {};
    const contents = data?.items?.map((item) => ({
      content_id: item.id,
      content_type:
        item.deal_type == 'COMBO'
          ? item.deal_type
          : item.items[0].deal_type == 'BUNDLE'
          ? 'bundle-child'
          : item.deal_type,
      content_name: item.title_label,
    }));
    // console.log('ttq.track', contents);
    // console.log('value,currency', data?.value, data?.currency);
    const profileData = localStorage.getItem('loginDetails')
      ? JSON.parse(localStorage.getItem('loginDetails'))
      : {};
    const mobileNumber = localStorage.getItem('mobileNumber')
      ? JSON.parse(localStorage.getItem('mobileNumber'))
      : {};
    if (data.transaction_id) {
      viewItemList(data, currentCity, 'purchase');
      //  const extendedWindow: any = window;
      //   const obj = {
      //     email: profileData.email, // string. The email of the customer if available. It must be hashed with SHA-256 on the client side.
      //     phone_number: mobileNumber, // string. The phone number of the customer if available. It must be hashed with SHA-256 on the client side.
      //     external_id: profileData.id,
      //   };
      //   extendedWindow.ttq.identify(obj);

      //   extendedWindow.ttq.track('CompletePayment', {
      //     contents: contents,
      //     value: data?.value, // number. Value of the order or items sold. Example: 100.
      //     currency: data?.currency, // string. The 4217 currency code. Example: "USD".
      //   });

      //   console.log('calll', obj);
      // }
      const hashEmailPromise = crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(profileData.email)
      );
      const hashPhoneNumberPromise = crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(mobileNumber)
      );
      const hashExternalIdPromise = crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(profileData.id)
      );

      Promise.all([
        hashEmailPromise,
        hashPhoneNumberPromise,
        hashExternalIdPromise,
      ])
        .then(([hashEmail, hashPhoneNumber, hashExternalId]) => {
          const hexHashEmail = Array.from(new Uint8Array(hashEmail))
            .map((byte) => byte.toString(16).padStart(2, '0'))
            .join('');
          const hexHashPhoneNumber = Array.from(new Uint8Array(hashPhoneNumber))
            .map((byte) => byte.toString(16).padStart(2, '0'))
            .join('');
          const hexHashExternalId = Array.from(new Uint8Array(hashExternalId))
            .map((byte) => byte.toString(16).padStart(2, '0'))
            .join('');

          const obj = {
            email: hexHashEmail,
            phone_number:
              profileData.mobile_verified == true ? hexHashPhoneNumber : '',
            external_id: hexHashExternalId,
          };
          extendedWindow.ttq.identify(obj);
          extendedWindow.ttq.track('CompletePayment', {
            contents: contents,
            value: data?.value,
            currency: data?.currency,
          });

          // console.log('ttq.identify', obj);
        })
        .catch((error) => {
          console.error('Error hashing data:', error);
        });
    }
  }, []);
  return (
    <Dialog
      open={true}
      fullScreen
      //   TransitionComponent={}
      sx={{
        '& .MuiDialog-paper': {
          bgcolor: 'background.paper',
          backgroundImage: 'none',
        },
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: '100vh' }}
      >
        <Grid item>
          <Card sx={{ boxShadow: 'none' }}>
            <Stack spacing={2} alignItems="center">
              <Box
                sx={{
                  textAlign: 'center',
                  position: 'relative',
                  width: { xs: 320, sm: 450 },
                }}
              >
                {/* <img
                  src={completed}
                  alt={t('ORDER_COMPLETE')}
                  style={{ width: 'inherit' }}
                /> */}
                <CheckCircleOutlineIcon
                  sx={{ fontSize: '100px', color: 'green' }}
                />
              </Box>
              <Typography variant={matchDownMD ? 'h5' : 'h4'} align="center">
                {t('THANK_FOR_PURCHASE')}
              </Typography>
              <Box sx={{ px: 2.5 }}>
                <Typography align="center" color="textSecondary">
                  {t('WE_WLL_SEND_NOTIFICATION_SOON')}
                </Typography>
              </Box>

              <Stack direction="row" justifyContent="center" spacing={3}>
                {t('PLEASE_WAIT_WHILE_REDIRECTING')}
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default OrderCompleteAr;
