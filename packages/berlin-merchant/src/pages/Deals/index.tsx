import React, { useEffect, useState } from 'react';

// material-ui
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Collapse,
  Box,
  Breadcrumbs,
  Typography,
  Button,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { HeadCell } from '../../../../berlin-merchant/src/types/table';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import MainCard from '../../components/MainCard';
import { DateFormat, paginationOption } from 'berlin-common';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { dealExcel, dealsList } from '../../services/dealsService';
import useConfig from '../../hooks/useConfig';
import { dealsBundleList } from '../../services/dealsBundlesService';
import { dealsCombo } from '../../services/dealsComboService';
import Filter from './filter';
import { useFormik } from 'formik';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import DocsPreviewBtn from './DocsPreviewBtn';

const headCells: HeadCell[] = [
  {
    id: 'icon',
    numeric: false,
    disablePadding: true,
    label: '',
  },
  {
    id: 'deal_id',
    numeric: false,
    disablePadding: true,
    label: 'Deal Id',
  },
  {
    id: 'deal_name',
    numeric: false,
    disablePadding: true,
    label: 'Deal Name',
  },
  {
    id: 'deal_category',
    numeric: false,
    disablePadding: true,
    label: 'Deal Category',
  },
  {
    id: 'deal_price',
    numeric: false,
    disablePadding: true,
    label: 'Deal Price',
  },
  {
    id: 'deal_specific_area',
    numeric: false,
    disablePadding: true,
    label: 'Deal Specific Area',
  },
  {
    id: 'total_inventory',
    numeric: false,
    disablePadding: true,
    label: 'Total Inventory',
  },
  {
    id: 'available_inventory',
    numeric: false,
    disablePadding: true,
    label: 'Available Inventory',
  },

  {
    id: 'deal_type',
    numeric: false,
    disablePadding: true,
    label: 'Deal Type',
  },
];

// ==============================|| TABLE - DATA TABLE ||============================== //

