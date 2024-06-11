import { Box, Container } from '@mui/material';
import CarouselSlide from '../../components/MainCarousel/CarouselSlide';
import { useTranslation } from 'react-i18next';
import css from './HomePageStyle.module.scss';
import TravelDealsAr from './components/travelDeals/index-ar';
import PlaceCategoryListAr from './components/placeCategoryComponent/index-ar';
import MegaSalesAr from './components/megaSales/index-ar';
import StaycationDealsAr from './components/staycationDeals/index-ar';
import HeaderAr from '../../components/header/Header-ar';
import { BannerImg, DealImg, HapidoLogo, useWindowSize } from 'berlin-common';
import ResponsiveHome from './responsiveHome';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  homePageLayout,
  mainBanner,
  mainFeatured,
} from '../../services/HomePageServices';
import { SkeletonBanner, SkeletonFeatureList } from '../../components/Skeleton';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { mPage, viewPageEvent } from '../../utils/moEngage';
import { lang } from '../../utils/getLang';
import getCanonical from '../../utils/getCanonical';
import Helmet from 'react-helmet';
import getMetaTags from '../../utils/getMetaTags';
import OpenInApp from '../../components/openInApp';
import ExclusiveDealsSliderAr from './components/exclusiveDeals/index-ar';
import ResponsiveHomeAr from './responsiveHome/index-ar';
import CarouselSlideAr from '../../components/MainCarousel/CarouselSlide-ar';
import HotDealsAr from './components/hapidoHotDeals/index-ar';

