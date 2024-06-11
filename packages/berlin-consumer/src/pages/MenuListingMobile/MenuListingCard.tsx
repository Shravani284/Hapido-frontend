import { Card, Container, Grid } from '@mui/material';
import React, { useState } from 'react';
import css from './MenuListingMobile.module.scss';
import { useNavigate } from 'react-router-dom';
import { DealImg } from 'berlin-common';
import { lang } from '../../utils/getLang';
import { useTranslation } from 'react-i18next';
interface cardPropsI {
  listingCard: {
    image: string;
    title: string;
  }[];
  categoryName: string;
  categorySlug: string;
}

const MenuListingCard = ({
  listingCard,
  categoryName,
  categorySlug,
}: cardPropsI) => {
  const { t, i18n } = useTranslation('translation');
  const [btnClick, setBtnClick] = useState(false);
  const [count, setCount] = useState(8);
  const navigate = useNavigate();

  const handleViewMore = () => {
    setBtnClick(!btnClick);
    // setCount(!count);
    if (!btnClick) {
      setCount(listingCard?.length);
    } else {
      setCount(8);
    }
  };

  return (
    <>
      <div className={css.borderPadding}>
        <div className={css.category}>
          {categoryName}
          {listingCard.length > 8 ? (
            <button className={css.viewMore} onClick={handleViewMore}>
              {btnClick ? <>{t('VIEW_LESS')}</> : <>{t('VIEW_MORE')}</>}
            </button>
          ) : (
            ''
          )}
        </div>

        <Grid
          container
          columnSpacing={1}
          className={`${css.cardContainer}  ${
            btnClick ? css.cardContainerExpanded : ''
          } `}
        >
          <>
            {listingCard?.slice(0, count)?.map((items: any, index) => {
              return (
                <Grid item sm={3} xs={3}>
                  <div
                    className={css.listingCard}
                    key={index}
                    onClick={() =>
                      navigate(`/${lang}/${categorySlug}/${items?.slug}`)
                    }
                  >
                    <img
                      loading="lazy"
                      src={items?.images[0]?.extfilepath || DealImg}
                      alt={t('SAMPLE_HAPIDO')}
                      className={css.image}
                    />
                    <div className={css.title}>{items?.label}</div>
                  </div>
                </Grid>
              );
            })}
          </>
        </Grid>
      </div>
    </>
  );
};

export default MenuListingCard;
