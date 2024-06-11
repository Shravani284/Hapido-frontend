import { Alert, CircularProgress, Container, Snackbar } from '@mui/material';
import css from '../login.module.scss';
import { useTranslation } from 'react-i18next';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import PrimaryButton from 'berlin-common/src/components/button/PrimaryButton';
import { redirect, useNavigate } from 'react-router-dom';
import { Box, Card } from '@mui/material';
import OTPVerify from '../../../../assets/AuthImg/OTPVerify.svg';
import OTP from '../../../components/authOTP';
import { OtpVerify, resendOtp } from '../../../services/AuthService';
import { useDispatch } from 'react-redux';
import { logInHandler } from '../../../store/slice/LoginSlice';
import { useEffect, useState } from 'react';
import { path } from '../../../routes/Routers';
import initialiseMoengage, { popUpEvents } from '../../../utils/moEngage';

export interface LoginValues {
  email: string;
  attempt: number | string;
}

export interface ResendValues {
  email: string;
}

interface IProps {
  setPayloadData: (data: any) => void;
  payloadData: any;
  setActive: any;
  isForgotPasswordOpt: boolean;
}

const OtpAuthentication = ({
  setActive,
  payloadData,
  isForgotPasswordOpt,
}: IProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('translation');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [timerVisible, setTimerVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const Moengage = initialiseMoengage();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    let countdown: any;

    if (timer > 0 && timerVisible) {
      countdown = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      setTimerVisible(false);
    }

    return () => clearInterval(countdown);
  }, [timer, timerVisible]);

  let initialValue: LoginValues = {
    email: payloadData.email,
    attempt: '',
  };

  const resendotp = { email: payloadData.email };

  // const schema = Yup.object().shape({
  //   attempt: Yup.string()
  //     .matches(/(\d)/, t('MUST_CONTAIN_NUMBER'))
  //     .min(4, t('ENTER_VALID_OTP'))
  //     .required(t('ENTER_VALID_OTP')),
  // });
  const schema = Yup.object().shape({
    attempt: Yup.string()
      .matches(/[0-9]/, t('MUST_CONTAIN_NUMBER'))
      .matches(/[a-zA-Z]/, t('MUST_CONTAIN_ALPHABET'))
      .matches(/^[A-Z0-9]*$/, t('ALL_CAPS_ALPHANUMERIC'))
      .min(4, t('ENTER_VALID_OTP'))
      .required(t('ENTER_VALID_OTP')),
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: schema,
    validateOnMount: true,
    onSubmit: (values) => {
      const payloadData = {
        ...values,
        attempt: values.attempt,
      };

      submitHandler(payloadData);
    },
  });
  const submitHandler = async (
    payLoad: LoginValues,
    page = isForgotPasswordOpt ? 'password' : 'home'
  ) => {
    OtpVerify(payLoad, page)
      .then((response) => {
        if (response.success == true) {
          popUpEvents('login_email_otp_success');
        }
        setLoader(true);
        if (isForgotPasswordOpt === false) {
          if (response.action.redirect.to === 'Home') {
            dispatch(logInHandler(response.data));
            Moengage.add_unique_user_id(response?.data?.user?.email).then(
              () => {
                Moengage.add_first_name(response?.data?.user?.first_name);
                Moengage.add_last_name(response?.data?.user?.last_name);
                Moengage.add_email(response?.data?.user?.email);
                Moengage.add_user_name(response?.data?.user?.email);
              }
            );
            // navigate(`/${lang}/`)
          } else {
            // setActive(response.action.redirect.to);
          }
        } else {
          setActive(response.action.redirect.to);
        }
        setLoader(false);
      })
      .catch((error) => {
        if (payLoad.attempt == null) {
          setError('');
        } else {
          setError(error.response.data.error.message);
          popUpEvents('login_email_otp_fail');
          setTimeout(() => {
            setError('');
          }, 4000);
        }
        setLoader(false);
      });
  };

  const resendHandler = async (payLoad: ResendValues) => {
    resendOtp(payLoad)
      .then((response) => {
        if (response.success == true) {
          popUpEvents('login_email_otp_triggered');
          setOpen(true);
          setTimerVisible(true);
          setTimer(60);
        }
      })
      .catch((error) => {
        if (payLoad == null) {
          setError('');
        } else {
          setError(error.response.data.error.message);
        }
      });
  };

  return (
    <>
      <Container maxWidth="xl">
        <Box className={css.main}>
          <Card variant="outlined" className={css.loginOrSignUpCard}>
            <img
              loading="lazy"
              src={OTPVerify}
              alt={t('OTP_VERIFY')}
              className={css.otpImg}
            />
            <p className={css.checkMail}>{t('CHECK_MAIL_AND_VERIFICATION')}</p>
            <Snackbar
              sx={{ marginRight: '10px' }}
              open={open}
              autoHideDuration={5000}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Alert
                onClose={handleClose}
                severity="info"
                sx={{ width: '100%' }}
              >
                {t('OTP_HAS_BEEN_SENT_TO_YOUR_EMAIL_ID')}
              </Alert>
            </Snackbar>
            <FormikProvider value={formik}>
              <form action="#" onSubmit={formik.handleSubmit}>
                <div className="otp">
                  <OTP label={t('OTP')} name="attempt" formik={formik} />
                </div>
                <p className={css.error}>{error}</p>

                <div
                  className={css.forgotPass}
                  onClick={() =>
                    !timerVisible ? resendHandler(resendotp) : () => {}
                  }
                >
                  {t('RESEND_OTP')} {timerVisible && <span>{timer}</span>}
                </div>

                <PrimaryButton
                  isDisabled={loader}
                  label={<> {loader ? <CircularProgress /> : t('SUBMIT')}</>}
                  type="submit"
                />
              </form>
            </FormikProvider>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default OtpAuthentication;
