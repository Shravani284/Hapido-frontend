import { useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { CheckBoxField, MagicPassword, MagicTextField } from 'berlin-common';
import { useTranslation } from 'react-i18next';
import css from '../login.module.scss';
import { CircularProgress, Container } from '@mui/material';
import PrimaryButton from 'berlin-common/src/components/button/PrimaryButton';
import { Box, Card } from '@mui/material';
import { Register } from '../../../services/AuthService';
import { loginRegisterEvent, popUpEvents } from '../../../utils/moEngage';

export interface LoginValues {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  termsAndConditions: boolean;
  marketingConsent: boolean;
}
interface IProps {
  setActive: (data: string) => void;
  setPayloadData: (data: any) => void;
  payloadData: any;
}

const RegistrationAr = ({ setActive, setPayloadData, payloadData }: IProps) => {
  const [error, setError] = useState<any>('');
  const { t, i18n } = useTranslation('translation');
  const [loader, setLoader] = useState(false);

  let initialValue: LoginValues = {
    email: payloadData?.email,
    first_name: '',
    last_name: '',
    password: '',
    termsAndConditions: false,
    marketingConsent: true,
  };

  const schema = Yup.object().shape({
    first_name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, t('ENTER_VALID_NAME'))
      .required(t('ENTER_NAME'))
      .min(2, t('TOO_SHORT')),
    last_name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, t('ENTER_VALID_NAME'))
      .required(t('LAST_NAME_MANDATORY'))
      .min(2, t('TOO_SHORT')),
    password: Yup.string()
      .required(t('ENTER_PASSWORD'))
      .min(6, t('MUST_6_CHART'))
      .matches(/^[^\s]+$/, t('SPEC_IS_NOT_ALLOW')),
    // .matches(/[A-Z]/, t('ONE_UPPERCASE'))
    // .matches(/[a-z]/, t('ONE_LOWERCASE'))
    // .matches(/[0-9]/, t('ONE_NUMBER'))
    // .matches(/[@$!%*#?&]+/, t('ONE_SPECIAL_CHART')),
    termsAndConditions: Yup.boolean()
      .required(t('TERMS_AND_CONDITION_ERROR'))
      .oneOf([true], t('TERMS_AND_CONDITION_ERROR')),
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: schema,
    validateOnMount: true,
    onSubmit: (values) => {
      const payload = {
        ...values,
        first_name: values.first_name.trim(),
        last_name: values.last_name.trim(),
      };
      submitHandler(payload);
    },
  });

  const submitHandler = (payLoad: LoginValues) => {
    setLoader(true);
    Register(payLoad)
      .then((response) => {
        setActive(response?.action?.redirect?.to);
        setPayloadData({ ...payloadData, email: payLoad?.email });
        setLoader(false);
        popUpEvents('login_email_otp_triggered');
        loginRegisterEvent('register', 'email');
      })
      .catch((error) => {
        setError(error?.response?.data?.error?.message);
        setLoader(false);
      });
  };

  return (
    <>
      <Container maxWidth="xl">
        <Box className={css.main}>
          <Card variant="outlined" className={css.loginOrSignUpCard}>
            <FormikProvider value={formik}>
              <form
                action="#"
                onSubmit={formik.handleSubmit}
                className={css.formDetails}
              >
                <h1 className={css.welcome}>{t('WELCOME_BACK')}</h1>
                <div className="form-field">
                  <div className={css.mainTextFiled}>
                    <MagicTextField
                      type="text"
                      name="first_name"
                      id="first_name"
                      label={`${t('NAME')}`}
                      className={css.textFiled}
                      placeholder={t('ENTER_YOUR_NAME')}
                    />
                  </div>
                  <div className={css.mainTextFiled}>
                    <MagicTextField
                      type="text"
                      name="last_name"
                      id="last_name"
                      label={`${t('LAST_NAME')}`}
                      className={css.textFiled}
                      placeholder={t('ENTER_YOUR_LAST_NAME')}
                    />
                  </div>
                  <div className={css.mainTextFiled}>
                    <MagicPassword
                      label={`${t('PASSWORD')}`}
                      id="paddword"
                      name="password"
                      type="password"
                      className={css.textFiled}
                      placeholder="*************"
                    />
                  </div>
                  <div className={css.check}>
                    <CheckBoxField
                      label={t('I_AGREE_RHE_TERMS_AND_CONDITIONS')}
                      name="termsAndConditions"
                    />
                  </div>
                  <div className={css.check}>
                    <CheckBoxField
                      label={t('NEVER_MISS_DEAL')}
                      name="marketingConsent"
                    />
                  </div>
                  <p className={css.error}>{error}</p>
                  <PrimaryButton
                    isDisabled={loader}
                    label={<> {loader ? <CircularProgress /> : t('SUBMIT')}</>}
                    type="submit"
                  />
                </div>
              </form>
            </FormikProvider>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default RegistrationAr;
