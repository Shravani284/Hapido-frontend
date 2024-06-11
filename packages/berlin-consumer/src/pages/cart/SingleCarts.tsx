import { Grid, Card, CardContent, Box, CircularProgress } from '@mui/material';
//import CardActions from '@mui/material/CardActions';
import css from './Cart.module.scss';
import locationIcon from '../../../assets/locationIcon.svg';
import { useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useTranslation } from 'react-i18next';
import { deleteCart, updateCartCount } from '../../services/cartService';
import {
  DealImg,
  PrimaryButton,
  formatDateInDubaiTimeZone,
  useDebounce,
} from 'berlin-common';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../store/slice/CartCount';
import { setSnackbarConfig } from '../../store/slice/Loader';
import moment from 'moment';
import { mDeleteCart, viewItemList } from '../../utils/moEngage';
import ConsumerConfirmBoxAlert from '../../components/ConsumerConfirmBoxAlert';
import { useNavigate } from 'react-router';
import { path } from '../../routes/Routers';

const SingleCarts = ({
  cardIndex,
  item,
  setCouponCode,
  recieveError,
  setErrorMsg,
}: any) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('translation');
  const { loading, cartItems, cartRes } = useSelector(
    (state: any) => state?.cartItems
  );
  const [payload, setPayload] = useState<any>();
  const [data, setData] = useState<any>({ items: [] });
  const [isLoading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [cardLoaderIndex, setCardLoaderIndex] = useState<number>(0);
  const dispatch = useDispatch();
  const currentCity = useSelector((state: any) => state?.cityName?.name);

  const CountHandler = (index, opration) => {
    setCardLoaderIndex(cardIndex);
    const array = JSON.parse(JSON.stringify(data));
    if (opration === 'add') {
      array.items[index].quantity = array.items[index].quantity + 1;
    } else {
      if (array.items[index].quantity > 0) {
        array.items[index].quantity = array.items[index].quantity - 1;
      }
    }
    array.items[index].total_price =
      array.items[index].quantity * array.items[index].price;

    const payloadData = {
      ...array.items[index],
      title_label: array.deal_title,
    };
    cartUpdateHandler(array.items[index], payloadData);
    setPayload(payloadData);
  };
  const removeCartHandler = () => {
    const items = data.items?.map((item) => item);
    items.map((item) => {
      const deleteId =
        item?.deal_type === 'COMBO' ? item?.deal_combo_id : item?.id;
      const basketIds: number[] = [];

      items.forEach((item) => {
        const dealId = item?.id;
        basketIds.push(dealId);
      });

      const payload = { basket_ids: basketIds };
      deleteCart(
        deleteId,
        item?.deal_type,
        item?.deal_type === 'COMBO' && payload
      )
        .then((res) => {
          if (res?.success) {
            dispatch(fetchData({}));
            mDeleteCart(
              item?.currency,
              item?.deal_type,
              item?.deal_id,

              currentCity
            );
          }
        })
        .catch((error) => {
          if (error) {
            console.log(error);
            recieveError(error);
          }
        });
    });
    setModalOpen(false);
  };

  useEffect(() => {
    if (cartRes?.qualifiedGift?.message) {
      dispatch(
        setSnackbarConfig({
          isOpen: true,
          message: cartRes.qualifiedGift?.message,
          varient: 'success',
        })
      );
    }
  }, [cartRes]);

  const cartUpdateHandler = (val: any, payloadData: any) => {
    let minMaxCount = false;
    if (data?.min_count) {
      minMaxCount = val.quantity < data?.min_count;
    }
    if (minMaxCount) {
      setModalOpen(true);
    } else {
      setLoading(true);
      updateCartCount(payloadData)
        .then((res) => {
          setCouponCode('');
          setErrorMsg(false);
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: res?.data?.message
                ? res?.data?.message
                : t('CART_UPDATED'),
              varient: 'success',
            })
          );

          if (res?.success) {
            dispatch(fetchData({}));

            viewItemList(
              {
                currency: payloadData?.currency,
                value: payloadData?.total_price,
                items: [
                  {
                    id: payloadData?.id,
                    deal_type: payloadData?.deal_type,
                    title_label: payloadData?.title_label,
                    merchant_name: payloadData?.merchant_name,
                    coupon: payloadData?.coupon_code_applied,
                    discount: payloadData?.coupon_discount,
                    primary_category: payloadData?.primary_category,
                    secondary_categories: payloadData?.secondary_categories,
                    price_type: payloadData?.price_type,
                    price: payloadData?.price,
                    quantity: payloadData?.quantity,
                  },
                ],
              },

              currentCity,
              'update_cart'
            );
          }
          setLoading(false);
        })
        .catch((error) => {
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: error?.response?.data?.error?.message
                ? error?.response?.data?.error?.message
                : t('CART_UPDATED'),
              varient: 'error',
            })
          );
          setLoading(false);
          console.log('error', error);
          recieveError(error);
        });
    }
  };

  function formatTime(hours: number, minutes: number): JSX.Element {
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
  useEffect(() => {
    setData(item);
  }, [item]);

  return (
    <>
      <Card className={css.cartDesign}>
        <CardContent>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            className={css.cardLayOut}
          >
            <Box display={'flex'}>
              <Box>
                <img
                  loading="lazy"
                  src={item?.images[0]?.extfilepath || DealImg}
                  alt={t('CART')}
                  className={css.img}
                  // width={'100%'}
                />
              </Box>
              <Box className={css.pLeft30}>
                <h6> {item.deal_title} </h6>
                <p> {item.deal_tagline} </p>
                {/* <p> {item.month} </p>
                {data?.slot_date && (
                  <p>
                    {item.slot_date &&
                      moment(item.slot_date).format('DD MMM YYYY')}{' '}
                    {formatTime(item.start_hour, item.start_minute)}
                  </p>
                )} */}

                {data?.items[0]?.dealArea?.length > 0 && (
                  <Box display={'flex'} alignItems={'center'}>
                    <div>
                      <img
                        loading="lazy"
                        src={locationIcon}
                        alt={t('LOCATION')}
                        className={css.locationIcon}
                      />
                    </div>
                    <div className={css.locationText}>
                      {data?.items[0]?.dealArea.map((e) => e?.label)}
                    </div>
                  </Box>
                )}
              </Box>
            </Box>

            <Box
              // bgcolor={'cyan'}
              display={'block'}
              justifyContent={'space-between'}
              className={css.mediaPrise}
            >
              {data?.deal_type == 'COMBO'
                ? data?.items[0]?.quantity != 0 && (
                    <Box
                      display={'flex'}
                      justifyContent={'space-between'}
                      mx={1}
                    >
                      <Box className={`${css.spaceAed} ${css.mediaPerson}`}>
                        <div className={css.spaceAed2}>
                          <h5 className={css.person}>
                            {data?.items[0].price_type
                              ? data?.items[0].price_type
                              : 'NA'}
                          </h5>
                        </div>
                        <div>
                          <p className={css.time}> {data?.items[0].hours} </p>
                          <div className={css.aedPrise}>
                            <span className={css.aedText}>
                              {data?.items[0].currency}
                            </span>
                            <span className={css.aed30}>
                              {data?.items[0].price}
                            </span>
                          </div>
                        </div>
                      </Box>
                      {/* Remove button */}
                      <Box className={css.plusIconDiv}>
                        <button
                          onClick={() => CountHandler(0, 'remove')}
                          disabled={isLoading}
                        >
                          <RemoveCircleIcon className={css.width} />
                        </button>
                        {loading ? (
                          <CircularProgress
                            sx={{
                              color: '#000000',
                              marginTop: '4px',
                            }}
                            color="inherit"
                            size={14}
                          />
                        ) : (
                          <b className={css.cartQuantity}>
                            {data?.items[0].quantity}
                          </b>
                        )}
                        <button
                          disabled={
                            data?.total_item_quantity >= data?.max_count ||
                            isLoading
                          }
                          onClick={() => CountHandler(0, 'add')}
                        >
                          <AddCircleIcon className={css.width} />
                        </button>
                      </Box>
                    </Box>
                  )
                : data?.items.map((item: any, index) => {
                    return (
                      item?.quantity != 0 && (
                        <Box
                          key={index}
                          display={'flex'}
                          justifyContent={'space-between'}
                          mx={1}
                        >
                          <Box className={`${css.spaceAed} ${css.mediaPerson}`}>
                            <div className={css.spaceAed2}>
                              <h5 className={css.person}>
                                {item.price_type ? item.price_type : 'NA'}
                              </h5>
                            </div>
                            <div>
                              <p className={css.time}> {item.hours} </p>
                              <div className={css.aedPrise}>
                                <span className={css.aedText}>
                                  {item.currency}
                                </span>
                                <span className={css.aed30}>{item.price}</span>
                              </div>
                            </div>
                          </Box>
                          <Box className={css.plusIconDiv}>
                            <button
                              onClick={() => CountHandler(index, 'remove')}
                              disabled={isLoading}
                            >
                              <RemoveCircleIcon className={css.width} />
                            </button>
                            {loading ? (
                              <CircularProgress
                                sx={{
                                  color: '#000000',
                                  marginTop: '4px',
                                }}
                                color="inherit"
                                size={14}
                              />
                            ) : (
                              <b className={css.cartQuantity}>
                                {item.quantity}
                              </b>
                            )}
                            <button
                              disabled={
                                data?.total_item_quantity >= data?.max_count ||
                                isLoading
                              }
                              onClick={() => CountHandler(index, 'add')}
                            >
                              <AddCircleIcon className={css.width} />
                            </button>
                          </Box>
                        </Box>
                      )
                    );
                  })}

              <Box className={css.CartDate}>
                <p> {item.month} </p>
                {data?.slot_date && (
                  <p>
                    {item.slot_date &&
                      moment(item.slot_date).format('DD MMM YYYY')}{' '}
                    {formatTime(item.start_hour, item.start_minute)}
                  </p>
                )}
              </Box>
            </Box>
          </Box>

          <Box className={css.bottom}>
            <h4>
              {item.items[0].currency} {parseFloat(item.total_price).toFixed(2)}
            </h4>
          </Box>
        </CardContent>
      </Card>

      <ConsumerConfirmBoxAlert
        title={`${t('MINIMUM_LIMIT')} ${data.min_count}${t(
          'DEAL_WILL_BE_REMOVED_FROM_THE_CART_CONTINUE'
        )} `}
        handleClose={() => setModalOpen(false)}
        message={''}
        open={modalOpen}
        submitHandler={removeCartHandler}
      />
    </>
  );
};

export default SingleCarts;
