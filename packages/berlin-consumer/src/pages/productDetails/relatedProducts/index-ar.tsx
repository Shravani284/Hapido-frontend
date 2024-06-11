import SliderPreArrow from '../../../components/MainCarousel/SliderPreArrow';
import SliderNextArrow from '../../../components/MainCarousel/SliderNextArrow';
import Slider from 'react-slick';
import { Grid, Rating } from '@mui/material';
import css from './RelatedProductStyle.module.scss';
import location from '../../../../assets/locationIcon.svg';
import { useTranslation } from 'react-i18next';
// import { travelDealsData } from '../../../../../data';

const RelatedProductsAr = () => {
  const { t } = useTranslation('translation');

  const settings = {
    arrows: true,
    prevArrow: <SliderPreArrow arrowPosition={'top'} />,
    nextArrow: <SliderNextArrow arrowPosition={'top'} />,
    infinite: false,
    autoplay: false,
    slidesToShow: 4.2,
    initialSlide: 0,
    Speed: 50000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <h6 className={css.cardHeading}>{t('RELATED_PRODUCT')}</h6>
      <div className="relatedProductCrard">
        <Slider {...settings}>
          {/* {travelDealsData.map((item, index) => (
            <Grid key={index} className={css.relatedCard}>
              <img
                loading="lazy"
                src={item.img}
                alt="RelatedProduct"
                className={css.relateImg}
              />
              <div className={css.location}>
                <img loading="lazy" src={location} alt="HapiDo" />
                <div>{item.location}</div>
              </div>
              <h6>{item.country}</h6>
              <div className={css.rating}>
                <Rating
                  dir="rtl"
                  name="half-rating-read"
                  precision={0.5}
                  value={item.rating}
                  readOnly
                  size="small"
                  className='RTLRating'
                />
                <div>{item.rating}</div>
              </div>
              <div className={css.fromAed}>
                {t('FROM')}
                <span>{item.nAed}</span>
              </div>
              <div className={css.view}>{item.view}</div>
            </Grid>
          ))} */}
        </Slider>
      </div>
    </>
  );
};

export default RelatedProductsAr;
