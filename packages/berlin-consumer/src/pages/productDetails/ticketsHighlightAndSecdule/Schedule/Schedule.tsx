import { useEffect, useRef, useState } from 'react';
import { Box, Card, CircularProgress } from '@mui/material';
import css from '../ticketsHighlightAndSchedule.module.scss';
import calenderIcon from '../../../../../assets/product-details/calenderIcon.svg';
import clockIcon from '../../../../../assets/product-details/clockIcon.svg';
import locationIcon from '../../../../../assets/product-details/locationIcon.svg';
import personIcon from '../../../../../assets/product-details/personIcon.svg';
import transport from '../../../../../assets/package.png';

import CustomDropDown from '../../components/customDropDownWeb';
import CalendarComponent from '../calendar/CalendarComponent';
import moment from 'moment';
import ClockPopup from '../ClockPopup/ClockPopup';
import PackageDropDown from '../LocationPopup';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  AddToCart,
  getCalendarById,
  getSlotById,
} from '../../../../services/ProductDetailServices';
import PeopleCounter from '../PeopleCounter';
import {
  PrimaryButton,
  formatDateInDubaiTimeZone,
  useLocalStorage,
} from 'berlin-common';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbarConfig } from '../../../../../../berlin-admin/src/store/slice/Loader';
import { path } from '../../../../routes/Routers';
import { loginPopupChange } from '../../../../store/slice/LoginSlice';
import {
  getDealComponent,
  getPayload,
  getTimeSelectionComponent,
} from './config';
import { lang } from '../../../../utils/getLang';
import { viewItemList } from '../../../../utils/moEngage';

