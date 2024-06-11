import { useTranslation } from 'react-i18next';
import css from './StaycationDeals.module.scss';
import Grid from '@mui/material/Grid';
import locationImg from '../../../../../assets/locationIcon.svg';
import { Box, Rating } from '@mui/material';
import { categoriesById } from '../../../../services/HomePageServices';
import { useEffect, useState } from 'react';
import unLike from '../../../../../assets/Like.png';
import { SkeletonSingleColumn } from '../../../../components/Skeleton';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DealImg } from 'berlin-common';
import { lang } from '../../../../utils/getLang';

const StaycationDealsAr = ({ singleColumn }) => {
  const { t, i18n } = useTranslation('translation');
  const [singleColumnList, setSingleColumnList] = useState([]);
  const [singleColumnSkeleton, setSingleColumnSkeleton] = useState(false);
  const name = useSelector((state: any) => state?.cityName?.name);
  const navigate = useNavigate();

  useEffect(() => {
    setSingleColumnSkeleton(true);
    categoriesById(singleColumn?.id, name)
      .then((response) => {
        setSingleColumnSkeleton(false);
        setSingleColumnList(response?.data?.allDeals);
      })
      .catch((error) => {
        setSingleColumnSkeleton(false);
        console.log(error, 'error');
      });
  }, [name]);
  const productDetailRouts = (type: string, slug: string, id: string) => {
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
      {singleColumnSkeleton ? (
        <SkeletonSingleColumn />
      ) : (
        <>
          {singleColumnList?.length > 0 ? (
            <>
              <div className={css.titleAndShowAll}>
                <h6 className={css.title}>{singleColumn?.label}</h6>
                <div
                  className={css.showAllBtn}
                  onClick={() => navigate(`${lang}/${singleColumn?.slug}`)}
                >
                  {t('SHOW_ALL')}
                </div>
              </div>
              <div className={`${css.cardContainer} RTLComponent`}>
                <Grid
                  container
                  spacing={4}
                  justifyContent="start"
                  flexDirection="row"
                >
                  {singleColumnList?.map((item, index) => (
                    <Grid item xs={4} key={index}>
                      <Link
                        to={productDetailRouts(
                          item?.deal_type,
                          item?.slug,
                          item?.id
                        )}
                      >
                        <div
                          className={css.card}
                          // onClick={() =>
                          //   productDetailRouts(
                          //     item?.deal_type,
                          //     item?.slug,
                          //     item?.id
                          //   )
                          // }
                        >
                          <Box maxWidth={'490px'}>
                            <img
                              loading="lazy"
                              src={item?.images[0]?.extfilepath || DealImg}
                              alt={t('HAPIDO')}
                              className={css.mainCardImg}
                            />
                          </Box>
                          <div>
                            <div className={css.location}>
                              <Box width={'90%'}>
                                <img
                                  loading="lazy"
                                  src={locationImg}
                                  alt={t('HAPIDO')}
                                  width={'18px'}
                                />
                                {item?.dealArea.length > 0 ? (
                                  <p
                                    className={`${css.locationText} RtllocationText`}
                                  >
                                    {item?.dealArea
                                      .map((e) => e.text)
                                      .join(', ')}
                                  </p>
                                ) : (
                                  ''
                                )}
                              </Box>
                              <Box width={'10%'}>
                                <img
                                  loading="lazy"
                                  src={unLike}
                                  alt={t('HAPIDO')}
                                />
                              </Box>
                            </div>
                            <div className={css.nameView}>
                              <h4 className={css.countryName}>
                                {item?.title_label}
                              </h4>
                            </div>
                            <Box
                              display={'flex'}
                              justifyContent={'space-between'}
                              alignItems={'center'}
                            >
                              <div className={css.rating}>
                                <Rating
                                  dir="rtl"
                                  name="half-rating-read"
                                  precision={0.5}
                                  value={item?.rating}
                                  readOnly
                                  size="small"
                                  className={`${css.ratingStar} RTLRating`}
                                />
                                <div className={css.ratingNumber}>
                                  {item?.rating}
                                </div>
                              </div>
                              <div className={css.viewed}>
                                100 {t('RECENTLY_VIEWED')}
                              </div>
                            </Box>
                          </div>
                          <div className={css.fromAed}>
                            {t('FROM')}
                            <span>
                              {item?.currency}
                              {item?.selling_price}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </>
          ) : (
            ''
          )}
        </>
      )}
    </>
  );
};

export default StaycationDealsAr;
