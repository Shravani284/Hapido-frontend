import React, { useEffect, useRef, useState } from 'react';
import css from '../login.module.scss';
import { useDispatch } from 'react-redux';
import { logInHandler } from '../../../store/slice/LoginSlice';
import { CircularProgress } from '@mui/material';
import AppleLogo from '../../../../assets/AuthImg/Apple.png';
import { useTranslation } from 'react-i18next';
import { LoginWithApple } from '../../../services/AuthService';
import { appleClientId, appleRedirectURI } from '../../../../../../urlConst';
import { loginRegisterEvent } from '../../../utils/moEngage';

// Define a global variable to handle TypeScript error
declare global {
  interface Window {
    AppleID: any;
  }
}

const clientId = appleClientId;
const scope = 'name email';
const redirectURI = appleRedirectURI;
const state = 'origin:web';

const AppleScreenAr = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('translation');
  const [loader, setLoader] = useState(false);
  const statusCheck = useRef<any>();

  const handleAppleSignIn = () => {
    setLoader(true);

    if (window.AppleID) {
      window.AppleID.auth.signIn();
    } else {
      console.error(
        t('APPLEID_IS_NOT_DEFINED_MAKE_SURE_THE_APPLE_SIGN_IN_SDK_IS_LOADED')
      );
    }
  };

  useEffect(() => {
    if (window.AppleID && window.AppleID.auth) {
      window.AppleID.auth.init({
        clientId,
        scope,
        redirectURI,
        state,
        usePopup: true,
      });

      statusCheck.current = true;
      const onSuccess = (event: any) => {
        setLoader(false);

        const payLoad = {
          code: event?.detail?.authorization?.code,
          id_token: event?.detail?.authorization?.id_token,
          state: event?.detail?.authorization?.state,
          firstName: event?.detail?.user?.name?.firstName
            ? event?.detail?.user?.name?.firstName
            : ' ',
          lastName: event?.detail?.user?.name?.lastName
            ? event?.detail?.user?.name?.lastName
            : ' ',
          email: event?.detail?.user?.email ? event?.detail?.user?.email : ' ',
        };

        if (payLoad?.email != ' ') {
          loginRegisterEvent('register', 'apple');
        }

        if (statusCheck.current) {
          setLoader(true);
          LoginWithApple(payLoad)
            .then((response) => {
              dispatch(logInHandler(response?.data));
              loginRegisterEvent('login', 'apple');
            })
            .catch((error) => {
              console.error(error?.response?.data?.error?.message);
            })
            .finally(() => {
              setLoader(false);
            });
        }
        statusCheck.current = false;
      };

      const onFailure = (event) => {
        console.error('Error ', event);
        setLoader(false);
      };

      document.addEventListener('AppleIDSignInOnSuccess', onSuccess);
      document.addEventListener('AppleIDSignInOnFailure', onFailure);
    } else {
      console.error(
        t('APPLEID_IS_NOT_DEFINED_MAKE_SURE_THE_APPLE_SIGN_IN_SDK_IS_LOADED')
      );
    }
  }, []);

  return (
    <div
      className={`signin-button ${css.continueWApple}`}
      onClick={handleAppleSignIn}
    >
      <div>
        <img loading="lazy" src={AppleLogo} alt={t('APPLE_LOGO')} />
      </div>
      <div style={{ width: '100%' }}>
        {t('CONTINUE_WITH_APPLE')}
        {loader ? (
          <CircularProgress style={{ float: 'right' }} size="1.2rem" />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default AppleScreenAr;
