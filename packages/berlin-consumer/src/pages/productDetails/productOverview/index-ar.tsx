import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useEffect, useMemo, useRef, useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import css from './ProductOverview.module.scss';
import { Container, Box, Modal, Card } from '@mui/material';
import { tabsClasses } from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import Avatar from '@mui/material/Avatar';
import AvatarImg from '../../../../assets/Avatar.svg';
import Rating from '@mui/material/Rating';
import { DealImg } from 'berlin-common';
// import { PlaceCategoryJson } from '../../../../../data';
import { DateFormatAr, useWindowSize } from 'berlin-common';
import CancelIcon from '@mui/icons-material/Cancel';
import Slider from 'react-slick';
import SliderPreArrow from '../../../components/MainCarousel/SliderPreArrow';
import SliderNextArrow from '../../../components/MainCarousel/SliderNextArrow';
import { getDealReviews } from '../../../services/ProductDetailServices';

const ProductOverviewAr = ({
  productDetailsInfo,
  isChild = false,
  starRating,
  reviewData,
  totalCount,
  setReviewData,
  dealType,
}: any) => {
  const { t, i18n } = useTranslation('translation');
  const [tabValue, setTabValue] = useState([]);
  const [tabDetail, setTabDetail] = useState([]);
  const [page, setPage] = useState<any>(2);
  const Overview = useRef(null);
  const Reviews = useRef(null);
  const [value, setValue] = useState('Overview');
  const [openImage, setOpenImage] = useState<boolean>(false);
  const [reviewImg, setReviewImg] = useState<any>();
  const [imgPreviewArray, setImgPreviewArray] = useState([]);
  const [reviewDataChild, setReviewDataChild] = useState(reviewData);
  const [count, setCount] = useState<any>(2);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const { size } = useWindowSize();
  const descriptionHeight = useMemo(() => {
    return size > 768 ? 500 : 275;
  }, [size]);

  useEffect(() => {
    const titles = [];
    const details = [];
    if (isChild) {
      productDetailsInfo.forEach((e) => {
        e.translations.forEach((e) => {
          if (e.column_name === 'description_title_trans_ids') {
            titles.push(e.text);
          } else {
            details.push(e.text);
          }
        });
      });
    } else {
      productDetailsInfo?.forEach((e: any) => {
        titles.push(e.title);
        details.push(e.details);
      });
    }
    setTabDetail(details);
    setTabValue(titles);
    setValue(titles ? titles[0] : '');
  }, [productDetailsInfo]);

  const scrollToTop = (id) => {
    // Get the current element
    const element = document.getElementById(id); // Replace with your actual element ID
    if (element) {
      // Get the position of the element relative to the viewport
      const rect = element.getBoundingClientRect();

      // Scroll to the top of the element
      if (size < 768) {
        window.scrollTo({
          top: window.scrollY + rect.top - 130,
          behavior: 'smooth',
        });
      } else {
        window.scrollTo({
          top: window.scrollY + rect.top - 150,
          behavior: 'smooth',
        });
      }
    }
  };
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  const toggleExpansion = (index) => {
    setExpandedIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index)
        : [...prevIndexes, index]
    );
  };

  const handleViewMore = () => {
    if (isChild == true) {
      let dealType = 'SINGLE';
      getDealReviews(dealType, productDetailsInfo[0].deal_id, page)
        .then((response) => {
          const res = response?.data?.review;
          setReviewDataChild((prevData) => [...prevData, ...res]);

          setPage(page + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      getDealReviews(starRating?.deal_type, starRating?.id, page)
        .then((response) => {
          const res = response.data.review;
          setReviewData((prevData) => [...prevData, ...res]);
          // setTotalCount(response.data.totalCount);
          setPage(page + 1);
        })
        .catch((error) => {
          console.log(error);
        });
      // setPage(page + 3);
    }
  };
  const viewImage = (item, index) => {
    if (index !== -1) {
      const newArr = item?.images?.filter((item, index2) => index2 !== index);
      newArr.unshift(item?.images[index]);
      setImgPreviewArray(newArr);
    }
    setReviewImg(item?.images);
    setOpenImage(true);
  };

  const handleViewMoreImages = (count) => {
    setCount(count + 2);
  };

  var settings = {
    arrows: true,
    adaptiveHeight: true,
    prevArrow: <SliderPreArrow arrowPosition="middle" />,
    nextArrow: <SliderNextArrow arrowPosition="middle" />,
    infinite: true,
    // autoplay: true,
    Speed: 50000,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
  };
  const reviewMoreData = isChild ? reviewDataChild : reviewData;
  const allLength = page * 3;

  return (
    <>
      <Box>
        <TabContext value={value}>
          <Box className={css.overviewContainer}>
            <Container maxWidth="xl">
              <Tabs
                value={value}
                onChange={handleChange}
                defaultValue={tabValue.length > 0 ? tabValue[0] : ''}
                variant="scrollable"
                aria-label="visible arrows tabs example"
                sx={{
                  [`& .${tabsClasses.scrollButtons}`]: {
                    '&.Mui-disabled': { opacity: 0.3 },
                  },
                  '& button': { maxWidth: 'max-content' },
                }}
                className={css.TabIndicator}
              >
                {tabValue?.map((item, index) => (
                  <Tab
                    dir="rtl"
                    label={item}
                    value={item}
                    key={index}
                    onClick={() =>
                      scrollToTop(
                        isChild ? index + 'details' : index.toString()
                      )
                    }
                  />
                ))}
              </Tabs>
            </Container>
          </Box>
          {/* Tab Item */}
          <Box className={css.overviewDetails}>
            <Container maxWidth={'xl'}>
              <Box>
                <>
                  {/* <div ref={Overview}>
                    {tabDetail?.map((e, index) => (
                      <Box my={1} key={index}>
                        <Box
                          id={isChild ? index + 'details' : index.toString()}
                          className={css.overviewText}
                          dangerouslySetInnerHTML={{ __html: e }}
                        ></Box>
                      </Box>
                    ))}
                  </div> */}
                  <div ref={Overview}>
                    {tabDetail?.map((e, index) => (
                      <SingleDescription
                        e={e}
                        index={index}
                        isChild={isChild}
                        expandedIndexes={expandedIndexes}
                        descriptionHeight={descriptionHeight}
                        toggleExpansion={toggleExpansion}
                      />
                    ))}
                  </div>
                  <div className={css.allReview} ref={Reviews}>
                    {totalCount > 0 && (
                      <Typography variant="h6">{t('ALL_REVIEWS')}</Typography>
                    )}

                    {size < 768 ? (
                      <>
                        {reviewMoreData?.map((item: any) => {
                          return (
                            <>
                              <Box className={css.mobReviewsCard}>
                                <Box className={css.userProfile}>
                                  <Box>
                                    <Typography variant="h6">
                                      {item.user_name}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      className={`${css.captions} RTLcaptions`}
                                    >
                                      {item?.submitted_at
                                        ? DateFormatAr(item?.submitted_at)
                                        : ''}
                                    </Typography>
                                  </Box>
                                </Box>
                                <Box className={css.mainReview}>
                                  <Rating
                                    dir="rtl"
                                    name="read-only"
                                    value={item.review_stars}
                                    readOnly
                                    size="large"
                                    className="RTLRating"
                                  />
                                  <div className={css.reviewTitle}>
                                    {item?.review_title}
                                  </div>
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    marginTop="10px"
                                  >
                                    {!isChild && (
                                      <Box className={css.reviewFor}>
                                        {t('REVIEWS_FOR')}
                                        <span>{item.review_for}</span>
                                      </Box>
                                    )}
                                  </Box>
                                  <Box className={css.mainReview}>
                                    {item?.review_description}
                                  </Box>
                                </Box>

                                <Box
                                  display="flex"
                                  flexDirection="row"
                                  flexWrap="wrap"
                                >
                                  {item?.images?.length > 0 &&
                                    item?.images
                                      ?.slice(0, count)
                                      .map((img, index) => (
                                        <>
                                          <Box key={index}>
                                            <img
                                              loading="lazy"
                                              src={img?.extfilepath}
                                              alt={t(`REVIEWIMG`)}
                                              className={css.reviewImg}
                                              onClick={() =>
                                                viewImage(item, index)
                                              }
                                            />
                                          </Box>
                                        </>
                                      ))}
                                  {count < item?.images?.length && (
                                    <Box display="flex" justifyContent="center">
                                      <button
                                        className={css.MobReviewBtn}
                                        onClick={() =>
                                          handleViewMoreImages(count)
                                        }
                                      >
                                        {t('VIEW_MORE')}
                                      </button>
                                    </Box>
                                  )}
                                </Box>
                              </Box>
                            </>
                          );
                        })}
                        {totalCount > 0 &&
                          page <= Math.ceil(totalCount / 3) && (
                            <Box display="flex" justifyContent="center">
                              <button
                                className={css.MobReviewBtn}
                                onClick={() => handleViewMore()}
                              >
                                {t('READ_MORE_REVIEWS')}
                              </button>
                            </Box>
                          )}
                      </>
                    ) : (
                      <>
                        {reviewMoreData?.map((item: any) => {
                          return (
                            <>
                              <Box className={css.userProfile}>
                                <Box>
                                  <Typography variant="h6">
                                    {item.user_name}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    className={`${css.captions} RTLcaptions`}
                                  >
                                    {item?.submitted_at
                                      ? DateFormatAr(item?.submitted_at)
                                      : ''}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box
                                display="flex"
                                alignItems="center"
                                marginTop="10px"
                              >
                                <Rating
                                  dir="rtl"
                                  name="read-only"
                                  value={item.review_stars}
                                  readOnly
                                  size="large"
                                  className="RTLRating"
                                />
                                <Box className={css.recommended}>
                                  {item?.review_title}
                                </Box>
                              </Box>
                              <Box
                                display="flex"
                                alignItems="center"
                                marginTop="10px"
                              >
                                {!isChild && dealType !== 'SINGLE' && (
                                  <Box className={css.reviewFor}>
                                    {t('REVIEWS_FOR')}
                                    <span>{item.review_for}</span>
                                  </Box>
                                )}
                              </Box>
                              <Box className={css.mainReview}>
                                {item?.review_description}
                              </Box>
                              <Box
                                display="flex"
                                flexDirection="row"
                                flexWrap="wrap"
                              >
                                {item?.images.length > 0 &&
                                  item?.images?.map((img, index) => (
                                    <>
                                      <Box key={index}>
                                        <img
                                          loading="lazy"
                                          src={img?.extfilepath}
                                          alt={t(`REVIEWIMG`)}
                                          className={css.reviewImg}
                                          onClick={() => viewImage(item, index)}
                                        />
                                      </Box>
                                    </>
                                  ))}
                              </Box>
                            </>
                          );
                        })}

                        {totalCount > 0 &&
                          page <= Math.ceil(totalCount / 3) && (
                            <Box display="flex" justifyContent="center">
                              <button
                                className={css.reviewBtn}
                                onClick={() => handleViewMore()}
                              >
                                {t('READ_MORE_REVIEWS')}
                              </button>
                            </Box>
                          )}
                      </>
                    )}
                  </div>
                </>
              </Box>
            </Container>

            <Modal
              open={openImage}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
              onClose={() => {
                setOpenImage(false);
              }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box width="90%">
                <div className="previewModal" style={{ position: 'relative' }}>
                  <Slider {...settings}>
                    {imgPreviewArray.map((item) => {
                      return (
                        <img
                          loading="lazy"
                          src={item.extfilepath}
                          alt={t(`REVIEWIMG`)}
                          className={css.previewImg}
                        />
                      );
                    })}
                  </Slider>

                  <CancelIcon
                    onClick={() => setOpenImage(false)}
                    className={css.closeIcon}
                  />
                </div>
              </Box>
            </Modal>
          </Box>
        </TabContext>
      </Box>
    </>
  );
};

export default ProductOverviewAr;

const SingleDescription = ({
  e,
  index,
  isChild,
  expandedIndexes,
  descriptionHeight,
  toggleExpansion,
}) => {
  const { t } = useTranslation('translation');
  const containerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const isContentOverflowing = container.scrollHeight > descriptionHeight;
      setIsOverflowing(isContentOverflowing);
    }
  }, []);
  return (
    <Box my={1} key={index}>
      <Box
        ref={containerRef}
        id={isChild ? index + 'details' : index.toString()}
        className={css.overviewText}
        style={{
          overflow: expandedIndexes.includes(index) ? 'visible' : 'hidden',
          maxHeight: expandedIndexes.includes(index)
            ? 'none'
            : descriptionHeight, // Change this to your desired mobile height
          transition: 'max-height 0.3s ease-out',
        }}
        dangerouslySetInnerHTML={{ __html: e }}
      ></Box>
      {isOverflowing && (
        <p className={'readMoreBtn'} onClick={() => toggleExpansion(index)}>
          {!expandedIndexes.includes(index) ? t(`READ_MORE`) : t(`READ_LESS`)}
        </p>
      )}

      <hr />
    </Box>
  );
};
