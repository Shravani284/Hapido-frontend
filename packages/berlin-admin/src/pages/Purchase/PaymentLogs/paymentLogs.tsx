import {
  Box,
  Divider,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Breadcrumbs } from '@mui/material';
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TableCell } from '@mui/material';
import MainCard from '../../../components/MainCard';
import { HeadCell } from '../../../types/table';
import { TablePagination } from '@mui/material';
import { paginationOption } from 'berlin-common';
import { getAllPaymentLogs } from '../../../services/purchaseServices';
import { RightOutlined } from '@ant-design/icons';
import { path } from '../../../routes/Routers';
import { Button } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

import { useFormik } from 'formik';
import { Filter } from './filter';
import usePermission from '../../../components/Permission/usePermission';
import { useDispatch, useSelector } from 'react-redux';
import { filterRememberValueHandler } from '../../../store/slice/Filter';
import { pageHandler, rowPageHandler } from '../../../store/slice/Pagination';

const headCells: HeadCell[] = [
  {
    id: 'order_id',
    numeric: false,
    disablePadding: true,
    label: 'Order ID',
  },
  {
    id: 'method',
    numeric: false,
    disablePadding: true,
    label: 'Method',
  },
];

const paymentLogs = () => {
  // const { permission } = usePermission('PAYMENT');

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [rows, setRows] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPayload, setFilterPayload] = useState({});
  // const [customerList, setCustomerList] = useState<any>();
  const dispatch = useDispatch();
  const paymentLogFilterDetails = useSelector((state: any) => state?.filter);
  const pagenationDetails = useSelector((state: any) => state?.pagination);

  const formik = useFormik({
    initialValues: {
      order_id: '',
      order_number: '',
      for: null,
      start_date: null,
      end_date: null,
      paidStartDate: null,
      paidEndDate: null,
      payment_status: null,
      transaction_reference: '',
    },
    onSubmit: async (value) => {
      setFilterPayload(value);
      setFilterOpen(false);
      dispatch(filterRememberValueHandler(value));
      dispatch(pageHandler(0));
    },
  });

  const getPaymentLogos = () => {
    setLoading(true);
    let payLoad =
      paymentLogFilterDetails?.filterDetails !== null
        ? paymentLogFilterDetails?.filterDetails
        : filterPayload;
    getAllPaymentLogs(
      pagenationDetails?.page,
      pagenationDetails?.rowsPerPage,
      payLoad
    )
      .then((response) => {
        setRows(response.data.paymentLogs);
        setTotalCount(response.data.totalCount);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPaymentLogos();
  }, [
    pagenationDetails?.page,
    pagenationDetails?.rowsPerPage,
    filterPayload,
    paymentLogFilterDetails,
  ]);

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
  const [dense] = useState(false);
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary">Payment Logs</Typography>
      </Breadcrumbs>
      <Grid mt={2} item xs={12}>
        <MainCard content={false} title="Payment Logs">
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
                        // handlePaymentLogs={() => handlePaymentLogs(row.id)}
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
  const handlePaymentLogs = (id: number) => {
    return `/purchase/paymentlogs/${id}`;
  };
  return (
    <>
      <TableRow>
        {/* <TableCell>{row?.order_id}</TableCell> */}
        <TableCell>
          {row?.order_id != undefined &&
            `${row?.order_id} / ${row?.order_number}`}
        </TableCell>

        <TableCell>{row?.method}</TableCell>
        <TableCell style={{ textAlign: 'right' }}>
          <Link to={handlePaymentLogs(row.id)}>
            <RightOutlined
              style={{ textAlign: 'center' }}
              // onClick={handlePaymentLogs}
            />
          </Link>
        </TableCell>
      </TableRow>
    </>
  );
}

export default paymentLogs;
