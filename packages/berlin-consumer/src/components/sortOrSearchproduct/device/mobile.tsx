import { useTranslation } from 'react-i18next';
import Drawer from '@mui/material/Drawer';
import { useState, useEffect, useMemo } from 'react';
import css from '../SortOrSearchproduct.module.scss';
import { Box } from '@mui/system';
import filterIcon from '../../../../assets/filter.png';
import sortIcon from '../../../../assets/sort.svg';
import { Button, Divider, Slider, Typography, colors } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { categories, distance, highlights, rating } from '../../../../../data';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import StarIcon from '@mui/icons-material/Star';
import { PrimaryButton } from 'berlin-common';
import { allTagList } from '../../../services/ProductDetailServices';
import { mainFeatured } from '../../../services/HomePageServices';
import { useSelector } from 'react-redux';
import { Margin } from '@mui/icons-material';
import { useLocation, useParams } from 'react-router-dom';
import { useQueryParam } from './FilterList';
import { localeLang } from '../../../utils/getLang';

const FilterListDropDownMobile = ({
  setPayload,
  payload,
  allQueryParams,
  featuredCategoryMob,
  clearUrlHandler,
}) => {
  const { t, i18n } = useTranslation('translation');

  const [filter, setFilter] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<any>('');
  const [sort, setSort] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<any>();
  const [selectedDistance, setSelectedDistance] = useState<any>();
  const [selectedRating, setSelectedRating] = useState<any>();
  const [selectedHeighLight, setSelectedHeighLight] = useState<any>([]);
  const [value, setValue] = useState<number[]>([0, 2000]);
  const [minPrice, setMinPrice] = useState<number>(value[0]);
  const [maxPrice, setMaxPrice] = useState<number>(value[1]);
  const [allHeighLightTag, setAllHeighLightTag] = useState([]);
  const { addresses } = useSelector((state: any) => state.login);
  const { setQueryParam } = useQueryParam();
  const [sortName, setSortName] = useState<any>(null);

  const [seeMore, setSeeMore] = useState({
    cat: false,
    HeighLight: false,
  });

  const param = useParams();
  const categoryParam = param?.subcategory_slug
    ? param?.subcategory_slug
    : param?.category_slug;

  const locations = useLocation();

  const sortItem = [
    { label: t('PRICE_LOW_HIGH'), tag: 'lowPrice', value: 1 },
    { label: t('PRICE_HIGH_LOW'), tag: 'highPrice', value: 2 },
    // { label: t('DISTANCE'), tag: 'Distance', value: 3 },
    { label: t('RATING'), tag: 'Rating', value: 4 },
    { label: t('RECENTLY_ADDED'), tag: 'latest', value: 5 },
  ];

  const Distance = [
    { label: t('WITHIN1'), value: 1 },
    { label: t('WITHIN5'), value: 2 },
    { label: t('WITHIN10'), value: 3 },
    { label: t('WITHIN20'), value: 4 },
    { label: t('WITHIN50'), value: 5 },
  ];
  const rating = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
  ];

  // first popup
  const toggleDrawer = () => {
    setFilter(!filter);
  };
  const toggleDrawersort = () => {
    setSort(!sort);
  };

  // Filter
  const sortHandler = (value: any) => {
    setSelectedSort(value?.tag);
    setPayload({ ...payload, sort: value?.tag });
    setSortName(value?.label);
    setQueryParam('sort', value?.tag);
    setTimeout(() => {
      setFilter(false);
    }, 200);
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setValue(newValue);
    }
  };

  // category
  const categoriesHandler = (e: any) => {
    setSelectedCategories(e);
  };

  // const distanceItem = (e: string) => {
  //   setSelectedDistance(e);
  //   setPayload({
  //     ...payload,
  //     highlights: e,
  //     latitude: location[0],
  //     langitude: location[1],
  //   });
  // };

  const ratingSelected = (e: string) => {
    setSelectedRating(e);
  };
  const highlightsSelected = (e: any, index) => {
    const isAlredySelected = selectedHeighLight?.indexOf(e);
    if (isAlredySelected !== -1) {
      const multiSelectValues = [...selectedHeighLight];
      multiSelectValues.splice(isAlredySelected, 1);
      setSelectedHeighLight(multiSelectValues);
    } else {
      const multiSelectValues = [...selectedHeighLight, e];
      setSelectedHeighLight(multiSelectValues);
    }
  };

  useEffect(() => {
    allTagList()
      .then((response) => setAllHeighLightTag(response.data.allTags))
      .catch((error) => console.log('error', error));
  }, []);

  const resetHandler = (value) => {
    setSelectedCategories(null);
    setValue([0, 2000]);
    setSelectedDistance(null);
    setSelectedHeighLight('');
    setSelectedRating(null);
    setPayload({});
    setSort(false);
    setSelectedSort('');
    clearUrlHandler();
    setSortName(null);
  };

  useEffect(() => {
    let distance: any = allQueryParams?.distance;
    if (allQueryParams?.price) {
      const newValue = allQueryParams?.price?.split(',');
      setValue(newValue);
      // setMinPrice(newValue[0]);
      // setMaxPrice(newValue[1]);
    }
    if (distance) setSelectedDistance(+distance);
    if (allQueryParams?.highlights)
      setSelectedHeighLight(
        allQueryParams?.highlights?.split(',')?.map((e) => +e)
      );
    if (allQueryParams?.rating) setSelectedRating(allQueryParams?.rating);
    if (allQueryParams?.sort) setSelectedSort(allQueryParams?.sort);
    // if (categoryParam) {
    //   setSelectedCategories(categoryParam);
    // }
    else {
      if (allQueryParams?.categoryid)
        setSelectedCategories(allQueryParams?.categoryid);
    }
  }, []);

  // const location = useMemo(() => {
  //   if (addresses?.length > 0) {
  //     let primaryAddress = addresses?.find(
  //       (item: any) => item?.is_primary == true
  //     );
  //     let cordinate: any = primaryAddress
  //       ? primaryAddress.coordinates?.split(',') || ['', '']
  //       : addresses[0].coordinates?.split(',') || ['', ''];
  //     return cordinate;
  //   } else {
  //     return false;
  //   }
  // }, [addresses]);

  const filterSubmitHandler = () => {
    const data = { ...payload };

    if (value) {
      data['price'] = value;
      setQueryParam('price', value.join(','));
    }
    if (selectedRating) {
      data['rating'] = selectedRating;
      setQueryParam('rating', selectedRating);
    }
    if (selectedHeighLight) {
      data['highlights'] = selectedHeighLight;
      if (data.highlights.length === 0) delete data.highlights;
      setQueryParam('highlights', selectedHeighLight.join(','));
    }
    if (selectedCategories) {
      data['categoryid'] = selectedCategories;
      setQueryParam('categoryid', selectedCategories);
    }
    setPayload(data);
  };

  return (
    <>
      {/* <Box className={css.filterTitle} paddingTop={'20px'} fontSize={'16px'}>
        {t('MAKE_YOUR_OWN_DEAL')}
      </Box> */}
      <Box
        className={`${css.filterAndSort} RTLComponent`}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        pt={2}
      >
        <Box onClick={toggleDrawer} className={css.dropDownLabelMob}>
          <img
            loading="lazy"
            src={sortIcon}
            alt={t('SORT')}
            className={`${css.filterIcon} RTLfilterIcon`}
          />
          {sortName ? sortName : t('SORT')}
        </Box>
        <Drawer
          anchor={'bottom'}
          open={filter}
          onClose={toggleDrawer}
          sx={{ width: '100vw' }}
          className={`${css.popup} popupIndex resFilterDrawer RTLComponent`}
        >
          <Box className={`${css.headingPopup} RTLComponent`} mt={2.5} mb={1}>
            <Box
              width={'50%'}
              className={css.closePopup}
              onClick={() => setFilter(false)}
            >
              <CloseIcon fontSize="small" className={css.closeIcon} />
            </Box>
            <Box width={'20%'}>{t('SORT')}</Box>
          </Box>
          <Divider />
          {sortItem?.map((item, index) => (
            <Typography
              variant="h6"
              gutterBottom
              className={
                selectedSort === item.tag
                  ? `${css.filterItemSelected}`
                  : `${css.filterItem}`
              }
              key={item.tag}
              onClick={() => {
                sortHandler(item);
              }}
            >
              {item?.label}
            </Typography>
          ))}
        </Drawer>
        <Box onClick={toggleDrawersort} className={css.dropDownLabelMob}>
          <img
            loading="lazy"
            src={filterIcon}
            alt={t('FILTER')}
            className={`${css.filterIcon} RTLfilterIcon`}
          />
          {t('FILTER')}
        </Box>
        <Drawer
          anchor={'bottom'}
          open={sort}
          onClose={toggleDrawersort}
          sx={{ width: '100vw' }}
          className={`${css.popup} popupIndex resSort RTLComponent`}
        >
          <Box className={`${css.headingPopup} RTLComponent`} mt={2.5} mb={1}>
            <Box
              width={'50%'}
              className={css.closePopup}
              onClick={() => setSort(false)}
            >
              <CloseIcon fontSize="small" className={css.closeIcon} />
            </Box>
            <Box width={'25%'}>{t('FILTER')}</Box>
          </Box>
          <Divider />
          {featuredCategoryMob.length > 0 && (
            <>
              <Box margin={'20px 0px'}>
                <Box className={css.filterItem}>
                  <Box className={css.indicator}></Box>
                  <Box>{t('CATEGORIES')}</Box>
                </Box>
              </Box>
              <div>
                <div
                  style={{
                    maxHeight: seeMore.cat ? '100%' : '200px',
                    overflow: 'hidden',
                  }}
                >
                  <Box display={'flex'} flexWrap={'wrap'}>
                    {featuredCategoryMob?.map((e: any) => (
                      <Box
                        key={e?.id}
                        className={
                          selectedCategories === e?.slug
                            ? `${css.buttonCatSelected}`
                            : `${css.buttonCat}`
                        }
                        onClick={() => categoriesHandler(e?.slug)}
                      >
                        {e?.label}
                      </Box>
                    ))}
                  </Box>
                </div>
              </div>
              <Box>
                <Box className={css.filterItem}>
                  <Box
                    sx={{
                      textDecoration: 'underline',
                      fontWeight: '600',
                    }}
                    onClick={() =>
                      setSeeMore({ ...seeMore, cat: !seeMore.cat })
                    }
                  >
                    {seeMore.cat ? t('LESS_MORE') : t('SEE_MORE')}
                  </Box>
                  {localeLang === 'ar' ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </Box>
              </Box>
            </>
          )}
          <Box margin={'20px 0px'}>
            <Box className={css.filterItem}>
              <Box className={css.indicator}></Box>
              <Box>{t('PRICE_RANGE')}</Box>
            </Box>
          </Box>
          <Typography className={`${css.subtext}`}>
            {t('USE_SLIDER_OR_ENTER_MIN_AND_MAX_PRICE')}
          </Typography>
          <Box className={`${css.openDropDown} ${css.price}`}>
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
          <Box margin={'0px 0px 15px 0px'}>
            <Box className={css.filterItem}>
              <Box className={css.indicator}></Box>
              <Box>{t('HIGHLIGHT')}</Box>
            </Box>
          </Box>
          <div>
            <div
              style={{
                height: seeMore.HeighLight ? '100%' : '300px',
                overflow: 'hidden',
              }}
            >
              <Box display={'flex'} flexWrap={'wrap'}>
                {allHeighLightTag?.map((e: any, index) => (
                  <Box
                    key={e?.id}
                    className={
                      selectedHeighLight?.includes(e?.id)
                        ? css.buttonCatSelected
                        : css.buttonCat
                    }
                    onClick={() => highlightsSelected(e?.id, index)}
                  >
                    {e?.translations[0]?.text}
                  </Box>
                ))}
              </Box>
            </div>
          </div>
          <Box>
            <Box className={css.filterItem}>
              <Box
                onClick={() =>
                  setSeeMore({ ...seeMore, HeighLight: !seeMore.HeighLight })
                }
                sx={{
                  textDecoration: 'underline',
                  fontWeight: '600',
                }}
              >
                {seeMore.HeighLight ? t('LESS_MORE') : t('SEE_MORE')}
              </Box>
              {localeLang === 'ar' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </Box>
          </Box>
          {/* // TODO: temp commented differed
          {addresses?.length > 0 && (
            <>
              <Box margin={'20px 0px'}>
                <Box className={css.filterItem}>
                  <Box className={css.indicator}></Box>
                  <Box>{t('DISTANCE')}</Box>
                </Box>
              </Box>
              <Box display={'flex'} flexWrap={'wrap'}>
                {Distance?.map((e: any, index) => (
                  <Box
                    key={e?.value}
                    className={
                      selectedDistance == e?.value
                        ? `${css.buttonCatSelected}`
                        : `${css.buttonCat}`
                    }
                    onClick={() => distanceItem(e?.value)}
                  >
                    {e?.label}
                  </Box>
                ))}
              </Box>
            </>
          )} */}
          <Box margin={'20px 0px'}>
            <Box className={css.filterItem}>
              <Box className={css.indicator}></Box>
              <Box>{t('RATING')}</Box>
            </Box>
          </Box>
          <Box display={'flex'} flexWrap={'wrap'}>
            {rating?.map((e: any, index) => (
              <Box
                key={e?.value}
                className={
                  selectedRating == e?.value
                    ? `${css.buttonCatRatingSelected}`
                    : `${css.buttonCatRating}`
                }
                onClick={() => ratingSelected(e?.value)}
              >
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'space-around'}
                >
                  <Box paddingRight={'10px'}>{e?.label}</Box>
                  <StarIcon />
                </Box>
              </Box>
            ))}
          </Box>
          <Box display={'flex'} gap={2} mx={1} className={css.filterButton}>
            <Button
              className={css.resetButton}
              onClick={() => {
                // resetHandler(false);
                resetHandler(false);
              }}
            >
              {' '}
              {t(`RESET`)}
            </Button>
            <PrimaryButton
              label={t(`APPLY`)}
              onClick={() => {
                filterSubmitHandler();
                setSort(false);
              }}
            ></PrimaryButton>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default FilterListDropDownMobile;
