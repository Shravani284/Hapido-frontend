import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import CarouselSlide from '../../components/MainCarousel/CarouselSlide';
import css from './ProductDetail.module.scss';
import {
  Box,
  Breadcrumbs,
  Card,
  Divider,
  Grid,
  Link,
  Modal,
  Typography,
  Button,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import uploadIcon from '../../../assets/product-details/upload.svg';
import ProductOverview from './productOverview';
import {
  BannerImg,
  HapidoLogo,
  PrimaryButton,
  useReplace,
  useWindowSize,
} from 'berlin-common';
import ProductDetailRes from './ProductDetailsResponsive';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  getDealReviews,
  productDetails,
} from '../../services/ProductDetailServices';
import PackageOptionCard from './packageOptions/PackageOptionCard';
import Highlight from './ticketsHighlightAndSecdule/Highlight';
import Schedule from './ticketsHighlightAndSecdule/Schedule/Schedule';
import { SkeletonBannerVideo } from '../../components/Skeleton';
import { path } from '../../routes/Routers';
import { lang } from '../../utils/getLang';
import {
  Share,
  mPage,
  viewItemList,
  viewPageEvent,
} from '../../utils/moEngage';
import { useSelector } from 'react-redux';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from 'react-share';
import { Close } from '@mui/icons-material';
import { CloseCircleFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { scrollBookNow } from '../../store/slice/SliderSlice';
import getCanonical from '../../utils/getCanonical';
import Helmet from 'react-helmet';
import getMetaTags from '../../utils/getMetaTags';
import { ADMINHOST } from '../../../../../urlConst';
import OpenInApp from '../../components/openInApp';
// import { defaultImg } from '../../../../data';
// import TicketAndSchedule from './ticketsHighlightAndSecdule';

const singleToExclude = [870, 329];
const bundleToExclude = [175, 134, 29];
const comboToExclude = [29];

const ProductDetails = () => {
  const { size } = useWindowSize();
  const { t, i18n } = useTranslation('translation');
  const { deal_slug, deal_type, id } = useParams();
  const [productDetailsInfo, setProductDetailsInfo] = useState<any>({});
  const [productDetailsInfoVideo, setProductDetailsVideo] = useState<any>([]);
  const [productDetailsError, setProductDetailsError] = useState<any>('');
  const [productDetailVideoSkeleton, setProductDetailVideoSkeleton] =
    useState<boolean>(false);
  const [productDetailBannerMob, setProductDetailBannerMob] = useState(false);
  const [highlightSkeleton, setHighlightSkeleton] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const primaryCat = searchParams.get('category');
  const subCategory = searchParams.get('subCategory');
  const primaryText = useReplace(primaryCat);
  const subCatText = useReplace(subCategory);
  const currentCity = useSelector((state: any) => state?.cityName?.name);
  const { prevLocation } = useSelector((state: any) => state?.cityName);
  const [shareOpen, setShareOpen] = useState<boolean>(false);
  const [shareClose, setShareClose] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<any>();
  const [reviewData, setReviewData] = useState([]);
  const [dealType, setDealType] = useState([]);
  const [imgVisible, setImgVisible] = useState<boolean>(true);
  const [page, setPage] = useState<any>(1);
  const param = useParams();
  const loginDetails = JSON.parse(localStorage.getItem('loginDetails'));
  const editLink =
    deal_type == 's'
      ? 'singledeals'
      : deal_type == 'b'
      ? 'dealbundle'
      : 'dealcombo';

  useEffect(() => {
    setProductDetailVideoSkeleton(true);
    setProductDetailBannerMob(true);
    setHighlightSkeleton(true);
    productDetails(id, deal_type, deal_slug)
      .then((response) => {
        let data = response?.data?.deal;
        setProductDetailsError('');
        setProductDetailsInfo(response?.data?.deal);
        let removedImage = false;
        const productData = response?.data?.deal;
        const media = response?.data?.deal?.media?.filter((item) => {
          if (!removedImage && item?.type === 'image') {
            removedImage = true;
            return false;
          }
          return true;
        });

        const urlObject = new URL(window.location.href);
        const baseUrlWithoutQueryString = urlObject.origin + urlObject.pathname;
        const HapidoSiteLogo =
          'https://cdn.hapido.com/site-assets/images/hapido-full-logo-white.jpg';

        const imageItem = productData?.media?.filter(
          (item) => item?.type === 'image'
        );
        let firstImage = '';
        let secondImage = '';
        if (imageItem && imageItem.length > 0) {
          firstImage = imageItem[0]?.extfilepath;
          secondImage = imageItem[1]?.extfilepath;
        }
        let fullMetaArray = {};
        if (productDetailsInfo) {
          fullMetaArray = {
            title: productData?.meta_title
              ? productData?.meta_title
              : ' Hapido | Exclusive Deals, Discounts & Offers in Dubai | Abu Dhabi | UAE',
            metaKeywords: productData?.meta_keyword
              ? productData?.meta_keyword
              : 'Hapido UAE, Deals, Discounts, Offers, Coupons, Savings, UAE Deals, Dining Deals, Travel Discounts',
            metaDescription: productData?.meta_description
              ? productData?.meta_description
              : 'Discover the best deals, discounts, and offers across various categories in the UAE with Hapido. Save on dining, travel, activities, and more',
            ogType: 'website',
            ogSiteName: 'hapido.com',
            ogLocale: 'en_ae',
            ogURL: baseUrlWithoutQueryString,
            ogTitle: productData?.meta_title
              ? productData?.meta_title
              : ' Hapido | Exclusive Deals, Discounts & Offers in Dubai | Abu Dhabi | UAE',
            ogDescriptions: productData?.meta_description
              ? productData?.meta_description
              : 'Discover the best deals, discounts, and offers across various categories in the UAE with Hapido. Save on dining, travel, activities, and more',
            ogImageWidth: '350',
            ogImageHeight: '350',
            ogImage: firstImage ? firstImage : HapidoSiteLogo,
            twitterSite: '@hapido',
            twitterCreator: '@hapido',
            twitterImage: firstImage ? firstImage : HapidoSiteLogo,
            twitterCard: secondImage ? secondImage : HapidoSiteLogo,
          };
        }
        getMetaTags(fullMetaArray);
        getCanonical(baseUrlWithoutQueryString);

        setDealType(data.deal_type);
        setProductDetailsVideo(media?.length > 0 ? media : [BannerImg]);
        setProductDetailVideoSkeleton(false);
        setProductDetailBannerMob(false);
        setHighlightSkeleton(false);
        viewItemList(
          {
            items: [
              {
                id: productData?.id,
                deal_type: productData?.deal_type,
                title_label: productData?.title_label,
                merchant_name: productData?.merchant_name,
                coupon: productData?.coupon,
                // discount: productData?.discount_percentage,
                discount: 0,
                primary_category: productData?.primary_category,
                secondary_categories: productData?.secondary_categories,
                // price_type: productData?.price_type,
                price: productData?.selling_price,
                // quantity: productData?.quantity,
              },
            ],
          },

          currentCity,
          'view_item'
        );
        getReviews(data.deal_type, data.id);
      })
      .catch((error) => {
        setProductDetailVideoSkeleton(false);
        setProductDetailBannerMob(false);
        console.log('error', error);
        setProductDetailsError(error.response.data.error.message);
      });
  }, [id]);
  const getReviews = (deal_type, deal_id) => {
    getDealReviews(deal_type, deal_id, page)
      .then((response) => {
        setReviewData(response.data.review);
        setTotalCount(response.data.totalCount);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const breadcrumbsRouts = (e) => {
    if (e == 1) {
      navigate(`/${lang}/`);
    } else if (e == 2) {
      if (primaryCat === 'Search') {
        navigate(-1);
      } else {
        navigate(`/${lang}/${primaryCat}`);
      }
    } else if (e == 3) {
      navigate(`/${lang}/${primaryCat}/${subCategory}`);
    }
  };
  useEffect(() => {
    viewPageEvent(
      mPage.productDetail,

      currentCity,
      prevLocation
    );
  }, [id]);

  const shareIcon = () => {
    setShareOpen(true);
  };
  const closePopUp = () => {
    setShareClose(true);
  };

  const shareUrl = window?.location?.href;
  const title = 'Hapido';
  const type =
    deal_type === 's' ? 'SINGLE' : deal_type === 'c' ? 'COMBO' : 'BUNDLE';
  const shareHandler = (method: string) => {
    Share(method, type, id, currentCity);
    setShareOpen(false);
  };
  const handleClickBookNow = () => {
    dispatch(scrollBookNow(true));
    // Set a timeout to remove the class after 3 seconds
    setTimeout(() => {
      dispatch(scrollBookNow(false));
    }, 2000);
  };
  useEffect(() => {
    if (
      (productDetailsInfo?.deal_type == 'SINGLE' &&
        singleToExclude.includes(productDetailsInfo?.id) == false) ||
      (productDetailsInfo?.deal_type == 'BUNDLE' &&
        bundleToExclude.includes(productDetailsInfo?.id) == false) ||
      (productDetailsInfo?.deal_type == 'COMBO' &&
        comboToExclude.includes(productDetailsInfo?.id) == false)
    ) {
      setImgVisible(true);
    } else {
      setImgVisible(false);
    }
  }, [productDetailsInfo, singleToExclude, bundleToExclude, comboToExclude]);

  // const urlObject = new URL(window.location.href);
  // const baseUrlWithoutQueryString = urlObject.origin + urlObject.pathname;
  // const HapidoSiteLogo =
  //   'https://cdn.hapido.com/site-assets/images/hapido-full-logo-white.jpg';

  // const imageItem = productDetailsInfo?.media?.filter(
  //   (item) => item?.type === 'image'
  // );
  // let firstImage = '';
  // let secondImage = '';
  // if (imageItem && imageItem.length > 0) {
  //   firstImage = imageItem[0]?.extfilepath;
  //   secondImage = imageItem[1]?.extfilepath;
  // }
  // let fullMetaArray = {};
  // if (productDetailsInfo) {
  //   fullMetaArray = {
  //     title: productDetailsInfo?.meta_title
  //       ? productDetailsInfo?.meta_title
  //       : ' Hapido | Exclusive Deals, Discounts & Offers in Dubai | Abu Dhabi | UAE',
  //     metaKeywords: productDetailsInfo?.meta_keyword
  //       ? productDetailsInfo?.meta_keyword
  //       : 'Hapido UAE, Deals, Discounts, Offers, Coupons, Savings, UAE Deals, Dining Deals, Travel Discounts',
  //     metaDescription: productDetailsInfo?.meta_description
  //       ? productDetailsInfo?.meta_description
  //       : 'Discover the best deals, discounts, and offers across various categories in the UAE with Hapido. Save on dining, travel, activities, and more',
  //     ogType: 'website',
  //     ogSiteName: 'hapido.com',
  //     ogLocale: 'en_ae',
  //     ogURL: baseUrlWithoutQueryString,
  //     ogTitle: productDetailsInfo?.meta_title
  //       ? productDetailsInfo?.meta_title
  //       : ' Hapido | Exclusive Deals, Discounts & Offers in Dubai | Abu Dhabi | UAE',
  //     ogDescriptions: productDetailsInfo?.meta_description
  //       ? productDetailsInfo?.meta_description
  //       : 'Discover the best deals, discounts, and offers across various categories in the UAE with Hapido. Save on dining, travel, activities, and more',
  //     ogImageWidth: '350',
  //     ogImageHeight: '350',
  //     ogImage: firstImage ? firstImage : HapidoSiteLogo,
  //     twitterSite: '@hapido',
  //     twitterCreator: '@hapido',
  //     twitterImage: firstImage ? firstImage : HapidoSiteLogo,
  //     twitterCard: secondImage ? secondImage : HapidoSiteLogo,
  //   };
  // }
  // useEffect(() => {
  //   if (Object.keys(productDetailsInfo).length !== 0) {
  //     getMetaTags(fullMetaArray);
  //   }
  // }, [productDetailsInfo]);

  return (
    <>
      {/* <Helmet>
        {productDetailsInfo?.meta_title ? (
          <title>{productDetailsInfo?.meta_title}</title>
        ) : (
          <title>
            Hapido | Exclusive Deals, Discounts & Offers in Dubai | Abu Dhabi |
            UAE
          </title>
        )}
        {productDetailsInfo?.meta_description ? (
          <meta
            name="description"
            content={productDetailsInfo?.meta_description}
            data-react-helmet="true"
          />
        ) : (
          <meta
            name="description"
            content="Discover the best deals, discounts, and offers across various categories in the UAE with Hapido. Save on dining, travel, activities, and more"
            data-react-helmet="true"
          />
        )}
        {productDetailsInfo?.meta_keyword ? (
          <meta
            name="keywords"
            content={productDetailsInfo?.meta_keyword}
            data-react-helmet="true"
          />
        ) : (
          <meta
            name="keywords"
            content="Hapido UAE, Deals, Discounts, Offers, Coupons, Savings, UAE Deals, Dining Deals, Travel Discounts"
            data-react-helmet="true"
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
            productDetailsInfo?.meta_title
              ? productDetailsInfo?.meta_title
              : 'Hapido | Exclusive Deals, Discounts & Offers in Dubai | Abu Dhabi | UAE'
          }
          data-react-helmet="true"
        />
        <meta
          property="og:description"
          content={
            productDetailsInfo?.meta_description
              ? productDetailsInfo?.meta_description
              : 'Discover the best deals, discounts, and offers across various categories in the UAE with Hapido. Save on dining, travel, activities, and more'
          }
          data-react-helmet="true"
        />
        <meta property="og:image:width" content="350" />
        <meta property="og:image:height" content="350" />
        <meta
          property="og:image"
          content={firstImage ? firstImage : HapidoLogo}
          data-react-helmet="true"
        />
        <meta name="twitter:site" content="@hapido" />
        <meta name="twitter:creator" content="@hapido" />
        <meta
          name="twitter:image"
          content={firstImage ? firstImage : HapidoLogo}
          data-react-helmet="true"
        />
        <meta
          name="twitter:card"
          content={secondImage ? secondImage : HapidoLogo}
          data-react-helmet="true"
        />
      </Helmet> */}
      {size < 768 && <OpenInApp />}
      {productDetailsError ? (
        <Box
          textAlign={'center'}
          fontWeight={600}
          fontSize={22}
          height={'80vh'}
          paddingTop={'35vh'}
        >
          <div>{productDetailsError}</div>
          <div className={css.backBtn} onClick={() => navigate(`/${lang}/`)}>
            <PrimaryButton label={t('BACK_TO_HOME')} />
          </div>
        </Box>
      ) : (
        <>
          {size < 768 ? (
            <ProductDetailRes
              productDetailsInfo={productDetailsInfo}
              productDetailBannerMob={productDetailBannerMob}
              reviewData={reviewData}
              totalCount={totalCount}
              setReviewData={setReviewData}
            />
          ) : (
            <>
              <Container maxWidth="xl">
                {/* ============= Breadcrumbs ======================= */}
                <Box
                  fontSize={18}
                  mt={3}
                  fontWeight={400}
                  className={css.pdpBreadcrumbs}
                >
                  <Breadcrumbs aria-label="breadcrumb">
                    <Link
                      underline="hover"
                      color="inherit"
                      onClick={() => breadcrumbsRouts(1)}
                    >
                      {t('HOME')}
                    </Link>
                    {primaryCat && (
                      <>
                        <Link
                          underline="hover"
                          color="inherit"
                          onClick={() => breadcrumbsRouts(2)}
                        >
                          {primaryText?.charAt(0).toUpperCase() +
                            primaryText?.slice(1)}
                        </Link>
                      </>
                    )}
                    {subCategory && (
                      <Link
                        underline="hover"
                        color="inherit"
                        aria-current="page"
                        onClick={() => breadcrumbsRouts(3)}
                      >
                        {subCatText?.charAt(0).toUpperCase() +
                          subCatText?.slice(1)}
                      </Link>
                    )}
                    <Link underline="hover" color="text.primary">
                      {productDetailsInfo?.title_label}
                    </Link>
                  </Breadcrumbs>
                  {loginDetails?.is_internal && (
                    <Button
                      className={css.editButtonTop}
                      variant="outlined"
                      color="error"
                      type="reset"
                      sx={{ mr: 1 }}
                      href={`${ADMINHOST}/deals/${editLink}/update/${id}`}
                      target="_blank"
                    >
                      {t(`EDIT`)}
                    </Button>
                  )}
                </Box>
                {/* Main Slider */}
                {productDetailVideoSkeleton ? (
                  <SkeletonBannerVideo />
                ) : (
                  <>
                    <Box className={css.mainSlider}>
                      <Box className={'productDetailSlider'}>
                        <CarouselSlide
                          sliderImages={productDetailsInfoVideo}
                          arrowPosition="middle"
                          setting={{ speed: 1000, autoplaySpeed: 30000 }}
                          isClick={false}
                        />
                      </Box>
                      <Grid
                        // display="Flex"
                        // justifyContent="space-between"
                        // alignItems="flex-start"
                        position="relative"
                        className={css.productInfo}
                      >
                        <Grid>
                          <h4 id="buyProduct">
                            {productDetailsInfo?.title_label}
                          </h4>
                          <p>{productDetailsInfo?.tagline_label}</p>
                          {imgVisible == true && (
                            <div className={css.offerImage}>
                              <img
                                loading="lazy"
                                src={
                                  'https://cdn.hapido.com/onsite-banners/sale/discount-coupon/flat10/1152x135-desktop-banner.jpg'
                                }
                                alt={t(`HAPIDO`)}
                              />
                            </div>
                          )}
                          <div className={css.rating}>
                            <Rating
                              name="half-rating-read"
                              precision={0.5}
                              value={productDetailsInfo?.rating}
                              readOnly
                              size="large"
                            />
                            <div>
                              {productDetailsInfo?.rating > 0 &&
                                productDetailsInfo?.rating}
                            </div>
                            <div>
                              {productDetailsInfo?.sold_count_deal && (
                                <Box px={2} fontSize={'14px'}>
                                  {productDetailsInfo?.sold_count_deal > 0
                                    ? productDetailsInfo?.sold_count_deal
                                    : '0'}{' '}
                                  {t('BOOKED')}
                                </Box>
                              )}
                            </div>
                          </div>
                          <div className={css.shareIconPlace}>
                            <img
                              loading="lazy"
                              src={uploadIcon}
                              alt={t(`UPLOADICON`)}
                              onClick={shareIcon}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </Box>
                    {/* Ticket And Schedule */}
                    {/* <TicketAndSchedule /> */}
                    <p className={css.headerText}>
                      {/* {productDetailsInfo?.title_label}{' '} */}
                      {t('HIGHLIGHTS')}
                    </p>
                    <Grid container columnSpacing={3} rowSpacing={3}>
                      <Grid item lg={6} md={12} sm={12} xs={12}>
                        <Highlight productDetailsInfo={productDetailsInfo} />
                      </Grid>
                      <Grid item lg={6} md={12} sm={12} xs={12}>
                        {size >= 768 ? (
                          <Schedule productDetailsInfo={productDetailsInfo} />
                        ) : (
                          ''
                        )}
                      </Grid>
                    </Grid>
                    {/* Package Options */}
                    {productDetailsInfo?.deals?.length > 0 && (
                      <PackageOptionCard
                        dealTypePrices={productDetailsInfo.deals}
                        totalCount={totalCount}
                        // setReviewData={setReviewData}
                        reviewData={reviewData}
                      />
                    )}
                  </>
                )}
              </Container>
              {/* Product Overview */}
              <Box className={css.productOverview}>
                {productDetailsInfo?.deal_descriptions?.length > 0 && (
                  <ProductOverview
                    productDetailsInfo={productDetailsInfo.deal_descriptions}
                    starRating={productDetailsInfo}
                    reviewData={reviewData}
                    totalCount={totalCount}
                    setReviewData={setReviewData}
                    dealType={dealType}
                  />
                )}
              </Box>
              <Container maxWidth="xl">
                {/* Related Products
                <RelatedProducts /> */}
              </Container>
            </>
          )}
          <Container maxWidth="xl" className={css.footerBookBtn}>
            {/* Related Products
        <RelatedProducts /> */}
            <PrimaryButton
              label={t(`BOOK_NOW`)}
              onClick={() => {
                // Get the current element
                const element = document.getElementById('buyProduct');
                handleClickBookNow();
                if (element) {
                  const rect = element.getBoundingClientRect();
                  if (size < 768) {
                    window.scrollTo({
                      top: window.scrollY + rect.top - 80,
                      behavior: 'smooth',
                    });
                  } else {
                    window.scrollTo({
                      top: window.scrollY + rect.top - 0,
                      behavior: 'smooth',
                    });
                  }
                }
              }}
            />
          </Container>
          {/* {shareOpen == true && (
            <> */}

          <Modal
            open={shareOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={() => {
              setShareOpen(false);
            }}
          >
            <Card className={css.shareIconPopUp}>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                mb={2}
              >
                <Typography variant="h5">{t(`SHARE`)}</Typography>
                <CloseCircleFilled
                  style={{ fontSize: '30px' }}
                  onClick={() => {
                    setShareOpen(false);
                  }}
                />
              </Box>

              <Box gap={5} display={'flex'} flexWrap={'wrap'}>
                <FacebookShareButton
                  onClick={() => shareHandler('Facebook')}
                  url={shareUrl}
                  className="Demo__some-network__share-button"
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>

                <FacebookMessengerShareButton
                  url={shareUrl}
                  onClick={() => shareHandler('FacebookMessenger')}
                  appId="521270401588372"
                  className="Demo__some-network__share-button"
                >
                  <FacebookMessengerIcon size={32} round />
                </FacebookMessengerShareButton>
                <EmailShareButton
                  url={shareUrl}
                  // subject={title}
                  onClick={() => shareHandler('Email')}
                  body="body"
                  className="Demo__some-network__share-button"
                >
                  <EmailIcon size={32} round />
                </EmailShareButton>
                <TwitterShareButton
                  url={shareUrl}
                  onClick={() => shareHandler('Twitter')}
                  className="Demo__some-network__share-button"
                >
                  <XIcon size={32} round />
                </TwitterShareButton>
                <TelegramShareButton
                  url={shareUrl}
                  onClick={() => shareHandler('Telegram')}
                  className="Demo__some-network__share-button"
                >
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
                <WhatsappShareButton
                  url={shareUrl}
                  onClick={() => shareHandler('Whatsapp')}
                  className="Demo__some-network__share-button"
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <LinkedinShareButton
                  url={shareUrl}
                  onClick={() => shareHandler('Linkedin')}
                  className="Demo__some-network__share-button"
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <RedditShareButton
                  url={shareUrl}
                  onClick={() => shareHandler('Reddit')}
                  windowWidth={660}
                  windowHeight={460}
                  className="Demo__some-network__share-button"
                >
                  <RedditIcon size={32} round />
                </RedditShareButton>
              </Box>
            </Card>
          </Modal>
          {/* </>
          )} */}
        </>
      )}
    </>
  );
};

// const homeWithHOC = getCanonical(ProductDetails);
export default ProductDetails;
