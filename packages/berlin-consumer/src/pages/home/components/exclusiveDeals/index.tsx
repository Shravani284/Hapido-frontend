import CarouselSlide from '../../../../components/MainCarousel/CarouselSlide';

const ExclusiveDealsSlider = ({ images, title, id }) => {
  return (
    <>
      <div className="exDeals">
        <CarouselSlide
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
          }}
        />
      </div>
    </>
  );
};

export default ExclusiveDealsSlider;
