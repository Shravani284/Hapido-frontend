import { Box, Card, CircularProgress } from '@mui/material';
import css from '../login.module.scss';
import { useTranslation } from 'react-i18next';
import Container from '@mui/material/Container';
import { MagicTextField, PrimaryButton } from 'berlin-common';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../../../services/AuthService';
import { useState } from 'react';
import { popUpEvents } from '../../../utils/moEngage';

interface IValues {
  email: string;
}
interface IProps {
  setActive: (data: string) => void;
  setPayloadData: (data: any) => void;
  payloadData: any;
}
const MailScreenAr = ({ setActive, setPayloadData, payloadData }: IProps) => {
  const { t } = useTranslation('translation');
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);

  let initialValue: IValues = {
    email: '',
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
    },
  });

  const submitHandler = (payLoad: { email: string }) => {
    setLoader(true);
    login(payLoad)
      .then((response) => {
        setActive(response?.action?.redirect?.to);
        if (response?.action?.redirect?.to == 'VerifyOtp') {
          popUpEvents('login_email_otp_triggered');
        }
        setPayloadData({ ...payloadData, email: payLoad?.email });
        setLoader(false);
      })
      .catch((error) => {
        setPayloadData({ ...payloadData, email: payLoad?.email });
        // setTimeout(() => {
        if (error?.response?.data?.error?.message == 'User Does Not Exist') {
          setActive('UserRegistration');
        }
        // }, 2000);
        setError(error?.response?.data?.error?.message);
        setLoader(false);
      });
  };

  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{ minWidth: 300 }} className={css.main}>
          <Card variant="outlined" className={css.loginOrSignUpCard}>
            <h5 className={css.welcome}>{t('WELCOME_BACK')}</h5>
            <FormikProvider value={formik}>
              <form onSubmit={formik.handleSubmit} className="form">
                <div>
                  <MagicTextField
                    label={t('E_MAIL')}
                    placeholder={t('E_MAIL_PLACEHOLDER')}
                    type="email"
                    name="email"
                    id="email"
                    className={css.emailField}
                  />
                  <p className={css.error}>{error}</p>
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

export default MailScreenAr;
