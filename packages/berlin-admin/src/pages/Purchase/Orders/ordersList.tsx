import React, { useEffect, useState } from 'react';
import MainCard from '../../../components/MainCard';

import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Grid,
  Button,
  TablePagination,
  Divider,
  Stack,
  Breadcrumbs,
  Typography,
  TableBody,
  Box,
} from '@mui/material';
import { HeadCell } from '../../../types/table';
import { Link, useNavigate } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
import { path } from '../../../routes/Routers';
import { DateFormat, paginationOption } from 'berlin-common';
import { getAllOrders } from '../../../services/purchaseServices';
import Filter from './filter';
import { useFormik } from 'formik';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { getAllUser } from '../../../services/dropDownService';
import { useDispatch, useSelector } from 'react-redux';
import { filterRememberValueHandler } from '../../../store/slice/Filter';
import { pageHandler, rowPageHandler } from '../../../store/slice/Pagination';

const headCells: HeadCell[] = [
  {
    id: 'order_number',
    numeric: false,
    disablePadding: true,
    label: 'Order ID/Number',
  },
  // {
  //   id: 'payment_method',
  //   numeric: false,
  //   disablePadding: true,
  //   label: 'Payment Method',
  // },
  {
    id: 'payment_status',
    numeric: false,
    disablePadding: true,
    label: 'Payment Status',
  },
  {
    id: 'order_total',
    numeric: false,
    disablePadding: true,
    label: 'Order Total',
  },
  {
    id: 'coupon_discount',
    numeric: false,
    disablePadding: true,
    label: 'Coupon Discount',
  },
  {
    id: 'total_paid',
    numeric: false,
    disablePadding: true,
    label: 'Total Paid',
  },
  {
    id: 'user_email',
    numeric: false,
    disablePadding: true,
    label: 'Customer Email',
  },
  {
    id: 'user_platform',
    numeric: false,
    disablePadding: true,
    label: 'User Platform',
  },
  {
    id: 'created_at',
    numeric: false,
    disablePadding: true,
    label: 'Date Created',
  },
  {
    id: 'date_paid',
    numeric: false,
    disablePadding: true,
    label: ' Date Paid ',
  },
];

const ordersList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [dense] = React.useState(false);
  const [isLoading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPayload, setFilterPayload] = useState({});
  const [customerList, setCustomerList] = useState<any>();
  const dispatch = useDispatch();
  const orderFilterDetails = useSelector((state: any) => state?.filter);
  const pagenationDetails = useSelector((state: any) => state?.pagination);

  const formik = useFormik({
    initialValues: {
      order_id: '',
      order_number: '',
      user_platform: null,
      start_date: null,
      end_date: null,
      paidStartDate: null,
      paidEndDate: null,
      payment_status: null,
      transaction_reference: '',
      user_id: null,
    },
    onSubmit: async (value) => {
      dispatch(filterRememberValueHandler(value));
      setFilterPayload(value);
      dispatch(pageHandler(0));
      setFilterOpen(false);
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
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const getOrders = () => {
    setLoading(true);
    let payLoad =
      orderFilterDetails?.filterDetails !== null
        ? orderFilterDetails?.filterDetails
        : filterPayload;
    getAllOrders(
      pagenationDetails?.page,
      pagenationDetails?.rowsPerPage,
      payLoad
    )
      .then((response) => {
        setRows(response.data.orders);
        setTotalCount(response.data.totalCount);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getOrders();
  }, [
    pagenationDetails?.page,
    pagenationDetails?.rowsPerPage,
    filterPayload,
    orderFilterDetails,
  ]);

  const getCustomerNames = () => {
    getAllUser()
      .then((response) => {
        const manipulatedResponse = response.map((item) => {
          return {
            ...item,
            label: item.user_email,
          };
        });

        setCustomerList(manipulatedResponse);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCustomerNames();
  }, []);

  return (
    <div>
      <Grid mt={2} item xs={12}>
        <MainCard content={false} title="Orders">
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
              // dealNames={dealNames}
              // merchantList={merchantList}
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
                    return (
                      <Row
                        key={row.id}
                        row={row}
                        // handleOrderDetails={() => handleOrderDetails(row.id)}
                      />
                    );
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
  const handleOrderDetails = (id: number) => {
    return `/purchase/orderslist/${id}`;
  };
  return (
    <>
      <TableRow>
        <TableCell>
          {/* {row?.id}/{row?.order_number} */}
          {row?.id != undefined && `${row?.id} / ${row?.order_number}`}
        </TableCell>
        {/* <TableCell>{row?.payment_method ? row?.payment_method : '-'}</TableCell> */}
        <TableCell>{row?.payment_status}</TableCell>
        <TableCell>{row?.total_price}</TableCell>
        <TableCell>{row?.coupon_discount}</TableCell>
        <TableCell>{row?.total_paid}</TableCell>
        <TableCell>{row?.user_email}</TableCell>
        <TableCell>{row?.user_platform}</TableCell>
        <TableCell>
          {row?.created_at ? DateFormat(row?.created_at) : '-'}
        </TableCell>
        <TableCell>
          {row?.date_paid ? DateFormat(row?.date_paid) : '-'}
        </TableCell>
        <TableCell>
          <Link to={handleOrderDetails(row.id)}>
            <RightOutlined />
          </Link>
        </TableCell>
      </TableRow>
    </>
  );
}

export default ordersList;
