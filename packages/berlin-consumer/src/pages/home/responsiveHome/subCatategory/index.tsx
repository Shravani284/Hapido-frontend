import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import css from '../../HomePageStyle.module.scss';
import { DealImg, ResSecondaryBtn } from 'berlin-common';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { path } from '../../../../routes/Routers';
import { useState, useEffect } from 'react';
import { allCategories } from '../../../../services/HomePageServices';
import { SkeletonHomeCategory } from '../../../../components/Skeleton';
import { lang } from '../../../../utils/getLang';

function MobSubCategory() {
  const { t, i18n } = useTranslation('translation');
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();
  const [isSkeleton, setIsSkeleton] = useState(false);

  const handleViewMore = () => {
    navigate(`/${lang}/menu`);
  };

  useEffect(() => {
    setIsSkeleton(true);
    allCategories()
      .then((response) => {
        setIsSkeleton(false);
        setCategoryList(response.data.category);
      })
      .catch((error) => {
        setIsSkeleton(false);
        console.log('error', error);
      });
  }, []);

  return (
    <>
      {isSkeleton ? (
        <SkeletonHomeCategory />
      ) : (
        <>
          <h6 className={css.mobHeading}>{t('SHOP_BY_CATEGORY')}</h6>
          <Grid container spacing={2}>
            {categoryList?.slice(0, 8).map((item: any, index: any) => (
              <Grid
                item
                xs={3}
                sm={3}
                key={index}
                className={css.mobSubCategory}
                // onClick={() => navigate(`/${lang}/${item?.slug}`)}
              >
                <Link to={`/${lang}/${item?.slug}`}>
                  <img
                    loading="lazy"
                    src={item?.images[0]?.extfilepath || DealImg}
                    alt=""
                  />
                  <p>{item?.label}</p>
                </Link>
              </Grid>
            ))}
          </Grid>
          <Box margin={'20px auto'} width={'50%'}>
            {/* <ResSecondaryBtn
              label={t('VIEW_MORE')}
              onClick={() => handleViewMore()}
            /> */}
          </Box>
        </>
      )}
    </>
  );
}

export default MobSubCategory;
