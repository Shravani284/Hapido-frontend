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
  Collapse,
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
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'i18next';
import { deleteCronJobs, getcronJobs } from '../../services/cronJobsService';
import { path } from '../../routes/Routers';
import usePermission from '../../components/Permission/usePermission';
import { pageHandler, rowPageHandler } from '../../store/slice/Pagination';

const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'code',
    numeric: false,
    disablePadding: false,
    label: 'Code',
  },
  {
    id: 'time_interval',
    numeric: false,
    disablePadding: false,
    label: 'Time Interval',
  },
  {
    id: 'active_from',
    numeric: false,
    disablePadding: false,
    label: 'Active From',
  },
  {
    id: 'active_to',
    numeric: false,
    disablePadding: false,
    label: 'Active To',
  },
  {
    id: 'last_run_at',
    numeric: false,
    disablePadding: false,
    label: 'Last Run At',
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
  const { permission } = usePermission('CRON_JOB');
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletePayLoad, setDeletePayLoad] = useState('');
  const pagenationDetails = useSelector((state: any) => state?.pagination);

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

  const handleMerchantList = () => {
    return path.CRONJOBSFORM;
  };
  const getUser = () => {
    getcronJobs(pagenationDetails?.page, pagenationDetails?.rowsPerPage)
      .then((res) => {
        setRows(res.data.data.cronJobs);
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
    deleteCronJobs(deletePayLoad)
      .then((res) => {
        getUser();
        setModalOpen(false);
      })
      .catch((error) => {});
    setModalOpen(false);
  };
  useEffect(() => {
    getUser();
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
            <Link className="addBtn" to={handleMerchantList()}>
              {/* <Button
                variant="contained"
                size="large"
                type="submit"
                onClick={handleMerchantList}
              > */}
              Add Cron Jobs
              {/* </Button> */}
            </Link>
          )}
        </Stack>
      </Grid>

      <MainCard content={false} title="Cron Job List">
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <TableHead>
              <TableRow>
                {headCells?.map((headCell) => (
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
              {rows?.map((row: any) => {
                return (
                  <Row
                    key={row.id}
                    row={row}
                    deleteItem={deleteItem}
                    permission={permission}
                  />
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
        message={'Do you want to delete this Cron Job ?'}
        open={modalOpen}
        submitHandler={handleDelete}
      />
    </>
  );
}

function Row({ row = [], deleteItem, permission }: any) {
  let navigate = useNavigate();

  const updateFormById = (id: any) => {
    return `/cronjobs/update/${id}`;
  };

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.code}</TableCell>
        <TableCell>{row.time_interval}</TableCell>
        <TableCell>{DateFormat(row.active_from)}</TableCell>
        <TableCell>{DateFormat(row.active_to)}</TableCell>
        <TableCell>{DateFormat(row.last_run_at)}</TableCell>

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
