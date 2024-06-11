import { HapidoLogo, useWindowSize } from 'berlin-common';
import CategoryListingWeb from './device';
import CategoryListingMobile from './device/mobile';
import { Box, Container, Typography } from '@mui/material';
import css from './CategoryList.module.scss';
import { useEffect, useState } from 'react';
import { descCategoriesById } from '../../services/HomePageServices';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { mPage, viewPageEvent } from '../../utils/moEngage';
import { useSelector } from 'react-redux';
import getCanonical from '../../utils/getCanonical';
import Helmet from 'react-helmet';
import getMetaTags from '../../utils/getMetaTags';
import { toast, Toaster } from 'react-hot-toast';
import OpenInApp from '../../components/openInApp';
import { lang } from '../../utils/getLang';
import CategoryListingMobileAr from './device/mobile-ar';
import CategoryListingWebAr from './device/index-ar';

const CategoryListing = () => {
  const { size } = useWindowSize();
  const [categoryDesc, setCategoryDesc] = useState<any>({});
  // const [DescParams, setDescParams] = useState();
  const { t, i18n } = useTranslation('translation');
  const param = useParams();
  const currentCity = useSelector((state: any) => state?.cityName?.name);
  const { prevLocation } = useSelector((state: any) => state?.cityName);

  let paramSlug = param?.subcategory_slug
    ? param?.subcategory_slug
    : param?.category_slug;

  useEffect(() => {
    descCategoriesById(paramSlug)
      .then((res) => {
        setCategoryDesc(res.data?.newCategory);

        const urlObject = new URL(window.location.href);
        const baseUrlWithoutQueryString = urlObject.origin + urlObject.pathname;
        const HapidoSiteLogo =
          'https://cdn.hapido.com/site-assets/images/hapido-full-logo-white.jpg';

        const productData = res.data?.newCategory;

        // meta tags
        const fullMetaArray = {
          title: `${
            productData?.meta_title
              ? productData?.meta_title
              : 'Hapido | Exclusive Deals, Discounts & Offers in Dubai | Abu Dhabi | UAE'
          }`,
          metaKeywords: `${
            productData?.meta_keywords
              ? productData?.meta_keywords
              : 'Hapido UAE, Deals, Discounts, Offers, Coupons, Savings, UAE Deals, Dining Deals, Travel Discounts'
          }`,

          metaDescription: `${
            productData?.meta_descriptions
              ? productData?.meta_descriptions
              : 'Discover the best deals, discounts, and offers across various categories in the UAE with Hapido. Save on dining, travel, activities, and more.'
          }`,

          ogType: 'website',
          ogSiteName: 'hapido.com',
          ogLocale: 'en_ae',
          ogURL: baseUrlWithoutQueryString,
          ogTitle: `${
            productData?.meta_title
              ? productData?.meta_title
              : 'Hapido | Exclusive Deals, Discounts & Offers in Dubai | Abu Dhabi | UAE'
          }`,
          ogDescriptions: `${
            productData?.meta_descriptions
              ? productData?.meta_descriptions
              : 'Discover the best deals, discounts, and offers across various categories in the UAE with Hapido. Save on dining, travel, activities, and more.'
          }`,
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
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, [paramSlug]);
  useEffect(() => {
    viewPageEvent(mPage.category, currentCity, prevLocation);
    // toast('Open in app');
  }, []);

  // const urlObject = new URL(window.location.href);
  // const baseUrlWithoutQueryString = urlObject.origin + urlObject.pathname;
  // const HapidoSiteLogo =
  //   'https://cdn.hapido.com/site-assets/images/hapido-full-logo-white.jpg';

  // // meta tags
  // const fullMetaArray = {
  //   title: `${
  //     categoryDesc?.meta_title
  //       ? categoryDesc?.meta_title
  //       : 'Hapido | Exclusive Deals, Discounts & Offers in Dubai | Abu Dhabi | UAE'
  //   }`,
  //   metaKeywords: `${
  //     categoryDesc?.meta_keywords
  //       ? categoryDesc?.meta_keywords
  //       : 'Hapido UAE, Deals, Discounts, Offers, Coupons, Savings, UAE Deals, Dining Deals, Travel Discounts'
  //   }`,

  //   metaDescription: `${
  //     categoryDesc?.meta_descriptions
  //       ? categoryDesc?.meta_descriptions
  //       : 'Discover the best deals, discounts, and offers across various categories in the UAE with Hapido. Save on dining, travel, activities, and more.'
  //   }`,

  //   ogType: 'website',
  //   ogSiteName: 'hapido.com',
  //   ogLocale: 'en_ae',
  //   ogURL: baseUrlWithoutQueryString,
  //   ogTitle: `${
  //     categoryDesc?.meta_title
  //       ? categoryDesc?.meta_title
  //       : 'Hapido | Exclusive Deals, Discounts & Offers in Dubai | Abu Dhabi | UAE'
  //   }`,
  //   ogDescriptions: `${
  //     categoryDesc?.meta_descriptions
  //       ? categoryDesc?.meta_descriptions
  //       : 'Discover the best deals, discounts, and offers across various categories in the UAE with Hapido. Save on dining, travel, activities, and more.'
  //   }`,
  //   ogImageWidth: '350',
  //   ogImageHeight: '350',
  //   ogImage: HapidoSiteLogo,
  //   twitterSite: '@hapido',
  //   twitterCreator: '@hapido',
  //   twitterImage: HapidoSiteLogo,
  //   twitterCard: HapidoSiteLogo,
  // };

  // useEffect(() => {
  //   if (Object.keys(categoryDesc).length !== 0) {
  //     getMetaTags(fullMetaArray);
  //   }
  // }, [param]);

  return (
    <>
      <div>{size < 768 && <OpenInApp />}</div>
      {size < 992 ? <CategoryListingMobile /> : <CategoryListingWeb />}
      <Container maxWidth="xl">
        <Typography className={css.categoryDesc} mb={2} mt={4}>
          {/* <Helmet>
            {categoryDesc?.meta_title ? (
              <title>{categoryDesc?.meta_title}</title>
            ) : (
              <title>
                Hapido | Exclusive Deals, Discounts & Offers in Dubai | AbuDhabi
                | UAE
              </title>
            )}
            {categoryDesc?.meta_descriptions ? (
              <meta
                name="description"
                content={categoryDesc?.meta_descriptions}
              />
            ) : (
              <meta
                name="description"
                content="Discover the best deals, discounts, and offers across various categories in the UAE with Hapido. Save on dining, travel, activities, and more"
              />
            )}
            {categoryDesc?.meta_keywords ? (
              <meta name="keywords" content={categoryDesc?.meta_keywords} />
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
                categoryDesc?.meta_title
                  ? categoryDesc?.meta_title
                  : 'Hapido | Exclusive Deals, Discounts & Offers in Dubai | Abu Dhabi | UAE'
              }
              data-react-helmet="true"
            />
            <meta
              property="og:description"
              content={
                categoryDesc?.meta_descriptions
                  ? categoryDesc?.meta_descriptions
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
          {categoryDesc?.description}
        </Typography>
      </Container>
    </>
  );
};

// const homeWithHOC = getCanonical(CategoryListing);
export default CategoryListing;
