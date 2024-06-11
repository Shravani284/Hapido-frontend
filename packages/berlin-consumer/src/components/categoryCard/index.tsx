import css from './CategoryCard.module.scss';
import CategoryCard from './CategoryCard';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { log } from 'console';
import { useEffect, useState } from 'react';

const GridCards = ({ categoryList, primaryCat, subCategory }) => {
  const { t, i18n } = useTranslation('translation');
  const [showNoRecord, setShowNoRecord] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowNoRecord(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <>
      {categoryList?.length > 0 ? (
        <Grid
          container
          columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          className={`${css.cardContainer} RTLComponent`}
          // className={css.cardContainer}
        >
          {categoryList?.map((items: any) => {
            return (
              <Grid item md={4} lg={3} sm={6} xs={6} key={items.id}>
                <CategoryCard
                  image={items?.images[0]?.extfilepath || ''}
                  newTag={'NEW'}
                  destinationName={items?.title_label}
                  offerAd={items?.tagline_label}
                  offerPrice={items?.selling_price}
                  offPercent={items?.discount_percentage}
                  orgPrice={items?.old_price}
                  numRating={items?.rating || '0'}
                  soldPackages={
                    items?.sold_count_deal > 0 ? items?.sold_count_deal : '0'
                  }
                  slug={items?.slug}
                  dealType={items?.deal_type}
                  locationName={
                    items?.dealArea?.map((i: any) => i?.text)?.join(', ') || ''
                  }
                  id={items?.id}
                  primaryCat={primaryCat && primaryCat}
                  subCategory={subCategory && subCategory}
                  show_Old_price={items?.show_old_price}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        showNoRecord && (
          <h4
            style={{
              textAlign: 'center',
              color: '#FC1C15',
              borderRadius: '25px',
              margin: '100px 0px',
            }}
          >
            {t('NO_RECORD')}
          </h4>
        )
      )}
    </>
  );
};
export default GridCards;
