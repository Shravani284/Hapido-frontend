import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import css from '../MainCarousel/Slider.module.scss';
import Slider from 'react-slick';
import SliderNextArrow from '../MainCarousel/SliderNextArrow';
import SliderPreArrow from '../MainCarousel/SliderPreArrow';
import { useEffect, useState } from 'react';
import { use } from 'i18next';
import React from 'react';
// import { IPlaceCategoryType } from '../placeCategoryComponent/placeCategory.interface';

type CarouselSlideProps = {
  // sliderImages: IPlaceCategoryType[];
  arrowPosition?: string;
  sliderHeading?: string;
  children: React.ReactNode;
  setting?: any;
};

const TwoRowsSliderAr = ({
  arrowPosition = 'top',
  sliderHeading,
  children,
  setting,
}: CarouselSlideProps) => {
  const childrenArray = React.Children.toArray(children);
  const infinite = childrenArray.length > 4;
  const settings = {
    arrows: true,
    prevArrow: <SliderPreArrow arrowPosition={arrowPosition} />,
    nextArrow: <SliderNextArrow arrowPosition={arrowPosition} />,
    Speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    centerPadding: '0',
    infinite: infinite,
    rows: 2,
    initialSlide: 3,
    // slidesPerRow: 2,
    adaptiveHeight: false,
    rtl: true,
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

export default TwoRowsSliderAr;
