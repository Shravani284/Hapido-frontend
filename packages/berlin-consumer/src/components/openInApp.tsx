import Icon from '@ant-design/icons/lib/components/Icon';
import React, { useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { localeLang } from '../utils/getLang';

const OpenInApp = () => {
  // Your detectOS function here
  const { t, i18n } = useTranslation('translation');

  const detectOS = () => {
    let userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      // platform: any = (window.navigator as any).userAgentData.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
      os = 'Linux';
    }
    return os;
  };

  // Function to handle showing the popup based on conditions
  const showPopupIfNeeded = () => {
    const lastClosedTime: any = localStorage.getItem('lastClosedTime');
    const currentTime: any = new Date().getTime();

    // If the popup was closed or clicked more than 3 days ago, show it
    if (
      !lastClosedTime ||
      currentTime - parseInt(lastClosedTime, 10) > 3 * 24 * 60 * 60 * 1000
      // Below code only for testing purpose
      // currentTime - parseInt(lastClosedTime, 10) > 1 * 60 * 1000
    ) {
      const os = detectOS();
      let storeLink;

      if (os === 'Mac OS' || os === 'iOS') {
        //App Store link for Mac OS and iOS
        storeLink =
          'https://apps.apple.com/us/app/hapido-deals-discounts/id6477384738';
      } else {
        //Play Store link for other platforms
        storeLink =
          'https://play.google.com/store/apps/details?id=com.hapido.app';
      }
      toast.dismiss();

      toast(
        (o) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <a
              style={{
                textDecoration: 'none',
                color: '#ffffff',
              }}
              href={storeLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                localStorage.setItem('lastClosedTime', currentTime);
              }}
            >
              {t(`OPEN_IN_APP`)}
            </a>

            <CloseIcon
              style={{
                fontSize: '20px',
                color: '#ffffff',
                marginLeft: localeLang === 'ar' ? '-5px' : '5px',
                marginRight: localeLang === 'ar' ? '10px' : '-10px',
              }}
              onClick={() => {
                localStorage.setItem('lastClosedTime', currentTime);
                toast.dismiss(o.id);
              }}
            />
          </div>
        ),
        {
          icon: <Icon />,
          duration: Infinity,
          style: {
            fontSize: '16px',
            background: '#fc1c15',
            color: '#fff',
            opacity: 0.1,
            borderRadius: '50px',
            boxShadow: '0 2px 12px 5px rgba(0,0,0,.2)',
          },
        }
      );
    }
  };

  useEffect(() => {
    // Show the popup 3 seconds after landing
    const timeoutId = setTimeout(() => {
      showPopupIfNeeded();
    }, 3000);

    return () => {
      // Clear existing toast when the component unmounts (navigating to a different page)
      clearTimeout(timeoutId);
      toast.dismiss();
    };
  }, []);

  return (
    <div style={{ backgroundColor: 'orange' }}>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default OpenInApp;
