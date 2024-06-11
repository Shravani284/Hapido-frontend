import { Box, Container } from '@mui/material';
import css from '../HomePageStyle.module.scss';
import Grid from '@mui/material/Grid';
import travelDeals from '../../../../assets/travelDeals.png';
import { BannerImg, DealImg, ResSecondaryBtn } from 'berlin-common';
import { useTranslation } from 'react-i18next';
import { mainBanner, mainFeatured } from '../../../services/HomePageServices';
import { useEffect, useState } from 'react';
import MobCard from '../components/travelDeals/MobCard';
import {
  SkeletonBanner,
  SkeletonDoubleColumn,
  SkeletonFeatureList,
  SkeletonSingleColumn,
} from '../../../components/Skeleton';
import { useSelector } from 'react-redux';
import CircleBannerAr from './CircleBannerRes/index-ar';
import ProductWidgetTwoAr from './productWidgetTwo/index-ar';
import ResMixBannerAr from './ResMixbanner/index-ar';
import MobSubCategoryAr from './subCatategory/index-ar';
import MobCardAr from '../components/travelDeals/MobCard-ar';
import PlaceCategoryListAr from '../components/placeCategoryComponent/index-ar';
import CarouselSlideAr from '../../../components/MainCarousel/CarouselSlide-ar';

const ResponsiveHomeAr = ({ homeLayoutPlacement }: any) => {
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
                  <CarouselSlideAr
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
                className={`${css.sliderHomeRes} ${css.mobSlider} mobSlider RtlflashArrow`}
                mb={3}
              >
                <Box pl={2}>
                  <h6 className={css.mobHeading}>{item?.placement_title}</h6>
                </Box>
                <CarouselSlideAr
                  sliderImages={item?.images}
                  id={item?.id}
                  setting={{ autoplay: false, arrows: true, infinite: false }}
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
                <ResMixBannerAr data={item} />
              </Container>
            )}
          </>
        );
      case 'DOUBLE_COLUMN_CATEGORY':
        return (
          <>
            <Container maxWidth="md">
              <MobCardAr item={item} />
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
                <CarouselSlideAr
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
                <CircleBannerAr item={item?.images} id={item?.id} />
              </Container>
            )}
          </>
        );
      case 'SINGLE_COLUMN_CATEGORY':
        return (
          <Container maxWidth="md">
            <Box mb={6}>
              <ProductWidgetTwoAr
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
          <CarouselSlideAr
            sliderImages={bannerImage}
            arrowPosition="middle"
            id={1} // Add temporary(Default) id 1
            setting={{
              dots: true,
              arrows: false,
              infinite: false,
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
              <PlaceCategoryListAr PlaceCategoryJson={featured} />
            </Box>
          </>
        )}
        <Box id={'GoTop'}>
          <MobSubCategoryAr />
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

export default ResponsiveHomeAr;
