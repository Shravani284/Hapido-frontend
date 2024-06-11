import CarouselSlide from '../../../../components/MainCarousel/CarouselSlide';
import CarouselSlideAr from '../../../../components/MainCarousel/CarouselSlide-ar';

const ExclusiveDealsSliderAr = ({ images, title, id }) => {
  return (
    <>
      <div className="exDeals RTLComponent">
        <CarouselSlideAr
          arrowPosition="top"
          sliderImages={images}
          sliderHeading={title}
          id={id}
          setting={{
            rows: 2,
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: false,
            autoplay: false,
            rtl: true,
          }}
        />
      </div>
    </>
  );
};

export default ExclusiveDealsSliderAr;
