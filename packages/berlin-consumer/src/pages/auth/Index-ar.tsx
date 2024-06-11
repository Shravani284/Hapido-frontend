import { useState } from 'react';
import LoginOrSignUp from './login/LoginOrSignUp';
import MailScreen from './login/MailScreen';
import Registration from './registration/Index';
import OtpAuthentication from './registration/OtpAuthentication';
import ResetPassword from './registration/ResetPassword';
import ForgotPassword from './login/ForgotPassword';
import UserPassword from './login/UserPassword';
import ResetPasswordAr from './registration/ResetPassword-ar';
import { lang } from '../../utils/getLang';
import OtpAuthenticationAr from './registration/OtpAuthentication-ar';
import RegistrationAr from './registration/Index-ar';
import UserPasswordAr from './login/UserPassword-ar';
import ForgotPasswordAr from './login/ForgotPassword-ar';
import LoginOrSignUpAr from './login/LoginOrSignUp-ar';
import MailScreenAr from './login/MailScreen-ar';

const AuthPopup = () => {
  const [active, setActive] = useState('');
  const [isForgotPasswordOpt, setIsForgotPasswordOpt] = useState(false);
  const [payloadData, setPayloadData] = useState({});
  const ActivePopup = () => {
    switch (active) {
      case 'mail':
        return lang == 'ae-ar' ? (
          <MailScreenAr
            setPayloadData={setPayloadData}
            payloadData={payloadData}
            setActive={setActive}
          />
        ) : (
          <MailScreen
            setPayloadData={setPayloadData}
            payloadData={payloadData}
            setActive={setActive}
          />
        );
      case 'UserRegistration':
        return lang == 'ae-ar' ? (
          <RegistrationAr
            setPayloadData={setPayloadData}
            payloadData={payloadData}
            setActive={setActive}
          />
        ) : (
          <Registration
            setPayloadData={setPayloadData}
            payloadData={payloadData}
            setActive={setActive}
          />
        );
      case 'VerifyOtp':
        return lang == 'ae-ar' ? (
          <OtpAuthenticationAr
            setPayloadData={setPayloadData}
            payloadData={payloadData}
            setActive={setActive}
            isForgotPasswordOpt={isForgotPasswordOpt}
          />
        ) : (
          <OtpAuthentication
            setPayloadData={setPayloadData}
            payloadData={payloadData}
            setActive={setActive}
            isForgotPasswordOpt={isForgotPasswordOpt}
          />
        );
      case 'VerifyEmail':
        return lang == 'ae-ar' ? (
          <OtpAuthenticationAr
            setPayloadData={setPayloadData}
            payloadData={payloadData}
            setActive={setActive}
            isForgotPasswordOpt={isForgotPasswordOpt}
          />
        ) : (
          <OtpAuthentication
            setPayloadData={setPayloadData}
            payloadData={payloadData}
            setActive={setActive}
            isForgotPasswordOpt={isForgotPasswordOpt}
          />
        );
      case 'Password':
        return lang == 'ae-ar' ? (
          <UserPasswordAr
            setPayloadData={setPayloadData}
            payloadData={payloadData}
            setActive={setActive}
          />
        ) : (
          <UserPassword
            setPayloadData={setPayloadData}
            payloadData={payloadData}
            setActive={setActive}
          />
        );
      case 'ForgotPass':
        return lang == 'ae-ar' ? (
          <ForgotPasswordAr
            setPayloadData={setPayloadData}
            payloadData={payloadData}
            setActive={setActive}
            setIsForgotPasswordOpt={setIsForgotPasswordOpt}
          />
        ) : (
          <ForgotPassword
            setPayloadData={setPayloadData}
            payloadData={payloadData}
            setActive={setActive}
            setIsForgotPasswordOpt={setIsForgotPasswordOpt}
          />
        );
      case 'Changepassword':
        return lang == 'ae-ar' ? (
          <ResetPasswordAr
            setPayloadData={setPayloadData}
            payloadData={payloadData}
            setActive={setActive}
          />
        ) : (
          <ResetPassword
            setPayloadData={setPayloadData}
            payloadData={payloadData}
            setActive={setActive}
          />
        );
      default:
        return lang == 'ae-ar' ? (
          <LoginOrSignUpAr setActive={setActive} />
        ) : (
          <LoginOrSignUp setActive={setActive} />
        );
    }
  };

  return <>{ActivePopup()}</>;
};

export default AuthPopup;
