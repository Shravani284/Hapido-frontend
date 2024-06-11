import { HapidoLogo, useWindowSize } from 'berlin-common';
import { useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import { Container } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import { allCategories } from '../../services/HomePageServices';
import { useTranslation } from 'react-i18next';
import { SkeletonMobileCategory } from '../../components/Skeleton';
import { mPage, viewPageEvent } from '../../utils/moEngage';
import { useSelector } from 'react-redux';
import Helmet from 'react-helmet';
import getMetaTags from '../../utils/getMetaTags';
import OpenInApp from '../../components/openInApp';
import MenuListingCardAr from './MenuListingCard-ar';
import FooterAr from '../../components/footer/Footer-ar';

const MenuListingMobileAr = () => {
  const [categoryList, setCategoryList] = useState([]);
  const { size } = useWindowSize();
  const param = useParams();
  const { t, i18n } = useTranslation('translation');
  const [skeletonCategory, setSkeletonCategory] = useState(false);
  const currentCity = useSelector((state: any) => state?.cityName?.name);
  const { prevLocation } = useSelector((state: any) => state?.cityName);
  useEffect(() => {
    setSkeletonCategory(true);
    allCategories()
      .then((response) => {
        setSkeletonCategory(false);
        setCategoryList(response?.data?.category);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);
  useEffect(() => {
    viewPageEvent(mPage.menuListing, currentCity, prevLocation);
  }, []);
  const urlObject = new URL(window.location.href);
  const baseUrlWithoutQueryString = urlObject.origin + urlObject.pathname;
  const HapidoSiteLogo =
    'https://cdn.hapido.com/site-assets/images/hapido-full-logo-white.jpg';

  // meta tags
  const fullMetaArray = {
    title: 'Menu - Hapido',
    metaKeywords: 'menu, navigation, categories, deals, offers',
    metaDescription:
      'Explore our menu for easy navigation on Hapido. Browse through categories and find what deals, offers you need with just a few clicks.',
    ogType: 'website',
    ogSiteName: 'hapido.com',
    ogLocale: 'en_ae',
    ogURL: baseUrlWithoutQueryString,
    ogTitle: 'Menu - Hapido',
    ogDescriptions:
      'Explore our menu for easy navigation on Hapido. Browse through categories and find what deals, offers you need with just a few clicks.',
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
      {/* <Helmet>
        <title>Menu - Hapido</title>
        <meta
          name="description"
          content="Explore our menu for easy navigation on Hapido. Browse through categories and find what deals, offers you need with just a few clicks."
        />
        <meta
          name="keywords"
          content="menu, navigation, categories, deals, offers"
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
          content="Menu - Hapido"
          data-react-helmet="true"
        />
        <meta
          property="og:description"
          content="Explore our menu for easy navigation on Hapido. Browse through categories and find what deals, offers you need with just a few clicks."
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
        <>
          <Container maxWidth="sm">
            <div>
              {skeletonCategory == true ? (
                <SkeletonMobileCategory />
              ) : (
                categoryList?.map((menu: any, index: number) => (
                  <div key={index}>
                    <MenuListingCardAr
                      listingCard={menu?.subCategories}
                      categoryName={menu?.label}
                      categorySlug={menu?.slug}
                    />
                  </div>
                ))
              )}
            </div>
          </Container>
          <FooterAr />
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default MenuListingMobileAr;
