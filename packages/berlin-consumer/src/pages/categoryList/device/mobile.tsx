import CarouselSlide from '../../../components/MainCarousel/CarouselSlide';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import css from '../CategoryList.module.scss';
import GridCards from '../../../components/categoryCard';
import { useEffect, useRef, useState } from 'react';
import {
  allDealsListCategory,
  categoriesSubCategory,
} from '../../../services/HomePageServices';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FilterListDropDownMobile from '../../../components/sortOrSearchproduct/device/mobile';
import { useSelector } from 'react-redux';
import {
  SkeletonBanner,
  SkeletonCategoryBanner,
  SkeletonCategoryBreadCrumbs,
  SkeletonFeatureOnCategoryMob,
  SkeletonSearchList,
} from '../../../components/Skeleton';
import Pagination from '../../../components/Pagination';
import { DealImg } from 'berlin-common';
import BreadCrumbs from '../../../components/breadCrumbs/BreadCrumbs';
import { defaultImg } from '../../../../../data';
import { lang } from '../../../utils/getLang';
import { Breadcrumbs, Link } from '@mui/material';
import { path } from '../../../routes/Routers';
import { viewItemList } from '../../../utils/moEngage';

const CategoryListingMobile = ({ setDescParams }: any) => {
  const prevCategoryList = useRef<any>(null);
  const locations = useLocation();
  const { t, i18n } = useTranslation('translation');
  const [featuredCategoryMob, setFeaturedCategoryMob] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [bannerImageCategory, setBannerImageCategory] = useState([]);
  const [categoryList, setCategoryList] = useState(
    locations?.state?.categoryData || []
  );
  const param = useParams();
  const name = useSelector((state: any) => state?.cityName?.name);
  const [skeletonSearch, setSkeletonSearch] = useState(false);
  const navigate = useNavigate();
  const limit = 8;
  const [page, setPage] = useState(1);
  const [categoryCount, setCategoryCount] = useState(0);
  const [breadcrumbValue, setBreadcrumbValue] = useState<any>();
  const [isSkeleton, setIsSkeleton] = useState(false);
  const [categoryFeatureMob, setCategoryFeatureMob] = useState(false);
  const [categoryBreadCrumbs, setCategoryBreadCrumbs] = useState(false);
  const currentUrl = window.location;

  const handlePrev = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const queryParams = new URLSearchParams(location.search);

  const allQueryParams = {};

  for (const [key, value] of queryParams.entries()) {
    allQueryParams[key] = value;
  }
  const [payload, setPayload] = useState<any>({});

  const handleNext = () => {
    const totalPages = Math.ceil(categoryCount / limit);
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  let paramSlug = param?.subcategory_slug
    ? param?.subcategory_slug
    : param?.category_slug;

  useEffect(() => {
    setIsSkeleton(true);
    setCategoryFeatureMob(true);
    setCategoryBreadCrumbs(true);
    categoriesSubCategory(paramSlug)
      .then((response) => {
        const result = response.data.map((e: any) => {
          return {
            ...e,
            img: e?.images[0]?.extfilepath
              ? e?.images[0]?.extfilepath || DealImg
              : DealImg,
          };
        });
        setFeaturedCategoryMob(result);

        const data = [...result];
        data?.splice(0, 1);
        setCategoryFilter(data);
        setIsSkeleton(false);
        setCategoryFeatureMob(false);
        setCategoryBreadCrumbs(false);
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }, []);

  // Main Category Banner Images
  useEffect(() => {
    if (featuredCategoryMob?.length > 0) {
      const data = featuredCategoryMob.find((e) => e?.slug == paramSlug);
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
  }, [featuredCategoryMob, param]);

  const clearUrlHandler = () => {
    if (param?.subcategory_slug) {
      navigate(`/${lang}/${param?.category_slug}/${param?.subcategory_slug}`);
    } else {
      navigate(`/${lang}/${param?.category_slug}`);
    }
    //         setSkeletonSearch(false);
    //       })
    //       .catch((error) => {
    //         console.log('error', error);
    //       });
    //   }
  };

  const isEqual = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      const val1 = obj1[key];
      const val2 = obj2[key];

      if (typeof val1 === 'object' && typeof val2 === 'object') {
        if (!isEqual(val1, val2)) {
          return false;
        }
      } else if (val1 !== val2) {
        return false;
      }
    }

    return true;
  };

  const getCategoryList = () => {
    const query = allQueryParams && Object.keys(allQueryParams);
    const payloadQuery = Object.keys(payload);
    if (query.length !== payloadQuery.length) return;
    if (!locations?.state?.categoryData) {
      setSkeletonSearch(true);
    }
    setSkeletonSearch(true);
    if (paramSlug) {
      allDealsListCategory(
        'Web',
        payload.categoryid || paramSlug,
        payload,
        name
        // page,
        // limit
      )
        .then((response) => {
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

          // setCategoryCount(response.data.totalCount);
          setSkeletonSearch(false);
          viewItemList(
            {
              items: allList.map((e) => {
                return {
                  ...e,
                  price: e.selling_price,
                };
              }),
              item_list_id: 'category_list',
              item_list_name: 'Category List',
            },

            name,
            'view_item_list'
          );
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  };

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

  // All Deals
  useEffect(() => {
    getCategoryList();
  }, [paramSlug, page, limit, payload]);

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

  return (
    <>
      {isSkeleton ? (
        <SkeletonCategoryBanner />
      ) : (
        <Box
          className={`${css.categorySlider} ${css.categorySliderMob} categorySliderMobSlider`}
        >
          <CarouselSlide
            sliderImages={bannerImageCategory}
            arrowPosition="middle"
            setting={{ dots: true, arrows: false }}
            isClick={false}
          />
        </Box>
      )}
      <Container maxWidth="xl">
        {categoryBreadCrumbs ? (
          <SkeletonCategoryBreadCrumbs />
        ) : (
          <>
            <Box mt={0}>
              <div className={css.offerImage}>

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
            <Box
              // bgcolor={'red'}
              className={css.categoryBreadcrumb}
              fontWeight={400}
            >
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  underline="hover"
                  color="inherit"
                  onClick={() => breadcrumbsRouts(1)}
                >
                  {t('HOME')}
                </Link>
                {param?.subcategory_slug ? (
                  <>
                    <Link
                      underline="hover"
                      color="inherit"
                      onClick={() => breadcrumbsRouts(2)}
                    >
                      {featuredCategoryMob[0]?.label}
                    </Link>
                    <span className="breadcrumbsDivider">/</span>
                    <Link
                      underline="hover"
                      color="inherit"
                      aria-current="page"
                      onClick={() => breadcrumbsRouts(3)}
                    >
                      {breadcrumbValue?.label}
                    </Link>
                  </>
                ) : (
                  <Link
                    underline="hover"
                    color="inherit"
                    onClick={() => breadcrumbsRouts(2)}
                  >
                    {featuredCategoryMob[0]?.label}
                  </Link>
                )}
              </Breadcrumbs>
            </Box>
          </>
        )}
      </Container>

      <Container maxWidth="xl">
        {/* <Box
        // TODO: Don't remove
          display={'flex'}
          className={`${css.catContainer} catContainerScroll ${css.catContainerMob}`}
        >
          {featuredCategoryMob?.map((item, index) => (
            <Box
              key={index}
              className={css.catList}
              onClick={() => featureHandler(item)}
            >
              <Box>
                <img loading="lazy" src={item.img} alt="CategoryImg" />
              </Box>
              <Box className={css.title}>
                <span
                  style={{ color: paramSlug == item?.slug ? 'red' : '#000' }}
                >
                  {item.label}
                </span>
              </Box>
            </Box>
          ))}
        </Box> */}
        <Box className={css.filterList}>
          <FilterListDropDownMobile
            setPayload={setPayload}
            payload={payload}
            allQueryParams={allQueryParams}
            featuredCategoryMob={categoryFilter}
            clearUrlHandler={clearUrlHandler}
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
              handlePrev={handlePrev}
              handleNext={handleNext}
              page={page}
              cartCount={categoryCount}
              itemsPerPage={limit}
        />*/}
          </>
        )}
      </Container>
    </>
  );
};

export default CategoryListingMobile;
