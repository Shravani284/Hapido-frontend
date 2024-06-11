import Box from '@mui/material/Box';
import SortOrSearch from '../SortOrSearch';
import css from '../SortOrSearchproduct.module.scss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Rating, Typography } from '@mui/material';
import sort from '../../../../assets/sort.svg';
import Slider from '@mui/material/Slider';
import { allTagList } from '../../../services/ProductDetailServices';
import { useSelector } from 'react-redux';
import { PrimaryButton, useDebounce } from 'berlin-common';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { localeLang } from '../../../utils/getLang';

const FilterListDropDown = ({
  setPayload,
  payload,
  ResetHandler,
  allQueryParams,
  resetData,
  setReset,
}: any) => {
  const [openClose, setOpenClose] = useState<boolean>(false);
  const [openCloseSort, setOpenCloseSort] = useState<boolean>(false);
  const [openClosePrise, setOpenClosePrise] = useState<boolean>(false);
  const { t, i18n } = useTranslation('translation');
  const [distance, setDistance] = useState<any>();
  const [rating, setRating] = useState<string>();
  const [sortListItem, setSortListItem] = useState<any>('');
  const [selectdHighlights, setSelectedHighlights] = useState([]);
  const [value, setValue] = useState<number[]>([0, 2000]);
  const [allHeighLightTag, setAllHeighLightTag] = useState([]);
  const [isBookOnline, setIsBookOnline] = useState(false);
  const { addresses } = useSelector((state: any) => state.login);
  const debouncedPrice = useDebounce(value, 2000);
  const debouncedHighligths = useDebounce(selectdHighlights, 2000);
  const [firstLoad, setFirstLoad] = useState(false);
  const [sortName, setSortName] = useState<any>(null);
  const locationUrl = useLocation();
  const [localLang, setLocalLang] = useState('en');
  // const [searchParams, setQueryParam] = useSearchParams();
  const { setQueryParam } = useQueryParam();
  // price
  const handleChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setValue(newValue);
    }
    // setValue(newValue as number[]);
    // setPayload({ ...payload, price: newValue });
  };

  useEffect(() => {
    setFirstLoad(true);
    if (!firstLoad) return;
    setPayload({ ...payload, price: value });
    setQueryParam('price', value.join(','));
  }, [debouncedPrice]);
  useEffect(() => {
    setFirstLoad(true);
    if (!firstLoad) return;
    const data = { ...payload, highlights: selectdHighlights };
    selectdHighlights.length === 0 && delete data.highlights;

    setPayload(data);
    setQueryParam('highlights', selectdHighlights.join(','));
  }, [debouncedHighligths]);

  // Rating

  const selectRating = (e: string) => {
    setRating(e);
    setPayload({ ...payload, rating: e });
    setQueryParam('rating', e);
    setTimeout(() => {
      setOpenClose(false);
    }, 200);
  };

  const bookOnlineHandler = () => {
    setIsBookOnline(!isBookOnline);
    if (locationUrl.pathname.includes('/search')) return;
    setPayload({ ...payload, slotenabled: !isBookOnline });
    setQueryParam('slotenabled', (!isBookOnline).toString());
  };

  useEffect(() => {
    allTagList()
      .then((response) => setAllHeighLightTag(response.data.allTags))
      .catch((error) => console.log('error', error));
  }, []);

  const sortItem = [
    { label: t('PRICE_LOW_HIGH'), tag: 'lowPrice', value: 1 },
    { label: t('PRICE_HIGH_LOW'), tag: 'highPrice', value: 2 },
    //TODO
    // { label: t('DISTANCE'), tag: 'Distance', value: 3 },
    { label: t('RATING'), tag: 'rating', value: 4 },
    { label: t('RECENTLY_ADDED'), tag: 'latest', value: 5 },
  ];

  const Distance = [
    { label: t('WITHIN1'), value: 1 },
    { label: t('WITHIN5'), value: 2 },
    { label: t('WITHIN10'), value: 3 },
    { label: t('WITHIN20'), value: 4 },
    { label: t('WITHIN50'), value: 5 },
  ];

  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setOpenClosePrise(false);
        setOpenCloseSort(false);
        setOpenClose(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const sortedItem = (e: any) => {
    setSortListItem(e?.tag);
    setPayload({ ...payload, sort: e?.tag });
    setSortName(e?.label);
    setQueryParam('sort', e?.tag);

    setTimeout(() => {
      setOpenCloseSort(false);
    }, 200);
  };

  const location = useMemo(() => {
    if (addresses?.length > 0) {
      let primaryAddress = addresses?.find(
        (item: any) => item?.is_primary == true
      );
      let cordinate: any = primaryAddress
        ? primaryAddress.coordinates?.split(',') || ['', '']
        : addresses[0].coordinates?.split(',') || ['', ''];
      return cordinate;
    } else {
      return false;
    }
  }, [addresses]);

  useEffect(() => {
    let distance: any = allQueryParams?.distance;
    if (allQueryParams?.price) {
      setValue(allQueryParams?.price?.split(','));
      setFirstLoad(false);
    }
    if (distance) setDistance(+distance);
    if (allQueryParams?.highlights) {
      setSelectedHighlights(allQueryParams?.highlights?.split(','));
      setFirstLoad(false);
    }
    if (allQueryParams?.rating) selectRating(allQueryParams?.rating);
    if (allQueryParams?.sort) setSortName(allQueryParams?.sort);
    if (allQueryParams.slotenabled == 'true') {
      setIsBookOnline(true);
    }
  }, []);

  const reset = () => {
    ResetHandler();
    setValue([0, 2000]);
    setDistance(null);
    setSelectedHighlights([]);
    setRating(null);
    setIsBookOnline(false);
    setSortListItem('');
    setPayload({});
    setFirstLoad(false);
    setSortName(null);
  };

  useEffect(() => {
    if (resetData) {
      reset();
      setReset(false);
    }
  }, [resetData]);

  return (
    <>
      {/* <Box className={css.filterTitle} paddingTop={'40px'} fontSize={'24px'}>
        {t('MAKE_YOUR_OWN_DEAL')}
      </Box> */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={'70px'}
        className={`RTLComponent`}
      >
        <Box display="flex" alignItems="center">
          {/* Price */}
          <Box className={`${css.dropDown}`} marginRight="20px">
            <Box
              className={css.mainDropDown}
              onClick={() => setOpenClosePrise(!openClosePrise)}
            >
              <Box className={css.dropDownLabel}>{t('PRICE')}</Box>
              {openClosePrise ? <KeyboardArrowUpIcon /> : <ExpandMoreIcon />}
            </Box>
            {openClosePrise ? (
              <Box className={`${css.openDropDown} ${css.price}`} ref={divRef}>
                <Typography variant="subtitle1" className={css.subtitle1}>
                  {t('PRICE_RANGE')}
                </Typography>
                <Typography variant="h6">
                  {t('USE_SLIDER_OR_ENTER_MIN_AND_MAX_PRICE')}
                </Typography>
                <Box
                  display={'flex'}
                  justifyContent={'space-around'}
                  className={css.minmaxPrise}
                >
                  <Box display={'flex'} alignItems={'center'}>
                    <div className={css.labelMinMax}>{t('MIN')}</div>
                    <input
                      placeholder="Aed 00"
                      className={css.aedButton}
                      value={`AED ${value[0]}`}
                      onChange={(e: any) => {
                        const inputValue = e.target.value;
                        const numericValue = parseFloat(
                          inputValue.replace(/[^0-9.]/g, '')
                        );
                        if (!isNaN(numericValue)) {
                          const price = [numericValue, value[1]];
                          setValue(price);
                          setPayload({ ...payload, price: price });
                        }
                      }}
                    />
                  </Box>
                  <Box display={'flex'} alignItems={'center'}>
                    <div className={css.labelMinMax}>{t('MAX')}</div>
                    <input
                      className={css.aedButton}
                      value={`AED ${value[1]}`}
                      onChange={(e: any) => {
                        const inputValue = e.target.value;
                        const numericValue = parseFloat(
                          inputValue.replace(/[^0-9.]/g, '')
                        );
                        if (!isNaN(numericValue)) {
                          const price = [value[0], numericValue];
                          setValue(price);
                          setPayload({ ...payload, price: price });
                        }
                      }}
                    />
                  </Box>
                </Box>
                <Box className="prizeRange">
                  <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    color="secondary"
                    className={css.rangeSlider}
                    max={2000}
                  />
                </Box>
              </Box>
            ) : null}
          </Box>
          {/* distance */}

          {/* {addresses?.length > 0 && (
          // TODO: Don't remove Deffer item
            <div>
              <SortOrSearch
                DataList={Distance}
                label={t('DISTANCE')}
                type="radio"
                selectHandler={(e: any) => {
                  setDistance(e);
                  setPayload({
                    ...payload,
                    distance: e,
                    latitude: location[0],
                    langitude: location[1],
                  });
                }}
                value={distance}
              />
            </div>
          )} */}
          {/* Highlight */}
          <div>
            <SortOrSearch
              DataList={allHeighLightTag}
              label={t('HIGHLIGHT')}
              type="checkbox"
              selectHandler={(e: any) => {
                setSelectedHighlights(e);
              }}
              value={selectdHighlights}
            />
          </div>
          {/* Rating */}
          <Box className={css.dropDown}>
            <Box
              className={css.mainDropDown}
              onClick={() => setOpenClose(!openClose)}
            >
              <Box className={css.dropDownLabel}>{t('RATING')}</Box>
              {openClose ? <KeyboardArrowUpIcon /> : <ExpandMoreIcon />}
            </Box>
            {openClose ? (
              <Box
                className={`${css.openDropDown} ${css.ratingDropDown} RTLRatingDropDown`}
                ref={divRef}
              >
                <div>
                  <input
                    type="radio"
                    value={'1'}
                    name="catagories"
                    id="rating"
                    onChange={(e) => selectRating(e.target.value)}
                    checked={rating === '1'}
                  />
                  <label
                    className={`${css.listLabel} RTLListLabel`}
                    htmlFor="rating"
                  >
                    <Rating name="text-feedback" value={1} max={1} readOnly />
                    <span className={css.ratingText}>{t('1UP')}</span>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    value={'2'}
                    // value={t('2UP')}
                    name="catagories"
                    id="rating2"
                    onChange={(e) => selectRating(e.target.value)}
                    checked={rating === '2'}
                  />
                  <label
                    className={`${css.listLabel} RTLListLabel`}
                    htmlFor="rating2"
                  >
                    <Rating name="text-feedback" value={2} max={2} readOnly />
                    <span className={css.ratingText}>{t('2UP')}</span>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    value={'3'}
                    name="catagories"
                    id="rating3"
                    onChange={(e) => selectRating(e.target.value)}
                    checked={rating === '3'}
                  />
                  <label
                    className={`${css.listLabel} RTLListLabel`}
                    htmlFor="rating3"
                  >
                    <Rating name="text-feedback" value={3} max={3} readOnly />
                    <span className={css.ratingText}>{t('3UP')}</span>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    value={'4'}
                    name="catagories"
                    id="rating4"
                    onChange={(e) => selectRating(e.target.value)}
                    checked={rating === '4'}
                  />
                  <label
                    className={`${css.listLabel} RTLListLabel`}
                    htmlFor="rating4"
                  >
                    <Rating name="text-feedback" value={4} max={4} readOnly />
                    <span className={css.ratingText}>{t('4UP')}</span>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    value={'5'}
                    name="catagories"
                    id="rating5"
                    onChange={(e) => selectRating(e.target.value)}
                    checked={rating === '5'}
                  />
                  <label
                    className={`${css.listLabel} RTLListLabel`}
                    htmlFor="rating5"
                  >
                    <Rating name="text-feedback" value={5} max={5} readOnly />
                    <span className={css.ratingText}>{t('5UP')}</span>
                  </label>
                </div>
              </Box>
            ) : null}
          </Box>
          {/* Book Online */}
          <Box className={css.dropDown}>
            <Box
              className={css.mainDropDown}
              onClick={() => bookOnlineHandler()}
            >
              <Box
                style={{ color: isBookOnline == true && 'red' }}
                className={css.dropDownLabel}
              >
                {t('BOOK_ONLINE')}
              </Box>
            </Box>
          </Box>
          <Box className={css.resetBtn} onClick={reset}>
            {Object?.keys(payload)?.length > 0 &&
              // <PrimaryButton label={'Reset'}  />
              t(`RESET`)}
          </Box>
        </Box>
        {/* Sort Items */}
        <Box className={css.dropDown} marginRight="20px">
          <Box
            className={css.dropDownsort}
            onClick={() => setOpenCloseSort(!openCloseSort)}
          >
            <Box className={`${css.dropDownLabel} `}>
              <img
                loading="lazy"
                src={sort}
                alt={t(`SORTICON`)}
                className={`${css.sortIcon} RTLsortIcon`}
              />
              {sortName ? sortName : t('SORT_BY')}
            </Box>
            {openCloseSort ? <KeyboardArrowUpIcon /> : <ExpandMoreIcon />}
          </Box>
          {openCloseSort ? (
            <Box
              className={`${css.openDropDown} ${css.sortDropDown}`}
              ref={divRef}
            >
              {sortItem?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    sortedItem(item);
                  }}
                  className={
                    sortListItem === item?.tag
                      ? `${css.filterItemSelected}`
                      : `${css.filterItem}`
                  }
                >
                  {item.label}
                </div>
              ))}
            </Box>
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default FilterListDropDown;

export const useQueryParam = () => {
  const navigate = useNavigate();

  const setQueryParam = (paramKey, paramValue) => {
    const queryParams = new URLSearchParams(window.location.search);
    if (paramValue) {
      queryParams.set(paramKey, paramValue);
    } else {
      queryParams.delete(paramKey);
    }

    const newSearch = queryParams.toString();
    navigate(`?${newSearch}`);
  };

  return { setQueryParam };
};
