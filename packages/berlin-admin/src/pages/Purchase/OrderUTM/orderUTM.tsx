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
  Button,
  Box,
} from '@mui/material';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeadCell } from '../../../types/table';
import MainCard from '../../../components/MainCard';
import { getAllOrderUTM } from '../../../services/purchaseServices';
import { DateFormat, paginationOption } from 'berlin-common';
import { TablePagination } from '@mui/material';
import { Divider } from '@mui/material';
import { TableBody } from '@mui/material';
import { IdcardOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { Filter } from './filter';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import usePermission from '../../../components/Permission/usePermission';
import { useDispatch, useSelector } from 'react-redux';
import { pageHandler, rowPageHandler } from '../../../store/slice/Pagination';
import { filterRememberValueHandler } from '../../../store/slice/Filter';

const headCells: HeadCell[] = [
  {
    id: 'order_id',
    numeric: false,
    disablePadding: true,
    label: 'Order ID',
  },
  {
    id: 'order_number',
    numeric: false,
    disablePadding: true,
    label: 'Order Number',
  },
  {
    id: 'created_at',
    numeric: false,
    disablePadding: true,
    label: 'Affiliation Date',
  },
  {
    id: 'utm_source',
    numeric: false,
    disablePadding: true,
    label: 'UTM Source',
  },
  {
    id: 'utm_medium',
    numeric: false,
    disablePadding: true,
    label: 'UTM Medium',
  },
  {
    id: 'utm_campaign',
    numeric: false,
    disablePadding: true,
    label: 'UTM Campaign',
  },
  {
    id: 'utm_terms',
    numeric: false,
    disablePadding: true,
    label: 'UTM Terms',
  },
  {
    id: 'utm_content',
    numeric: false,
    disablePadding: true,
    label: 'UTM Content',
  },
];

const orderUTM = () => {
  const { permission } = usePermission('ORDER_UTM');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [dense] = React.useState(false);
  const [isLoading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPayload, setFilterPayload] = useState({});
  const dispatch = useDispatch();
  const orderUtmFilterDetails = useSelector((state: any) => state?.filter);
  const pagenationDetails = useSelector((state: any) => state?.pagination);

  const formik = useFormik({
    initialValues: {
      order_id: '',
      order_number: '',
      utm_campaign: '',
      utm_medium: '',
      utm_source: '',
      // affiliation_date: null,
    },
    onSubmit: async (value) => {
      setFilterPayload(value);
      setFilterOpen(false);
      dispatch(filterRememberValueHandler(value));
      dispatch(pageHandler(0));
    },
  });
  const getOrderUTM = () => {
    setLoading(true);
    let payLoad =
      orderUtmFilterDetails?.filterDetails !== null
        ? orderUtmFilterDetails?.filterDetails
        : filterPayload;
    getAllOrderUTM(
      pagenationDetails?.page,
      pagenationDetails?.rowsPerPage,
      payLoad
    )
      .then((response) => {
        setRows(response.data.utm);
        setTotalCount(response.data.totalCount);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getOrderUTM();
  }, [
    pagenationDetails?.page,
    pagenationDetails?.rowsPerPage,
    filterPayload,
    orderUtmFilterDetails,
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
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary">Order UTM</Typography>
      </Breadcrumbs>
      <Grid item mt={2} xs={12}>
        <MainCard content={false} title="Order UTM">
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
              // customerList={customerList}
              // dealNames={dealNames}
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
  //   const [open, setOpen] = React.useState(false);
  // { row, index }: any
  return (
    <>
      <TableRow>
        <TableCell>{row?.order_id}</TableCell>
        <TableCell>{row?.order_number}</TableCell>
        <TableCell>{DateFormat(row?.created_at)}</TableCell>
        <TableCell>{row?.utm_source}</TableCell>
        <TableCell>{row?.utm_medium}</TableCell>
        <TableCell>{row?.utm_campaign}</TableCell>
        <TableCell>{row?.utm_terms}</TableCell>
        <TableCell>{row?.utm_content}</TableCell>
      </TableRow>
    </>
  );
}

export default orderUTM;
