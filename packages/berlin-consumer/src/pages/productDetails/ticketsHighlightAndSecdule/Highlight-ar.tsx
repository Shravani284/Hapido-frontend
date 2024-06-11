import { DealImg, useWindowSize } from 'berlin-common';
import css from './ticketsHighlightAndSchedule.module.scss';
import { Grid, Card, Box } from '@mui/material';
import { boolean } from 'yup';
import { useState } from 'react';
import { SkeletonPDHighlights } from '../../../components/Skeleton';
import { useTranslation } from 'react-i18next';

type highlightI = {
  productDetailsInfo: any;
  productDetailBannerMob?: any;
};
const HighlightAr = ({
  productDetailsInfo,
  productDetailBannerMob,
}: highlightI) => {
  const { size } = useWindowSize();
  const { t } = useTranslation('translation');

  return (
    <>
      {size < 768 ? (
        <Card className={css.card}>
          <div
            style={{
              gridTemplateColumns: `repeat(${productDetailsInfo?.dealTags?.length}, 25%)`,
            }}
            className={css.scrollContainer}
          >
            {productDetailBannerMob ? (
              [1, 2, 3, 4, 5, 6].map(() => <SkeletonPDHighlights />)
            ) : productDetailsInfo?.dealTags?.length === 0 ? (
              <div className={css.highlightCard}>
                <Box sx={{ textAlign: 'center' }}>{t(`NO_HIGHLIGHTS`)}</Box>
              </div>
            ) : (
              productDetailsInfo?.dealTags?.map((item, i) => (
                <div key={i} className={css.highlightCard}>
                  <div style={{ textAlign: 'center' }}>
                    <img
                      loading="lazy"
                      src={item?.images[0]?.extfilepath || DealImg}
                      className={css.highlightIcon}
                      alt={item.label}
                    />
                    <p className={`${css.highlightText} RTLHighlightText`}>
                      {item?.label && item?.label}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      ) : (
        <Card className={css.card}>
          <Grid
            container
            // columnSpacing={2}
            // rowSpacing={{ xs: 4, sm: 4, md: 6, lg: 6 }}
          >
            {productDetailsInfo?.dealTags?.length === 0 ? (
              <Grid className={css.highlightCard} item xs={12}>
                <Box sx={{ textAlign: 'center' }}>{t(`NO_HIGHLIGHTS`)}</Box>
              </Grid>
            ) : (
              productDetailsInfo?.dealTags?.map((item, i) => (
                <Grid key={i} className={css.highlightCard} item xs={2.4}>
                  <Box sx={{ textAlign: 'center' }} mb={3}>
                    <img
                      loading="lazy"
                      src={item?.images[0]?.extfilepath || DealImg}
                      className={css.highlightIcon}
                      alt={item.label}
                    />
                    <p className={`${css.highlightText} RTLHighlightText`}>
                      {item?.label && item?.label}
                    </p>
                  </Box>
                </Grid>
              ))
            )}
          </Grid>
        </Card>
      )}
    </>
  );
};

export default HighlightAr;
