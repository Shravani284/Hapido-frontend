import { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import css from '../ticketsHighlightAndSchedule.module.scss';
import calenderIcon from '../../../../../assets/product-details/calenderIcon.svg';
import clockIcon from '../../../../../assets/product-details/clockIcon.svg';
import locationIcon from '../../../../../assets/product-details/locationIcon.svg';
import personIcon from '../../../../../assets/product-details/personIcon.svg';
import { PrimaryButton, ResSecondaryBtn, useLocalStorage } from 'berlin-common';
import CustomDropDown from '../../components/customDropDownWeb';
import moment from 'moment';
import { t } from 'i18next';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { FormControl } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  AddToCart,
  getCalendarById,
  getSlotById,
} from '../../../../services/ProductDetailServices';
import { useNavigate, useParams } from 'react-router-dom';
import { loginPopupChange } from '../../../../store/slice/LoginSlice';
import { setSnackbarConfig } from '../../../../store/slice/Loader';
import { path } from '../../../../routes/Routers';
import { useDispatch, useSelector } from 'react-redux';
import AuthPopup from '../../../auth';
import { lang } from '../../../../utils/getLang';
import { viewItemList } from '../../../../utils/moEngage';
import { useTranslation } from 'react-i18next';
import ScheduleModuleAr from '../../components/customDropdownMobile-ar';
import CalendarComponentAr from '../calendar/CalendarComponent-ar';
import ClockPopupAr from '../ClockPopup/ClockPopup-ar';
import {
  getDealComponentAr,
  getPayloadMobileAr,
  getTimeSelectionComponentAr,
} from './config-ar';
import PackageDropDownAr from '../LocationPopup-ar';
import PeopleCounterAr from '../PeopleCounter-ar';

// import LocationDropdown from './LocationDropdown';
interface Icount {
  Adult: string | number;
  Child: string | number;
}
const MobileScheduleAr = ({ productDetailsInfo }) => {
  const [open, setOpen] = useState({});
  const [selectedData, setSelectedData] = useState<any>({});
  const [loader, setLoader] = useState(false);
  const [slotOption, setSlotOptions] = useState([]);
  const [countOption, setCountOption] = useState([]);
  const [calendarOption, setCalanderOptions] = useState([]);
  const [components, setComponents] = useState([]);
  const { deal_slug, deal_type, id } = useParams();
  const { isTokenValid } = useLocalStorage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('translation');
  const name = useSelector((state: any) => state?.cityName?.name);

  // const isLoginPopupOpen = useSelector(
  //   (state: any) => state.login?.isLoginPopupOpen
  // );
  const handleOpen = () => dispatch(loginPopupChange());
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
    if (productDetailsInfo?.is_type_variable_pricing) {
      const arr =
        productDetailsInfo.dealTypePrice || productDetailsInfo.dealTypePrices;
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

  const openHandler = () => {
    if (!isTokenValid) {
      handleOpen();
      return;
    }

    if (productDetailsInfo?.id) {
      if (deal_type !== 'c') {
        const component = getDealComponentAr(productDetailsInfo, getCalendar);
        setSelectedData({ package: productDetailsInfo });
        if (component === 'defaultCount') {
          getDefaultCountSingeDeal(productDetailsInfo);
          setOpen({ people: true });
          setComponents(['people']);
        } else if (component === 'people') {
          getTypePricing(productDetailsInfo);
          setComponents([component]);
          setOpen({ [component]: true });
        } else {
          setComponents([component]);
          setOpen({ [component]: true });
        }
      } else {
        getDefaultCountSingeDeal(productDetailsInfo);
        setComponents(['people']);
        setOpen({ people: true });
      }
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
    getSlots(productDetailsInfo?.id, e);
    setOpen({ time: true });
    if (!components.includes('time')) {
      setComponents([...components, 'time']);
    }
  };

  // ========================================time handler===========================================================
  const timeHandler = (e) => {
    setSelectedData({ ...selectedData, time: e });
    const component = getTimeSelectionComponentAr(productDetailsInfo);
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

  const loginData = localStorage.getItem('loginDetails');

  const applyHandler = () => {
    if (!isTokenValid) {
      handleOpen();
      return;
    }

    const payload: any = getPayloadMobileAr(
      selectedData,
      productDetailsInfo,
      deal_type,
      id
    );
    //API Call for Add Deal to Cart List
    AddToCart(payload)
      .then((response) => {
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

        const totalValue: any = totalPrice * totalQuantity;
        const itemsValue = selectedData?.package;
        const eventObj = {
          items: [
            {
              id: itemsValue.id,
              deal_type: payload.deal_type,
              title_label: itemsValue.label,
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
        };
        viewItemList(eventObj, name, 'add_to_cart');
      })
      .catch((error) => {
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

  const getComponents = (value) => {
    switch (value) {
      case 'date':
        return (
          <>
            <ScheduleModuleAr open={open} setOpen={setOpen} name="date">
              {loader ? (
                'Loading'
              ) : (
                <>
                  <h3>{t('SELECT_DATE')}</h3>
                  <CalendarComponentAr
                    datePickerHandler={(e) => {
                      calendarHandler(e);
                    }}
                    value={selectedData?.date}
                    priceOptions={calendarOption}
                  />
                </>
              )}
            </ScheduleModuleAr>
          </>
        );
      case 'time':
        return (
          <ScheduleModuleAr open={open} setOpen={setOpen} name="time">
            <>
              <h3>{t('SELECT_SLOT')}</h3>
              <ClockPopupAr
                clockValue={selectedData?.time}
                option={slotOption}
                clockPicker={(e) => {
                  timeHandler(e);
                }}
              />
            </>
          </ScheduleModuleAr>
        );
      case 'location':
        return (
          <ScheduleModuleAr open={open} setOpen={setOpen} name="location">
            <>
              <h3>{t('SELECT_LOCATION')}</h3>
              <PackageDropDownAr
                locationPicker={(e) => {
                  locationHandler(e);
                }}
                locationValue={selectedData?.location}
                option={productDetailsInfo?.location_specific}
              />
            </>
          </ScheduleModuleAr>
        );
      case 'people':
        return (
          <ScheduleModuleAr
            open={open}
            setOpen={setOpen}
            name="people"
            // isApply={isApply}
          >
            <div className={css.counterHeader}>
              {t('YOU_CAN_SELECT_UP_TO')}{' '}
              {productDetailsInfo?.max_voucher_per_transaction}
              {t('TRAVELERS_IN_TOTAL')}
            </div>
            <>
              {countOption.map((e, index) => (
                <PeopleCounterAr
                  countHandler={countHandler}
                  data={e}
                  fullProduct={productDetailsInfo}
                  index={index}
                  sumOfQuantity={sumOfQuantity}
                />
              ))}
              <PrimaryButton
                isDisabled={sumOfQuantity == 0 ? true : false}
                label={t('BOOK_NOW')}
                onClick={() => applyHandler()}
              />
            </>
          </ScheduleModuleAr>
        );
      default:
        return '';
    }
  };

  return (
    <>
      <div>
        <Box
          className={`${css.bookBtn}  ${
            productDetailsInfo.deal_type && css.singleBookBtn
          }`}
          display={'flex'}
          justifyContent={'flex-end'}
        >
          <ResSecondaryBtn
            label={t('BOOK_NOW')}
            onClick={() => openHandler()}
            // loginDetails ? navigate(`${lang}/cart`) : loginPopup();
          />
        </Box>
      </div>
      {components.map((e) => {
        return getComponents(e);
      })}
    </>
  );
};

export default MobileScheduleAr;
