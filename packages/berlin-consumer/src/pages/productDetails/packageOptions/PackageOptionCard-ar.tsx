import {
  Container,
  Grid,
  Box,
  Card,
  CardContent,
  CardActions,
  Divider,
  Button,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clock from '../../../../assets/clock.svg';
import css from './PackageCard.module.scss';
import cardImg from '../../../../assets/cardImg.png';
// import { packageCard } from '../../../../../data';
import { productDetails } from '../../../services/ProductDetailServices';
import { useParams } from 'react-router-dom';
import { ADMINHOST } from '../../../../../../urlConst';
import ProductOverviewAr from '../productOverview/index-ar';

const PackageOptionCardAr = ({
  dealTypePrices = [],
  totalCount,
  setReviewData,
  reviewData,
}: any) => {
  const { t } = useTranslation('translation');
  const loginDetails = JSON.parse(localStorage.getItem('loginDetails'));

  const [scrollPositions, setScrollPositions] = useState(
    Array(dealTypePrices.length).fill(0)
  );
  const [openCardId, setOpenCardId] = useState(null);
  const { deal_type } = useParams();
  const type =
    deal_type === 's' ? 'SINGLE' : deal_type === 'c' ? 'COMBO' : 'BUNDLE';
  const dealReviews = dealTypePrices.map((item) => {
    return item.reviews;
  });
  const toggleData = (cardId, index) => {
    setOpenCardId(openCardId === cardId ? null : cardId);

    const newScrollPositions = [...scrollPositions];
    newScrollPositions[index] = window.scrollY;
    setScrollPositions(newScrollPositions);
  };

  const scrollToCard = (index, action) => {
    if (action == 'hide') {
      window.scrollTo({
        top: scrollPositions[index],
        behavior: 'smooth',
      });
    }
  };

  // const toggleData = (cardId: number | any, id, action) => {
  //   setOpenCardId(openCardId === cardId ? null : cardId);

  //   console.log('cardId', cardId);

  //   const element = document.getElementById(cardId);

  //   console.log('element', element);

  //   // if (action === 'hide') {
  //   //   const element = document.getElementById(id);
  //   //   console.log('element', element, id);
  //   //   const rect = element.getBoundingClientRect();
  //   //   console.log('rect', rect);
  //   //   const offset = -50;
  //   //   window.scrollTo({
  //   //     top: window.scrollY + rect.top + offset,
  //   //     behavior: 'smooth',
  //   //   });
  //   // }

  //   // if (action)
  //   // const element = document.getElementById(openCardId);
  //   // if (element) {
  //   //   const rect = element.getBoundingClientRect();
  //   //   const offset = -50;
  //   //   window.scrollTo({
  //   //     top: window.scrollY + rect.top + offset,
  //   //     behavior: 'smooth',
  //   //   });
  //   // }
  // };

  // useEffect(() => {
  //   console.log('ii', openCardId);
  //   if (openCardId !== null) {
  //     const element = document.getElementById(openCardId);
  //     if (element) {
  //       const rect = element.getBoundingClientRect();
  //       const offset = -50;
  //       window.scrollTo({
  //         top: window.scrollY + rect.top + offset,
  //         behavior: 'smooth',
  //       });
  //     }
  //   }
  // }, [openCardId]);

  return (
    <>
      <div className={css.heading}>{t('SELECT_PACKAGE_OPTION')}</div>
      {dealTypePrices?.map((item: any, index) => {
        const editDealChild =
          item?.deal_type == 'SINGLE'
            ? 'singledeals'
            : item?.deal_type == 'BUNDLE'
            ? 'dealbundle'
            : 'dealcombo';
        return (
          <div key={item.id} className={css.section}>
            <Box className={css.card}>
              <Card className={css.border}>
                <Container maxWidth="xl" sx={{ mt: 4 }}>
                  {/* <div className={css.circle}>
                    <input
                      type="radio"
                      name="toggle"
                      onClick={() => toggleData(item.id)}
                      checked={openCardId === item.id}
                    />
                  </div> */}

                  <CardContent className={css.space}>
                    <Grid container>
                      <Grid item xl={8} md={8} sm={8}>
                        <h6 className={css.title}>{item?.title_label}</h6>
                        <div className={css.time}>
                          {item?.est_duration_hours && (
                            <>
                              <img loading="lazy" src={clock} alt={t(`TIME`)} />
                              <span className={css.timeContainer}>
                                {item?.est_duration_hours} {t(`HOURS`)}
                              </span>
                            </>
                          )}
                        </div>

                        <CardActions>
                          <button
                            onClick={() => {
                              toggleData(item.id, index);
                              scrollToCard(index, 'show');
                            }}
                            className={css.button}
                          >
                            {openCardId === item?.id ? (
                              <h5 className={css.subtitle}>
                                {/* {t('HIDE_DETAILS')} */}
                              </h5>
                            ) : (
                              <h5 className={css.subtitle}>
                                {t('SHOW_DETAILS')}
                              </h5>
                            )}
                          </button>
                        </CardActions>
                      </Grid>
                      <Grid item xl={4} md={4} sm={4}>
                        <div className={css.aed}>
                          {Boolean(item?.show_old_price) && (
                            <p style={{ textDecoration: 'line-through' }}>
                              {item?.old_price}
                              {t(`AED`)}
                            </p>
                          )}
                          <h5>
                            {item?.selling_price != 0
                              ? `${item?.selling_price}${t(`AED`)}`
                              : t(`FREE`)}
                          </h5>
                          <p>{item.person}</p>
                        </div>
                        {/* {openCardId === item.id ? (
                          ' '
                        ) : (
                          <SecondaryButton label={t('Checkout')} type="submit" />
                        )} */}
                      </Grid>

                      {loginDetails?.is_internal && (
                        <Button
                          variant="outlined"
                          color="error"
                          type="reset"
                          sx={{ mr: 1 }}
                          className={css.editButton}
                          href={`${ADMINHOST}/deals/${editDealChild}/update/${item?.id}`}
                          target="_blank"
                        >
                          {t(`EDIT`)}
                        </Button>
                      )}
                    </Grid>
                  </CardContent>

                  {openCardId === item.id && (
                    <>
                      <Divider variant="middle" />
                      <CardContent>
                        <div className={css.cardContend}>
                          {item.images.length > 0 && (
                            <img
                              style={{ borderRadius: 13 }}
                              loading="lazy"
                              src={item?.images[0]?.extfilepath}
                            />
                          )}
                          {/* <h6>{t('MORE_INFO')}</h6>
                        {console.log(
                          item?.deal_descriptions?.map((e) => e?.translations),
                          'ddddd'
                        )} */}
                          <ProductOverviewAr
                            productDetailsInfo={item?.deal_descriptions}
                            isChild={true}
                            starRating={item?.rating}
                            reviewData={item?.reviews}
                            totalCount={item?.reviewTotalCount}
                            setReviewData={setReviewData}
                            dealType={type}
                          />
                          {/* );
                            })} */}
                          <Grid container className={css.bottom}>
                            <Grid item xl={6} md={6} sm={6}>
                              <button
                                onClick={() => {
                                  toggleData(item.id, index);
                                  scrollToCard(index, 'hide');
                                }}
                                className={css.button}
                              >
                                <h5 className={css.subtitle}>
                                  {t('HIDE_DETAILS')}
                                </h5>
                              </button>
                            </Grid>
                            <Grid item xl={6} md={6} sm={6}>
                              {/* <PrimaryButton label={t('Checkout')} type="submit" /> */}
                            </Grid>
                          </Grid>
                        </div>
                      </CardContent>
                    </>
                  )}
                </Container>
              </Card>
            </Box>
          </div>
        );
      })}
    </>
  );
};

export default PackageOptionCardAr;
