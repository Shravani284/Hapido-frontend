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
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { HeadCell } from '../../../../berlin-merchant/src/types/table';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import MainCard from '../../components/MainCard';
import { ConfirmBoxAlert, DateFormat, paginationOption } from 'berlin-common';
import { path } from '../../routes/Routers';
import IconButton from '../../components/@extended/IconButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { deleteDP, getALlDP } from '../../services/flashSaleDPService';
import { TranslationType } from '../category/constants/types';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbarConfig } from '../../store/slice/Loader';
import { Breadcrumbs } from '@mui/material';
import { t } from 'i18next';
import { useFormik } from 'formik';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Filter } from './filter';
import Permission from '../../components/Permission';
import usePermission from '../../components/Permission/usePermission';
import { filterRememberValueHandler } from '../../store/slice/Filter';
import { pageHandler, rowPageHandler } from '../../store/slice/Pagination';

const headCells: HeadCell[] = [
  {
    id: 'flash_scope',
    numeric: false,
    disablePadding: true,
    label: 'Flash Scope',
  },
  {
    id: 'Application_Criteria',
    numeric: false,
    disablePadding: true,
    label: 'Application Criteria',
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
    label: 'active',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'ACTION',
  },
];

// ==============================|| MUI TABLE - HEADER ||============================== //

// ==============================|| TABLE - DATA TABLE ||============================== //

export default function FlashSaleDP() {
  const { permission } = usePermission('FLASH_SALE');
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletePayLoad, setDeletePayLoad] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPayload, setFilterPayload] = useState({});
  const bogoFilterDetails = useSelector((state: any) => state?.filter);
  const pagenationDetails = useSelector((state: any) => state?.pagination);

  const formik = useFormik({
    initialValues: {
      areas: [],
      categories: [],
      platform: null,
      fs_active_date: null,
      fs_end_date: null,
      active: null,
      scope: null,
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

  // Delete DP
  const deleteDPItem = (e: any) => {
    setModalOpen(true);
    setDeletePayLoad(e.id);
  };
  const applicationCriteria = (row) => {
    switch (row.flash_scope) {
      case 'CATEGORY':
        return row.categories.join(',');
      case 'PRICE':
        return `${row.price_start}-${row.price_end}`;
      case 'AREA':
        return row.areas?.map((e) => e.areaname).join(',');
      case 'COMMISSION_PERCENT':
        return `${row.commission_percentage_start}-${row.commission_percentage_end}`;
      default:
        return '';
    }
  };

  // Delete DP API
  const handleDeleteDP = () => {
    deleteDP(deletePayLoad)
      .then((res) => {
        getDP();
        if (res.data.message) {
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: 'Flash Sale DP deleted successfully',
            })
          );
        }

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
    setModalOpen(false);
  };

  // avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleDP = () => {
    return path.DPLISTFORM;
  };

  const getDP = () => {
    setLoading(true);
    let payLoad =
      bogoFilterDetails?.filterDetails !== null
        ? bogoFilterDetails?.filterDetails
        : filterPayload;
    getALlDP(pagenationDetails?.page, pagenationDetails?.rowsPerPage, payLoad)
      .then((res) => {
        const allDPList = res.data.data.campaigns?.map((item: any) => {
          const obj = { ...item };
          if (item.translations.length > 0) {
            const title_en = item.translations.find(
              (ele: TranslationType) =>
                ele.locale === 'en' && ele.column_name === 'title_trans_ids'
            );
            const title_ar = item.translations.find(
              (ele: TranslationType) =>
                ele.locale === 'ar' && ele.column_name === 'title_trans_ids'
            );

            obj.title = `${title_en?.text ?? ''} ${title_ar?.text ?? ''}`;
          }
          return obj;
        });

        setRows(allDPList);
        setTotalCount(res.data.data.totalCount);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getDP();
  }, [
    pagenationDetails?.page,
    pagenationDetails?.rowsPerPage,
    filterPayload,
    bogoFilterDetails,
  ]);

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          {/* <Search /> */}
        </Grid>
        <Grid item xs={6}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={2}
            marginBottom={'20px'}
          >
            {/* <Permission module={'FLASH_SALE'}> */}
            {(permission === 'WRITE' || permission === 'FULL') && (
              <Link className="addBtn" to={handleDP()}>
                {/* <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  onClick={handleDP}
                > */}
                Add Complex Discount
                {/* </Button> */}
              </Link>
            )}

            {/* </Permission> */}
          </Stack>
        </Grid>
      </Grid>

      <MainCard content={false} title="Complex Discount List">
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
                  <TableCell colSpan={8}>Loading data ...</TableCell>
                </TableRow>
              ) : rows && rows.length > 0 ? (
                rows.map((row: any, index: any) => {
                  return (
                    <Row
                      key={index}
                      row={row}
                      deleteDPItem={deleteDPItem}
                      // updateFormById={updateFormById}
                      applicationCriteria={applicationCriteria}
                      permission={permission}
                    />
                  );
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
        message={'Do you want to delete this Flash Sale DP ?'}
        open={modalOpen}
        submitHandler={handleDeleteDP}
      />
    </>
  );
}

function Row({ row, deleteDPItem, applicationCriteria, permission }: any) {
  const [open, setOpen] = React.useState(false);
  // Navigate to Update
  const updateFormById = (e: string) => {
    return `/flashsale/dp/update/${e}`;
  };
  return (
    <>
      <TableRow hover tabIndex={-1} key={row.id} onClick={() => setOpen(!open)}>
        <TableCell>{row.flash_scope}</TableCell>
        <TableCell>{applicationCriteria(row)}</TableCell>
        <TableCell>{row.platform}</TableCell>
        <TableCell>{row.active_now}</TableCell>
        {/* <TableCell>{DateFormat(row.fs_active_date)}</TableCell>
        <TableCell>{DateFormat(row.fs_end_date)}</TableCell> */}
        <TableCell>{row?.active === 1 ? 'Active' : 'Inactive'}</TableCell>
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
                onClick={() => deleteDPItem(row)}
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
