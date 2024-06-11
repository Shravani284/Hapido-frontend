import css from './CategoryCard.module.scss';
import Card from '@mui/material/Card';
import star from '../../../../berlin-consumer/assets/star.png';
import Location from '../../../../berlin-consumer/assets/Location.png';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { DealImg } from 'berlin-common';
import { lang } from '../../utils/getLang';

interface cardPropsI {
  image: string;
  newTag?: string;
  destinationName: string;
  offerAd: string;
  offerPrice: string;
  offPercent: any;
  orgPrice: string;
  numRating: string;
  soldPackages: string;
  locationName: string;
  slug: string;
  dealType: string;
  id: number;
  primaryCat?: string;
  subCategory?: string;
  show_Old_price?: boolean;
}

const CategoryCard = ({
  image,
  newTag,
  destinationName,
  offerAd,
  offerPrice,
  offPercent,
  orgPrice,
  numRating,
  soldPackages,
  locationName,
  slug,
  dealType,
  id,
  primaryCat,
  subCategory,
  show_Old_price,
}: cardPropsI) => {
  const { t, i18n } = useTranslation('translation');
  const navigate = useNavigate();

  const productDetailRouts = (type: string, slug: string, id: number) => {
    if (type === 'SINGLE') {
      return `/${lang}/s/${slug}/${id}`;
      // subCategory
      //   ? `/${lang}/s/${slug}/${id}?category=${primaryCat}&subCategory=${subCategory}`
      //   : `/${lang}/s/${slug}/${id}?category=${
      //       primaryCat ? primaryCat : 'search'
      //     }`;
    } else if (type === 'COMBO') {
      return `/${lang}/c/${slug}/${id}`;
      // subCategory
      //   ? `/${lang}/c/${slug}/${id}?category=${primaryCat}&subCategory=${subCategory}`
      //   : `/${lang}/c/${slug}/${id}?category=${
      //       primaryCat ? primaryCat : 'search'
      //     }`;
    } else {
      return `/${lang}/b/${slug}/${id}`;
      // subCategory
      //   ? `/${lang}/b/${slug}/${id}?category=${primaryCat}&subCategory=${subCategory}`
      //   : `/${lang}/b/${slug}/${id}?category=${
      //       primaryCat ? primaryCat : 'search'
      //     }`;
    }
  };

  return (
    <>
      <Box
        className={`${css.cardContainer} RTLComponent`}
        sx={{ cursor: 'pointer' }}
        // onClick={() => productDetailRouts(dealType, slug, id)}
      >
        <Link to={productDetailRouts(dealType, slug, id)}>
          <Card className={css.listingCard}>
            <div className={css.image}>
              <img
                loading="lazy"
                src={image || DealImg}
                alt={t(`TRAVELDEALS`)}
                className={css.listingCardImgStyle}
              />
              {/* <div className={css.newTag}>{newTag}</div> */}
            </div>

            <div className={`${css.destinationName} RTLdestinationName`}>
              {destinationName}
            </div>

            {/* <p className={css.offerAd}>{offerAd}</p> */}

            <div className={css.offer}>
              <div className={`${css.offerPrice} RTLofferPrice`}>
                {offerPrice}
                {t('AED')}*
              </div>
              {offPercent >= 0 && (
                <div className={css.offPercent}>
                  {Math.ceil(offPercent)}
                  {t('%OFF')}
                </div>
              )}
            </div>

            <div className={css.orgPrice}>
              {Boolean(show_Old_price) ? (
                <>
                  {orgPrice}
                  {t('AED')}*
                </>
              ) : (
                ''
              )}
            </div>

            <div className={css.ratingAndSold}>
              <div className={css.rating}>
                <div className={css.numRating}>{numRating}</div>
                <div className={`${css.star} RTLstar`}>
                  <img
                    loading="lazy"
                    src={star}
                    alt={t(`STAR`)}
                    className={css.starImgStyle}
                  />
                </div>
              </div>
              <div className={css.soldPackages}>
                {soldPackages}&nbsp;
                {t('SOLD')}
              </div>
            </div>

            <div className={css.location}>
              <img
                loading="lazy"
                className={`${css.locationLogo} RTLlocationLogo`}
                src={Location}
                alt={t(`LOCATION_LOGO`)}
              />
              <div className={css.locationName}>{locationName}</div>
            </div>

            <div className={css.BookNow}>
              <button className={css.BookNowBtn}>{t('BOOK_NOW')}</button>
            </div>
          </Card>
        </Link>
      </Box>
    </>
  );
};

export default CategoryCard;
