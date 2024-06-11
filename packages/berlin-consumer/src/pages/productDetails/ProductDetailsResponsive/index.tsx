import Box from '@mui/material/Box';
import CarouselSlide from '../../../components/MainCarousel/CarouselSlide';
import Container from '@mui/material/Container';
import StarIcon from '@mui/icons-material/Star';
import css from '../ProductDetail.module.scss';
import ProductOverview from '../productOverview';
import ProductWidgetTwo from '../../home/responsiveHome/productWidgetTwo';
import rightArrow from '../../../../assets/right-arrow.png';
import { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MobileSchedule from '../ticketsHighlightAndSecdule/Schedule/ScheduleMobile';
import { defaultImg } from '../../../../../data';
import { DealImg, useReplace } from 'berlin-common';
import {
  Breadcrumbs,
  Card,
  Grid,
  Link,
  Modal,
  Typography,
  Button,
} from '@mui/material';
import { lang } from '../../../utils/getLang';
import { path } from '../../../routes/Routers';
import uploadIcon from '../../../../assets/product-details/upload.svg';

import {
  SkeletonPDHighlights,
  SkeletonPDPBookNow,
  SkeletonProductDetailsBanner,
  SkeletonPDPDeals,
} from '../../../components/Skeleton';
import Highlight from '../ticketsHighlightAndSecdule/Highlight';
import { useSelector } from 'react-redux';
import { CloseCircleFilled } from '@ant-design/icons';
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
import { Share } from '../../../utils/moEngage';
import { ADMINHOST } from '../../../../../../urlConst';
const singleToExclude = [870, 329];
const bundleToExclude = [175, 134, 29];
const comboToExclude = [29];
const ProductDetailRes = ({
  productDetailsInfo,
  productDetailBannerMob,
  reviewData,
  totalCount,
  setReviewData,
}) => {
  const [open, setOpen] = useState(null);
  const { t, i18n } = useTranslation('translation');
  const { deal_slug, deal_type, id } = useParams();
  const [productDetailsInfoVideo, setProductDetailsVideo] = useState<any>([]);
  // const { deal_type } = useParams();
  const [searchParams] = useSearchParams();
  const primaryCat = searchParams.get('category');
  const subCategory = searchParams.get('subCategory');
  const primaryText = useReplace(primaryCat);
  const subCatText = useReplace(subCategory);
  const navigate = useNavigate();
  const [shareOpen, setShareOpen] = useState<boolean>(false);
  const currentCity = useSelector((state: any) => state?.cityName?.name);
  const loginDetails = JSON.parse(localStorage.getItem('loginDetails'));
  const { isClickedBookNow } = useSelector((store: any) => store.Slider);
  const [imgVisible, setImgVisible] = useState<boolean>(true);

  const editLink =
    deal_type == 's'
      ? 'singledeals'
      : deal_type == 'b'
      ? 'dealbundle'
      : 'dealcombo';

  const scrollHighlight = isClickedBookNow ? 'scrollHighlight' : '';
  const shareIcon = () => {
    setShareOpen(true);
  };

  const shareUrl = window?.location?.href;
  const type =
    deal_type === 's' ? 'SINGLE' : deal_type === 'c' ? 'COMBO' : 'BUNDLE';
  const shareHandler = (method: string) => {
    Share(method, type, id, currentCity);
    setShareOpen(false);
  };

  useEffect(() => {
    // setProductDetailBannerMob(true);
    let removedImage = false;
    const media = productDetailsInfo?.media?.filter((item) => {
      if (!removedImage && item?.type === 'image') {
        removedImage = true;
        return false;
      }
      return true;
    });
    setProductDetailsVideo(media?.length > 0 ? media : defaultImg);
    // setProductDetailBannerMob(false);
  }, [productDetailsInfo, id]);
  const openDetails = (cardId: number | any) => {
    setOpen((prevState) => (prevState === cardId ? null : cardId));
  };

  const breadcrumbsRouts = (e) => {
    if (e == 1) {
      navigate(`/${lang}/`);
    } else if (e == 2) {
      navigate(`/${lang}/${primaryCat}`);
    } else if (e == 3) {
      navigate(`/${lang}/${primaryCat}/${subCategory}`);
    }
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

  return (
    <>
      {productDetailBannerMob ? (
        <SkeletonProductDetailsBanner />
      ) : (
        <>
          <div className="mobSlider">
            <Box className="mobPromo">
              <CarouselSlide
                sliderImages={productDetailsInfoVideo}
                arrowPosition="middle"
                setting={{ dots: true, arrows: false }}
                isClick={false}
              />
            </Box>

            <Container maxWidth="xl">
              <Box
                fontSize={20}
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
                    <div>
                      <Link
                        underline="hover"
                        color="inherit"
                        onClick={() => breadcrumbsRouts(2)}
                      >
                        {primaryText?.charAt(0).toUpperCase() +
                          primaryText?.slice(1)}
                      </Link>
                    </div>
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
                    variant="outlined"
                    color="error"
                    type="reset"
                    sx={{ mr: 1 }}
                    href={`${ADMINHOST}/deals/${editLink}/update/${id}`}
                    target="_blank"
                    className={css.mobEditButton}
                  >
                    {t(`EDIT`)}
                  </Button>
                )}
              </Box>
            </Container>
          </div>
          <Container maxWidth="xl">
            <Box my={2}>
              <Box>
                <Grid position="relative" className={css.productInfoMob}>
                  <Grid>
                    <h4 className={css.placeName}>
                      {productDetailsInfo?.title_label}
                    </h4>
                    <p className={css.placeInfo}>
                      {productDetailsInfo?.tagline_label}
                    </p>
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
                    <div className={css.shareIconPlace}>
                      <img
                        loading="lazy"
                        src={uploadIcon}
                        alt={t(`UPLOADICON`)}
                        onClick={shareIcon}
                      />
                    </div>
                  </Grid>
                  {/* <Grid>
                    <img
                      loading="lazy"
                      src={uploadIcon}
                      alt="UploadIcon"
                      onClick={shareIcon}
                    />
                  </Grid> */}
                </Grid>

                <Box display={'flex'} alignItems={'center'} mt={1}>
                  <Box className={css.MobRating}>
                    <Box pr={1}>{productDetailsInfo?.rating}</Box>
                    <Box>
                      <StarIcon fontSize="small" />
                    </Box>
                  </Box>
                  {productDetailsInfo?.sold_count_deal && (
                    <Box px={2} fontSize={'14px'}>
                      {productDetailsInfo?.sold_count_deal > 0
                        ? productDetailsInfo?.sold_count_deal
                        : '0'}{' '}
                      {t('BOOKED')}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Container>
        </>
      )}

      <Box my={4} id="buyProduct">
        <Highlight
          productDetailsInfo={productDetailsInfo}
          productDetailBannerMob={productDetailBannerMob}
        />
      </Box>

      <Container maxWidth="xl">
        {deal_type !== 'b' && (
          <Box className={`${css.dealCardSb} ${scrollHighlight}`}>
            {productDetailBannerMob ? (
              <SkeletonPDPBookNow />
            ) : (
              <>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Box display={'flex'}>
                    <Box>
                      <div className={css.pAed}>
                        {t(`AED`)} {productDetailsInfo?.selling_price}*
                      </div>
                      {Boolean(productDetailsInfo?.show_old_price) && (
                        <div className={css.normalAed}>
                          {t(`AED`)} {productDetailsInfo?.old_price}
                        </div>
                      )}
                    </Box>
                    <Box className={css.offer} fontSize={'10px'}>
                      {Math.ceil(productDetailsInfo?.discount_percentage)}%
                    </Box>
                  </Box>
                  <MobileSchedule productDetailsInfo={productDetailsInfo} />
                </Box>
              </>
            )}
          </Box>
        )}
      </Container>

      <Container maxWidth="xl">
        {productDetailsInfo?.deals?.map((item: any, index) => {
          const editDealChild =
            item?.deal_type == 'SINGLE'
              ? 'singledeals'
              : item?.deal_type == 'BUNDLE'
              ? 'dealbundle'
              : 'dealcombo';
          return (
            <Box className={css.productCard}>
              {productDetailBannerMob ? (
                <SkeletonPDPDeals />
              ) : (
                <div className={css.cardHeader} key={index}>
                  <Box>
                    <h4 className={css.placeName}>{item?.title_label}</h4>
                    {/* <p className={css.placeInfoCard}>
                      {t('FREE_CANCELLATION')}
                    </p> */}
                  </Box>
                  <Box
                    className={css.details}
                    onClick={() => openDetails(item.id)}
                  >
                    {t('DETAILS')}
                    <img loading="lazy" src={rightArrow} alt={t(`ICON`)} />
                  </Box>
                </div>
              )}

              {open === item.id && (
                <>
                  <Divider variant="middle" />
                  <Box>
                    <Box className={css.cardContend}>
                      {/* {item?.images?.map((e) => ( */}
                      <img
                        loading="lazy"
                        src={item?.images[0]?.extfilepath || DealImg}
                        alt={t(`HAPIDO`)}
                      />
                      {/* ))} */}
                      <h6>{t('MORE_INFO')}</h6>
                      <ProductOverview
                        productDetailsInfo={item?.deal_descriptions}
                        isChild={true}
                        starRating={item?.rating}
                        reviewData={item?.reviews}
                        totalCount={totalCount}
                        setReviewData={setReviewData}
                        dealType={type}
                      />
                      <Box className={css.bottom}>
                        <button onClick={openDetails} className={css.button}>
                          <h5 className={css.subtitle}>{t('HIDE_DETAILS')}</h5>
                        </button>
                      </Box>
                    </Box>
                  </Box>
                </>
              )}

              {productDetailBannerMob ? (
                <SkeletonPDPBookNow />
              ) : (
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  mt={2}
                >
                  <Box className={css.bottom}>
                    <Box display={'flex'}>
                      <Box>
                        <div className={css.pAed}>
                          {item?.selling_price != 0
                            ? `${t('AED')} ${item?.selling_price}*`
                            : t(`FREE`)}
                        </div>
                        {Boolean(item?.show_old_price) && (
                          <div className={css.normalAed}>
                            {t('AED')} {item?.old_price}
                          </div>
                        )}
                      </Box>
                      {item?.selling_price != 0 ? (
                        <Box className={css.offer} fontSize={'10px'}>
                          {Math.ceil(item?.discountPercentage)}%
                        </Box>
                      ) : (
                        ''
                      )}
                    </Box>
                    {loginDetails?.is_internal && (
                      <Button
                        variant="outlined"
                        color="error"
                        type="reset"
                        sx={{ mr: 1 }}
                        className={css.mobEditButtonChild}
                        href={`${ADMINHOST}/deals/${editDealChild}/update/${item?.id}`}
                        target="_blank"
                      >
                        {t(`EDIT`)}
                      </Button>
                    )}
                  </Box>
                  {deal_type === 'b' && (
                    <MobileSchedule productDetailsInfo={item} />
                  )}
                </Box>
              )}
            </Box>
          );
        })}
      </Container>
      <Box className={`${css.productOverview} overview`}>
        <ProductOverview
          productDetailsInfo={productDetailsInfo.deal_descriptions}
          starRating={productDetailsInfo}
          reviewData={reviewData}
          totalCount={totalCount}
          setReviewData={setReviewData}
          dealType={type}
        />
      </Box>

      <Container maxWidth="xl">
        {/* <Box mb={10}>
      // TODO: Don't remove
          <h6 className={css.mobHeading}>{t('OFTEN_BOOKED_TOGETHER')}</h6>
          <ProductWidgetTwo />
        </Box> */}
      </Container>
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
            mb={1}
          >
            <Typography variant="h5" style={{ fontSize: '20px' }}>
              {t(`SHARE`)}
            </Typography>
            <CloseCircleFilled
              style={{ fontSize: '20px' }}
              onClick={() => {
                setShareOpen(false);
              }}
            />
          </Box>
          <Box
            gap={3}
            display={'flex'}
            // justifyContent={'space-between'}
            flexWrap={'wrap'}
          >
            <FacebookShareButton
              onClick={() => shareHandler('Facebook')}
              url={shareUrl}
              className="Demo__some-network__share-button"
            >
              <FacebookIcon size={28} round />
            </FacebookShareButton>
            <FacebookMessengerShareButton
              url={shareUrl}
              onClick={() => shareHandler('FacebookMessenger')}
              appId="521270401588372"
              className="Demo__some-network__share-button"
            >
              <FacebookMessengerIcon size={28} round />
            </FacebookMessengerShareButton>
            <EmailShareButton
              url={shareUrl}
              // subject={title}
              onClick={() => shareHandler('Email')}
              body="body"
              className="Demo__some-network__share-button"
            >
              <EmailIcon size={28} round />
            </EmailShareButton>
            <TwitterShareButton
              url={shareUrl}
              onClick={() => shareHandler('Twitter')}
              className="Demo__some-network__share-button"
            >
              <XIcon size={28} round />
            </TwitterShareButton>
            <TelegramShareButton
              url={shareUrl}
              onClick={() => shareHandler('Telegram')}
              className="Demo__some-network__share-button"
            >
              <TelegramIcon size={28} round />
            </TelegramShareButton>
            <WhatsappShareButton
              url={shareUrl}
              onClick={() => shareHandler('Whatsapp')}
              className="Demo__some-network__share-button"
            >
              <WhatsappIcon size={28} round />
            </WhatsappShareButton>
            <LinkedinShareButton
              url={shareUrl}
              onClick={() => shareHandler('Linkedin')}
              className="Demo__some-network__share-button"
            >
              <LinkedinIcon size={28} round />
            </LinkedinShareButton>
            <RedditShareButton
              url={shareUrl}
              onClick={() => shareHandler('Reddit')}
              windowWidth={660}
              windowHeight={460}
              className="Demo__some-network__share-button"
            >
              <RedditIcon size={28} round />
            </RedditShareButton>
          </Box>
        </Card>
      </Modal>
    </>
  );
};

export default ProductDetailRes;
