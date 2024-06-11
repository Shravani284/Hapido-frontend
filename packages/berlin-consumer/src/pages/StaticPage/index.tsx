import { useEffect, useState } from 'react';
import { HapidoStaticPages } from '../../services/HomePageServices';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Container, Skeleton } from '@mui/material';
import css from './index.module.scss';
import { HapidoLogo, PrimaryButton, useWindowSize } from 'berlin-common';
import { path } from '../../routes/Routers';
import getCanonical from '../../utils/getCanonical';
import Helmet from 'react-helmet';
import getMetaTags from '../../utils/getMetaTags';
import OpenInApp from '../../components/openInApp';
import { lang } from '../../utils/getLang';

const StaticPages = () => {
  const { t, i18n } = useTranslation('translation');
  const [staticPageData, setStaticpageData] = useState<any>();
  const param = useParams();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [staticMetaTag, setStaticMetaTag] = useState<any>({});
  const { size } = useWindowSize();

  const navigate = useNavigate();
  // Static Page
  useEffect(() => {
    setLoading(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    const script = document.createElement('script');
    const externalCss = document.createElement('link');
    HapidoStaticPages(param?.slug)
      .then((response) => {
        if (response.data.staticPage.inject_js) {
          script.type = 'text/javascript';
          script.innerHTML = response.data.staticPage.inject_js;
          document.body.appendChild(script);
        }
        if (response.data.staticPage.inject_css) {
          externalCss.rel = 'stylesheet';
          externalCss.innerHTML = response.data.staticPage.inject_css;
          document.body.appendChild(externalCss);
        }
        setStaticpageData(response?.data?.staticPage);
        setStaticMetaTag(response?.data?.staticPage);
        setError('');
        const urlObject = new URL(window.location.href);
        const baseUrlWithoutQueryString = urlObject.origin + urlObject.pathname;
        const HapidoSiteLogo =
          'https://cdn.hapido.com/site-assets/images/hapido-full-logo-white.jpg';

        const fullMetaArray = {
          title: response?.data?.staticPage?.meta_title
            ? response?.data?.staticPage?.meta_title
            : 'Hapido | Exclusive Deals, Discounts & Offers in Dubai | Abu Dhabi| UAE',
          metaKeywords: response?.data?.staticPage?.meta_keywords
            ? response?.data?.staticPage?.meta_keywords
            : 'Hapido UAE, Deals, Discounts, Offers, Coupons, Savings, UAE Deals, Dining Deals, Travel Discounts',
          metaDescription: response?.data?.staticPage?.meta_descriptions
            ? response?.data?.staticPage?.meta_descriptions
            : 'Discover the best deals, discounts, and offers across various categories in the UAE with Hapido. Save on dining, travel, activities, and more',
          ogType: 'website',
          ogSiteName: 'hapido.com',
          ogLocale: 'en_ae',
          ogURL: baseUrlWithoutQueryString,
          ogTitle: response?.data?.staticPage?.meta_title
            ? response?.data?.staticPage?.meta_title
            : 'Hapido | Exclusive Deals, Discounts & Offers in Dubai | Abu Dhabi| UAE',
          ogDescriptions: response?.data?.staticPage?.meta_descriptions
            ? response?.data?.staticPage?.meta_descriptions
            : 'Discover the best deals, discounts, and offers across various categories in the UAE with Hapido. Save on dining, travel, activities, and more',
          ogImageWidth: '350',
          ogImageHeight: '350',
          ogImage: HapidoSiteLogo,
          twitterSite: '@hapido',
          twitterCreator: '@hapido',
          twitterImage: HapidoSiteLogo,
          twitterCard: HapidoSiteLogo,
        };

        getCanonical(baseUrlWithoutQueryString);
        if (response.success == true) {
          getMetaTags(fullMetaArray);
        }
      })
      .catch((error) => {
        setError(error.response.data.error.message);
        console.log('error', error.response.data.error.message);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      // Check if the script element exists before removing it
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (document.body.contains(externalCss)) {
        document.body.removeChild(externalCss);
      }
    };
  }, [param]);
  if (error)
    return (
      <>
        <Box
          textAlign={'center'}
          fontWeight={600}
          fontSize={22}
          height={'80vh'}
          paddingTop={'35vh'}
        >
          <div className={css.backBtn} onClick={() => navigate(`/${lang}/`)}>
            <div>{error}</div>
            <PrimaryButton label={t('BACK_TO_HOME')} />
          </div>
        </Box>
      </>
    );

  if (loading)
    return (
      <>
        <Container maxWidth={'xl'} sx={{ padding: '50px 0px' }}>
          <Skeleton
            variant="text"
            width={'50%'}
            height={50}
            style={{ marginBottom: '20px' }}
          />
          <Skeleton variant="text" width={'100%'} height={30} />
          <Skeleton variant="text" width={'100%'} height={30} />
          <Skeleton variant="text" width={'100%'} height={30} />
          <Skeleton variant="text" width={'100%'} height={30} />
          <Skeleton variant="text" width={'100%'} height={30} />
          <Skeleton variant="text" width={'100%'} height={30} />
          <Skeleton variant="text" width={'100%'} height={30} />
          <Skeleton variant="text" width={'100%'} height={30} />
          <Skeleton variant="text" width={'100%'} height={30} />
          <Skeleton
            variant="text"
            width={'100%'}
            height={30}
            style={{ marginBottom: '20px' }}
          />
          <Skeleton variant="text" width={'100%'} height={30} />
          <Skeleton variant="text" width={'100%'} height={30} />
          <Skeleton variant="text" width={'100%'} height={30} />
          <Skeleton variant="text" width={'100%'} height={30} />
          <Skeleton variant="text" width={'100%'} height={30} />
          <Skeleton variant="text" width={'100%'} height={30} />
        </Container>
      </>
    );
  const urlObject = new URL(window.location.href);
  const baseUrlWithoutQueryString = urlObject.origin + urlObject.pathname;

  return (
    <>
      <Container maxWidth={'xl'} sx={{ padding: '50px 0px' }}>
        {/* <Helmet>
          {staticMetaTag?.meta_title ? (
            <title>{staticMetaTag?.meta_title}</title>
          ) : (
            <title>
              Hapido | Exclusive Deals, Discounts & Offers in Dubai | Abu Dhabi
              | UAE
            </title>
          )}
          {staticMetaTag?.meta_descriptions ? (
            <meta
              name="description"
              content={staticMetaTag?.meta_descriptions}
            />
          ) : (
            <meta
              name="description"
              content="Discover the best deals, discounts, and offers across various categories in the UAE with Hapido. Save on dining, travel, activities, and more"
            />
          )}
          {staticMetaTag?.meta_keywords ? (
            <meta name="keywords" content={staticMetaTag?.meta_keywords} />
          ) : (
            <meta
              name="keywords"
              content="Hapido UAE, Deals, Discounts, Offers, Coupons, Savings, UAE Deals, Dining Deals, Travel Discounts"
            />
          )}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="hapido.com" />
          <meta property="og:locale" content="en_ae" />
          <meta
            property="og:url"
            content={baseUrlWithoutQueryString}
            data-react-helmet="true"
          />
          <meta
            property="og:title"
            content={
              staticMetaTag?.meta_title
                ? staticMetaTag?.meta_title
                : 'Hapido | Exclusive Deals, Discounts & Offers in Dubai | Abu Dhabi | UAE'
            }
            data-react-helmet="true"
          />
          <meta
            property="og:description"
            content={
              staticMetaTag?.meta_descriptions
                ? staticMetaTag?.meta_descriptions
                : 'Discover the best deals, discounts, and offers across various categories in the UAE with Hapido. Save on dining, travel, activities, and more'
            }
            data-react-helmet="true"
          />
          <meta property="og:image:width" content="350" />
          <meta property="og:image:height" content="350" />
          <meta
            property="og:image"
            content={HapidoLogo}
            data-react-helmet="true"
          />
          <meta name="twitter:site" content="@hapido" />
          <meta name="twitter:creator" content="@hapido" />
          <meta
            name="twitter:image"
            content={HapidoLogo}
            data-react-helmet="true"
          />
          <meta
            name="twitter:card"
            content={HapidoLogo}
            data-react-helmet="true"
          />
        </Helmet> */}
        {size < 768 && <OpenInApp />}
        <h1 className={css.pageTitle}>{staticPageData?.name}</h1>
        <div
          className={css.static}
          dangerouslySetInnerHTML={{
            __html: staticPageData?.translations[0]?.text,
          }}
        ></div>
      </Container>
    </>
  );
};

// const homeWithHOC = getCanonical(StaticPages);
export default StaticPages;
