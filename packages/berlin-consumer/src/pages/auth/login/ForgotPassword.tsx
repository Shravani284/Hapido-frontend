import { CircularProgress, Container } from '@mui/material';
import css from '../login.module.scss';
import { useTranslation } from 'react-i18next';
import { MagicTextField } from 'berlin-common';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import PrimaryButton from 'berlin-common/src/components/button/PrimaryButton';
import { Box, Card } from '@mui/material';
import infoIcon from '../../../../assets/AuthImg/ForgotPass.svg';
import { ForgotPAssWord } from '../../../services/AuthService';
import { useState } from 'react';
import { popUpEvents } from '../../../utils/moEngage';

export interface LoginValues {
  email: string;
}

interface IProps {
  setActive: (data: string) => void;
  setPayloadData: (data: any) => void;
  payloadData: any;
  setIsForgotPasswordOpt: (data: boolean) => void;
}

const ForgotPassword = ({
  setActive,
  setPayloadData,
  payloadData,
  setIsForgotPasswordOpt,
}: IProps) => {
  const { t } = useTranslation('translation');
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);

  let initialValue: LoginValues = {
    email: payloadData.email,
  };

  const schema = Yup.object().shape({
    email: Yup.string()
      .email(t('ENTER_VALID_EMAIL'))
      .required(t('ENTER_EMAIL')),
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: schema,
    validateOnMount: true,
    onSubmit: (values) => {
      submitHandler(values);
      popUpEvents('forgot_pwd');
    },
  });

  const submitHandler = async (payLoad: LoginValues) => {
    setLoader(true);
    ForgotPAssWord(payLoad)
      .then((response) => {
        popUpEvents('login_email_otp_triggered');
        setIsForgotPasswordOpt(true);
        setActive(response.action.redirect.to);
        setPayloadData({ ...payloadData, email: payLoad.email });
        setLoader(false);
      })
      .catch((error) => {
        setError(error.response.data.massage);
        setLoader(false);
      });
  };

  return (
    <>
      <Container maxWidth="xl">
        <Box className={css.main}>
          <Card variant="outlined" className={css.loginOrSignUpCard}>
            <img
              loading="lazy"
              src={infoIcon}
              alt={t('INFO_ICON')}
              className={css.forgotIcon}
            />
            <div className={css.backToLogin}>
              {t('GO_BACK_TO')}
              <span
                className={css.login}
                onClick={() => {
                  setActive('mail');
                }}
              >
                {t('LOGIN')}
              </span>
            </div>
            <h1 className={css.newPassword}>{t('FORGOT_PASSWORD')}</h1>
            <p className={css.newPasswordSub}>
              {t('MAIL_ID_FOR_SET_PASSWORD')}
            </p>
            <FormikProvider value={formik}>
              <form action="#" onSubmit={formik.handleSubmit}>
                <div className={`${css.mainTextFiled} form-field`}>
                  <MagicTextField
                    type="text"
                    name="email"
                    label={`${t('E_MAIL')}`}
                    className={css.forgotInput}
                    placeholder={t('E_MAIL_PLACEHOLDER')}
                  />
                </div>
                <PrimaryButton
                  isDisabled={loader}
                  label={<> {loader ? <CircularProgress /> : t('NEXT_BTN')}</>}
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

export default ForgotPassword;
