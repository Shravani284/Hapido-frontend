import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import css from '../MainCarousel/Slider.module.scss';
import Slider from 'react-slick';
import SliderNextArrow from './SliderNextArrow';
import SliderPreArrow from './SliderPreArrow';
import { Link, useNavigate } from 'react-router-dom';
import { path } from '../../routes/Routers';
import { Box } from '@mui/material';
import { BannerImg } from 'berlin-common';
import { lang } from '../../utils/getLang';
import { useTranslation } from 'react-i18next';

type SliderType = {
  extfilepath: string;
  type?: string;
  id: string;
};

type CarouselSlideProps = {
  sliderImages: SliderType[];
  arrowPosition: string;
  sliderHeading?: string;
  setting?: any;
  id?: number;
  isCaption?: boolean;
  isClick?: boolean;
};

const CarouselSlide = ({
  sliderImages,
  arrowPosition,
  sliderHeading,
  setting,
  id,
  isCaption = false,
  isClick = true,
}: CarouselSlideProps) => {
  const settings = {
    arrows: true,
    prevArrow: <SliderPreArrow arrowPosition={arrowPosition} />,
    nextArrow: <SliderNextArrow arrowPosition={arrowPosition} />,
    infinite: true,
    // autoplay: true,
    Speed: 50000,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    ...setting,
  };

  const navigate = useNavigate();
  const { t } = useTranslation('translation');
  const productDetailRouts = (
    type: string,
    slugs: string,
    bannerId: any,
    dealType: string,
    search_term: string,
    primary: boolean,
    primarySlug: string
  ) => {
    if (!isClick) return;
    if (id == null && !bannerId) {
      return `/${lang}/`;
    } else {
      if (type?.toLocaleLowerCase() === 'category') {
        return primary
          ? `/${lang}/${primarySlug}`
          : `/${lang}/${primarySlug}/${slugs}`;
      } else if (search_term) {
        return `/${lang}/search?q=${search_term}`;
      } else if (dealType === 'SINGLE') {
        return `/${lang}/s/${slugs}/${bannerId || id}`;
      } else if (dealType === 'COMBO') {
        return `/${lang}/c/${slugs}/${bannerId || id}`;
      } else {
        return `/${lang}/b/${slugs}/${bannerId || id}`;
      }
      // navigate(`/productDetails/${bannerId || id}`);
    }
  };

  return (
    <>
      {sliderHeading && <h6 className={css.sliderTitle}>{sliderHeading}</h6>}
      <Slider {...settings} className={css.sliderNested}>
        {sliderImages?.map((item: any, index) => (
          <Link
            key={index}
            to={productDetailRouts(
              item?.target_module,
              item?.slug,
              item?.target_deal_id || item?.target_id,
              item?.target_deal_type,
              item?.search_term,
              item?.primary,
              item?.primarySlug
            )}
          >
            <div
              className={css.imgOrVideoSlider}
              // onClick={() =>
              //   productDetailRouts(
              //     item?.target_module,
              //     item?.slug,
              //     item?.target_deal_id || item?.target_id,
              //     item?.target_deal_type,
              //     item?.search_term,
              //     item?.primary,
              //     item?.primarySlug
              //   )
              // }
            >
              {item?.type?.toLowerCase() === 'video' ? (
                <video playsInline autoPlay muted loop className={css.video}>
                  <source
                    src={item?.extfilepath || BannerImg}
                    type="video/mp4"
                    className={css.sliderVideo}
                  />
                </video>
              ) : (
                <>
                  <img
                    loading="lazy"
                    src={item?.extfilepath || BannerImg}
                    alt={t(`HAPIDO`)}
                    className={css.imgFluid}
                    width={'100%'}
                  />
                </>
              )}
              {isCaption ? (
                <Box textAlign={'center'} my={2} fontWeight={'bold'}>
                  {item?.campaign_name}
                </Box>
              ) : null}
            </div>
          </Link>
        ))}
      </Slider>
    </>
  );
};

export default CarouselSlide;
