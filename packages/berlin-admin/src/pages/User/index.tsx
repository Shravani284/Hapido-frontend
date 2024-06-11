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
  TableSortLabel,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { HeadCell } from '../../../../berlin-merchant/src/types/table';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import MainCard from '../../components/MainCard';
import { ConfirmBoxAlert, paginationOption, timeFormat } from 'berlin-common';
import IconButton from '../../components/@extended/IconButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { UpdateUser, getUserAPI } from '../../services/userService';
import { useDispatch } from 'react-redux';
import { setSnackbarConfig } from '../../store/slice/Loader';
import { t } from 'i18next';
import Filter from './filter';
import { useFormik } from 'formik';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Permission from '../../components/Permission';
import usePermission from '../../components/Permission/usePermission';
import { useSelector } from 'react-redux';
import { pageHandler, rowPageHandler } from '../../store/slice/Pagination';
import { filterRememberValueHandler } from '../../store/slice/Filter';

const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },

  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'created_at',
    numeric: false,
    disablePadding: false,
    label: 'Registered Since',
  },
  {
    id: 'acquisition_source',
    numeric: false,
    disablePadding: false,
    label: 'Registered Platform',
  },
  {
    id: 'acquisition_source',
    numeric: false,
    disablePadding: false,
    label: 'Registered Mode',
  },
  {
    id: 'email_verified',
    numeric: false,
    disablePadding: false,
    label: 'Email Verified',
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
export type ArrangementOrder = 'asc' | 'desc' | undefined;

// ==============================|| MUI TABLE - HEADER ||============================== //

// ==============================|| TABLE - DATA TABLE ||============================== //

export default function index() {
  const { permission } = usePermission('USER');
  const userFilterDetails = useSelector((state: any) => state?.filter);
  const pagenationDetails = useSelector((state: any) => state?.pagination);

  const [dense] = React.useState(false);

  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletePayLoad, setDeletePayLoad] = useState('');
  // const [sortFields, setSortFields] = useState({ fieldName: '', type: '' });
  const [order, setOrder] = useState<ArrangementOrder>('asc');
  const [orderBy, setOrderBy] = useState<string>('first_name');
  const [selected, setSelected] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPayload, setFilterPayload] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      country_code: '',
      mobile: '',
      locale: '',
      module_id: '',
      user_platform: null,
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

  // avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // const handleMerchantList = () => {
  //   navigate('/users/add');
  // };
  const getUser = () => {
    setIsLoading(true);
    let payLoad =
      userFilterDetails?.filterDetails !== null
        ? userFilterDetails?.filterDetails
        : filterPayload;

    getUserAPI(
      pagenationDetails?.page + 1,
      pagenationDetails?.rowsPerPage,
      payLoad
    )
      .then((res) => {
        setRows(res.data.data.users);
        setTotalCount(res.data.data.totalCount);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
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
    UpdateUser(payLoad)
      .then((response) => {
        getUser();
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: 'User deleted successfully',
            varient: 'success',
          })
        );
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

  useEffect(() => {
    getUser();
  }, [
    pagenationDetails?.page,
    pagenationDetails?.rowsPerPage,
    filterPayload,
    userFilterDetails?.filterDetails,
  ]);

  const handleOnClick = (fieldName: string) => {
    const isAsc = orderBy === fieldName && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(fieldName);
    // setSortFields(id);
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
          {(permission === 'WRITE' || permission === 'FULL') && (
            <Link className="addBtn" to={'/users/add'}>
              {/* <Button
                variant="contained"
                size="large"
                type="submit"
                 onClick={handleMerchantList}
              > */}
              Add User
              {/* </Button> */}
            </Link>
          )}
        </Stack>
      </Grid>

      <MainCard
        content={false}
        title="User List"
        // secondary={<CSVExport data={selectedValue.length > 0 ? selectedValue : rows} filename={'selected-table-data.csv'} />}
      >
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
            filterOpen={filterOpen}
            setFilterOpen={setFilterOpen}
            formik={formik}
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
                {headCells.map((headCell, index) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={true}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => handleOnClick(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5}>Loading data ...</TableCell>
                </TableRow>
              ) : (
                rows &&
                rows.length > 0 &&
                rows.map((row: any) => {
                  return (
                    <Row
                      key={row.id}
                      row={row}
                      deleteItem={deleteItem}
                      permission={permission}
                    />
                  );
                })
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
        message={'Do you want to delete this User ?'}
        open={modalOpen}
        submitHandler={handleDelete}
      />
    </>
  );
}

function Row({ row = [], deleteItem, permission }: any) {
  let navigate = useNavigate();
  const updateFormById = (id: any) => {
    return `/users/update/${id}`;
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

  let platform = 'WEB';
  let mode = 'EMAIL';

  switch (row.acquisition_source) {
    case 'WEB':
      platform = 'WEB';
      mode = 'EMAIL';
      break;
    case 'GOOGLEWEB':
      platform = 'WEB';
      mode = 'GOOGLE';
      break;
    case 'APPLEWEB':
      platform = 'WEB';
      mode = 'APPLE';
      break;
    case 'ANDROID':
      platform = 'ANDROID';
      mode = 'EMAIL';
      break;
    case 'GOOGLEANDROID':
      platform = 'ANDROID';
      mode = 'GOOGLE';
      break;
    case 'APPLEANDROID':
      platform = 'ANDROID';
      mode = 'APPLE';
      break;
    case 'IOS':
      platform = 'IOS';
      mode = 'EMAIL';
      break;
    case 'GOOGLEIOS':
      platform = 'IOS';
      mode = 'GOOGLE';
      break;
    case 'APPLEIOS':
      platform = 'IOS';
      mode = 'APPLE';
      break;
    default:
      platform = 'WEB';
      mode = 'EMAIL';
      break;
  }

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell>
          {row.first_name} {row.last_name}
        </TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{timeFormat(row.created_at)}</TableCell>
        <TableCell>{platform}</TableCell>
        <TableCell>{mode}</TableCell>
        <TableCell>{row.email_verified == true ? 'True' : 'False'}</TableCell>
        <TableCell>{row.active === 1 ? 'Active' : 'Inactive'}</TableCell>

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