export default function Deals() {
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPayload, setFilterPayload] = useState<any>({
    dealtype: { label: 'Single', id: 'single' },
    status: { label: 'All', id: 'all' },
  });

  let loginDetails = localStorage.getItem('loginDetails');
  let merchantId = JSON.parse(loginDetails);

  const [isExcelData, setIsExcelData] = useState(false);
  const [excelData, setExcelData] = useState();

  const { i18n } = useConfig();
  const formik = useFormik({
    initialValues: {
      status: { label: 'All', id: 'all' },
      vouchertype: null,
      dealtype: { label: 'Single', id: 'single' },
      category: null,
      dealid: '',
      dealName: '',
    },
    onSubmit: async (value: any) => {
      setFilterPayload(value);
      setFilterOpen(false);
    },
  });
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    setRowsPerPage(parseInt(event?.target.value!, 10));
    setPage(0);
  };

  const excelHandler = (dealId: any, dealType: any, merchantId: any) => {
    let payLoad = {
      merchantId: merchantId,
      dealId: dealId,
      dealType: dealType?.toUpperCase(),
    };
    dealExcel(payLoad)
      .then((res: any) => {
        setExcelData(res?.data?.data);
        setIsExcelData(true);
      })
      .catch((error) => {
        console.log(error);
        setIsExcelData(false);
      });
  };

  const getAllDealBundle = () => {
    setLoading(true);
    if (filterPayload?.dealtype.id === 'single') {
      dealsList(page, rowsPerPage, filterPayload, i18n)
        .then((res) => {
          if (res?.status) {
            const getAllDealBundleList = res.data.data.deals?.map(
              (item: any) => {
                const obj = { ...item };
                if (item.translations.length > 0) {
                  const title_en = item.translations.find(
                    (ele: any) =>
                      // ele.locale === 'en' &&
                      ele.column_name === 'title_trans_ids'
                  );
                  // const title_ar = item.translations.find(
                  //   (ele: any) =>
                  //     // ele.locale === 'ar' &&
                  //     ele.column_name === 'title_trans_ids'
                  // );

                  obj.title = `${title_en?.text ?? ''} `;
                }
                return obj;
              }
            );

            setRows(getAllDealBundleList);

            setTotalCount(res.data.data.totalCount);

            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
    if (filterPayload?.dealtype.id === 'bundle') {
      dealsBundleList(page, rowsPerPage, filterPayload, i18n)
        .then((res) => {
          if (res?.status) {
            // final result=commonf(arr)
            const getAllDealBundleList = res.data.data.dealBundles?.map(
              (item: any) => {
                const obj = { ...item };
                if (item.translations.length > 0) {
                  const title_en = item.translations.find(
                    (ele: any) => ele.column_name === 'title_trans_ids'
                  );

                  obj.title = `${title_en?.text ?? ''}`;
                }
                return obj;
              }
            );

            setRows(getAllDealBundleList);

            setTotalCount(res.data.data.totalCount);

            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
    if (filterPayload?.dealtype.id === 'combo') {
      dealsCombo(page, rowsPerPage, filterPayload, i18n)
        .then((res) => {
          if (res?.status) {
            const getAllDealBundleList = res.data.data.deals?.map(
              (item: any) => {
                const obj = { ...item };
                if (item.translations.length > 0) {
                  const title_en = item.translations.find(
                    (ele: any) => ele.column_name === 'title_trans_ids'
                  );

                  obj.title = `${title_en?.text ?? ''} `;
                }
                return obj;
              }
            );

            setRows(getAllDealBundleList);

            setTotalCount(res.data.data.totalCount);

            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (filterPayload?.dealtype?.id) {
      getAllDealBundle();
    }
  }, [page, rowsPerPage, filterPayload, i18n]);
  let [finalCell, setFinalCell] = useState([]);
  useEffect(() => {
    if (filterPayload?.dealtype?.id !== 'single') {
      // const cell = headCells;
      const excludedIds = [
        'deal_specific_area',
        'total_inventory',
        'available_inventory',
      ];
      const filteredHeadCells: HeadCell[] = headCells.filter(
        (headCell) => !excludedIds.includes(headCell.id)
      );
      console.log('cell0', filteredHeadCells);

      setFinalCell([
        ...filteredHeadCells,
        // {
        //   id: 'sold_inventory',
        //   numeric: false,
        //   disablePadding: true,
        //   label: 'Sold Inventory',
        // },
        // {
        //   id: 'deal_booking',
        //   numeric: false,
        //   disablePadding: true,
        //   label: 'Deal Booking',
        // },
        // {
        //   id: 'voucher_type',
        //   numeric: false,
        //   disablePadding: true,
        //   label: 'Voucher Type',
        // },
        // {
        //   id: 'claim_start_date',
        //   numeric: false,
        //   disablePadding: true,
        //   label: 'Claim Start Date',
        // },
        // {
        //   id: 'claim_end_date',
        //   numeric: false,
        //   disablePadding: true,
        //   label: 'Claim End Date',
        // },
        {
          id: 'deal_start_date',
          numeric: false,
          disablePadding: true,
          label: 'Deal Start Date',
        },
        {
          id: 'deal_end_date',
          numeric: false,
          disablePadding: true,
          label: 'Deal End Date',
        },
        {
          id: 'deal_status',
          numeric: false,
          disablePadding: true,
          label: 'Deal Status',
        },
        {
          id: 'voucher_list',
          numeric: false,
          disablePadding: true,
          label: 'Voucher List',
        },
      ]);
    } else {
      setFinalCell(headCells);
    }
  }, [filterPayload?.dealtype?.id, i18n]);
  //Table for all deal types(single, bundle, combo)

  return (
    <>
      <Grid item xs={12}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={2}
          marginBottom={'20px'}
        ></Stack>
      </Grid>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/">
          Home
        </Link>
        <Typography color="text.primary">Deals</Typography>{' '}
      </Breadcrumbs>
      <MainCard content={false} title="Deal List">
        <Box
          sx={{
            minWidth: 120,
            position: 'absolute',
            top: '13px',
            right: '11px',
          }}
        >
          <Button variant="outlined" onClick={() => setFilterOpen(true)}>
            Filter by <FilterAltOutlinedIcon />
          </Button>{' '}
          <Filter
            formik={formik}
            filterOpen={filterOpen}
            setFilterOpen={setFilterOpen}
            i18n={i18n}
            setPage={setPage}
          />
        </Box>

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <TableHead>
              <TableRow>
                {finalCell?.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {' '}
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9}>Loading data ...</TableCell>
                </TableRow>
              ) : rows && rows.length > 0 ? (
                rows.map((row: any) => {
                  return (
                    <Row
                      row={row}
                      filterPayload={filterPayload}
                      merchantId={merchantId?.id}
                      excelHandler={excelHandler}
                      isExcelData={isExcelData}
                      excelData={excelData}
                    />
                  );
                })
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={18}>
                    No record found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />
        {/* table data */}
        <TablePagination
          rowsPerPageOptions={paginationOption}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MainCard>
    </>
  );
}

function Row({
  row = [],
  filterPayload,
  merchantId,
  excelHandler,
  isExcelData,
  excelData,
}: any) {
  const [open, setOpen] = React.useState(false);
  let navigate = useNavigate();

  const data: any = {};
  row?.translations?.forEach((item: any) => {
    const columnName = item.column_name;
    const text = item.text;

    if (data[columnName]) {
      data[columnName] += ` ${text}`;
    } else {
      data[columnName] = text;
    }
  });

  //Table for all deal types(single, bundle, combo)
  return (
    <>
      <TableRow hover tabIndex={-1} key={row.id}>
        <TableCell onClick={() => setOpen(!open)}>
          {!open ? <RightOutlined /> : <DownOutlined />}
        </TableCell>

        <TableCell>{row.id}</TableCell>
        <TableCell>{row.title}</TableCell>
        <TableCell>{row.primary_category || '-'}</TableCell>
        <TableCell>
          {filterPayload?.dealtype?.id === 'bundle'
            ? row.display_selling_price
            : row.selling_price}
        </TableCell>
        {filterPayload?.dealtype?.id == 'single' && (
          <>
            <TableCell>
              {row?.dealArea?.map((i: any) => i?.text)?.join(', ') || '-'}
            </TableCell>
            <TableCell>{row?.internal_voucher_limit || 0}</TableCell>
            <TableCell>
              {row?.internal_voucher_limit - row?.internal_voucher_sold || 0}
            </TableCell>
          </>
        )}
        <TableCell>
          {filterPayload?.dealtype?.id !== 'single'
            ? filterPayload?.dealtype?.label
            : row.deal_type}
        </TableCell>
        {/* {filterPayload?.dealtype?.id !== 'single' && (
          <TableCell>
            {filterPayload?.dealtype?.id === 'single'
              ? row?.totalInventorySold
              : '-'}
          </TableCell>
        )} */}
        {filterPayload?.dealtype?.id !== 'single' && (
          <>
            {/* <TableCell>
              {filterPayload?.dealtype?.id === 'single'
                ? row?.is_slot_enabled === 1
                  ? 'Yes'
                  : 'No'
                : '-'}
            </TableCell>
            <TableCell>{row?.voucher_type || '-'}</TableCell>
            <TableCell>
              {filterPayload?.dealtype?.id === 'bundle'
                ? '-'
                : DateFormat(row.claim_start_date)}
            </TableCell>
            <TableCell>
              {filterPayload?.dealtype?.id === 'bundle'
                ? '-'
                : DateFormat(row.claim_end_date)}
            </TableCell> */}
            <TableCell>{DateFormat(row.deal_active_date)}</TableCell>
            <TableCell>{DateFormat(row.deal_end_date)}</TableCell>
            <TableCell>
              {
                // row.sold_out === 1
                //   ? 'Sold out':
                row.active == true ? 'Active' : 'Expired'
              }
            </TableCell>
            <TableCell>
              <>
                <DocsPreviewBtn
                  rowData={row}
                  filterPayload={filterPayload}
                  merchantId={merchantId}
                  excelHandler={excelHandler}
                  isExcelData={isExcelData}
                  excelData={excelData}
                />
              </>
            </TableCell>
          </>
        )}
      </TableRow>
      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={17}>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            sx={{ width: '100%' }}
          >
            {open && (
              <Box
                sx={{
                  py: 3,
                  pl: { xs: 3, sm: 5, md: 6, lg: 10, xl: 12 },
                }}
              >
                <Table size="small" aria-label="purchases">
                  {filterPayload?.dealtype?.id !== 'single' ? (
                    <>
                      {/* bundle child table */}
                      <TableHead>
                        <TableRow>
                          <TableCell>Deals</TableCell>
                          <TableCell>Deal Price</TableCell>
                          <TableCell>Deal Specific Area</TableCell>
                          <TableCell>Total Inventory</TableCell>
                          <TableCell>Available Inventory</TableCell>
                          <TableCell>Sold Inventory</TableCell>
                          <TableCell>Deal Booking</TableCell>
                          <TableCell>Voucher Type</TableCell>
                          <TableCell>Claim Start Date</TableCell>
                          <TableCell>Claim End Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row?.deals?.map((item: any) => {
                          return (
                            <TableRow>
                              <TableCell>
                                {
                                  item.translations?.find(
                                    (ele: any) =>
                                      ele.column_name === 'title_trans_ids'
                                  )?.text
                                }
                              </TableCell>
                              <TableCell>{item.selling_price}</TableCell>
                              <TableCell>{0}</TableCell>
                              <TableCell>{0}</TableCell>
                              <TableCell>{0}</TableCell>
                              <TableCell>
                                {item.totalInventorySold || '-'}
                              </TableCell>
                              <TableCell>
                                {item?.is_slot_enabled === 1 ? 'Yes' : 'No'}
                              </TableCell>
                              <TableCell>{item?.voucher_type || '-'}</TableCell>
                              <TableCell>
                                {DateFormat(item.claim_start_date)}
                              </TableCell>
                              <TableCell>
                                {DateFormat(item.claim_end_date)}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </>
                  ) : (
                    <>
                      {/* Deal table */}
                      <TableHead>
                        <TableRow>
                          <TableCell>Sold Inventory</TableCell>
                          <TableCell>Deal Booking</TableCell>
                          <TableCell>Voucher Type</TableCell>
                          <TableCell>Claim Start Date</TableCell>
                          <TableCell>Claim End Date</TableCell>
                          <TableCell>Deal Start Date</TableCell>
                          <TableCell>Deal End Date</TableCell>
                          <TableCell>Deal Status</TableCell>
                          <TableCell>Voucher List</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            {filterPayload?.dealtype?.id === 'single'
                              ? row?.internal_voucher_sold
                              : '-'}
                          </TableCell>
                          <TableCell>
                            {filterPayload?.dealtype?.id === 'single'
                              ? row?.is_slot_enabled === 1
                                ? 'Yes'
                                : 'No'
                              : '-'}
                          </TableCell>
                          <TableCell>{row?.voucher_type || '-'}</TableCell>
                          <TableCell>
                            {filterPayload?.dealtype?.id === 'bundle'
                              ? '-'
                              : DateFormat(row.claim_start_date)}
                          </TableCell>
                          <TableCell>
                            {filterPayload?.dealtype?.id === 'bundle'
                              ? '-'
                              : DateFormat(row.claim_end_date)}
                          </TableCell>
                          <TableCell>
                            {DateFormat(row.deal_active_date)}
                          </TableCell>
                          <TableCell>{DateFormat(row.deal_end_date)}</TableCell>
                          <TableCell>
                            {row.sold_out === 1
                              ? 'Sold out'
                              : row.active === 1
                              ? 'Active'
                              : 'Expired'}
                          </TableCell>
                          <TableCell>
                            <>
                              <DocsPreviewBtn
                                rowData={row}
                                filterPayload={filterPayload}
                                merchantId={merchantId}
                                excelHandler={excelHandler}
                                isExcelData={isExcelData}
                                excelData={excelData}
                              />
                            </>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </>
                  )}
                </Table>
              </Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
