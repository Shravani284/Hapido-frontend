import SliderPreArrow from '../../../../components/MainCarousel/SliderPreArrow';
import SliderNextArrow from '../../../../components/MainCarousel/SliderNextArrow';
import travelDeals from '../../../../../assets/travelDeals.png';
import Slider from 'react-slick';
import CategoryCard from '../../../../components/categoryCard/CategoryCard';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { categoriesById } from '../../../../services/HomePageServices';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  SkeletonColumnTitle,
  SkeletonSingleColumn,
} from '../../../../components/Skeleton';

const ProductWidgetTwoAr = ({ item }: any) => {
  const [singleColumnList, setSingleColumnList] = useState([]);
  const { t, i18n } = useTranslation('translation');
  const name = useSelector((state: any) => state?.cityName?.name);
  const [isSkeletonFeature, setIsSkeletonFeature] = useState(false);

  useEffect(() => {
    setIsSkeletonFeature(true);
    categoriesById(item?.id, name)
      .then((response) => {
        setSingleColumnList(response?.data?.allDeals);
        setIsSkeletonFeature(false);
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }, [name]);

  const settings = {
    arrows: false,
    prevArrow: <SliderPreArrow arrowPosition={'top'} />,
    nextArrow: <SliderNextArrow arrowPosition={'top'} />,
    infinite: false,
    dots: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    Speed: 50000,
  };

  return (
    <>
      {/* {singleColumnList?.length > 0 && ( */}
      <div className="offerSlider">
        {isSkeletonFeature ? (
          <SkeletonColumnTitle />
        ) : (
          <Box fontWeight={'bold'} mb={2}>
            {item?.label}
          </Box>
        )}

        <Slider {...settings}>
          {singleColumnList?.map((items, index) => {
            return (
              <Grid key={index} pr={2}>
                {isSkeletonFeature ? (
                  <SkeletonSingleColumn />
                ) : (
                  <CategoryCard
                    image={items?.images[0]?.extfilepath}
                    newTag={'New'}
                    destinationName={items?.title_label}
                    offerAd={items?.tagline_label}
                    offerPrice={items?.selling_price}
                    offPercent={items?.discount_percentage}
                    orgPrice={items?.old_price}
                    numRating={item?.rating || 0}
                    // soldPackages={
                    //   items?.initial_bought_count > 0
                    //     ? items?.initial_bought_count + items?.sold_count || '0'
                    //     : items?.sold_count || '0'
                    // }
                    soldPackages={
                      items?.sold_count_deal > 0 ? items?.sold_count_deal : '0'
                    }
                    locationName={
                      items?.dealArea?.map((i: any) => i?.text)?.join(', ') ||
                      ''
                    }
                    slug={items?.slug}
                    dealType={items?.deal_type}
                    id={items?.id}
                  />
                )}
              </Grid>
            );
          })}
        </Slider>
      </div>
      {/* // )} */}
    </>
  );
};

export default ProductWidgetTwoAr;
