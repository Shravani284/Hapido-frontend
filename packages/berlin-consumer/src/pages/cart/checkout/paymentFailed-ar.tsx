import { Link, useNavigate } from 'react-router-dom';

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
import FailedCard from '../../../../assets/checkout/FailedCard.png';
import tryAgain from '../../../../assets/checkout/tryAgain.png';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { path } from '../../../routes/Routers';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { mPage, viewPageEvent } from '../../../utils/moEngage';

// const chance = new Chance();

// ==============================|| CHECKOUT - ORDER COMPLETE ||============================== //

// const OrderFailed = ({ open }: { open: boolean }) => {
const OrderFailedAr = () => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('translation');
  const currentCity = useSelector((state: any) => state?.cityName?.name);
  const { prevLocation } = useSelector((state: any) => state?.cityName);
  const { item } = useSelector((store: any) => store.productDetails);

  useEffect(() => {
    viewPageEvent(mPage.paymentFailed, currentCity, prevLocation);
    localStorage.removeItem('GFTUJNBGH');
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
                <img
                  src={FailedCard}
                  alt={t('ORDER_COMPLETE')}
                  style={{ width: 'inherit' }}
                />
                {/* <CheckCircleOutlineIcon sx={{ fontSize: '100px' }} /> */}
              </Box>
              <Typography variant={matchDownMD ? 'h4' : 'h2'} align="center">
                {t('PAYMENT_FAILED')}
              </Typography>
              <Box sx={{ px: 2.5 }}>
                <Typography align="center" color="textSecondary">
                  {t('WE_UNABLE_TO_PROCESS_PAYMENT')}
                </Typography>
                {/* <Typography align="center" color="textSecondary">
                  Your order id:{' '}
                  <Typography
                    variant="subtitle1"
                    component="span"
                    color="primary"
                  >
                  </Typography> 
                </Typography>*/}
              </Box>
              {/* <Typography variant="h5" sx={{ py: { xs: 1, sm: 3 } }}>
                (219) 404-5468
              </Typography> */}
              <Stack direction="row" justifyContent="center" spacing={3}>
                <Button
                  //   component={Link}
                  onClick={() => {
                    navigate(-1);
                  }}
                  variant="outlined"
                  color="secondary"
                  size={matchDownMD ? 'small' : 'medium'}
                >
                  <img
                    src={tryAgain}
                    alt={t('TRY_AGAIN')}
                    style={{ marginRight: '5px', width: '25px' }}
                  />
                  {t('TRY_AGAIN')}
                </Button>
                {/* <Button
                  component={Link}
                  to="/apps/e-commerce/products"
                  variant="contained"
                  color="primary"
                  size={matchDownMD ? 'small' : 'medium'}
                >
                  Download Invoice
                </Button> */}
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default OrderFailedAr;
