import { HapidoLogo, useWindowSize } from 'berlin-common';
import NotFoundPage from '../../../../components/PageNotFound/PageNotFound';
import { useEffect, useState } from 'react';
import {
  descCategoriesById,
  flashSalePageMob,
} from '../../../../services/HomePageServices';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import GridCards from '../../../../components/categoryCard';
import { Box, Breadcrumbs, Container, Link } from '@mui/material';
import { SkeletonSearchList } from '../../../../components/Skeleton';
import { useNavigate, useParams } from 'react-router-dom';
import { path } from '../../../../routes/Routers';
import { mPage, viewPageEvent } from '../../../../utils/moEngage';
import Helmet from 'react-helmet';
import getCanonical from '../../../../utils/getCanonical';
import getMetaTags from '../../../../utils/getMetaTags';
import OpenInApp from '../../../../components/openInApp';
import Header from '../../../../components/header/Header';
import { lang } from '../../../../utils/getLang';

const FlashSales = () => {
  const { size } = useWindowSize();
  const { t, i18n } = useTranslation('translation');
  const name = useSelector((state: any) => state?.cityName?.name);
  const { prevLocation } = useSelector((state: any) => state?.cityName);
  const [flashList, setFlashList] = useState([]);
  const [skeletonSearch, setSkeletonSearch] = useState(false);
  const navigate = useNavigate();
  const param = useParams();
  const [categoryDesc, setCategoryDesc] = useState<any>({});

  useEffect(() => {
    viewPageEvent(mPage.flashSale, name, prevLocation);
    setSkeletonSearch(true);
    flashSalePageMob(name, 'flash-sale')
      .then((response) => {
        setSkeletonSearch(false);
        const allCategories = [...response?.data?.allDeals];
        const allList = allCategories?.map((e) => {
          return {
            ...e,
            images: e?.image_paths
              ? e?.image_paths?.split(',')?.map((item) => {
                  return { extfilepath: item };
                })
              : [],
            dealArea: e?.area_text
              ? e?.area_text?.split(',')?.map((item) => {
                  return { text: item };
                })
              : [],
            // selling_price: e?.selling_price
            //   ? e?.selling_price
            //   : e?.display_selling_price,
            // old_price: e?.old_price ? e?.old_price : e?.display_old_price,
            // sold_count_deal: e?.sold_count,
          };
        });
        setFlashList(allList);
      })
      .catch((error) => {
        setSkeletonSearch(false);
        console.log(error, 'error');
      });
  }, []);

  let paramSlug = param?.subcategory_slug
    ? param?.subcategory_slug
    : param?.category_slug;
  useEffect(() => {
    descCategoriesById('flash-sale')
      .then((res) => {
        setCategoryDesc(res.data?.newCategory);

        const productData = res.data?.newCategory;

        const urlObject = new URL(window.location.href);
        const baseUrlWithoutQueryString = urlObject.origin + urlObject.pathname;
        const HapidoSiteLogo =
          'https://cdn.hapido.com/site-assets/images/hapido-full-logo-white.jpg';

        // meta tags
        const fullMetaArray = {
          title: `${
            productData?.meta_title
              ? productData?.meta_title
              : ' Hapido | Exclusive Deals, Discounts & Offers in Dubai | Abu Dhabi | UAE'
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
  //       : ' Hapido | Exclusive Deals, Discounts & Offers in Dubai | Abu Dhabi | UAE'
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
      {size < 768 && <OpenInApp />}

      {/* {size > 768 ? (
        <NotFoundPage />
      ) : ( */}
      <>
        {/* <Helmet>
            {categoryDesc?.meta_title ? (
              <title>{categoryDesc?.meta_title}</title>
            ) : (
              <title>
                Hapido | Exclusive Deals, Discounts & Offers in Dubai | Abu
                Dhabi | UAE
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
        {size > 768 && <Header />}
        <Container maxWidth="xl">
          <Box my={4}>
            <Box mb={2}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  underline="hover"
                  color="inherit"
                  onClick={() => navigate(`/${lang}/`)}
                >
                  {t('HOME')}
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  onClick={() => navigate(`/${lang}/`)}
                >
                  {t('FLASH_SALE')}
                </Link>
              </Breadcrumbs>
            </Box>

            {skeletonSearch ? (
              <SkeletonSearchList />
            ) : (
              <GridCards
                categoryList={flashList}
                primaryCat={''}
                subCategory={''}
              />
            )}
          </Box>
        </Container>
      </>
      {/* )} */}
    </>
  );
};

// const homeWithHOC = getCanonical(FlashSales);
export default FlashSales;
