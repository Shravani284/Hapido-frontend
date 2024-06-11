import {
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  Stack,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Box,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { path } from '../../routes/Routers';
import MainCard from '../../components/MainCard';
import { HeadCell } from '../../../../berlin-merchant/src/types/table';
import { ConfirmBoxAlert, paginationOption } from 'berlin-common';
import IconButton from '../../components/@extended/IconButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { t } from 'i18next';
import {
  deleteFlashDiscount,
  getAllFlashDiscounts,
} from '../../services/flashDiscountService';
import { setSnackbarConfig } from '../../store/slice/Loader';
import { useDispatch, useSelector } from 'react-redux';
import Permission from '../../components/Permission';
import usePermission from '../../components/Permission/usePermission';
import { pageHandler, rowPageHandler } from '../../store/slice/Pagination';

const headCells: HeadCell[] = [
  {
    id: 'title_trans_ids',
    numeric: false,
    disablePadding: true,
    label: 'Title',
  },
  {
    id: 'discount_percent',
    numeric: false,
    disablePadding: false,
    label: 'Discount Percent',
  },
  {
    id: 'flash_scope',
    numeric: false,
    disablePadding: false,
    label: 'Flash Scope',
  },
  {
    id: 'deal_type',
    numeric: false,
    disablePadding: false,
    label: 'Deal Type',
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

const FlashDiscount = () => {
  const { permission } = usePermission('FLASH_SALE');
  const [dense] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletePayLoad, setDeletePayLoad] = useState('');
  const bogoFilterDetails = useSelector((state: any) => state?.filter);
  const pagenationDetails = useSelector((state: any) => state?.pagination);

  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFlashDiscountForm = () => {
    return path.FLASHDISCOUNTFORM;
  };

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

  const getFlashDiscount = () => {
    setLoading(true);
    getAllFlashDiscounts(
      pagenationDetails?.page,
      pagenationDetails?.rowsPerPage
    )
      .then((response) => {
        const allFlashDiscountList = response.data.data.flashdiscounts?.map(
          (item: any) => {
            const obj = { ...item };
            if (item.flashsaletranslations.length > 0) {
              const title_en = item.flashsaletranslations.find(
                (ele: any) =>
                  ele.locale === 'en' && ele.column_name === 'title_trans_ids'
              );
              const title_ar = item.flashsaletranslations.find(
                (ele: any) =>
                  ele.locale === 'ar' && ele.column_name === 'title_trans_ids'
              );

              obj.title = `${title_en?.text ?? ''} ${title_ar?.text ?? ''}`;
            }
            return obj;
          }
        );
        setRows(allFlashDiscountList);
        setTotalCount(response.data.data.totalCount);
        setLoading(false);
      })

      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getFlashDiscount();
  }, [pagenationDetails?.page, pagenationDetails?.rowsPerPage]);

  const handleDelete = (e: any) => {
    setModalOpen(true);
    setDeletePayLoad(e.id);
  };

  const deleteDiscount = () => {
    const payLoad = {
      id: deletePayLoad,
      soft_delete: true,
    };
    deleteFlashDiscount(payLoad)
      .then((response) => {
        getFlashDiscount();
        setModalOpen(false);
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: 'Flash Discount deleted successfully',
          })
        );
      })
      .catch((error) => {
        console.log(error);
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
          {/* <Permission module={'FLASH_SALE'}> */}
          {(permission === 'WRITE' || permission === 'FULL') && (
            <Link className="addBtn" to={handleFlashDiscountForm()}>
              {/* <Button
                variant="contained"
                size="large"
                type="submit"
                onClick={handleFlashDiscountForm}
              > */}
              Add Simple Discount
              {/* </Button> */}
            </Link>
          )}

          {/* </Permission> */}
        </Stack>
      </Grid>

      <MainCard content={false} title="Simple Discount">
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
                      handleDelete={handleDelete}
                      // updateFormById={updateFormById}
                      // updateDealById={() => {
                      //   updateDealById(row.id);
                      // }}
                      permission={permission}
                    />
                  );
                })
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={6}>
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
        message={'Do you want to delete this Flash Discount ?'}
        open={modalOpen}
        submitHandler={deleteDiscount}
      />
    </>
  );
};

function Row({
  row,
  handleDelete,
  // updateDealById = () => {},
  permission,
}: any) {
  const [open, setOpen] = React.useState(false);
  const updateDealById = (id: any) => {
    return `/flashsale/flashdiscount/update/${id}`;
  };
  return (
    <>
      <TableRow hover tabIndex={-1} key={row.id} onClick={() => setOpen(!open)}>
        <TableCell>{row.title}</TableCell>
        <TableCell>{row.discount_percent}</TableCell>
        <TableCell>{row.flash_scope}</TableCell>
        <TableCell>{row.deal_type}</TableCell>
        <TableCell>{row?.active === 1 ? 'Active' : 'Inactive'}</TableCell>
        <TableCell align="right">
          <Box display={'flex'} justifyContent={'end'} gap={3}>
            <Link to={updateDealById(row.id)}>
              <IconButton
                title={t('EDIT')}
                variant="light"
                color="info"
                // onClick={() => updateDealById(row.id)}
              >
                <EditOutlined />
              </IconButton>
            </Link>
            {permission === 'FULL' && (
              <IconButton
                title={t('DELETE')}
                variant="light"
                onClick={() => handleDelete(row)}
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

export default FlashDiscount;
