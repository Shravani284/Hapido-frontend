import { Box, Container } from '@mui/material';
import css from '../HomePageStyle.module.scss';
import CarouselSlide from '../../../components/MainCarousel/CarouselSlide';
import PlaceCategoryList from '../components/placeCategoryComponent';
import MobSubCategory from './subCatategory';
import Grid from '@mui/material/Grid';
import travelDeals from '../../../../assets/travelDeals.png';
import { BannerImg, DealImg, ResSecondaryBtn } from 'berlin-common';
import { useTranslation } from 'react-i18next';
import ProductWidgetTwo from './productWidgetTwo';
import { mainBanner, mainFeatured } from '../../../services/HomePageServices';
import { useEffect, useState } from 'react';
import MobCard from '../components/travelDeals/MobCard';
import ResMixBanner from './ResMixbanner';
import CircleBanner from './CircleBannerRes';
import {
  SkeletonBanner,
  SkeletonDoubleColumn,
  SkeletonFeatureList,
  SkeletonSingleColumn,
} from '../../../components/Skeleton';
import { useSelector } from 'react-redux';

const ResponsiveHome = ({ homeLayoutPlacement }: any) => {
  const { t, i18n } = useTranslation('translation');
  const [bannerImage, setBannerImage] = useState([]);
  const [isSkeleton, setIsSkeleton] = useState(false);
  const [isSkeletonFeature, setIsSkeletonFeature] = useState(false);
  const [featured, setFeatured] = useState([]);
  const name = useSelector((state: any) => state?.cityName?.name);

  // Slider Images
  useEffect(() => {
    setIsSkeleton(true);
    mainBanner('HORIZONTAL_FLAT', 'HOME', name)
      .then((response) => {
        setIsSkeleton(false);
        setBannerImage(
          response?.data?.banners.map((e: any) => {
            return {
              ...e,
              // extfilepath: e?.image || BannerImg,
              slug: e.slug,
              dealType: e.target_deal_type,
            };
          })
        );
      })
      .catch((error) => {
        setIsSkeleton(false);
        console.log('error', error);
      });
  }, [name]);

  useEffect(() => {
    setIsSkeletonFeature(true);
    mainFeatured()
      .then((response) => {
        setIsSkeletonFeature(false);
        const result = response.data.map((e: any) => {
          return {
            ...e,
            img: e.images?.extfilepath
              ? e.images?.extfilepath || DealImg
              : DealImg,
          };
        });
        setFeatured(result);
      })
      .catch((error) => {
        setIsSkeletonFeature(false);
        console.log('error', error);
      });
  }, []);

  const getComponent = (item: any) => {
    switch (item?.component) {
      case 'EXCLUSIVE_PROMO':
        return (
          <>
            {item?.images.length > 0 && (
              <Container maxWidth="md">
                <Box mb={6} className="offerSlider mobPromo">
                  <h6 className={css.mobHeading}>{item.placement_title}</h6>
                  <CarouselSlide
                    sliderImages={item?.images}
                    id={item?.id}
                    arrowPosition="middle"
                    setting={{
                      autoPlay: false,
                      infinite: true,
                      dots: true,
                      rows: 2,
                      arrows: false,
                    }}
                  />
                </Box>
              </Container>
            )}
          </>
        );
      case 'FLASH_BANNERS':
        return (
          <>
            {item?.images.length > 0 && (
              <Box
                className={`${css.sliderHomeRes} ${css.mobSlider} flashArrow mobSlider`}
                mb={3}
              >
                <Box pl={2}>
                  <h6 className={css.mobHeading}>{item?.placement_title}</h6>
                </Box>
                <CarouselSlide
                  sliderImages={item?.images}
                  id={item?.id}
                  setting={{ autoplay: false, arrows: true }}
                  arrowPosition="top"
                />
              </Box>
            )}
          </>
        );
      case 'MIXED_BANNER':
        return (
          <>
            {item?.images.length > 0 && (
              <Container maxWidth="md">
                <ResMixBanner data={item} />
              </Container>
            )}
          </>
        );
      case 'DOUBLE_COLUMN_CATEGORY':
        return (
          <>
            <Container maxWidth="md">
              <MobCard item={item} />
            </Container>
          </>
        );
      case 'MEGASALE_BANNER':
        return (
          <Box
            className={`${css.sliderHomeRes} ${css.mobSlider} mobSlider`}
            mb={3}
          >
            {item?.images.length > 0 && (
              <>
                <Box pl={2}>
                  <h6 className={css.mobHeading}>{item?.placement_title}</h6>
                </Box>
                <CarouselSlide
                  sliderImages={item?.images}
                  id={item?.id}
                  setting={{ autoplay: true, Speed: 500, arrows: true }}
                  arrowPosition="middle"
                />
              </>
            )}
          </Box>
        );
      case 'CIRCLE_BANNER':
        return (
          <>
            {item?.images.length > 0 && (
              <Container maxWidth="md" className={css.circleMobBanner}>
                <CircleBanner item={item?.images} id={item?.id} />
              </Container>
            )}
          </>
        );
      case 'SINGLE_COLUMN_CATEGORY':
        return (
          <Container maxWidth="md">
            <Box mb={6}>
              <ProductWidgetTwo
                item={item}
                // isSkeletonFeature={isSkeletonFeature}
              />
            </Box>
          </Container>
        );
      default:
        break;
    }
  };

  return (
    <>
      {/* Main Slider */}
      <Box className={`${css.sliderHome} ${css.mobSlider} mobSlider`}>
        {isSkeleton ? (
          <SkeletonBanner />
        ) : (
          <CarouselSlide
            sliderImages={bannerImage}
            arrowPosition="middle"
            id={1} // Add temporary(Default) id 1
            setting={{
              dots: true,
              arrows: false,
            }}
          />
        )}
      </Box>
      <Container maxWidth="md">
        {isSkeletonFeature ? (
          <>
            <SkeletonFeatureList />
            <SkeletonFeatureList />
          </>
        ) : (
          <>
            <Box>
              <PlaceCategoryList PlaceCategoryJson={featured} />
            </Box>
          </>
        )}
        <Box id={'GoTop'}>
          <MobSubCategory />
        </Box>
      </Container>
      <>
        {Object.keys(homeLayoutPlacement)?.map(
          (item) =>
            Object.keys(homeLayoutPlacement[item])?.map((data) =>
              getComponent(homeLayoutPlacement[item][data])
            )
        )}
      </>
    </>
  );
};

export default ResponsiveHome;
