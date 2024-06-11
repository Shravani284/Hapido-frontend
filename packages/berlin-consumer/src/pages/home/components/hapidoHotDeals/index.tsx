import Grid from '@mui/material/Grid';
import css from './HapidoHotDeals.module.scss';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import CarouselSlide from '../../../../components/MainCarousel/CarouselSlide';
import { DealImg } from 'berlin-common';
import { lang } from '../../../../utils/getLang';

const HotDeals = ({ data }: any) => {
  const { t } = useTranslation('translation');
  const navigate = useNavigate();
  const list = data?.images?.filter((e: any, index: number) => index !== 0);

  const productDetailRouts = (
    type: string,
    slug: string,
    id: string,
    dealType: string,
    search_term: string,
    primary: boolean,
    primarySlug: string
  ) => {
    if (type?.toLocaleLowerCase() === 'category') {
      return primary
        ? `/${lang}/${primarySlug}`
        : `/${lang}/${primarySlug}/${slug}`;
    } else if (search_term) {
      return `/${lang}/search?q=${search_term}`;
    } else if (dealType === 'SINGLE') {
      return `/${lang}/s/${slug}/${id}`;
    } else if (dealType === 'COMBO') {
      return `/${lang}/c/${slug}/${id}`;
    } else {
      return `/${lang}/b/${slug}/${id}`;
    }
  };

  return (
    <>
      <h6 className={css.HotDEalsHeading}>{data.placement_title}</h6>
      <Grid container className={css.HotDealsContainer} spacing={4}>
        <Grid item xs={4} sm={0} md={4} xl={4} className={css.hotDealsBanner}>
          <Link
            to={productDetailRouts(
              data?.images[0].target_module,
              data?.images[0].slug,
              data?.images[0].target_id,
              data?.images[0].target_deal_type,
              data?.images[0].search_term,
              data?.images[0].primary,
              data?.images[0].primarySlug
            )}
          >
            {data?.images[0]?.type?.toLowerCase() === 'video' ? (
              <video playsInline autoPlay muted loop className={css.video}>
                <source
                  src={data?.images[0]?.extfilepath || DealImg}
                  type="video/mp4"
                />
              </video>
            ) : (
              <img
                loading="lazy"
                src={data?.images[0]?.extfilepath || DealImg}
                alt={t('HAPIDO')}
                // onClick={() =>
                //   productDetailRouts(
                //     data?.images[0].target_module,
                //     data?.images[0].slug,
                //     data?.images[0].target_id,
                //     data?.images[0].target_deal_type,
                //     data?.images[0].search_term,
                //     data?.images[0].primary,
                //     data?.images[0].primarySlug
                //   )
                // }
              />
            )}
          </Link>
        </Grid>
        <Grid item xs={8} sm={12} md={8} xl={8} className="hotDealsRes">
          <CarouselSlide
            arrowPosition="top"
            sliderImages={list}
            id={data?.id}
            setting={{
              slidesToShow: 2.2,
              slidesToScroll: 2.2,
              infinite: false,
              autoplay: false,
              rows: 2,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default HotDeals;
