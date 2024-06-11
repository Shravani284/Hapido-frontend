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
  Button,
  Box,
  Breadcrumbs,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { HeadCell } from '../../../../berlin-merchant/src/types/table';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import MainCard from '../../components/MainCard';
import { ConfirmBoxAlert, DateFormat, paginationOption } from 'berlin-common';
import IconButton from '../../components/@extended/IconButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { TranslationType } from '../category/constants/types';
import { deleteBogfg, getBogfg } from '../../services/BOGFGService';
import { path } from '../../routes/Routers';
import { setSnackbarConfig } from '../../store/slice/Loader';
import { useDispatch, useSelector } from 'react-redux';
import Permission from '../../components/Permission';
import { Filter } from './filter';
import { useFormik } from 'formik';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import usePermission from '../../components/Permission/usePermission';
import { filterRememberValueHandler } from '../../store/slice/Filter';
import { pageHandler, rowPageHandler } from '../../store/slice/Pagination';

const headCells: HeadCell[] = [
  {
    id: 'min_cart_amount',
    numeric: false,
    disablePadding: true,
    label: 'Eligible Cart Amount',
  },

  {
    id: 'free_entitlement',
    numeric: false,
    disablePadding: false,
    label: 'Entitlement Mode',
  },
  {
    id: 'Entitled Gift',
    numeric: false,
    disablePadding: false,
    label: 'Entitled Gift',
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
    id: '',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

// ==============================|| TABLE - DATA TABLE ||============================== //

export default function Bogfg() {
  const { permission } = usePermission('FLASH_SALE');
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletePayLoad, setDeletePayLoad] = useState('');
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPayload, setFilterPayload] = useState({});
  const bogoFilterDetails = useSelector((state: any) => state?.filter);
  const pagenationDetails = useSelector((state: any) => state?.pagination);

  const formik = useFormik({
    initialValues: {
      dealid: '',
      entitlement_mode: null,
      platform: null,
      active_date: null,
      end_date: null,
      active: null,
    },
    onSubmit: async (value) => {
      dispatch(filterRememberValueHandler(value));
      setFilterPayload(value);
      setFilterOpen(false);
      dispatch(pageHandler(0));
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleBOGFG = () => {
    return path.BOGFGFORM;
  };
  const getUser = () => {
    setLoading(true);
    let payLoad =
      bogoFilterDetails?.filterDetails !== null
        ? bogoFilterDetails?.filterDetails
        : filterPayload;
    getBogfg(pagenationDetails?.page, pagenationDetails?.rowsPerPage, payLoad)
      .then((response: any) => {
        if (response.data.success) {
          const allFlashsale = response.data.data.campaigns.map((item: any) => {
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
          setRows(allFlashsale);
          setTotalCount(response.data.data.totalCount);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Delete BOGFG
  const deleteBOSDItem = (e: any) => {
    setModalOpen(true);
    setDeletePayLoad(e.id);
  };

  // Delete BOGFG API
  const handleDeleteBOSD = () => {
    deleteBogfg(deletePayLoad)
      .then((res) => {
        if (res.data.success) {
          getUser();
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: res.data?.message
                ? res.data?.message
                : 'Something went wrong',
            })
          );
        }
        setModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
    setModalOpen(false);
  };
  useEffect(() => {
    getUser();
  }, [
    pagenationDetails?.page,
    pagenationDetails?.rowsPerPage,
    filterPayload,
    bogoFilterDetails,
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
            <Link className="addBtn" to={handleBOGFG()}>
              {/* <Button
                variant="contained"
                size="large"
                type="submit"
                onClick={handleBOGFG}
              > */}
              Add BOGFG
              {/* </Button> */}
            </Link>
          )}
        </Stack>
      </Grid>
      <MainCard content={false} title="Flash Sale BOGFG">
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
                  <TableCell colSpan={7}>Loading data ...</TableCell>
                </TableRow>
              ) : rows && rows.length > 0 ? (
                rows.map((row: any, index: number) => {
                  return (
                    <Row
                      key={index}
                      row={row}
                      deleteBOSDItem={deleteBOSDItem}
                      // updateFormById={updateFormById}
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
      </MainCard>

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

      <ConfirmBoxAlert
        title={'Delete'}
        handleClose={() => setModalOpen(false)}
        message={'Do you want to delete this Flash Sale BOGFG ?'}
        open={modalOpen}
        submitHandler={handleDeleteBOSD}
      />
    </>
  );
}

function Row({ row, deleteBOSDItem, permission }: any) {
  const { t } = useTranslation('translation');
  const updateFormById = (e: string | number) => {
    return `/flashsale/bogfg/update/${e}`;
  };
  return (
    <>
      <TableRow hover tabIndex={-1} key={row.id}>
        <TableCell>{row?.min_cart_amount || '-'}</TableCell>
        <TableCell>{row?.free_entitlement}</TableCell>
        <TableCell>
          {row?.free_entitlement === 'PROMO CODE' ? (
            <Link to={`/promo/update/${row.free_promo_code_id}`}>
              {row.free_promo_code_label}
            </Link>
          ) : (
            `${row?.free_deal_type}-${row?.deal_name}-${row?.free_deal_quantity} Quantity`
          )}
        </TableCell>
        <TableCell>{row?.platform}</TableCell>
        <TableCell>{row?.active_now}</TableCell>
        <TableCell>{row?.active === 1 ? 'Active' : 'Inactive'}</TableCell>
        <TableCell>
          <Box display={'flex'} justifyContent={'end'} gap={3}>
            <Link to={updateFormById(row.id)}>
              <IconButton
                variant="light"
                color="info"
                title={t('EDIT')}
                // onClick={() => updateFormById(row.id)}
              >
                <EditOutlined />
              </IconButton>
            </Link>
            {permission === 'FULL' && (
              <IconButton
                title={t('DELETE')}
                variant="light"
                onClick={() => deleteBOSDItem(row)}
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
