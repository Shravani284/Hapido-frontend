import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import css from '../searchList.module.scss';
import GridCards from '../../../components/categoryCard';
import FilterListDropDown from '../../../components/sortOrSearchproduct/device/FilterList';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { searchList } from '../../../services/seachlistService';
import { SkeletonSearchList } from '../../../components/Skeleton';
import { lang } from '../../../utils/getLang';
import { mSearch } from '../../../utils/moEngage';

const SearchListingWeb = () => {
  const { i18n } = useTranslation('translation');
  const locations = useLocation();
  const [categoryList, setCategoryList] = useState(
    locations?.state?.categoryData || []
  );
  // const [prevSearchParams, setPrevSearchParams] = useState({});

  const [skeletonSearch, setSkeletonSearch] = useState(false);
  const name = useSelector((state: any) => state?.cityName?.name);
  const currentCity = useSelector((state: any) => state?.cityName?.name);
  const [payload, setPayload] = useState({});
  const [searchParams] = useSearchParams();
  const search = searchParams.get('q');
  const navigate = useNavigate();
  const allQueryParams = {};
  const queryParams = new URLSearchParams(location.search);
  const currentUrl = window.location;
  for (const [key, value] of queryParams.entries()) {
    allQueryParams[key] = value;
  }

  // All Deals List
  useEffect(() => {
    const payloadData: any = { ...payload };
    payloadData.q = search;
    const query = allQueryParams && Object.keys(allQueryParams);
    const payloadQuery = Object.keys(payloadData);
    if (query.length !== payloadQuery.length) return;
    if (!locations?.state?.categoryData) {
      setSkeletonSearch(true);
    }
    setSkeletonSearch(true);
    searchList(search, payloadData, name)
      .then((response) => {
        setSkeletonSearch(false);
        mSearch(search, currentCity);
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
        setSkeletonSearch(false);
        console.log('error', error);
      });
    // setPrevSearchParams({ ...payloadData });
  }, [search, payload]);
  useEffect(() => {
    const data: any = { ...allQueryParams };
    if (data?.price) {
      data.price = data.price.split(',');
    }
    if (data?.slotenabled == 'true') {
      data.slotenabled = true;
    }
    delete data.q;
    Object.keys(data).length > 0 && setPayload(data);
  }, []);

  useEffect(() => {
    navigate(`${currentUrl.pathname}${currentUrl.search}`, {
      replace: true,
      state: { categoryData: null },
    });
  }, []);

  function ResetHandler() {
    setPayload({});
    navigate(`/${lang}/search?q=${search}`);
  }

  return (
    <>
      <Container maxWidth="xl">
        <Box pt={'40px'} className={css.filterList}>
          <FilterListDropDown
            setPayload={setPayload}
            payload={payload}
            ResetHandler={ResetHandler}
            allQueryParams={allQueryParams}
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

export default SearchListingWeb;
