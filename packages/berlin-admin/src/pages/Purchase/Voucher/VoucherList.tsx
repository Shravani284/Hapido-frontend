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
} from '@mui/material';
import { HeadCell } from '../../../types/table';
import { Link, useNavigate } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
import { path } from '../../../routes/Routers';
import { paginationOption } from 'berlin-common';
import { getAllVoucher } from '../../../services/purchaseServices';
import { useFormik } from 'formik';
import { Filter } from './filter';
import { Box } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { allDealListDD, getAllUser } from '../../../services/dropDownService';
import { merchantActiveList } from '../../../services/dropDownService';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { filterRememberValueHandler } from '../../../store/slice/Filter';
import { pageHandler, rowPageHandler } from '../../../store/slice/Pagination';

const headCells: HeadCell[] = [
  {
    id: 'order_id',
    numeric: false,
    disablePadding: true,
    label: 'Order ID/Number ',
  },
  {
    id: 'code',
    numeric: false,
    disablePadding: true,
    label: 'Voucher Code (Type) ',
  },
  {
    id: 'merchant',
    numeric: false,
    disablePadding: true,
    label: 'Merchant',
  },
  {
    id: 'issued_by',
    numeric: false,
    disablePadding: true,
    label: 'Issued by',
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
    id: 'voucher_status',
    numeric: false,
    disablePadding: true,
    label: 'Voucher Status',
  },
];

const VoucherList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [dense] = React.useState(false);
  const [isLoading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPayload, setFilterPayload] = useState({});
  const [merchantList, setMerchantList] = useState<any>();
  const [customerList, setCustomerList] = useState<any>();
  const [dealNames, setDealNames] = useState<any>([]);
  const { t, i18n } = useTranslation('translation');
  const voucherFilterDetails = useSelector((state: any) => state?.filter);
  const pagenationDetails = useSelector((state: any) => state?.pagination);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      order_id: '',
      order_number: '',
      user_platform: null,
      code: '',
      voucher_id: '',
      userId: null,
      merchantId: null,
      is_booking_slot_voucher: false,
      voucher_status: null,
      deal_type: null,
      dealName: null,
    },
    onSubmit: async (value) => {
      dispatch(filterRememberValueHandler(value));
      setFilterPayload(value);
      setFilterOpen(false);
      setPage(0);
    },
  });

  const getVouchers = () => {
    setLoading(true);
    let payLoad =
      voucherFilterDetails?.filterDetails !== null
        ? voucherFilterDetails?.filterDetails
        : filterPayload;

    getAllVoucher(
      pagenationDetails?.page,
      pagenationDetails?.rowsPerPage,
      payLoad
    )
      .then((response) => {
        const allVouchersData = response.data;
        const allVouchers = allVouchersData.vouchers?.map((item: any) => {
          const obj = { ...item };
          if (item.merchant.merchanttranslation.length > 0) {
            const title_en = item.merchant.merchanttranslation.find(
              (ele: any) => ele.locale === 'en' && ele.column_name === 'name'
            );

            obj.title = `${title_en?.text ?? ''}`;
          }
          return obj;
        });

        setRows(allVouchers);
        setTotalCount(allVouchersData.totalCount);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getVouchers();
  }, [
    pagenationDetails?.page,
    pagenationDetails?.rowsPerPage,
    filterPayload,
    voucherFilterDetails?.filterDetails,
  ]);

  const getMerchantNames = () => {
    merchantActiveList(i18n.language)
      .then((res) => {
        setMerchantList(res?.data?.data?.marchants);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

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
    getMerchantNames();
    getCustomerNames();
  }, []);

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
  }, [page, rowsPerPage, formik.values?.deal_type?.id]);

  const handleVoucherDetails = (id: number) => {
    // navigate(path.VOUCHERDETAILSPAGE);
    navigate(`/purchase/voucherlist/${id}`);
  };

  // const handleChangePage = (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
  //   newPage: number
  // ) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  // ) => {
  //   setRowsPerPage(parseInt(event?.target.value!, 10));
  //   setPage(0);
  // };
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
      <Grid mt={2} item xs={12}>
        <MainCard content={false} title="Voucher">
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
              merchantList={merchantList}
              customerList={customerList}
              dealNames={dealNames}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
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
                        // handleVoucherDetails={() =>
                        //   handleVoucherDetails(row.id)
                        // }
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
  //   const [open, setOpen] = React.useState(false);
  const handleVoucherDetails = (id: number) => {
    // navigate(path.VOUCHERDETAILSPAGE);
    return `/purchase/voucherlist/${id}`;
  };
  return (
    <>
      <TableRow>
        <TableCell>
          {row?.order_id != undefined &&
            `${row?.order_id} / ${row?.order_number}`}
        </TableCell>
        <TableCell>
          {row?.code} ({row?.voucher_type})
        </TableCell>
        <TableCell>{row?.title}</TableCell>
        <TableCell>{row?.template_type}</TableCell>
        <TableCell>{row?.user_email}</TableCell>
        <TableCell>{row?.user_platform}</TableCell>
        <TableCell>{row?.voucher_status}</TableCell>
        <TableCell>
          <Link to={handleVoucherDetails(row.id)}>
            <RightOutlined />
          </Link>
        </TableCell>
      </TableRow>
    </>
  );
}

export default VoucherList;
