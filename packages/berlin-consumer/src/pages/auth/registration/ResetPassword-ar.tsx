import { CircularProgress, Container } from '@mui/material';
import css from '../login.module.scss';
import { useTranslation } from 'react-i18next';
import { MagicPassword, MagicTextField } from 'berlin-common';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import PrimaryButton from 'berlin-common/src/components/button/PrimaryButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Card } from '@mui/material';
import { path } from '../../../routes/Routers';
import { PassWord, resetOtp } from '../../../services/AuthService';
import { useState } from 'react';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import { useDispatch } from 'react-redux';
import { logInHandler } from '../../../store/slice/LoginSlice';

export interface ResetValue {
  email: string;
  newPassword: string;
}

interface IProps {
  setActive: (data: string) => void;
  setPayloadData: (data: any) => void;
  payloadData: any;
}

const ResetPasswordAr = ({
  setActive,
  setPayloadData,
  payloadData,
}: IProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation('translation');
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);

  let initialValue: ResetValue = {
    email: payloadData.email,
    newPassword: '',
  };

  const schema = Yup.object().shape({
    newPassword: Yup.string()
      .required(t('ENTER_PASSWORD'))
      .min(6, t('MUST_6_CHART'))
      .matches(/^[^\s]+$/, t('SPEC_IS_NOT_ALLOW')),
    // .matches(/[A-Z]/, t('ONE_UPPERCASE'))
    // .matches(/[a-z]/, t('ONE_LOWERCASE'))
    // .matches(/[0-9]/, t('ONE_NUMBER'))
    // .matches(/[@$!%*#?&]+/, t('ONE_SPECIAL_CHART')),
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: schema,
    // validateOnMount: true,
    onSubmit: (values) => {
      submitHandler(values);
    },
  });
  const submitHandler = async (payLoad: ResetValue) => {
    setLoader(true);
    resetOtp(payLoad)
      .then((response) => {
        if (response.success == true) {
          dispatch(logInHandler(response.data));
          // navigate(`/${lang}/`)
          setLoader(false);
        }
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
            <div className={css.passwordIcon}>
              <span>{t('EMAIL')}:</span>
              {payloadData.email}
            </div>
            <FormikProvider value={formik}>
              <form action="#" onSubmit={formik.handleSubmit}>
                <div className={css.mainTextFiled}>
                  <MagicPassword
                    label={`${t('RESET_PASSWORD')}`}
                    id="paddword"
                    name="newPassword"
                    type="password"
                    className={css.textFiled}
                    placeholder="*************"
                  />
                </div>
                <p className={css.error}>{error}</p>
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

export default ResetPasswordAr;
