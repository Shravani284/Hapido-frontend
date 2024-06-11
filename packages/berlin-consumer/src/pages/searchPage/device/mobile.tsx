import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import css from '../searchList.module.scss';
import GridCards from '../../../components/categoryCard';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import FilterListDropDownMobile from '../../../components/sortOrSearchproduct/device/mobile';
import { useSelector } from 'react-redux';
import { searchList } from '../../../services/seachlistService';
import { SkeletonSearchList } from '../../../components/Skeleton';
import { lang } from '../../../utils/getLang';
import { homePageCategoryList } from '../../../services/HomePageServices';
import { mSearch } from '../../../utils/moEngage';

const SearchListingMobile = () => {
  const { t, i18n } = useTranslation('translation');
  const locations = useLocation();
  const [categoryList, setCategoryList] = useState(
    locations?.state?.categoryData || []
  );
  const [filterCategory, setFilterCategory] = useState([]);
  const name = useSelector((state: any) => state?.cityName?.name);
  const [payload, setPayload] = useState<any>({});
  const [searchParams] = useSearchParams();
  const search = searchParams.get('q');
  const [skeletonSearch, setSkeletonSearch] = useState(false);
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentCity = useSelector((state: any) => state?.cityName?.name);
  const allQueryParams = {};
  const currentUrl = window.location;

  for (const [key, value] of queryParams.entries()) {
    allQueryParams[key] = value;
  }
  // Filter Category
  useEffect(() => {
    homePageCategoryList()
      .then((response) => {
        setFilterCategory(response?.data?.category);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const clearUrlHandler = () => {
    navigate(`/${lang}/search?q=${search}`);
  };

  const filterSubmitHandler = () => {
    const payloadData: any = { ...payload };
    payloadData.q = search;
    const query = allQueryParams && Object.keys(allQueryParams);
    const payloadQuery = Object.keys(payloadData);
    if (query.length !== payloadQuery.length) return;
    if (!locations?.state?.categoryData) {
      setSkeletonSearch(true);
    }
    setSkeletonSearch(true);
    searchList(search, payload, name, payload.category)
      .then((response) => {
        setSkeletonSearch(false);
        const allList = response.data?.filterDeals?.filter((deal) => {
          if (
            deal.selling_price <= 0
          ) {
            return false; // Ignore this item
          }
          return true; // Include this item in the filtered data
        });
        setCategoryList(allList);
        navigate(`${currentUrl.pathname}${currentUrl.search}`, {
          replace: true,
          state: { categoryData: allList },
        });
      })
      .catch((error) => {
        console.log('error', error);
        setSkeletonSearch(false);
      });
  };

  useEffect(() => {
    const data: any = { ...allQueryParams };
    if (data?.price) {
      data.price = data?.price?.split(',');
    }
    if (data.slotenabled == 'true') {
      data.slotenabled = true;
    }
    delete data.q;
    Object.keys(data).length > 0 && setPayload(data);
  }, []);

  // All Deals
  useEffect(() => {
    filterSubmitHandler();
    mSearch(search, currentCity);
  }, [search, payload]);

  useEffect(() => {
    navigate(`${currentUrl.pathname}${currentUrl.search}`, {
      replace: true,
      state: { categoryData: null },
    });
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <Box className={css.filterList}>
          <FilterListDropDownMobile
            setPayload={setPayload}
            payload={payload}
            clearUrlHandler={clearUrlHandler}
            allQueryParams={allQueryParams}
            featuredCategoryMob={filterCategory}
          />
        </Box>
        {skeletonSearch ? (
          <SkeletonSearchList />
        ) : (
          <GridCards
            categoryList={categoryList}
            primaryCat="Search"
            subCategory=""
          />
        )}
      </Container>
    </>
  );
};

export default SearchListingMobile;
