import { CircularProgress, Container } from '@mui/material';
import css from '../login.module.scss';
import { useTranslation } from 'react-i18next';
import { MagicPassword } from 'berlin-common';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import PrimaryButton from 'berlin-common/src/components/button/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { Box, Card } from '@mui/material';
import { path } from '../../../routes/Routers';
import { PassWord } from '../../../services/AuthService';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logInHandler } from '../../../store/slice/LoginSlice';
import initialiseMoengage, {
  loginRegisterEvent,
} from '../../../utils/moEngage';

export interface LoginValues {
  email: string;
  password: string;
}

interface IProps {
  setPayloadData: (data: any) => void;
  payloadData: any;
  setActive: any;
}

const UserPasswordAr = ({ setActive, setPayloadData, payloadData }: IProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation('translation');
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const Moengage = initialiseMoengage();
  let initialValue: LoginValues = {
    email: payloadData.email,
    password: '',
  };

  const schema = Yup.object().shape({
    password: Yup.string()
      .min(4, t('ENTER_VALID_PASSWORD'))
      .required(t('ENTER_PASSWORD')),
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: schema,
    validateOnMount: true,
    onSubmit: (values) => {
      submitHandler(values);
    },
  });
  const submitHandler = async (payLoad: LoginValues) => {
    setLoader(true);
    PassWord(payLoad)
      .then((response) => {
        if (response.success == true) {
          dispatch(logInHandler(response?.data));
          Moengage.add_unique_user_id(response?.data?.email);
          // navigate(`/${lang}/`)
        }
        loginRegisterEvent('login', 'email');
        setLoader(false);
      })
      .catch((error) => {
        setError(error?.response?.data?.error?.message);
        setLoader(false);
      });
  };

  const forgotPass = () => {
    setActive('ForgotPass');
    setPayloadData({ ...payloadData, email: payloadData.email });
  };

  return (
    <>
      <Container maxWidth="xl">
        <Box className={css.main}>
          <Card variant="outlined" className={css.loginOrSignUpCard}>
            <div className={css.passwordIcon}>
              <span>{t('EMAIL')}:</span>
              {payloadData.email}
            </div>
            <FormikProvider value={formik}>
              <form action="#" onSubmit={formik.handleSubmit}>
                <div className={css.mainTextFiled}>
                  <MagicPassword
                    label={`${t('PASSWORD')}`}
                    id="password"
                    name="password"
                    type="password"
                    className={css.textFiled}
                    placeholder="*************"
                  />
                </div>
                <p className={css.error}>{error}</p>
                <div className={css.forgotPass} onClick={() => forgotPass()}>
                  {t('FORGOT_PASSWORD')}
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

export default UserPasswordAr;
