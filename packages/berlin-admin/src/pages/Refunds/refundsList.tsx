import React, { useEffect, useState } from 'react';
import {
  Stack,
  Breadcrumbs,
  Typography,
  Grid,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Divider,
  Button,
} from '@mui/material';
import { HeadCell } from '../../types/table';
import { Link, useNavigate } from 'react-router-dom';
import MainCard from '../../components/MainCard';
import { TablePagination } from '@mui/material';
import {
  MagicDropDown,
  NormalTextField,
  paginationOption,
} from 'berlin-common';
import { t } from 'i18next';
import { EditOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';
import IconButton from '../../components/@extended/IconButton';
import { getAllRefundList } from '../../services/refundService';

import { FormikProvider, useFormik } from 'formik';
import Filter from './filter';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { allDealListDD, getAllUser } from '../../services/dropDownService';
import { merchantActiveList } from '../../services/dropDownService';
import { useTranslation } from 'react-i18next';
import usePermission from '../../components/Permission/usePermission';
import { useDispatch, useSelector } from 'react-redux';
import { filterRememberValueHandler } from '../../store/slice/Filter';
import { pageHandler, rowPageHandler } from '../../store/slice/Pagination';

const headCells: HeadCell[] = [
  {
    id: 'voucher_id',
    numeric: false,
    disablePadding: true,
    label: 'Voucher Id (Deal Name)',
  },
  {
    id: 'order_id',
    numeric: false,
    disablePadding: true,
    label: 'Order Id / Number',
  },
  // {
  //   id: 'payment_method',
  //   numeric: false,
  //   disablePadding: true,
  //   label: 'Payment Method',
  // },
  {
    id: 'refund_amount',
    numeric: false,
    disablePadding: true,
    label: 'Refund Amount',
  },
  {
    id: 'refund_status',
    numeric: false,
    disablePadding: true,
    label: 'Refund Status',
  },

  {
    id: 'currency',
    numeric: false,
    disablePadding: true,
    label: 'Currency',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

const refundsList = () => {
  const [dense] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [merchantList, setMerchantList] = useState<any>();
  const [customerList, setCustomerList] = useState<any>();
  const [dealNames, setDealNames] = useState<any>([]);
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPayload, setFilterPayload] = useState({});
  const { t, i18n } = useTranslation('translation');
  const refundFilterDetails = useSelector((state: any) => state?.filter);
  const pagenationDetails = useSelector((state: any) => state?.pagination);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      refund_status: null,
      deal_type: null,
      voucher_id: '',
      order_id: '',
      order_number: '',
      userId: null,
      dealName: null,
      merchantId: null,
    },
    onSubmit: async (value) => {
      setFilterPayload(value);
      setFilterOpen(false);
      dispatch(filterRememberValueHandler(value));
      dispatch(pageHandler(0));
    },
  });

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    dispatch(pageHandler(newPage));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    dispatch(pageHandler(0));
    dispatch(rowPageHandler(parseInt(event?.target.value!, 10)));
  };

  const getRefundList = () => {
    setLoading(true);
    let payLoad =
      refundFilterDetails?.filterDetails !== null
        ? refundFilterDetails?.filterDetails
        : filterPayload;
    getAllRefundList(
      pagenationDetails?.page,
      pagenationDetails?.rowsPerPage,
      payLoad
    )
      .then((response) => {
        setRows(response.data.refundsArray);
        setTotalCount(response.data.totalCount);
        setLoading(false);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const getCustomerNames = () => {
    getAllUser()
      .then((response) => {
        setCustomerList(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMerchantNames = () => {
    merchantActiveList(i18n.language)
      .then((response) => {
        setMerchantList(response.data.data.marchants);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getMerchantNames();
  }, []);

  useEffect(() => {
    getCustomerNames();
  }, []);
  useEffect(() => {
    getRefundList();
  }, [
    pagenationDetails?.page,
    pagenationDetails?.rowsPerPage,
    filterPayload,
    refundFilterDetails,
  ]);

  useEffect(() => {
    if (formik.values?.deal_type?.id) {
      allDealListDD(formik.values?.deal_type.id)
        .then((res) => {
          if (res?.success == true) {
            setDealNames(res?.data?.allDeals);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [formik.values?.deal_type?.id]);

  return (
    <div>
      <Grid container></Grid>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary">Refunds</Typography>
      </Breadcrumbs>

      <Grid item mt={3} xs={12} sm={12}>
        <MainCard content={false} title="Refunds">
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
            </Button>
            <Filter
              formik={formik}
              filterOpen={filterOpen}
              setFilterOpen={setFilterOpen}
              customerList={customerList}
              dealNames={dealNames}
              merchantList={merchantList}
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
                  {headCells.map((headCell) => (
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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6}>Loading data ...</TableCell>
                  </TableRow>
                ) : rows && rows.length > 0 ? (
                  rows?.map((row: any) => {
                    if (row.dealName.length > 0) {
                      const title_en = row.dealName.find(
                        (ele: any) =>
                          ele.locale === 'en' &&
                          ele.column_name === 'title_trans_ids'
                      );
                      const title_ar = row.dealName.find(
                        (ele: any) =>
                          ele.locale === 'ar' &&
                          ele.column_name === 'title_trans_ids'
                      );
                      row.deal_Name = `${title_en?.text ?? ''} ${
                        title_ar?.text ?? ''
                      }`;
                    }
                    return <Row key={row.id} row={row} />;
                  })
                ) : (
                  <>
                    <TableRow>
                      <TableCell align="center" colSpan={6}>
                        No record found.
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider />
          <TablePagination
            rowsPerPageOptions={paginationOption}
            component="div"
            count={totalCount}
            rowsPerPage={pagenationDetails?.rowsPerPage}
            page={pagenationDetails?.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </MainCard>
      </Grid>
    </div>
  );
};

function Row({ row }: any) {
  const handleRefund = (id: number) => {
    return `/refunds/${id}`;
  };
  return (
    <>
      <TableRow>
        <TableCell>
          {/* {row?.voucher_id} ({row?.deal_Name}) */}
          {row?.voucher_id} - {row?.deal_type} -{' '}
          {row?.deal_type == 'SINGLE'
            ? row?.single_deal_name
            : row?.deal_type == 'BUNDLE'
            ? `${row?.single_deal_name}(${row?.bundle_parent_name})`
            : `${row?.single_deal_name}(${row?.combo_parent_name})`}
        </TableCell>
        <TableCell>
          {row?.order_id != undefined &&
            `${row?.order_id} / ${row?.order_number}`}
        </TableCell>
        {/* <TableCell>{row?.payment_method}</TableCell> */}
        <TableCell>{row?.refund_amount}</TableCell>
        <TableCell>{row?.refund_status}</TableCell>
        <TableCell>{row?.currency}</TableCell>
        <TableCell align="right">
          <Box display={'flex'} justifyContent={'end'} gap={3}>
            {/* {(permission === 'WRITE' || permission === 'FULL') && ( */}
            {/* {permission === 'FULL' && ( */}
            <Link to={handleRefund(row?.refund_id)}>
              <IconButton
                title={t('EDIT')}
                variant="light"
                color="info"
                // onClick={() => handleRefund(row.id)}
              >
                <EditOutlined />
              </IconButton>
            </Link>
            {/* )} */}
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
}

export default refundsList;

// updateRefundById
