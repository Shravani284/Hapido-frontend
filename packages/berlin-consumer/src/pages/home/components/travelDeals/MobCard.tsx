import TwoRowsSlider from '../../../../components/twoRowsCarousel';
import { useTranslation } from 'react-i18next';
import css from './TravelDealsStyles.module.scss';
import Rating from '@mui/material/Rating';
import location from '../../../../../assets/locationIcon.svg';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categoriesById } from '../../../../services/HomePageServices';
import { useSelector } from 'react-redux';
import { DealImg } from 'berlin-common';
import { lang } from '../../../../utils/getLang';
import {
  SkeletonColumnTitle,
  SkeletonDoubleColumn,
} from '../../../../components/Skeleton';

const MobCard = ({ item }: any) => {
  const { t, i18n } = useTranslation('translation');
  const [doubleColumnList, setDoubleColumnList] = useState([]);
  const name = useSelector((state: any) => state?.cityName?.name);
  const [isSkeletonFeature, setIsSkeletonFeature] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsSkeletonFeature(true);
    categoriesById(item.id, name)
      .then((response) => {
        setDoubleColumnList(response.data.allDeals);
        setIsSkeletonFeature(false);
      })
      .catch((error) => {
        console.log({ error }, 'error');
        setIsSkeletonFeature(false);
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
      <Box className="travelDealsSlide" mb={4}>
        {isSkeletonFeature ? (
          <SkeletonColumnTitle />
        ) : (
          <h6 className={css.heading}>{item?.label}</h6>
        )}
        <TwoRowsSlider
          arrowPosition="top"
          setting={{
            autoplay: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrow: false,
          }}
        >
          {doubleColumnList?.map((item, index) =>
            isSkeletonFeature ? (
              <Box display={'flex'} overflow={'hidden'}>
                <SkeletonDoubleColumn />
              </Box>
            ) : (
              <Link
                key={index}
                to={productDetailRouts(item.deal_type, item.slug, item.id)}
              >
                <Box
                  // onClick={() =>
                  //   productDetailRouts(item.deal_type, item.slug, item.id)
                  // }

                  className={css.travelDealsCardRes}
                  m={1}
                  gap={1}
                >
                  <>
                    <Box mr={2} className={css.cardContainerWidthRes}>
                      <img
                        loading="lazy"
                        src={item?.images[0]?.extfilepath || DealImg}
                        alt={t('HAPIDO')}
                        className={css.travelDealsImgRes}
                      />
                    </Box>
                    <Box overflow={'hidden'} className="travelText">
                      <h6 className={css.TravelCountryRes}>
                        {item?.title_label}
                      </h6>
                      <p className={css.travelOfferRes}>
                        {item?.tagline_label}
                      </p>
                      <Box mt={1} className={css.beforeTextRes}>
                        {t('BEFORE')}
                        <span className={css.beforeAedRes}>
                          {item?.currency} {item?.old_price}
                        </span>
                      </Box>
                      <Box
                        display={'flex'}
                        alignItems={'baseline'}
                        justifyContent={'space-between'}
                        flexWrap={'wrap'}
                        mb={1.5}
                      >
                        <div className={css.nowAedRes}>
                          <div>
                            <span>{t('NOW')}</span>
                            {item?.currency}
                            {item?.selling_price}*
                          </div>
                        </div>
                        {item?.discount_percentage >= 0 && (
                          <div className={css.discountRes}>
                            {Math.ceil(item?.discount_percentage)}
                            {t('%OFF')}
                          </div>
                        )}
                      </Box>
                      <Rating
                        name="half-rating-read"
                        precision={0.5}
                        value={item?.rating}
                        readOnly
                        size="small"
                        className={css.ratingRes}
                      />
                      <span className={css.ratingNumberRes}>
                        {item?.rating}
                      </span>
                      <Box className={css.locationRes} mb={1}>
                        <img loading="lazy" src={location} alt={t('HAPIDO')} />
                        {item?.dealArea?.length > 0 && (
                          // <div>{item?.dealArea[0]?.text || ''}</div>
                          <div className={css.locationText}>
                            {item?.dealArea.map((e) => e.text).join(', ') || ''}
                          </div>
                        )}
                      </Box>
                      <div
                        className={css.bookButtonRes}
                        onClick={() =>
                          productDetailRouts(item.deal_type, item.slug, item.id)
                        }
                      >
                        {t('BOOK_NOW')}
                      </div>
                    </Box>
                  </>
                </Box>
              </Link>
            )
          )}
        </TwoRowsSlider>
      </Box>
    </>
  );
};

export default MobCard;
