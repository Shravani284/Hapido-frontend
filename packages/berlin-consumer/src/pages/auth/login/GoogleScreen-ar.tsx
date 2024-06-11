import { useTranslation } from 'react-i18next';
import css from '../login.module.scss';
import Google from '../../../../assets/AuthImg/Google.png';
import { useGoogleLogin } from '@react-oauth/google';
import { LoginWithGoogle } from '../../../services/AuthService';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logInHandler } from '../../../store/slice/LoginSlice';
import { CircularProgress } from '@mui/material';
import { loginRegisterEvent } from '../../../utils/moEngage';

interface GoogleLoginType {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  authuser: string;
  prompt: string;
}

const GoogleScreenAr = () => {
  const { t } = useTranslation('translation');
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse: GoogleLoginType) => {
      makeAuthenticatedUser(tokenResponse);
    },
    onError: (error) => {
      console.error('Authentication failed:', error);
    },
    scope: 'profile email',
  });

  const makeAuthenticatedUser = async (accessToken: GoogleLoginType) => {
    const payLoad = {
      access_token: accessToken?.access_token,
      token_type: accessToken?.token_type,
      expires_in: accessToken?.expires_in,
      scope: accessToken?.scope,
      authuser: accessToken?.authuser,
      prompt: accessToken?.prompt,
    };
    if (payLoad.prompt === 'consent') {
      loginRegisterEvent('register', 'google');
    }

    setLoader(true);
    LoginWithGoogle(payLoad)
      .then((response) => {
        dispatch(logInHandler(response?.data));
        setLoader(false);
        loginRegisterEvent('login', 'google');
      })
      .catch((error) => {
        console.error(error?.response?.data?.error?.message);
        setLoader(false);
      });
  };

  return (
    <>
      <div className={css.continueWGoogle} onClick={() => login()}>
        <div>
          <img loading="lazy" src={Google} alt={t('GOOGLE_LOGO')} />
        </div>
        <div style={{ width: '100%' }}>
          {t('CONTINUE_WITH_GOOGLE')}
          {loader ? (
            <CircularProgress style={{ float: 'right' }} size="1.2rem" />
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export default GoogleScreenAr;
