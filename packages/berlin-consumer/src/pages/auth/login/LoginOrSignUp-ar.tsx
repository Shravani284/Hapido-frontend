import { Box, Card } from '@mui/material';
import css from '../login.module.scss';
import { useTranslation } from 'react-i18next';
import Container from '@mui/material/Container';
import Apple from '../../../../assets/AuthImg/Apple.png';
import Google from '../../../../assets/AuthImg/Google.png';
import Email from '../../../../assets/AuthImg/Email.png';
import GoogleScreen from './GoogleScreen';
import AppleScreen from './AppleScreen';

interface IProps {
  setActive: (data: string) => void;
}

const LoginOrSignUpAr = ({ setActive }: IProps) => {
  const { t } = useTranslation('translation');

  const mailPopup = () => {
    setActive('mail');
  };

  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{ minWidth: 300 }} className={css.main}>
          <Card variant="outlined" className={css.loginOrSignUpCard}>
            <h6 className={css.cardHeading}>{t('LOGIN_OR_SIGN_UP')}</h6>
            <div className={css.loginAndSignUpDescription}>
              {t('LOGIN_OR_SIGN_UP_DESCRIPTION')}
            </div>
            {/* //TODO: temp commented
             <div className={css.continueWApple}>
              <div>
                <img loading="lazy" src={Apple} alt={t('APPLE_LOGO')} />
              </div>
              <div>{t('CONTINUE_WITH_APPLE')}</div>
            </div>*/}
            <AppleScreen />
            <GoogleScreen />
            <div
              className={css.continueWEmail}
              onClick={() => {
                mailPopup();
              }}
            >
              <div>
                <img loading="lazy" src={Email} alt={t('EMAIL_LOGO')} />
              </div>
              <div>{t('EMAIL')}</div>
            </div>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default LoginOrSignUpAr;
