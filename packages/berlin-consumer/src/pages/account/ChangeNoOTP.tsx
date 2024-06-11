import { Container } from '@mui/material';
import css from '../auth/login.module.scss';
import { useTranslation } from 'react-i18next';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import PrimaryButton from 'berlin-common/src/components/button/PrimaryButton';
import { Box, Card } from '@mui/material';
import OTPVerify from '../../../assets/AuthImg/OTPVerify.svg';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import OTP from '../../components/authOTP';
import { changeNumberOTP } from '../../services/profileService';
import { setSnackbarConfig } from '../../store/slice/Loader';

export interface NoOTPVerify {
  attempt: number | string;
}

const ChangeNoOTP = ({ setOpenOTPPopup }: any) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('translation');
  const [timer, setTimer] = useState(60);
  const [timerVisible, setTimerVisible] = useState(false);

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

  let initialValue: NoOTPVerify = {
    attempt: '',
  };

  const schema = Yup.object().shape({
    attempt: Yup.string()
      .matches(/(\d)/, t('MUST_CONTAIN_NUMBER'))
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

  const submitHandler = async (payLoad: NoOTPVerify) => {
    changeNumberOTP(payLoad)
      .then((res) => {
        if (res.success) {
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: res.message,
              varient: 'success',
            })
          );
          setOpenOTPPopup(false);
        }
      })
      .catch((error) => {
        console.log(error);
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
            <p className={css.checkMail}>{t('CHECK_MSG_AND_VERIFICATION')}</p>

            <FormikProvider value={formik}>
              <form action="#" onSubmit={formik.handleSubmit}>
                <div className="otp">
                  <OTP label={t('OTP')} name="attempt" formik={formik} />
                </div>

                <PrimaryButton type="submit" label={t('SUBMIT')} />
              </form>
            </FormikProvider>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default ChangeNoOTP;
