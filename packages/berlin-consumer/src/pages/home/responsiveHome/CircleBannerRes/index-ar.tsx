import { useTranslation } from 'react-i18next';
import css from '../../HomePageStyle.module.scss';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CarouselSlide from '../../../../components/MainCarousel/CarouselSlide';
import CarouselSlideAr from '../../../../components/MainCarousel/CarouselSlide-ar';

const CircleBannerAr = ({ item, id }: any) => {
  const { t } = useTranslation('translation');
  return (
    <>
      <Box className={css.circleBannerRes} py={4}>
        <CarouselSlideAr
          sliderImages={item}
          isCaption={true}
          arrowPosition="top"
          id={id}
          setting={{
            autoPlay: false,
            infinite: true,
            dots: false,
          }}
        />
      </Box>
    </>
  );
};

export default CircleBannerAr;
