import TwoRowsSlider from '../../../../components/twoRowsCarousel';
import { useTranslation } from 'react-i18next';
import css from './TravelDealsStyles.module.scss';
import Rating from '@mui/material/Rating';
import location from '../../../../../assets/locationIcon.svg';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { categoriesById } from '../../../../services/HomePageServices';
import { Link, useNavigate } from 'react-router-dom';
import { SkeletonDoubleColumn } from '../../../../components/Skeleton';
import { useSelector } from 'react-redux';
import { DealImg } from 'berlin-common';
import { lang } from '../../../../utils/getLang';
import TwoRowsSliderAr from '../../../../components/twoRowsCarousel/index-ar';

const TravelDealsAr = ({ doubleColumn }: any) => {
  const { t, i18n } = useTranslation('translation');
  const [doubleColumnList, setDoubleColumnList] = useState([]);
  const [DoubleColumnSkeleton, setDoubleColumnSkeleton] = useState(false);
  const name = useSelector((state: any) => state?.cityName?.name);

  const navigate = useNavigate();
  useEffect(() => {
    setDoubleColumnSkeleton(true);
    categoriesById(doubleColumn?.id, name)
      .then((response) => {
        setDoubleColumnSkeleton(false);
        setDoubleColumnList(response.data.allDeals);
      })
      .catch((error) => {
        setDoubleColumnSkeleton(false);
        console.log({ error }, 'error');
      });
  }, [name]);

  const productDetailRouts = (type: string, slug: string, id: string) => {
    // navigate(`/deal-${slug}/${id}`);
    if (type === 'SINGLE') {
      return `/${lang}/s/${slug}/${id}`;
    } else if (type === 'COMBO') {
      return `/${lang}/c/${slug}/${id}`;
    } else {
      return `/${lang}/b/${slug}/${id}`;
    }
  };

  return (
    <>
      {doubleColumnList.length > 0 && (
        <Box className="travelDealsSlide RTLComponent" mb={4}>
          {DoubleColumnSkeleton ? (
            <SkeletonDoubleColumn />
          ) : (
            <TwoRowsSliderAr
              sliderHeading={doubleColumn?.label}
              setting={{ autoplay: false, centerMode: false }}
            >
              {doubleColumnList?.map((item, index) => (
                <Link
                  key={index}
                  to={productDetailRouts(item.deal_type, item.slug, item.id)}
                >
                  <Box
                    className={`${css.travelDealsCard} RTLComponent`}
                    m={1}
                    sx={{ cursor: 'pointer' }}
                    // onClick={() =>
                    //   productDetailRouts(item.deal_type, item.slug, item.id)
                    // }
                  >
                    <Box
                      mr={2}
                      className={`${css.cardContainerWidth} RtlcardContainerWidth`}
                    >
                      <img
                        loading="lazy"
                        src={item?.images[0]?.extfilepath || DealImg}
                        alt={t('HAPIDO')}
                        className={css.travelDealsImg}
                      />
                    </Box>
                    <Box overflow={'hidden'} className="travelText">
                      <h6 className={css.TravelCountry}>{item?.title_label}</h6>
                      <p className={css.travelOffer}>{item?.tagline_label}</p>
                      <Box mt={1} className={`${css.beforeText} RtlbeforeText`}>
                        {t('BEFORE')}
                        <span className={css.beforeAed}>
                          {item?.old_price}
                          {item?.currency}
                        </span>
                      </Box>
                      <Box
                        display={'flex'}
                        alignItems={'baseline'}
                        justifyContent={'space-between'}
                        flexWrap={'wrap'}
                        mb={1.5}
                      >
                        <div className={`${css.nowAed} RtlnowAed`}>
                          <div className="RtlCurrentPrice">
                            <span>{t('NOW')}</span>
                            <div>{item?.currency} </div>
                            {item?.selling_price}*
                          </div>
                        </div>
                        {item?.discount_percentage ? (
                          <div className={`${css.discount} Rtldiscount`}>
                            {Math.ceil(item?.discount_percentage)}
                            {t('%OFF')}
                          </div>
                        ) : (
                          ''
                        )}
                      </Box>
                      <Rating
                        name="half-rating-read"
                        precision={0.5}
                        value={item?.rating}
                        readOnly
                        dir="rtl"
                        size="medium"
                        className={`${css.rating} RTLRating`}
                      />
                      <span className={css.ratingNumber}>{item?.rating}</span>
                      <Box className={`${css.location} Rtllocation`} mb={1}>
                        <img loading="lazy" src={location} alt={t('HAPIDO')} />
                        {item?.dealArea?.length > 0 && (
                          <div>
                            {item?.dealArea.map((e) => e.text).join(', ') ||
                              ' '}
                          </div>
                        )}
                      </Box>
                      <div className={css.bookButton}>{t('BOOK_NOW')}</div>
                    </Box>
                  </Box>
                </Link>
              ))}
            </TwoRowsSliderAr>
          )}
        </Box>
      )}
    </>
  );
};

export default TravelDealsAr;
