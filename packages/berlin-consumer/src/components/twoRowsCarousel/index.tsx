import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import css from '../MainCarousel/Slider.module.scss';
import Slider from 'react-slick';
import SliderNextArrow from '../MainCarousel/SliderNextArrow';
import SliderPreArrow from '../MainCarousel/SliderPreArrow';
// import { IPlaceCategoryType } from '../placeCategoryComponent/placeCategory.interface';

type CarouselSlideProps = {
  // sliderImages: IPlaceCategoryType[];
  arrowPosition?: string;
  sliderHeading?: string;
  children: React.ReactNode;
  setting?: any;
};

const TwoRowsSlider = ({
  arrowPosition = 'top',
  sliderHeading,
  children,
  setting,
}: CarouselSlideProps) => {
  const settings = {
    arrows: true,
    prevArrow: <SliderPreArrow arrowPosition={arrowPosition} />,
    nextArrow: <SliderNextArrow arrowPosition={arrowPosition} />,
    Speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    centerPadding: '0',
    infinite: false,
    rows: 2,
    adaptiveHeight: true,
    ...setting,
  };
  return (
    <div className="twoRow">
      {sliderHeading && <h6 className={css.sliderTitle}>{sliderHeading}</h6>}
      <Slider {...settings} className={css.sliderNested}>
        {children}
      </Slider>
    </div>
  );
};

export default TwoRowsSlider;
