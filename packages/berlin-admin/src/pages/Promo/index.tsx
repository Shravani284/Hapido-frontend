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
  Button,
  Box,
  Breadcrumbs,
  Typography,
  Collapse,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { HeadCell } from '../../../../berlin-merchant/src/types/table';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import MainCard from '../../components/MainCard';
import { ConfirmBoxAlert, paginationOption } from 'berlin-common';
import IconButton from '../../components/@extended/IconButton';
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { getAllPROMO, updatePromo } from '../../services/promoService';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbarConfig } from '../../store/slice/Loader';
import { t } from 'i18next';
import { TranslationType } from '../category/constants/types';
import Permission from '../../components/Permission';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Filter from './filter';
import { useFormik } from 'formik';
import usePermission from '../../components/Permission/usePermission';
import { filterRememberValueHandler } from '../../store/slice/Filter';
import { pageHandler, rowPageHandler } from '../../store/slice/Pagination';

const headCells: HeadCell[] = [
  {
    id: 'code',
    numeric: false,
    disablePadding: true,
    label: 'Code',
  },
  {
    id: 'type_scope',
    numeric: false,
    disablePadding: true,
    label: 'Type-Scope',
  },
  {
    id: 'discount_value',
    numeric: false,
    disablePadding: false,
    label: 'Discount Value',
  },
  {
    id: 'reusable',
    numeric: false,
    disablePadding: false,
    label: 'Reusable',
  },
  {
    id: 'used_count',
    numeric: false,
    disablePadding: false,
    label: 'Used Count',
  },
  {
    id: 'max_usage',
    numeric: false,
    disablePadding: false,
    label: 'Max Usage',
  },
  {
    id: 'platform',
    numeric: false,
    disablePadding: false,
    label: 'Platform',
  },
  {
    id: 'active_now',
    numeric: false,
    disablePadding: false,
    label: 'Active Now',
  },
  {
    id: 'active',
    numeric: false,
    disablePadding: false,
    label: 'Active',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

// ==============================|| MUI TABLE - HEADER ||============================== //

// ==============================|| TABLE - DATA TABLE ||============================== //

export default function PromoList() {
  const userFilterDetails = useSelector((state: any) => state?.filter);
  const pagenationDetails = useSelector((state: any) => state?.pagination);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const { permission } = usePermission('PROMO_CODE');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletePayLoad, setDeletePayLoad] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPayload, setFilterPayload] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      code: '',
      coupon_type: null,
      coupon_scope: null,
      is_reusable: null,
      first_purchase_only: null,
      user_id: null,
      platform: null,
      active: null,
      active_date: null,
      end_date: null,
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

  // avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const getPromo = () => {
    setLoading(true);
    let payLoad =
      userFilterDetails?.filterDetails !== null
        ? userFilterDetails?.filterDetails
        : filterPayload;
    getAllPROMO(
      pagenationDetails?.page + 1,
      pagenationDetails?.rowsPerPage,
      payLoad
    )
      .then((res) => {
        setRows(res.data.promos);
        setTotalCount(res.data.totalCount);
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

  const handleDelete = () => {
    const payLoad = {
      id: deletePayLoad,
      soft_delete: true,
    };
    updatePromo(payLoad)
      .then((response) => {
        getPromo();
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: 'Promo deleted successfully',
            varient: 'success',
          })
        );
        setModalOpen(false);
      })
      .catch((error) => {
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: error.response.data.error.message.code
              ? error.response.data.error.message.code
              : 'Something went wrong',
            varient: 'error',
          })
        );
      });
  };
  const updateFormById = (id: any) => {
    navigate(`/promo/update/${id}`);
  };

  useEffect(() => {
    getPromo();
  }, [
    pagenationDetails?.page,
    pagenationDetails?.rowsPerPage,
    filterPayload,
    userFilterDetails?.filterDetails,
  ]);

  return (
    <>
      <Grid item xs={12}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={2}
          marginBottom={'20px'}
        >
          {(permission === 'WRITE' || permission === 'FULL') && (
            <Link className="addBtn" to={'/promo/add'}>
              {/* <Button
                variant="contained"
                size="large"
                type="submit"  
                 onClick={() => navigate('/promo/add')}
              > */}
              Add Promo
              {/* </Button> */}
            </Link>
          )}
        </Stack>
      </Grid>
      <MainCard content={false} title="Promo List">
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={10}>Loading data ...</TableCell>
                </TableRow>
              ) : rows && rows.length > 0 ? (
                rows?.map((row: any) => {
                  return (
                    <Row
                      key={row.id}
                      row={row}
                      deleteItem={deleteItem}
                      permission={permission}
                    />
                  );
                })
              ) : (
                <>
                  <TableRow>
                    <TableCell align="center" colSpan={10}>
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
        message={'Do you want to delete this Promo ?'}
        open={modalOpen}
        submitHandler={handleDelete}
      />
    </>
  );
}

function Row({ row = [], deleteItem, permission }: any) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const updateFormById = (id: any) => {
    return `/promo/update/${id}`;
  };
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

  return (
    <>
      <TableRow hover tabIndex={-1} key={row.id}>
        <TableCell>{row?.code}</TableCell>
        <TableCell>{`${row?.coupon_type}-${row?.coupon_scope}`}</TableCell>
        <TableCell>{`${row?.value} - ${row?.coupon_application_type}`}</TableCell>

        <TableCell>{row?.is_reusable === true ? 'Yes' : 'No'}</TableCell>
        <TableCell>{row?.used_count}</TableCell>
        <TableCell>{row?.limit_per_coupon}</TableCell>
        <TableCell>{row?.platform}</TableCell>
        <TableCell>{row?.active_now === 'Yes' ? 'Yes' : 'No'}</TableCell>
        <TableCell>{row?.active === true ? 'Active' : 'Inactive'}</TableCell>

        <TableCell align="right">
          <Box display={'flex'} justifyContent={'end'} gap={3}>
            <Link to={updateFormById(row.id)}>
              <IconButton
                title={t('EDIT')}
                variant="light"
                color="info"
                // onClick={() => updateFormById(row.id)}
              >
                <EditOutlined />
              </IconButton>
            </Link>
            {permission === 'FULL' && (
              <IconButton
                title={t('DELETE')}
                variant="light"
                onClick={() => deleteItem(row)}
              >
                <DeleteOutlined />
              </IconButton>
            )}
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
}
