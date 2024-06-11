import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Divider,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { HeadCell } from '../../../../berlin-merchant/src/types/table';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import MainCard from '../../components/MainCard';
import { ConfirmBoxAlert, paginationOption } from 'berlin-common';
import IconButton from '../../components/@extended/IconButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbarConfig } from '../../store/slice/Loader';
import { t } from 'i18next';
import { TablePagination } from '@mui/material';
import { path } from '../../routes/Routers';
import usePermission from '../../components/Permission/usePermission';
import {
  deleteTravelerType,
  getAllTravelerType,
} from '../../services/TravlerType';
import { pageHandler, rowPageHandler } from '../../store/slice/Pagination';

const headCells: HeadCell[] = [
  {
    id: 'traveler_type',
    numeric: false,
    disablePadding: true,
    label: 'Traveler Type',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Actions',
  },
];

// ==============================|| MUI TABLE - HEADER ||============================== //

// ==============================|| TABLE - DATA TABLE ||============================== //

export default function TravelerTypeList() {
  const [dense] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletePayLoad, setDeletePayLoad] = useState('');
  const { permission } = usePermission('DEAL');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const pagenationDetails = useSelector((state: any) => state?.pagination);

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

  const getTravelerType = () => {
    getAllTravelerType(pagenationDetails?.page, pagenationDetails?.rowsPerPage)
      .then((res) => {
        setRows(res.data.data.travellertypes);
        setTotalCount(res.data.data.totalCount);
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
    deleteTravelerType(deletePayLoad)
      .then((response) => {
        getTravelerType();
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: 'Traveler Type deleted successfully',
            varient: 'success',
          })
        );
        setModalOpen(false);
      })
      .catch((error) => {
        setModalOpen(false);
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
  const updateFormById = (id: any) => {
    return `/deals/travelertype/update/${id}`;
  };

  useEffect(() => {
    getTravelerType();
  }, [pagenationDetails?.page, pagenationDetails?.rowsPerPage]);

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
            <Link className="addBtn" to={'/deals/travelertype/add'}>
              {/* <Button
                variant="contained"
                size="large"
                type="submit"
                onClick={() => navigate(path.TRAVELERTYPEADD)}
              > */}
              Add Traveler Type
              {/* </Button> */}
            </Link>
          )}
        </Stack>
      </Grid>

      <MainCard content={false} title="Traveler Type List">
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
              {rows.map((row: any) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    <TableCell>
                      {row?.travellertranslations.map((i: any) => {
                        if (i.locale == 'en') {
                          return i.text;
                        }
                      })}
                    </TableCell>
                    <TableCell>
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
                );
              })}
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
        message={'Do you want to delete this Traveler Type?'}
        open={modalOpen}
        submitHandler={handleDelete}
      />
    </>
  );
}
