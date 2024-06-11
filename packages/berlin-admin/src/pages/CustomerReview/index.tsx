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
  Collapse,
  Box,
  Typography,
  Button,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { HeadCell } from '../../../../berlin-merchant/src/types/table';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import MainCard from '../../components/MainCard';
import { ConfirmBoxAlert, DateFormat, paginationOption } from 'berlin-common';
import IconButton from '../../components/@extended/IconButton';
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbarConfig } from '../../store/slice/Loader';
import { Breadcrumbs } from '@mui/material';
import { t } from 'i18next';
import { getReviewList, reviewDelete } from '../../services/reviewService';
import Filter from './filter';
import { FormikProvider, useFormik } from 'formik';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { allDealListDD, getAllUser } from '../../services/dropDownService';
import { merchantActiveList } from '../../services/dropDownService';
import { useTranslation } from 'react-i18next';
import { filterRememberValueHandler } from '../../store/slice/Filter';
import { pageHandler, rowPageHandler } from '../../store/slice/Pagination';

// ==============================|| MUI TABLE - HEADER ||============================== //
const headCells: HeadCell[] = [
  {
    id: 'voucher_id',
    numeric: false,
    disablePadding: true,
    label: 'Voucher ID ( Deal Name )',
  },
  {
    id: 'order_id',
    numeric: false,
    disablePadding: true,
    label: 'Order Id / Number',
  },
  {
    id: 'review_title',
    numeric: false,
    disablePadding: true,
    label: 'Review Title',
  },
  {
    id: 'review_stars',
    numeric: false,
    disablePadding: false,
    label: 'Review Stars',
  },
  {
    id: 'review_stars',
    numeric: false,
    disablePadding: false,
    label: 'Created At',
  },
  {
    id: 'review_stars',
    numeric: false,
    disablePadding: false,
    label: 'Actioned At',
  },
  {
    id: 'approval_status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

// ==============================|| TABLE - DATA TABLE ||============================== //

export default function Review() {
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletePayLoad, setDeletePayLoad] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPayload, setFilterPayload] = useState({});
  const [customerList, setCustomerList] = useState<any>();
  const [dealNames, setDealNames] = useState<any>([]);
  const [merchantList, setMerchantList] = useState<any>();
  const [isLoading, setLoading] = useState(false);
  const { t, i18n } = useTranslation('translation');
  const reviewFilterDetails = useSelector((state: any) => state?.filter);
  const pagenationDetails = useSelector((state: any) => state?.pagination);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      review_stars: null,
      deal_type: null,
      voucher_id: '',
      order_id: '',
      order_number: '',
      userId: null,
      dealName: null,
      merchantId: null,
    },
    onSubmit: async (value) => {
      dispatch(filterRememberValueHandler(value));
      setFilterPayload(value);
      setFilterOpen(false);
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

  const reviewListHandler = () => {
    setLoading(true);
    let payLoad =
      reviewFilterDetails?.filterDetails !== null
        ? reviewFilterDetails?.filterDetails
        : filterPayload;

    getReviewList(
      pagenationDetails?.page,
      pagenationDetails?.rowsPerPage,
      payLoad
    )
      .then((res) => {
        setRows(res?.data?.data?.reviews);
        setTotalCount(res?.data?.data?.totalCount);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteItem = (e: any) => {
    setModalOpen(true);
    setDeletePayLoad(e.id);
  };

  const handleDelete = async () => {
    reviewDelete(deletePayLoad)
      .then((response) => {
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: 'Review deleted successfully',
            varient: 'success',
          })
        );
        reviewListHandler();
        setModalOpen(false);
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
    reviewListHandler();
  }, [pagenationDetails?.page, pagenationDetails?.rowsPerPage, filterPayload,reviewFilterDetails]);

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
        <Typography color="text.primary">Review</Typography>{' '}
      </Breadcrumbs>
      <MainCard content={false} title="Review List">
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
              ) : rows && rows?.length > 0 ? (
                rows?.map((row: any) => {
                  if (row?.deal?.length > 0) {
                    const title_en = row?.deal?.find(
                      (ele: any) =>
                        ele?.locale === 'en' &&
                        ele?.column_name === 'title_trans_ids'
                    );
                    const title_ar = row?.deal?.find(
                      (ele: any) =>
                        ele?.locale === 'ar' &&
                        ele?.column_name === 'title_trans_ids'
                    );
                    row.deal_Name = `${title_en?.text ?? ''} ${
                      title_ar?.text ?? ''
                    }`;
                  }
                  return (
                    <Row key={row?.id} row={row} deleteItem={deleteItem} />
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
        {/* table data */}
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
      <ConfirmBoxAlert
        title={'Delete'}
        handleClose={() => setModalOpen(false)}
        message={'Do you want to delete this Review ?'}
        open={modalOpen}
        submitHandler={handleDelete}
      />
    </>
  );
}

function Row({ row = [], deleteItem }: any) {
  const navigate = useNavigate();

  const updateFormById = (id: any) => {
    navigate(`/reviewlist/update/${id}`);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} key={row.id}>
        <TableCell>
          {row?.voucher_id} ({row?.deal_Name})
        </TableCell>
        <TableCell>
          {row?.order_id != undefined &&
            `${row?.order_id} / ${row?.order?.order_number}`}
        </TableCell>
        <TableCell>{row?.review_title}</TableCell>
        <TableCell>{row?.review_stars}</TableCell>
        <TableCell>{DateFormat(row?.created_at)}</TableCell>
        <TableCell>{DateFormat(row?.actioned_at)}</TableCell>
        <TableCell>
          {row?.approval_status === 'PENDING_APPROVAL'
            ? 'PENDING APPROVAL'
            : row?.approval_status}
        </TableCell>
        <TableCell align="right">
          <Box display={'flex'} justifyContent={'end'} gap={3}>
            <IconButton
              title={t('EDIT')}
              variant="light"
              color="info"
              onClick={() => updateFormById(row.id)}
            >
              <EditOutlined />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
}
