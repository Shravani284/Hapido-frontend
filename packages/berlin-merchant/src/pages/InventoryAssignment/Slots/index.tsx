import {
  Stack,
  Grid,
  Card,
  Typography,
  Button,
  Box,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AssignInventory,
  getDealCalender,
  getDealCounts,
  getDealSlots,
} from '../../../services/assignmentInventoryService';
import { useDispatch } from 'react-redux';
import { setSnackbarConfig } from '../../../store/slice/Loader';
import { getDealBundleByID } from '../../../services/assignmentInventoryService';
import { CardContent } from '@mui/material';
import { CardActions } from '@mui/material';
import Calendar from 'react-calendar';

import css from '../inventoryAssignment.module.scss';
import CalendarComponent from './CalendarComponent';
import moment from 'moment';
import { WarningBoxAlert, formatDateInDubaiTimeZone } from 'berlin-common';

function index() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dealDetails, setDealDetails] = useState([]);
  const [activeDeal, setActiveDeal] = useState([]);
  const [dealSlots, setDealSlots] = useState([]);
  const [DealTypePrices, setDealTypePrices] = useState([]);
  const [dealCounts, setDealCounts] = useState<any>({});
  const [dealCalenderData, setDealCalenderData] = useState<any>([]);
  const [activeIndex, setActiveIndex] = useState(
    state.deal?.deal_type === 'Single'
      ? { id: state.deal?.id, label: '' }
      : null
  );
  const [isLoading, setLoading] = useState(true);
  const [date, setDate] = useState<any>(state?.deal?.deal_active_date);
  const [modalOpen, setModalOpen] = useState({ open: false, Message: '' });
  const [label, setLabel] = useState<any>({});
  const [balanceAllocation, setBalanceAllocation] = useState<any>(0);

  //  get deal slots API called
  const bundleDealSlots = async (dealID, dealStartDate) => {
    if (!dealID) return;
    if (!dealStartDate) return;
    if (date == 'Invalid Date') return;
    setLoading(true);
    await getDealSlots(dealID, date)
      .then((response) => {
        setLoading(false);
        const data = response?.data?.slots;

        setDealSlots(data);
        let totalAllocatedCount = 0;
        response?.data?.slots?.forEach((slot) => {
          slot.dealSlotInventories.forEach((inventory) => {
            totalAllocatedCount += inventory.slot_inventory_allocated;
          });
        });
        setBalanceAllocation(totalAllocatedCount);
      })
      .catch((error) => {
        setLoading(false);
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: error.response.data.error.message
              ? error.response.data.error.message
              : 'Something went wrong',
            varient: 'error',
          })
        );
      });

    setLoading(false);
  };

  //  get bundle id for deal slots API called
  const bundleDealIds = async (
    dealBundleId: string | number,
    dealStartDate: string
  ) => {
    const deal = state?.deal;
    await getDealBundleByID(dealBundleId)
      .then((response) => {
        setActiveIndex(response.data?.deal.dealIds[0]);
        getAllDealCounts(response.data?.deal.dealIds[0]?.id);
        getAllDealCalender(response.data?.deal.dealIds[0]?.id);
        bundleDealSlots(
          response.data?.deal.dealIds[0]?.id,
          deal?.deal_active_date
        );
        const result = response?.data?.deal?.dealIds?.map((e: any) => e);
        setDealDetails(result);
        const obj = { ...response?.data?.deal };
        const Deal_Name = response?.data?.deal?.dealBundletranslations?.find(
          (e: any) => e.locale === 'en' && e.column_name === 'title_trans_ids'
        );
        obj.bundleName = Deal_Name.text ?? '';

        setLabel(obj);
      })
      .catch((error) => {
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: error.response.data.error.message
              ? error.response.data.error.message
              : 'Something went wrong',
            varient: 'error',
          })
        );
      });
  };

  //get all deal count
  const getAllDealCounts = (dealId) => {
    getDealCounts(dealId)
      .then((response) => {
        setLoading(false);
        const result = response;
        setDealCounts(result?.data);
      })
      .catch((error) => {
        setLoading(false);
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: error.response.data.error.message
              ? error.response.data.error.message
              : 'Something went wrong',
            varient: 'error',
          })
        );
      });
  };

  // get all deal calender
  const getAllDealCalender = (dealId) => {
    getDealCalender(dealId)
      .then((response) => {
        setLoading(false);
        const result = response;
        const firstActiveDate = result?.data?.findIndex(
          (e) => e.isDisabled === false
        );
        // if (firstActiveDate) { // date fix for every bundle child select
        const startDate =
          result?.data.length > 0
            ? result?.data[firstActiveDate]?.date
            : new Date();
        setDate(moment.utc(startDate).format('YYYY-MM-DD'));
        // }
        const formattedData = result?.data.map((item) => {
          const originalDate = moment.utc(item.date).format('YYYY-MM-DD');
          return {
            ...item,
            date: originalDate,
          };
        });
        setDealCalenderData(formattedData);
      })
      .catch((error) => {
        setLoading(false);
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: error.response.data.error.message
              ? error.response.data.error.message
              : 'Something went wrong',
            varient: 'error',
          })
        );
      });
  };

  const slotChangeHandler = (value, index) => {
    const data = [...dealSlots];
    if (data[index].dealSlotInventories.length > 0) {
      data[index].dealSlotInventories[0].slot_inventory_allocated = value;
    } else {
      data[index].dealSlotInventories = [
        {
          slot_id: data[index].id,
          deal_id: data[index].deal_id,
          slot_inventory_allocated: 0,
          slot_price: 0,
        },
      ];
      data[index].dealSlotInventories[0].slot_inventory_allocated = value;
    }
    setDealSlots(data);
  };

  const priceChangeHandler = (value, index) => {
    const data = [...dealSlots];
    if (data[index].dealSlotInventories.length > 0) {
      data[index].dealSlotInventories[0].slot_price = value;
    } else {
      data[index].dealSlotInventories = [
        {
          slot_id: data[index].id,
          deal_id: data[index].deal_id,
          slot_inventory_allocated: 0,
          slot_price: 0,
        },
      ];
    }
    data[index].dealSlotInventories[0].slot_price = value;
    setDealSlots(data);
  };

  const typePriceChangeHandler = (value, index, typeIndex) => {
    const data = JSON.parse(JSON.stringify(dealSlots));
    data[index].dealTypePrices[typeIndex].price = value;
    setDealSlots(data);
  };

  useEffect(() => {
    const deal = state?.deal;
    const SelectedDate = deal?.deal_active_date;
    if (deal?.deal_type !== 'Single') {
      bundleDealIds(deal?.dealBundleId, SelectedDate);
    } else {
      getAllDealCounts(deal?.id);
      getAllDealCalender(deal?.id);
      // bundleDealSlots(deal?.id, deal?.deal_active_date);
    }
  }, []);

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
        <sup style={{ fontSize: '12px', marginLeft: '2px' }}>{amPm}</sup>
      </span>
    );
  }

  const handleButtonClick = (item) => {
    const deal = state?.deal;
    const SelectedDate = moment(deal?.deal_active_date).format('YYYY-MM-DD');

    setActiveIndex(item);
    if (activeDeal !== item.id) {
      getAllDealCounts(item?.id);
      getAllDealCalender(item.id);
      bundleDealSlots(item.id, SelectedDate);
    }
    setActiveDeal(item.id);
  };

  useEffect(() => {
    const deal = state?.deal;
    bundleDealSlots(activeIndex?.id, date);
  }, [date]);

  // submit assign Inventory slot
  const assignInventorySlot = () => {
    const assignedInventoryTotal = dealSlots?.reduce(
      (total, item) => {
        return {
          allocate:
            total.allocate +
            parseInt(item.dealSlotInventories[0]?.slot_inventory_allocated),
          // price:
          //   total.price + parseInt(item.dealSlotInventories[0]?.slot_price),
        };
      },
      { allocate: 0 }
    );

    if (isNaN(parseInt(assignedInventoryTotal.allocate))) {
      setModalOpen({
        open: true,
        Message: 'Inventory field are required',
      });
      return;
    }

    const inventoryAssignments = [];
    const payload = dealSlots?.map((e) => {
      const simplifiedDealTypePrices = e.dealTypePrices.map(({ id }) => ({
        id,
      }));
      const data = e.dealSlotInventories?.map((item) => {
        return {
          slotId: item.slot_id,
          assignedInventory: parseInt(item.slot_inventory_allocated),
          // price: parseInt(item.slot_price),
          dealTypePrices: simplifiedDealTypePrices,
        };
      });
      inventoryAssignments.push(...data);
      return {
        slotDate: date,
        dealId: e.deal_id,
        inventoryAssignments: inventoryAssignments,
      };
    });

    let currentFinalBalance = +dealCounts?.finalBalance + balanceAllocation;

    console.log(payload[0]);

    if (assignedInventoryTotal.allocate <= currentFinalBalance) {
      AssignInventory(payload[0])
        .then((res) => {
          if (res.success) {
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                varient: 'success',
                message: res.message,
              })
            );
            getAllDealCounts(activeIndex?.id);
            bundleDealSlots(activeIndex?.id, date);
          }
        })
        .catch((error) => {
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              varient: 'error',
              message: error.response.data.error.message,
            })
          );
        });
    } else {
      setModalOpen({
        open: true,
        Message: 'Assigned inventory exceeds balance allocation',
      });
    }
  };

  return (
    <>
      <Grid mt={1} container spacing={2}>
        <Grid item xs={4} md={4} container justifyContent="flex-start">
          <Stack alignItems="center">
            <Typography variant="h2">{dealCounts?.soldCount || '-'}</Typography>
            <Typography variant="h5">Sold</Typography>
          </Stack>
        </Grid>
        <Grid item xs={4} md={4} container justifyContent="center">
          <Stack alignItems="center">
            <Typography variant="h2">{dealCounts?.upcoming}</Typography>
            <Typography variant="h5">Upcoming allocated</Typography>
          </Stack>
        </Grid>
        <Grid item xs={4} md={4} container justifyContent="flex-end">
          <Stack alignItems="center">
            <Typography variant="h2">{dealCounts?.finalBalance}</Typography>
            <Typography variant="h5">Balance allocation</Typography>
          </Stack>
        </Grid>
      </Grid>

      <Grid mt={3} container spacing={2}>
        <Grid item xs={12} sm={12} md={5} lg={6} xl={6}>
          <Stack spacing={1}>
            <CalendarComponent
              dealCalenderData={dealCalenderData}
              setDate={setDate}
              date={date}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={6} xl={6}>
          <Card>
            <CardContent>
              <div className={css.stackScroll}>
                {state?.deal.deal_type === 'Bundle' ? (
                  <>
                    <Typography sx={{ mb: 1 }} color="text.secondary">
                      Deal Bundle ID #{label?.id}
                    </Typography>

                    <Typography variant="h4" gutterBottom>
                      {`Bundle - ${label?.bundleName}`}
                    </Typography>
                    <Typography sx={{ mb: 1 }} color="text.secondary">
                      CHOOSE ANY OPTION
                    </Typography>

                    <Stack
                      className={css.customScroll}
                      sx={{ mb: 2, pb: 1, overflowX: 'auto' }}
                      spacing={2}
                      direction="row"
                    >
                      {dealDetails?.map((item, index) => (
                        <Button
                          key={index}
                          variant="contained"
                          color="secondary"
                          className={
                            item?.id === activeIndex?.id ? css.active : ''
                          }
                          onClick={() => handleButtonClick(item)}
                          sx={{
                            '&.MuiButtonBase-root:hover': {
                              backgroundColor: '#fc1c15',
                            },
                          }}
                        >
                          {index + 1}
                        </Button>
                      ))}
                    </Stack>
                    <Typography
                      sx={{
                        mb: 1.5,
                        px: 2,
                        py: 1,
                        backgroundColor: '#f5f5f5 ',
                        borderRadius: '6px',
                      }}
                      color="text.primary"
                    >
                      {activeIndex?.label}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography sx={{ mb: 1 }} color="text.secondary">
                      Deal ID #{state?.deal.id}
                    </Typography>

                    <Typography variant="h4" gutterBottom>
                      {state?.deal.label}
                    </Typography>
                  </>
                )}
              </div>

              <>
                {isLoading ? (
                  <Stack className={css.slots}>
                    <Box display={'flex'}>
                      <Typography>Loading</Typography>
                    </Box>
                  </Stack>
                ) : dealSlots?.length > 0 ? (
                  dealSlots?.map((item: any, index) =>
                    item.isExpiredDeal === false ? (
                      <div className={css.singleSlot} key={item.id}>
                        <Stack className={css.slots}>
                          <Box display={'flex'}>
                            <Typography className={css.slotTime}>
                              {formatTime(item.start_hour, item.start_minute)}-
                              {formatTime(item.end_hour, item.end_minute)}
                            </Typography>
                          </Box>
                          <Box className={css.slotValues} display={'flex'}>
                            <Typography className={css.slotBooked}>
                              <span style={{ marginRight: '3px' }}>
                                {item?.dealSlotInventories &&
                                item?.dealSlotInventories[0]
                                  ?.slot_inventory_sold
                                  ? item?.dealSlotInventories[0]
                                      ?.slot_inventory_sold
                                  : '0'}
                              </span>
                              BOOKED
                            </Typography>

                            <div className={css.slotPrice}>
                              PRICE:
                              <span style={{ marginLeft: '3px' }}>
                                {item?.dealSlotInventories[0]?.slot_price
                                  ? item?.dealSlotInventories[0]?.slot_price
                                  : '0'}
                              </span>
                            </div>

                            <div className={css.slotInventory}>
                              INVENTORY:
                              <TextField
                                value={
                                  item?.dealSlotInventories[0]
                                    ?.slot_inventory_allocated &&
                                  item?.dealSlotInventories[0]
                                    ?.slot_inventory_allocated
                                }
                                variant="outlined"
                                className={css.slotInventoryCount}
                                onChange={(e) =>
                                  slotChangeHandler(e.target.value, index)
                                }
                              />
                            </div>
                          </Box>
                        </Stack>
                        {item?.dealTypePrices.length > 0 && (
                          <Stack className={css.typePricing}>
                            {item?.dealTypePrices?.map((e, i) => (
                              <Box
                                key={e.id}
                                display={'flex'}
                                justifyContent={'flex-end'}
                              >
                                <div className={css.typePrice}>
                                  {`${e.type} PRICE:`}
                                  <span style={{ marginLeft: '3px' }}>
                                    {e?.price ? e.price : '0'}
                                  </span>
                                </div>
                              </Box>
                            ))}
                          </Stack>
                        )}
                      </div>
                    ) : (
                      index === 0 && (
                        <Stack className={css.slots}>
                          <Box>
                            <Typography>
                              Slots unavailable, check the active dates.
                            </Typography>
                          </Box>
                        </Stack>
                      )
                    )
                  )
                ) : (
                  <Stack className={css.slots}>
                    <Box>
                      <Typography>Slot Not Found</Typography>
                    </Box>
                  </Stack>
                )}
              </>
              <CardActions>
                <Button
                  size="small"
                  onClick={assignInventorySlot}
                  className={css.saveButton}
                >
                  SAVE
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <WarningBoxAlert
        title={'Assigned inventory (Alert)'}
        handleClose={() => setModalOpen({ open: false, Message: '' })}
        message={modalOpen.Message}
        open={modalOpen.open}
      />
    </>
  );
}

export default index;
