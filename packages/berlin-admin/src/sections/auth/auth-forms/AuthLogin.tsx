import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import IconButton from '../../../components/@extended/IconButton';
import AnimateButton from '../../../components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { login } from '../../../services/authService';
import { useDispatch } from 'react-redux';
import { logInHandler } from '../../../store/slice/LoginSlice';
import { path } from '../../../routes/Routers';
import { CircularProgress } from '@mui/material';

// ============================|| Admin - LOGIN ||============================ //
interface LoginValues {
  email: string;
  password: string;
}
const AuthLogin = () => {
  const { t } = useTranslation('translation');
  const [errorMessage, setErrorMessage] = useState('');

  const [btnLoader, setBtnLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const initialValue: LoginValues = {
    email: '',
    password: '',
  };

  const schema = Yup.object().shape({
    email: Yup.string()
      .email(t('ENTER_VALID_EMAIL'))
      .required(t('ENTER_EMAIL')),
    password: Yup.string()
      .min(4, t('ENTER_VALID_PASSWORD'))
      .required(t('ENTER_PASSWORD')),
  });

  const submitHandler = async (payLoad: LoginValues) => {
    setBtnLoader(true);
    login(payLoad)
      .then((response) => {
        setBtnLoader(false);
        dispatch(logInHandler(response.data));
        // navigate(path.USERLIST);
      })
      .catch((error) => {
        setBtnLoader(false);
        setErrorMessage(
          error?.response?.data?.error?.message || 'Something went wrong'
        );
      });
  };

  return (
    <>
      <Formik
        initialValues={initialValue}
        validationSchema={schema}
        onSubmit={submitHandler}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">{t('EMAIL')}</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={t('EMAIL_ENTER')}
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login"
                    >
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">
                    {t('PASSWORD')}
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? (
                            <EyeOutlined />
                          ) : (
                            <EyeInvisibleOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder={t('PASSWORD_ENTER')}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-password-login"
                    >
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <FormHelperText error>{errorMessage}</FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    variant="contained"
                    type="submit"
                    disableElevation
                    disabled={btnLoader}
                    fullWidth
                    size="large"
                    color="primary"
                  >
                    {btnLoader ? (
                      <CircularProgress
                        color="secondary"
                        style={{ margin: '3px 10px' }}
                        size={18}
                      />
                    ) : (
                      'Login'
                    )}
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