interface Icount {
  Adult: string | number;
  Child: string | number;
}
const Schedule = ({ productDetailsInfo }: any) => {
  const { deal_slug, deal_type, id } = useParams();
  const [bookBtn, setBookBtn] = useState(false);
  const [components, setComponents] = useState([]);
  const [packageList, setPackageList] = useState([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('translation');
  const name = useSelector((state: any) => state?.cityName?.name);
  const [open, setOpen] = useState({});
  const [selectedData, setSelectedData] = useState<any>({});
  const [calendarOption, setCalanderOptions] = useState([]);
  const [slotOption, setSlotOptions] = useState([]);
  const [countOption, setCountOption] = useState([]);
  const [isApply, setIsApply] = useState(false);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const { isTokenValid } = useLocalStorage();
  const [loaderBook, setLoaderBook] = useState(false);
  const { isClickedBookNow } = useSelector((store: any) => store.Slider);
  const handleOpen = () => dispatch(loginPopupChange());

  const scrollHighlight = isClickedBookNow ? 'scrollHighlight' : '';

  // Calender Data

  const getCalendar = (selectedId) => {
    setLoader(true);
    getCalendarById(selectedId)
      .then((res) => {
        setLoader(false);
        setCalanderOptions(res.data);
      })
      .catch((err) => {
        setLoader(false);

        console.error(err);
      });
  };

  // Slots Data

  const getSlots = (id: any, date: any) => {
    getSlotById(id, date)
      .then((res) => {
        setSlotOptions(res?.data?.slots || res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Apply DropDown
  const applyDropdown = () => {
    setOpen({});
    setIsApply(true);
  };

  const applyHandler = () => {
    if (!isTokenValid) {
      handleOpen();
      return;
    }

    const payload: any = getPayload(
      selectedData,
      productDetailsInfo,
      deal_type
    );

    //API Call for Add Deal to Cart List
    setLoaderBook(true);
    AddToCart(payload)
      .then((response) => {
        setLoaderBook(false);
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: response?.data?.message
              ? response?.data?.message
              : t(`DEAL_ADDED_TO_CART_SUCCESSFULLY`),
            varient: 'success',
          })
        );
        navigate(`/${lang}/cart`);
        // {
        //   item: selectedData.map((e) => {
        //     return {
        //       ...e.package,
        //       price: e.package.selling_price,
        //     };
        //   }),
        //   currency: selectedData.map((e) => {
        //     return e.package.currency;
        //   }),
        //   value: selectedData.map((e) => {
        //     return e.count.quantity;
        //   }),
        // },
        const totalQuantity: number =
          payload.type_pricing?.length > 0
            ? payload.type_pricing.reduce(
                (total, current) => total + current.quantity,
                0
              )
            : payload?.quantity;

        const totalPrice: number =
          payload.type_pricing?.length > 0
            ? payload.type_pricing.reduce(
                (total, current) => total + current.price,
                0
              )
            : payload?.price;
        // : selectedData.count.reduce(
        //     (total, current) => total + current.quantity,
        //     0
        //   );

        const totalValue: any = payload?.price
          ? totalPrice * totalQuantity
          : payload.type_pricing.reduce(
              (total, current) => total + current.price * current.quantity,
              0
            );
        const itemsValue = selectedData?.package;
        viewItemList(
          {
            items: [
              {
                id: itemsValue.id,
                deal_type: payload.deal_type,
                title_label: itemsValue.title_label,
                merchant_name: itemsValue.merchant_name,
                discount: itemsValue.discountPercentage,
                primary_category: itemsValue.primary_category,
                secondary_categories: itemsValue.secondary_categories,
                price_type: payload.price_type,
                price: totalPrice,
                quantity: totalQuantity,
                // item_list_id: 'category_list',
                // item_list_name: 'Category List',
              },
            ],
            currency: selectedData.package.currency,
            value: parseFloat(totalValue),
          },

          name,
          'add_to_cart'
        );
      })
      .catch((error) => {
        setLoaderBook(false);
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: error?.response?.data?.error?.message
              ? error?.response?.data?.error?.message
              : t(`SOMETHING_WENT_WRONG`),
            varient: 'error',
          })
        );
      });
  };

  const getDefaultCountSingeDeal = (productDetailsInfo, selectedData = {}) => {
    setSelectedData({
      package: productDetailsInfo,
      ...selectedData,
      count: [{ type: 'People', quantity: 0 }],
    });
    setCountOption([{ type: 'People', quantity: 0 }]);
  };

  const getTypePricing = (productDetailsInfo) => {
    const arr =
      productDetailsInfo?.dealTypePrice || productDetailsInfo?.dealTypePrices;
    const data = arr?.map((data) => {
      return { ...data, quantity: 0 };
    });
    setCountOption(data || []);
  };

  const getPeopleComponent = (key, value) => {
    if (selectedData?.package?.is_type_variable_pricing) {
      const arr =
        selectedData?.package?.dealTypePrice ||
        selectedData?.package?.dealTypePrices;
      const data = arr?.map((data) => {
        return { ...data, quantity: 0 };
      });
      setCountOption(data || []);
      setSelectedData({ ...selectedData, [key]: value });
    } else {
      setCountOption([{ type: 'People', quantity: 0 }]);
      setSelectedData({
        ...selectedData,
        [key]: value,
        count: [{ type: 'People', quantity: 0 }],
      });
    }
  };

  useEffect(() => {
    if (productDetailsInfo?.id) {
      if (deal_type === 's') {
        const component = getDealComponent(productDetailsInfo, getCalendar);
        if (component === 'defaultCount') {
          getDefaultCountSingeDeal(productDetailsInfo);
          setComponents(['people']);
        } else if (component === 'people') {
          setSelectedData({ package: productDetailsInfo });
          getTypePricing(productDetailsInfo);
          setComponents([component]);
        } else {
          setSelectedData({ package: productDetailsInfo });
          setComponents([component]);
        }
      } else if (deal_type === 'c') {
        getDefaultCountSingeDeal(productDetailsInfo);
        setComponents(['people']);
      } else {
        // if bundle deal we show the list of package
        const data = productDetailsInfo?.deals.map((e) => {
          return { ...e, label: e?.title_label };
        });
        setPackageList(data);
        setComponents(['package']);
      }
    }
  }, [productDetailsInfo]);

  // ========================================Package handler===========================================================
  const packageHandler = (e) => {
    setSelectedData({ package: e });
    const component = getDealComponent(e, getCalendar);
    if (component === 'defaultCount') {
      getDefaultCountSingeDeal(e);
      setComponents(['package', 'people']);
      setOpen({ people: true });
    } else if (component === 'people') {
      getTypePricing(e);
      setComponents(['package', component]);
      setOpen({ people: true });
    } else {
      setComponents(['package', component]);
      setOpen({ [component]: true });
    }
  };

  // ========================================calender handler===========================================================
  const calendarHandler = (e) => {
    setSelectedData({
      ...selectedData,
      date: moment(e).format('YYYY-MM-DD'),
      time: null,
      count: null,
    });
    getSlots(selectedData?.package?.id, e);
    setOpen({ time: true });
    if (!components.includes('time')) {
      setComponents([...components, 'time']);
    }
  };

  // ========================================time handler===========================================================
  const timeHandler = (e) => {
    setSelectedData({ ...selectedData, time: e });
    const component = getTimeSelectionComponent(selectedData.package);
    if (component === 'defaultCount') {
      getDefaultCountSingeDeal(e, { ...selectedData, time: e });
      if (!components.includes('people')) {
        setComponents([...components, 'people']);
      }
      setOpen({ people: true });
    } else if (component === 'people') {
      getTypePricing(e?.dealTypePrices?.length > 0 ? e : selectedData?.package);
      if (!components.includes('people')) {
        setComponents([...components, 'people']);
      }
      setOpen({ people: true });
    } else {
      if (!components.includes(component)) {
        setComponents([...components, component]);
      }
      setOpen({ [component]: true });
    }
  };

  function formatTime(hours: number, minutes: number): JSX.Element {
    // const date = new Date();
    // date.setHours(hours, minutes);
    // const amPm = date.getHours() >= 12 ? 'PM' : 'AM';
    // const hour12 = date.getHours() % 12 || 12;
    const date = new Date(); // or your specific date
    const formattedDateString = formatDateInDubaiTimeZone(date);

    // Convert the formatted date string back to a Date object
    const dubaiDate = new Date(formattedDateString);
    dubaiDate?.setHours(hours, minutes);
    const amPm = dubaiDate.getHours() >= 12 ? 'PM' : 'AM';
    const hour12 = dubaiDate.getHours() % 12 || 12;
    return (
      <span>
        <span>{hour12}</span>:
        {minutes?.toLocaleString('en-US', { minimumIntegerDigits: 2 })}
        <span style={{ paddingLeft: '3px' }}>{amPm}</span>
      </span>
    );
  }

  // ========================================location handler===========================================================
  const locationHandler = (e) => {
    getPeopleComponent('location', e);
    setOpen({ people: true });
    if (!components.includes('people')) {
      setComponents([...components, 'people']);
    }
  };

  // ========================================count handler===========================================================
  const countHandler = (opration, index, quantity, min) => {
    const data = [...countOption];
    if (opration === 'add') {
      if (quantity < min) {
        data[index].quantity = min;
      } else {
        data[index].quantity += 1;
      }
    } else {
      if (quantity < selectedData?.package.min_voucher_per_transaction + 1) {
        data[index].quantity = 0;
      } else {
        data[index].quantity -= 1;
      }
    }

    setCountOption(data);
    setSelectedData({ ...selectedData, count: data });
  };

  const sumOfQuantity = countOption.reduce(
    (sum: any, product: any) => sum + product.quantity,
    0
  );

  const getComponents = (value) => {
    switch (value) {
      case 'package':
        return (
          <CustomDropDown
            underline={true}
            img={transport}
            label={
              selectedData?.package?.label
                ? selectedData?.package?.label
                : t(`SELECT_PACKAGE`)
            }
            setOpen={setOpen}
            open={open}
            name="package"
          >
            <PackageDropDown
              locationPicker={(e) => {
                packageHandler(e);
              }}
              locationValue={selectedData?.package}
              option={packageList}
            />
          </CustomDropDown>
        );
      case 'date':
        return selectedData?.package?.sold_out ? (
          <h3 className={css.dealNotFound}>{t(`DEAL_SOLD_OUT_ERROR`)}</h3>
        ) : (
          <CustomDropDown
            underline={true}
            img={calenderIcon}
            label={
              selectedData?.date
                ? moment(selectedData?.date).format('dddd, MMM D, YYYY')
                : t(`SELECT_DATE`)
            }
            setOpen={setOpen}
            open={open}
            name="date"
          >
            {loader ? (
              'Loading'
            ) : (
              <CalendarComponent
                datePickerHandler={(e) => {
                  calendarHandler(e);
                }}
                value={selectedData?.date}
                priceOptions={calendarOption}
              />
            )}
          </CustomDropDown>
        );
      case 'time':
        return selectedData?.package.sold_out ? (
          <h3 className={css.dealNotFound}>{t(`DEAL_SOLD_OUT_ERROR`)}</h3>
        ) : (
          <CustomDropDown
            underline={true}
            img={clockIcon}
            label={
              selectedData?.time
                ? formatTime(
                    selectedData?.time?.start_hour,
                    selectedData?.time?.start_minute
                  )
                : t(`SELECT_TIME`)
            }
            setOpen={setOpen}
            open={open}
            name="time"
          >
            <ClockPopup
              clockValue={selectedData?.time}
              option={slotOption}
              clockPicker={(e) => {
                timeHandler(e);
              }}
            />
          </CustomDropDown>
        );
      case 'location':
        return selectedData?.package.sold_out ? (
          <h3 className={css.dealNotFound}>{t('DEAL_SOLD_OUT_ERROR')}</h3>
        ) : (
          <CustomDropDown
            underline={true}
            img={locationIcon}
            label={
              selectedData?.location?.label ? (
                selectedData?.location?.label
              ) : (
                <>{t('SELECT_LOCATION')}</>
              )
            }
            setOpen={setOpen}
            open={open}
            name="location"
          >
            <PackageDropDown
              locationPicker={(e) => {
                locationHandler(e);
              }}
              locationValue={selectedData?.location}
              option={selectedData?.package?.location_specific}
            />
          </CustomDropDown>
        );
      case 'people':
        return selectedData?.package.sold_out ? (
          <h3 className={css.dealNotFound}>{t('DEAL_SOLD_OUT_ERROR')}</h3>
        ) : (
          <CustomDropDown
            underline={false}
            img={personIcon}
            label={
              <>
                {selectedData?.count
                  ?.map((e) => `${e?.quantity} ${e?.type}`)
                  .join(', ') || <>{t('SELECT_COUNT')}</>}
              </>
            }
            setOpen={setOpen}
            open={open}
            name="people"
          >
            <div className={css.counterHeader}>
              {t('YOU_CAN_SELECT_UP_TO')}{' '}
              {selectedData?.package?.max_voucher_per_transaction}{' '}
              {t('TRAVELERS_IN_TOTAL')}
            </div>
            <>
              {countOption.map((e, index) => (
                <PeopleCounter
                  countHandler={countHandler}
                  data={e}
                  fullProduct={selectedData?.package}
                  index={index}
                  sumOfQuantity={sumOfQuantity}
                />
              ))}
              <PrimaryButton
                isDisabled={sumOfQuantity == 0 ? true : false}
                label={t(`APPLY`)}
                onClick={() => applyDropdown()}
              />
            </>
          </CustomDropDown>
        );
      default:
        return '';
    }
  };

  return (
    <>
      <Card className={`${css.card} ${css.MobCard} ${scrollHighlight}`}>
        <Box className={css.cardScheduleHeader} width={'100%'}>
          <Box>
            {Boolean(productDetailsInfo?.show_old_price) && (
              <span className={css.oldRate}>
                {t('WAS')} {productDetailsInfo?.currency}{' '}
                {productDetailsInfo?.old_price}
              </span>
            )}
            <span className={css.newRate}>
              {t('NOW')}
              <b className={css.newAED}>{productDetailsInfo?.currency}</b>
              <b> {productDetailsInfo?.selling_price}*</b>
            </span>
          </Box>
          <Box className={css.discountCap}>
            {productDetailsInfo?.discount_percentage ? (
              <span className={css.discount}>
                {Math.ceil(productDetailsInfo?.discount_percentage)}
                {t('%OFF')}
              </span>
            ) : (
              ''
            )}
          </Box>
        </Box>
        <div className={css.terms}>{t('LOWEST_PRICE_GUARANTEE')}</div>
        {deal_type === 's' && productDetailsInfo?.sold_out ? (
          <h3 className={css.dealNotFound}>{t('DEAL_SOLD_OUT_ERROR')}</h3>
        ) : (
          <>
            <div className={css.travelerDetail}>{t('SELECT_OPTIONS')}</div>
            <Box ml={2} mr={2}>
              {components.map((e) => {
                return getComponents(e);
              })}
              {isApply && (
                <PrimaryButton
                  onClick={applyHandler}
                  label={
                    <>
                      {loaderBook ? <CircularProgress /> : <>{t('BOOK_NOW')}</>}
                    </>
                  }
                  isDisabled={loaderBook && sumOfQuantity == 0}
                />
              )}
            </Box>
          </>
        )}
      </Card>
    </>
  );
};

export default Schedule;
