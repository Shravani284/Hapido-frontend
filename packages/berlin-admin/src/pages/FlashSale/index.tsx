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
import { ConfirmBoxAlert, paginationOption } from 'berlin-common';
import IconButton from '../../components/@extended/IconButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  deleteFlashSale,
  getFlashSale,
  updateFlashSale,
} from '../../services/flashSaleBOSDService';
import { useTranslation } from 'react-i18next';
import { TranslationType } from '../category/constants/types';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useFormik } from 'formik';
import { Filter } from './filter';
import { path } from '../../routes/Routers';
import Permission from '../../components/Permission';
import usePermission from '../../components/Permission/usePermission';
import { useDispatch, useSelector } from 'react-redux';
import { filterRememberValueHandler } from '../../store/slice/Filter';
import { pageHandler, rowPageHandler } from '../../store/slice/Pagination';

const headCells: HeadCell[] = [
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Title',
  },
  {
    id: 'first_deal',
    numeric: false,
    disablePadding: true,
    label: 'First Deal',
  },
  {
    id: 'second_deal',
    numeric: false,
    disablePadding: false,
    label: 'Second Deal',
  },
  {
    id: 'second_deal_discount_percent',
    numeric: false,
    disablePadding: false,
    label: 'Second Deal Discount (%)',
  },
  {
    id: 'platform',
    numeric: false,
    disablePadding: false,
    label: 'platform',
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

export default function Mearchant() {
  const { permission } = usePermission('FLASH_SALE');
  const navigate = useNavigate();
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
  const dispatch = useDispatch();
  const bogoFilterDetails = useSelector((state: any) => state?.filter);
  const pagenationDetails = useSelector((state: any) => state?.pagination);

  const formik = useFormik({
    initialValues: {
      deal_1_type: null,
      deal_id_1: '',
      deal_2_type: null,
      deal_id_2: '',
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

  const handleMarchantList = () => {
    return path.FLASHSALEFORM;
  };
  const getUser = () => {
    setLoading(true);
    let payLoad =
      bogoFilterDetails?.filterDetails !== null
        ? bogoFilterDetails?.filterDetails
        : filterPayload;
    getFlashSale(
      pagenationDetails?.page,
      pagenationDetails?.rowsPerPage,
      payLoad
    )
      .then((res) => {
        if (res.data.success) {
          const allFlashsale = res.data.data.campaigns.map((item: any) => {
            const obj = { ...item };

            if (item.translations.length > 0) {
              const title_en = item.translations.find(
                (ele: TranslationType) =>
                  ele.locale === 'en' && ele.column_name === 'title_trans_ids'
              );

              const deal_1 = item.deal_1_translations.find(
                (ele: TranslationType) =>
                  ele.locale === 'en' && ele.column_name === 'title_trans_ids'
              );
              const deal_2 = item.deal_2_translations.find(
                (ele: TranslationType) =>
                  ele.locale === 'en' && ele.column_name === 'title_trans_ids'
              );

              obj.title = `${title_en?.text ?? ''}`;
              obj.first_deal = `${deal_1?.text ?? ''}`;
              obj.second_deal = `${deal_2?.text ?? ''}`;
            }

            return obj;
          });
          setRows(allFlashsale);
          setTotalCount(res.data.data.totalCount);
          setLoading(false);
        }
      })
      .catch((error) => {});
  };

  // Delete BOSD
  const deleteBOSDItem = (e: any) => {
    setModalOpen(true);
    setDeletePayLoad(e.id);
  };

  // Delete BOSD API
  const handleDeleteBOSD = () => {
    deleteFlashSale(deletePayLoad)
      .then((res) => {
        getUser();
        setModalOpen(false);
      })
      .catch((error) => {});
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
            <Link className="addBtn" to={handleMarchantList()}>
              {/* <Button
              variant="contained"
              size="large"
              type="submit"
              onClick={handleMarchantList} 
              >
              */}
              Add BOSD
              {/* </Button> */}
            </Link>
          )}
          {/* </Permission> */}
        </Stack>
      </Grid>

      <MainCard content={false} title="Buy one get second at discount">
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
                  <TableCell align="center" colSpan={8}>
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
        message={'Do you want to delete this Flash Sale ?'}
        open={modalOpen}
        submitHandler={handleDeleteBOSD}
      />
    </>
  );
}

function Row({ row, deleteBOSDItem, permission }: any) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { t } = useTranslation('translation');
  const updateFormById = (e: string | number) => {
    return `/flashsale/bosd/update/${e}`;
  };

  return (
    <>
      <TableRow hover tabIndex={-1} key={row.id}>
        <TableCell>{row.title}</TableCell>
        <TableCell>{`${row.first_deal} - ${row.deal_id_1} (${row.deal_id_1_type})`}</TableCell>
        <TableCell>{`${row.second_deal} - ${row.deal_id_2} (${row.deal_id_2_type})`}</TableCell>
        <TableCell>{row.second_deal_discount_percent}</TableCell>
        <TableCell>{row.platform}</TableCell>
        <TableCell>{row.active_now}</TableCell>
        <TableCell>{row?.active === 1 ? 'Active' : 'Inactive'}</TableCell>
        <TableCell>
          <Box display={'flex'} justifyContent={'end'} gap={3}>
            <Link to={updateFormById(row?.id)}>
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
