// material-ui
import { Breadcrumbs, Typography, InputLabel, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import MainCard from '../../components/MainCard';
import { MagicDropDown, NormalTextField } from 'berlin-common';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import React, { useState, useEffect, Fragment } from 'react';
import * as yup from 'yup';
import { getAllDeal } from '../../services/commonService';
import {
  addBulkInventory,
  getDealById,
} from '../../services/assignBulkInventoryService';
import { useDispatch } from 'react-redux';
import { setSnackbarConfig } from '../../store/slice/Loader';
import { HeadCell } from '../../../../berlin-merchant/src/types/table';
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { CircularProgress } from '@mui/material';
import usePermission from '../../components/Permission/usePermission';
import { getSlotDeal } from '../../services/dropDownService';

// ==============================|| MUI TABLE - HEADER ||============================== //
const headCells: HeadCell[] = [
  {
    id: 'type',
    numeric: false,
    disablePadding: true,
    label: 'Type',
  },
  {
    id: 'price',
    numeric: false,
    disablePadding: true,
    label: 'Price',
  },
];

// ==============================|| TABLE - DATA TABLE ||============================== //

export default function AssignBulkInventory() {
  interface Dropdown {
    id: number | string;
    label: string;
  }

  interface UploadCodeI {
    deal_id: Dropdown | null;
    allocate_days: string;
    slot_allocation_per_slot: string;
    slot_price: string;
    dealTypePrices: any[];
  }

  const [slotAllowAllocationDaysCount, setSlotAllowAllocationDaysCount] =
    useState<any>();
  const { permission } = usePermission('MANUAL_BOOKING'); //TODO

  const [dealDropDown, setDealDropDown] = useState([]);
  const [dealDetails, setDealDetails] = useState<any>();
  const [dense] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      allocate_days: '',
      slot_allocation_per_slot: '',
      slot_price: '',
      deal_id: null,
      dealTypePrices: [],
    },
    validationSchema: yup.object({
      deal_id: yup.mixed().required('Deal is required'),

      allocate_days: yup
        .number()
        .required('Allocate days is required')
        .max(
          slotAllowAllocationDaysCount,
          'Allocate days must be less than slot allocation days count'
        ),

      slot_allocation_per_slot: yup
        .string()
        .required('Slot allocation per slot is required'),
      slot_price: yup.string().required('Slot price is required'),
      dealTypePrices: yup.array().of(
        yup.object().shape({
          id: yup.mixed().required('Type is required'),
          price: yup.mixed().required('Price is required'),
        })
      ),
    }),
    onSubmit: async (value) => {
      handleAdd(value);
    },
  });

  const handleAdd = (value: UploadCodeI) => {
    const payLoad = {
      deal_id: value.deal_id?.id,
      allocate_days: +value.allocate_days,
      slot_allocation_per_slot: +value.slot_allocation_per_slot,
      slot_price: +value.slot_price,
      dealTypePrices: value.dealTypePrices?.map((item: any) => ({
        id: item?.id,
        price: +item?.price,
      })),
    };
    setBtnLoader(true);
    addBulkInventory(payLoad)
      .then((_res) => {
        setBtnLoader(false);
        allDeals();
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: 'Bulk inventory created successfully',
            varient: 'success',
          })
        );
      })
      .catch((error) => {
        setBtnLoader(false);
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: error.response.data.error.message
              ? error.response.data.error.message
              : error.response.data.error.message,
            varient: 'error',
          })
        );
      });
  };
  // All Deals Dropdown
  const allDeals = () => {
    getSlotDeal()
      .then((res) => {
        setDealDropDown(res.data.allDeals);
      })
      .catch((error) => {
        console.log('error', error);
      });

    // getAllDeal()
    //   .then((res) => {
    //     let data = res?.filter((item: any) => item?.isSlot === 1);
    //     setDealDropDown(data);
    //   })
    //   .catch((error) => {
    //     console.log('error', error);
    //   });
  };
  useEffect(() => {
    allDeals();
  }, []);
  useEffect(() => {
    if (formik.values.deal_id) {
      const data: any = formik?.values.deal_id;
      setSlotAllowAllocationDaysCount(data?.slot_allow_allocation_days_count);
    }
    setDealDetails({
      id: formik?.values?.deal_id?.id,
      label: formik?.values?.deal_id?.label,
    });
  }, [formik.values.deal_id]);

  const getDealIdHandler = () => {
    if (!dealDetails?.id) return;
    getDealById(dealDetails?.id)
      .then((res) => {
        const data = res?.data?.data?.deal?.dealTypePrices?.map((e: any) => {
          return { type: e.type, price: e.price, id: e.id };
        });
        formik.setFieldValue('dealTypePrices', data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    getDealIdHandler();
  }, [dealDetails?.id]);
  console.log(formik.values?.dealTypePrices,"formik.values?.dealTypePrices")


  return (
    <>
      <MainCard title="Assign Bulk Inventory with price">
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3.5}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Deals<span className="asterisk">*</span>
                  </InputLabel>
                  <MagicDropDown
                    name="deal_id"
                    option={dealDropDown}
                    label="deal"
                    formik={formik}
                    placeholder="Select Deals"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Allocate Days (less than{' '}
                    {formik.values.deal_id ? slotAllowAllocationDaysCount : ''})
                    <span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField
                    name="allocate_days"
                    placeholder="Enter Allocate Days"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Slot Allocation Per Slot<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField
                    name="slot_allocation_per_slot"
                    placeholder="Enter slot allocation"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Slot Price<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField
                    name="slot_price"
                    placeholder="Enter Slot price"
                  />
                </Stack>
              </Grid>

              <FieldArray
                name="dealTypePrices"
                render={(arrayHelpers) => (
                  <>
                    {formik.values?.dealTypePrices?.map(
                      (name: string, index: number) => (
                        <Fragment key={index}>
                          {/* <Grid container spacing={3.5}> */}

                          <Grid item xs={6} sm={3}>
                            <Stack spacing={1}>
                              <InputLabel>
                                Type <span className="asterisk">*</span>
                              </InputLabel>
                              <NormalTextField
                                disabled={true}
                                name={`dealTypePrices[${index}].type`}
                                placeholder="Type"
                              />
                            </Stack>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Stack spacing={1}>
                              <InputLabel>
                                Price
                                <span className="asterisk">*</span>
                              </InputLabel>
                              <NormalTextField
                                name={`dealTypePrices[${index}].price`}
                                placeholder="Price"
                              />
                            </Stack>
                          </Grid>

                          {/* </Grid> */}
                        </Fragment>
                      )
                    )}
                  </>
                )}
              />

              {/* {dealDetails?.id && (
                <Grid item xs={12}>
                  <MainCard item xs={12} title={dealDetails?.label}>
                    <TableContainer>
                      <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                      >
                        <TableHead>
                          <TableRow>
                            {headCells.map((headCell) => (
                              <TableCell
                                key={headCell.id}
                                align={headCell.numeric ? 'right' : 'left'}
                                padding={
                                  headCell.disablePadding ? 'none' : 'normal'
                                }
                              >
                                {headCell.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {loading ? (
                            <TableRow>
                              <TableCell colSpan={8}>
                                Loading data ...
                              </TableCell>
                            </TableRow>
                          ) : rows && rows.length > 0 ? (
                            rows.map((row: any, index: any) => {
                              return <Row key={index} row={row} />;
                            })
                          ) : (
                            <TableRow>
                              <TableCell align="center" colSpan={5}>
                                No record found.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Divider />
                  </MainCard>
                </Grid>
              )} */}
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="right"
                  spacing={2}
                  mr={2}
                  mb={2}
                >
                  {(permission === 'WRITE' || permission === 'FULL') && (
                    <>
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={btnLoader}
                      >
                        {btnLoader ? (
                          <CircularProgress
                            color="secondary"
                            style={{ margin: '3px 10px' }}
                            size={18}
                          />
                        ) : (
                          'Submit'
                        )}
                      </Button>
                    </>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </form>
        </FormikProvider>
      </MainCard>
    </>
  );
}

function Row({ row, handleDelete, updateDealById = () => {} }: any) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <TableRow hover tabIndex={-1} key={row.id} onClick={() => setOpen(!open)}>
        <TableCell>{row?.type}</TableCell>
        <TableCell>{row?.price}</TableCell>
      </TableRow>
    </>
  );
}
