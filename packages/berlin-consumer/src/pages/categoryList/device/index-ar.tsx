import CarouselSlide from '../../../components/MainCarousel/CarouselSlide';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import css from '../CategoryList.module.scss';
import { useEffect, useState } from 'react';
import {
  allDealsListCategory,
  categoriesSubCategory,
  mainBanner,
  mainFeatured,
} from '../../../services/HomePageServices';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FilterListDropDown from '../../../components/sortOrSearchproduct/device/FilterList';
import {
  SkeletonCategoryBanner,
  SkeletonFeatureOnCategory,
  SkeletonSearchList,
} from '../../../components/Skeleton';
import GridCards from '../../../components/categoryCard';
import { useSelector } from 'react-redux';
import Pagination from '../../../components/Pagination';
import { DealImg, useReplace } from 'berlin-common';
import { defaultImg } from '../../../../../data';
import { lang } from '../../../utils/getLang';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { path } from '../../../routes/Routers';
import HeaderAr from '../../../components/header/Header-ar';
import { viewItemList } from '../../../utils/moEngage';
import CarouselSlideAr from '../../../components/MainCarousel/CarouselSlide-ar';

const CategoryListingWebAr = ({ setDescParams }: any) => {
  const locations = useLocation();
  const { t, i18n } = useTranslation('translation');
  const [featuredCategory, setFeaturedCategory] = useState([]);
  const [bannerImageCategory, setBannerImageCategory] = useState([]);
  const [categoryList, setCategoryList] = useState(
    locations?.state?.categoryData || []
  );
  const name = useSelector((state: any) => state?.cityName?.name);
  const param = useParams();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [payload, setPayload] = useState({});
  const [categoryBanner, setCategoryBanner] = useState(false);
  const [categoryFeature, setCategoryFeature] = useState(false);
  const [skeletonSearch, setSkeletonSearch] = useState(false);
  const limit = 8;
  const [page, setPage] = useState(1);
  const [categoryCount, setCategoryCount] = useState(0);
  const [breadcrumbValue, setBreadcrumbValue] = useState<any>();
  const [reset, setReset] = useState(false);
  const currentUrl = window.location;
  const allQueryParams = {};
  for (const [key, value] of queryParams.entries()) {
    allQueryParams[key] = value;
  }
  // TODO: Pagination code Don't remove
  // const handlePrev = () => {
  //   setPage((prevPage) => Math.max(prevPage - 1, 1));
  // };

  // TODO: Pagination code Don't remove
  // const handleNext = () => {
  //   const totalPages = Math.ceil(categoryCount / limit);
  //   setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  // };

  let paramSlug = param?.subcategory_slug
    ? param?.subcategory_slug
    : param?.category_slug;

  // Main Category Banner Images
  useEffect(() => {
    if (featuredCategory?.length > 0) {
      const data = featuredCategory.find((e) => e?.slug == paramSlug);
      setBreadcrumbValue(data);
      let removedImage = false;
      const media = data?.media?.filter((item) => {
        if (!removedImage && item?.type === 'image') {
          removedImage = true;
          return false;
        }
        return true;
      });
      setBannerImageCategory(media?.length > 0 ? media : []);
    }
  }, [featuredCategory, param]);

  // IS Features

  useEffect(() => {
    setCategoryFeature(true);
    setCategoryBanner(true);
    categoriesSubCategory(paramSlug)
      .then((response) => {
        setCategoryFeature(false);
        setCategoryBanner(false);
        const result = response.data.map((e: any) => {
          return {
            ...e,
            img: e?.images[0]?.extfilepath
              ? e?.images[0]?.extfilepath || DealImg
              : DealImg,
          };
        });
        setFeaturedCategory(result);
      })
      .catch((error) => {
        setCategoryFeature(false);
        setCategoryBanner(false);
        console.log(error, 'error');
      });
  }, []);

  // All Deals List
  useEffect(() => {
    const query = allQueryParams && Object.keys(allQueryParams);
    const payloadQuery = Object.keys(payload);
    if (query.length !== payloadQuery.length) return;

    if (!locations?.state?.categoryData) {
      setSkeletonSearch(true);
    }
    if (paramSlug) {
      allDealsListCategory(
        'Web',
        paramSlug,
        payload,
        name
        // page,
        // limit
      )
        .then((response) => {
          setSkeletonSearch(false);
          const allCategories = [...response?.data?.allDeals];
          const allList = allCategories?.map((e) => {
            return {
              ...e,
              images: e?.image_paths
                ? e?.image_paths?.split(',')?.map((item) => {
                    return { extfilepath: item };
                  })
                : [],
              dealArea: e?.area_text
                ? e?.area_text?.split(',')?.map((item) => {
                    return { text: item };
                  })
                : [],
              // selling_price: e?.selling_price
              //   ? e?.selling_price
              //   : e?.display_selling_price,
              // old_price: e?.old_price ? e?.old_price : e?.display_old_price,
              // sold_count_deal: e?.sold_count,
            };
          });

          setCategoryList(allList);
          navigate(`${currentUrl.pathname}${currentUrl.search}`, {
            replace: true,
            state: { categoryData: allList },
          });

          viewItemList(
            {
              items: allList.map((e) => {
                return {
                  ...e,
                  price: e.selling_price,
                  item_list_id: 'category_list',
                  item_list_name: 'Category List',
                };
              }),
              item_list_id: 'category_list',
              item_list_name: 'Category List',
            },

            name,
            'view_item_list'
          );
          // setCategoryCount(response.data.totalCount);
        })
        .catch((error) => {
          setSkeletonSearch(false);
          console.log('error', error);
        });
    }
  }, [paramSlug, payload, page, limit]);

  // Reset Filter
  function ResetHandler() {
    setPayload({});
    // navigate(`/categoryList/${param.id}`);
    param?.subcategory_slug
      ? navigate(`/${lang}/${param?.category_slug}/${param?.subcategory_slug}`)
      : navigate(`/${lang}/${param?.category_slug}`);
  }
  useEffect(() => {
    const data: any = { ...allQueryParams };
    if (data?.price) {
      data.price = data.price.split(',');
    }
    if (data.slotenabled == 'true') {
      data.slotenabled = true;
    }
    Object.keys(data).length > 0 && setPayload(data);
  }, [paramSlug]);

  // Category Description
  // useEffect(() => {
  //   if (paramSlug) setDescParams(paramSlug);
  // }, [param]);
  useEffect(() => {
    navigate(`${currentUrl.pathname}${currentUrl.search}`, {
      replace: true,
      state: { categoryData: null },
    });
  }, []);

  const featureHandler = (item) => {
    if (item?.primary === true) {
      navigate(`/${lang}/${item?.slug}`);
      setPage(1);
    } else {
      navigate(`/${lang}/${item?.primarySlug}/${item?.slug}`);
      setPage(1);
    }
  };
  const breadcrumbsRouts = (e) => {
    if (e == 1) {
      navigate(`/${lang}/`);
    } else if (e == 2) {
      navigate(`/${lang}/${param?.category_slug}`);
    }
  };

  const resetHandlerHeader = () => {
    setPayload({});
    setReset(true);
  };
  return (
    <>
      <HeaderAr ResetHandler={() => resetHandlerHeader()} />
      <Container maxWidth="xl">
        <Box mt={0}>
          <div className={`${css.offerImage} `}>
            <a href={`/${lang}/static/mobile-app`} target="_blank">
              <img
                loading="lazy"
                src={
                  'https://cdn.hapido.com/onsite-banners/sale/discount-coupon/flat10/1152x135-desktop-banner.jpg'
                }
                alt={t('HAPIDO')}
              />
            </a>
          </div>
        </Box>
        <Box mt={1} className={`${css.categoryBreadcrumb} RTLComponent`}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              onClick={() => breadcrumbsRouts(1)}
            >
              {t('HOME')}
            </Link>
            {param?.category_slug && (
              <Link
                underline="hover"
                color="inherit"
                onClick={() => breadcrumbsRouts(2)}
              >
                {useReplace(param.category_slug)}
              </Link>
            )}
            {param?.subcategory_slug && (
              <Link
                underline="hover"
                color="text.primary"
                aria-current="page"
                onClick={() => breadcrumbsRouts(3)}
              >
                {breadcrumbValue?.label}
              </Link>
            )}
          </Breadcrumbs>
        </Box>
        <Box className={`${css.categorySlider} RTLComponent`}>
          {categoryBanner ? (
            <SkeletonCategoryBanner />
          ) : (
            <CarouselSlideAr
              sliderImages={bannerImageCategory}
              arrowPosition="middle"
              isClick={false}
            />
          )}
        </Box>
        {/* {categoryFeature ? (
        // TODO: CategoryFeature List code Don't remove
          <SkeletonFeatureOnCategory />
        ) : (
          <Box
            display={'flex'}
            className={`${css.catContainer} catContainerScroll`}
          >
            {featuredCategory?.map((item, index) => (
              <Box
                key={index}
                className={css.catList}
                onClick={() => featureHandler(item)}
              >
                <Box>
                  <img loading="lazy" src={item.img} alt="CategoryImg" />
                </Box>
                <Box
                  sx={{
                    color: paramSlug == item?.slug ? 'red' : '#000',
                    textAlign: 'center',
                    wordBreak: 'break',
                    fontWeight: 600,
                    marginBottom: '10px',
                  }}
                >
                  {item.label}
                </Box>
              </Box>
            ))}
          </Box>
        )} */}
        <Box className={css.filterList}>
          <FilterListDropDown
            setPayload={setPayload}
            payload={payload}
            ResetHandler={ResetHandler}
            allQueryParams={allQueryParams}
            resetData={reset}
            setReset={setReset}
          />
        </Box>
        {skeletonSearch ? (
          <SkeletonSearchList />
        ) : (
          <>
            <GridCards
              categoryList={categoryList}
              primaryCat={param?.category_slug}
              subCategory={param?.subcategory_slug}
            />
            {/* <Pagination
            // TODO: Pagination code Don't remove
              handlePrev={handlePrev}
              handleNext={handleNext}
              page={page}
              cartCount={categoryCount}
              itemsPerPage={limit}
            /> */}
          </>
        )}
      </Container>
    </>
  );
};

export default CategoryListingWebAr;
