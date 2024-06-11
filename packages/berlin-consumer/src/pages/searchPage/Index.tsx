import React, { useEffect } from 'react';
import SearchListingMobile from './device/mobile';
import { HapidoLogo, useWindowSize } from 'berlin-common';
import SearchListingWeb from './device';
import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { mPage, viewPageEvent } from '../../utils/moEngage';
import Helmet from 'react-helmet';
import getMetaTags from '../../utils/getMetaTags';
import { useParams } from 'react-router-dom';
import OpenInApp from '../../components/openInApp';

const SearchItem = () => {
  const { size } = useWindowSize();
  const { i18n } = useTranslation('translation');
  const currentCity = useSelector((state: any) => state?.cityName?.name);
  const { prevLocation } = useSelector((state: any) => state?.cityName);
  const param = useParams();

  useEffect(() => {
    viewPageEvent(mPage.search, currentCity, prevLocation);
  }, []);

  const urlObject = new URL(window.location.href);
  const baseUrlWithoutQueryString = urlObject.origin + urlObject.pathname;
  const HapidoSiteLogo =
    'https://cdn.hapido.com/site-assets/images/hapido-full-logo-white.jpg';

  const fullMetaArray = {
    title: 'Search - Hapido',
    metaKeywords:
      'search, find, discover, browse best deals, offers and tourism activities in Dubai, Abudhabi, Sharjah, Ajman, Ras Al Khaimah, Umm Al Quwain, Fujairah, UAE',
    metaDescription:
      "Find what you're looking for quickly with our search feature on Hapido. Browse through a wide range of deals, and offers.",
    ogType: 'website',
    ogSiteName: 'hapido.com',
    ogLocale: 'en_ae',
    ogURL: baseUrlWithoutQueryString,
    ogTitle: 'Search - Hapido',
    ogDescriptions:
      "Find what you're looking for quickly with our search feature on Hapido. Browse through a wide range of deals, and offers.",
    ogImageWidth: '350',
    ogImageHeight: '350',
    ogImage: HapidoSiteLogo,
    twitterSite: '@hapido',
    twitterCreator: '@hapido',
    twitterImage: HapidoSiteLogo,
    twitterCard: HapidoSiteLogo,
  };

  useEffect(() => {
    getMetaTags(fullMetaArray);
  }, [param]);

  return (
    <>
      {size < 768 && <OpenInApp />}
      <Container maxWidth="xl">
        {size < 992 ? <SearchListingMobile /> : <SearchListingWeb />}
        {/* <Helmet>
          <title>Search - Hapido</title>
          <meta
            name="description"
            content="Find what you're looking for quickly with our search feature on Hapido. Browse through a wide range of deals, and offers."
          />
          <meta
            name="keywords"
            content="search, find, discover, browse best deals, offers and tourism activities in Dubai, Abudhabi, Sharjah, Ajman, Ras Al Khaimah, Umm Al Quwain, Fujairah, UAE"
          />
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
            content="Search - Hapido"
            data-react-helmet="true"
          />
          <meta
            property="og:description"
            content="Find what you're looking for quickly with our search feature on Hapido. Browse through a wide range of deals, and offers."
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
      </Container>
    </>
  );
};

export default SearchItem;