const HomeAr = () => {
  const param = useParams();
  const { t, i18n } = useTranslation('translation');
  const [bannerImage, setBannerImage] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [homeLayoutPlacement, setHomeLayoutPlacement] = useState({});
  const [isSkeleton, setIsSkeleton] = useState(false);
  const [isSkeletonFeatures, setIsSkeletonFeatures] = useState(false);
  const { size } = useWindowSize();
  const name = useSelector((state: any) => state?.cityName?.name);
  const { prevLocation } = useSelector((state: any) => state?.cityName);
  const navigate = useNavigate();
  const location = useLocation();
  // Main Banner Images
  useEffect(() => {
    setIsSkeleton(true);
    mainBanner('HORIZONTAL_FLAT', 'HOME', name)
      .then((response) => {
        setIsSkeleton(false);
        setBannerImage(
          response?.data?.banners?.map((e: any) => {
            return {
              ...e,
              // extfilepath: e.image || BannerImg,
              slug: e.slug,
              dealType: e.target_deal_type,
            };
          })
        );
      })
      .catch((error) => {
        setIsSkeleton(false);
        console.log('error', error);
      });
  }, [name]);

  // IS Featured
  useEffect(() => {
    setIsSkeletonFeatures(true);
    mainFeatured()
      .then((response) => {
        setIsSkeletonFeatures(false);
        const result = response?.data?.map((e: any) => {
          return {
            ...e,
            img: e.images?.extfilepath
              ? e.images?.extfilepath || DealImg
              : DealImg,
          };
        });

        const urlObject = new URL(window.location.href);
        const baseUrlWithoutQueryString = urlObject.origin + urlObject.pathname;
        const HapidoSiteLogo =
          'https://cdn.hapido.com/site-assets/images/hapido-full-logo-white.jpg';

        // meta tags
        const fullMetaArray = {
          title:
            'Hapido | Exclusive Deals, Discounts & Offers in Dubai | Abu Dhabi |UAE',
          metaKeywords:
            'Hapido UAE, Deals, Discounts, Offers, Coupons, Savings, UAE Deals, Dining Deals, Travel Discounts',
          metaDescription:
            'Discover the best deals, discounts, and offers across various categories in the UAE with Hapido. Save on dining, travel, activities, and more',
          ogType: 'website',
          ogSiteName: 'hapido.com',
          ogLocale: 'en_ae',
          ogURL: baseUrlWithoutQueryString,
          ogTitle:
            'Hapido | Exclusive Deals, Discounts & Offers in Dubai | Abu Dhabi | UAE',
          ogDescriptions:
            'Discover the best deals, discounts, and offers across various categories in the UAE with Hapido. Save on dining, travel, activities, and more',
          ogImageWidth: '350',
          ogImageHeight: '350',
          ogImage: HapidoSiteLogo,
          twitterSite: '@hapido',
          twitterCreator: '@hapido',
          twitterImage: HapidoSiteLogo,
          twitterCard: HapidoSiteLogo,
        };

        getMetaTags(fullMetaArray);
        getCanonical(baseUrlWithoutQueryString);

        setFeatured(result);
      })
      .catch((error) => {
        setIsSkeletonFeatures(false);
        console.log('error', error);
      });
  }, []);

  // Home Placement Layout
  useEffect(() => {
    const source = axios.CancelToken.source();
    homePageLayout(name)
      .then((response) => {
        setHomeLayoutPlacement(response?.data?.response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, [name]);

  // Home Page layout
  const getComponent = (item: any) => {
    switch (item?.component) {
      case 'EXCLUSIVE_PROMO':
        return (
          <>
            {item?.images?.length > 0 && (
              <ExclusiveDealsSliderAr
                title={item?.placement_title}
                images={item?.images}
                id={item?.id}
              />
            )}
          </>
        );
      case 'FLASH_BANNERS':
        return (
          <>
            {item?.images?.length > 0 && (
              <div className={`${css.flashSale} RTLComponent`}>
                <CarouselSlideAr
                  sliderImages={item?.images}
                  arrowPosition="Top"
                  setting={{
                    autoplay: false,
                    infinite: false,
                  }}
                  sliderHeading={item?.placement_title}
                  id={item?.id}
                />
              </div>
            )}
          </>
        );
      case 'MIXED_BANNER':
        return (
          <>
            {item?.images?.length > 0 && (
              <div className={css.hotDeals}>
                <HotDealsAr data={item} />
              </div>
            )}
          </>
        );
      case 'DOUBLE_COLUMN_CATEGORY':
        return <TravelDealsAr doubleColumn={item} />;
      case 'MEGASALE_BANNER':
        return (
          <>
            <Box className={`${css.megaSalesBanner} RTLComponent`}>
              {item?.images?.length > 0 && (
                <CarouselSlideAr
                  sliderHeading={item?.placement_title}
                  arrowPosition="top"
                  sliderImages={item?.images}
                  id={item?.id}
                />
              )}
            </Box>
          </>
        );
      case 'CIRCLE_BANNER':
        return <MegaSalesAr images={item?.images} id={item?.target_deal_id} />;
      case 'SINGLE_COLUMN_CATEGORY':
        return <StaycationDealsAr singleColumn={item} />;
      default:
        break;
    }
  };

  useEffect(() => {
    viewPageEvent(mPage.home, name, prevLocation);
  }, []);
  // useEffect(() => {
  //   const referrer = document.referrer;
  //   alert(`Referrer: ${referrer}`);
  //   console.log('Referrer:', referrer);
  // }, []);

  // const urlObject = new URL(window.location.href);
  // const baseUrlWithoutQueryString = urlObject.origin + urlObject.pathname;
  // const HapidoSiteLogo =
  //   'https://cdn.hapido.com/site-assets/images/hapido-full-logo-white.jpg';

  // // meta tags
  // const fullMetaArray = {
  //   title:
  //     'Hapido | Exclusive Deals, Discounts & Offers in Dubai | Abu Dhabi |UAE',
  //   metaKeywords:
  //     'Hapido UAE, Deals, Discounts, Offers, Coupons, Savings, UAE Deals, Dining Deals, Travel Discounts',
  //   metaDescription:
  //     'Discover the best deals, discounts, and offers across various categories in the UAE with Hapido. Save on dining, travel, activities, and more',
  //   ogType: 'website',
  //   ogSiteName: 'hapido.com',
  //   ogLocale: 'en_ae',
  //   ogURL: baseUrlWithoutQueryString,
  //   ogTitle:
  //     'Hapido | Exclusive Deals, Discounts & Offers in Dubai | Abu Dhabi | UAE',
  //   ogDescriptions:
  //     'Discover the best deals, discounts, and offers across various categories in the UAE with Hapido. Save on dining, travel, activities, and more',
  //   ogImageWidth: '350',
  //   ogImageHeight: '350',
  //   ogImage: HapidoSiteLogo,
  //   twitterSite: '@hapido',
  //   twitterCreator: '@hapido',
  //   twitterImage: HapidoSiteLogo,
  //   twitterCard: HapidoSiteLogo,
  // };

  // useEffect(() => {
  //   getMetaTags(fullMetaArray);
  // }, [param]);

  return (
    <>
      {/* <Helmet>
        <title>
          Hapido | Exclusive Deals, Discounts & Offers in Dubai | Abu Dhabi |UAE
        </title>
        <meta
          name="description"
          content="Discover the best deals, discounts, and offers across various categories in the UAE with Hapido. Save on dining, travel, activities, and more"
        />

        <meta
          name="keywords"
          content="Hapido UAE, Deals, Discounts, Offers, Coupons, Savings, UAE Deals, Dining Deals, Travel Discounts"
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
          content="Hapido | Exclusive Deals, Discounts & Offers in Dubai | Abu Dhabi | UAE"
          data-react-helmet="true"
        />
        <meta
          property="og:description"
          content="Discover the best deals, discounts, and offers across various categories in the UAE with Hapido. Save on dining, travel, activities, and more"
          data-react-helmet="true"
        />
        <meta property="og:image:width" content="350" />
        <meta property="og:image:height" content="350" />
        <meta
          property="og:image"
          content={HapidoLogo}
          data-react-helmet="true"
        />
        {/* <!-- Twitter --> 
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

      {size < 768 ? (
        <ResponsiveHomeAr homeLayoutPlacement={homeLayoutPlacement} />
      ) : (
        <>
          <HeaderAr />
          <Container maxWidth="xl">
            {/* Main Slider */}
            {isSkeleton ? (
              <SkeletonBanner />
            ) : (
              <Box className={css.sliderHome}>
                <CarouselSlideAr
                  sliderImages={bannerImage}
                  id={1} // Add temporary(Default) id 1
                  setting={{
                    autoplay: true,
                    autoplaySpeed: 5000,
                    initialSlide: 1,
                  }}
                  arrowPosition="middle"
                />
              </Box>
            )}
            {/* Place Catagories */}
            {isSkeletonFeatures ? (
              <SkeletonFeatureList />
            ) : (
              <PlaceCategoryListAr PlaceCategoryJson={featured} />
            )}
            <>
              {Object.keys(homeLayoutPlacement).map((item) =>
                Object.keys(homeLayoutPlacement[item]).map((data) =>
                  getComponent(homeLayoutPlacement[item][data])
                )
              )}
            </>
          </Container>
        </>
      )}
    </>
  );
};

// const homeWithHOC = getCanonical(Home);
export default HomeAr;
