import React, { useEffect, useState } from 'react';
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  Breadcrumbs,
  Typography,
  Button,
  Grid,
  Stack,
  TableSortLabel,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { getPurchesesVoucherList } from '../../../services/purchesesVoucherService';
import MainCard from '../../../components/MainCard';
import { DateFormat, SortHeader, paginationOption } from 'berlin-common';
import VoucherFilter from '../Voucherfilter';
import useConfig from '../../../hooks/useConfig';
import { useFormik } from 'formik';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

export type HeadCell = {
  id: string;
  numeric: boolean;
  label: string;
  disablePadding?: string | boolean | undefined;
  align?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
  disableSort?: boolean;
};

const headCells: HeadCell[] = [
  {
    id: 'sr_no',
    numeric: false,
    disablePadding: true,
    label: 'S NO.',
    disableSort: true,
  },
  {
    id: 'deal_id',
    numeric: false,
    disablePadding: true,
    label: 'Deal Id',
  },
  {
    id: 'dealName',
    numeric: false,
    disablePadding: true,
    label: 'Deal Name',
  },
  {
    id: 'deal_category',
    numeric: false,
    disablePadding: true,
    label: 'Voucher Amount ',
  },
  {
    id: 'created_at',
    numeric: false,
    disablePadding: true,
    label: 'Order Creation Date',
  },
  {
    id: 'order_id',
    numeric: false,
    disablePadding: true,
    label: 'Order ID',
  },
  {
    id: 'code',
    numeric: false,
    disablePadding: true,
    label: 'Voucher Code',
  },
  {
    id: 'dealArea',
    numeric: false,
    disablePadding: true,
    label: 'Deal Specific Area',
  },
  {
    id: 'booking_date',
    numeric: false,
    disablePadding: true,
    label: 'Booking Date',
  },
  {
    id: 'voucher_status',
    numeric: false,
    disablePadding: true,
    label: 'Voucher Status',
  },
];

export default function PurchasesVoucher() {
  const [order, setOrder] = useState('ASC');
  const [orderBy, setOrderBy] = useState('id');
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPayload, setFilterPayload] = useState<any>({});
  const { i18n } = useConfig();
  const formik = useFormik({
    initialValues: {
      dealName: '',
      category: null,
      voucherCode: '',
      startOrderDate: '',
      endOrderDate: '',
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

  const getpurchesesHandler = () => {
    setLoading(true);
    getPurchesesVoucherList(page, rowsPerPage, i18n, filterPayload)
      .then((res) => {
        setRows(res?.data?.data?.vouchers);
        setTotalCount(res?.data?.data?.totalCount);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getpurchesesHandler();
  }, [page, rowsPerPage, i18n, filterPayload]);

  const handleSort = (columnName: string) => {
    const isAsc = orderBy === columnName && order === 'ASC';
    setOrder(isAsc ? 'DESC' : 'ASC');
    setOrderBy(columnName);
  };

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
        <Typography color="text.primary">Purchases Voucher List</Typography>{' '}
      </Breadcrumbs>
      <MainCard content={false} title="Purchases Voucher List">
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
          <VoucherFilter
            formik={formik}
            filterOpen={filterOpen}
            setFilterOpen={setFilterOpen}
            i18n={i18n}
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
                  <SortHeader
                    headCell={headCell}
                    orderBy={orderBy}
                    order={order}
                    handleSort={handleSort}
                  />
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {' '}
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5}>Loading data ...</TableCell>
                </TableRow>
              ) : rows && rows.length > 0 ? (
                rows.map((row: any, index: number) => {
                  return (
                    <Row
                      row={row}
                      key={index}
                      sr={page * rowsPerPage + 1 + index}
                    />
                  );
                })
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={10}>
                    No record found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />

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

function Row({ row = [], sr }: any) {
  return (
    <>
      <TableRow hover tabIndex={-1} key={row?.id}>
        <TableCell>{sr}</TableCell>
        <TableCell>{row?.deal_id}</TableCell>
        <TableCell>{row?.dealName}</TableCell>
        <TableCell>{row?.voucher_amount}</TableCell>
        <TableCell>
          {row?.created_at ? DateFormat(row?.created_at) : null}
        </TableCell>
        <TableCell>{row?.order_id}</TableCell>
        <TableCell>{row?.code}</TableCell>
        <TableCell>{row?.dealArea?.text ? row?.dealArea?.text : '-'}</TableCell>
        <TableCell>
          {row?.booking_date ? DateFormat(row?.booking_date) : '-'}
        </TableCell>
        <TableCell>{row?.voucher_status}</TableCell>
      </TableRow>
    </>
  );
}
