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
import { ConfirmBoxAlert, paginationOption, DateFormat } from 'berlin-common';
import { getMerchantAPI, updateMerchant } from '../../services/merchantService';
import IconButton from '../../components/@extended/IconButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setSnackbarConfig } from '../../store/slice/Loader';
import { Breadcrumbs } from '@mui/material';
import { t } from 'i18next';
import { Filter } from './filter';
import { useFormik } from 'formik';
// import { getAllUser } from '../../services/userService';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { getCity, getCityDropDown } from '../../services/areaService';
import useConfig from '../../hooks/useConfig';
import Permission from '../../components/Permission';
import {
  getAllArea,
  getAllCities,
  getAllUser,
} from '../../services/dropDownService';
import usePermission from '../../components/Permission/usePermission';
import { useSelector } from 'react-redux';
import { filterRememberValueHandler } from '../../store/slice/Filter';
import { pageHandler, rowPageHandler } from '../../store/slice/Pagination';

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
    label: 'email',
  },
  {
    id: 'registeredSince',
    numeric: false,
    disablePadding: false,
    label: 'Registered Since',
  },
  {
    id: 'HapidoBusinessUser',
    numeric: false,
    disablePadding: false,
    label: 'Hapido Business User',
  },
  {
    id: 'MerchantOnboardingStatus',
    numeric: false,
    disablePadding: false,
    label: 'Merchant Onboarding Status',
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

const MerchantStatus = {
  DRAFT: 'DRAFT',
  PENDING_APPROVAL: 'PENDING APPROVAL',
  REJECTED: 'REJECTED',
  REQUIRE_DOCUMENTS: 'REQUIRE DOCUMENTS',
  APPROVED: 'APPROVED',
};

// ==============================|| MUI TABLE - HEADER ||============================== //

// ==============================|| TABLE - DATA TABLE ||============================== //

export default function Merchant() {
  const { permission } = usePermission('MERCHANT');
  const userFilterDetails = useSelector((state: any) => state?.filter);
  const pagenationDetails = useSelector((state: any) => state?.pagination);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { i18n } = useConfig();
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletePayLoad, setDeletePayLoad] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPayload, setFilterPayload] = useState({});
  const [userList, setUserList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      country_code: '',
      mobile: '',
      onBoardingStatus: '',
      hapidoBusinessUserId: '',
      areaId: '',
      cityId: '',
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

  const handleMerchantList = () => {
    return '/merchant/add';
  };

  const getMerchant = () => {
    let payLoad =
      userFilterDetails?.filterDetails !== null
        ? userFilterDetails?.filterDetails
        : filterPayload;
    setLoading(true);
    getMerchantAPI(
      pagenationDetails?.page,
      pagenationDetails?.rowsPerPage,
      payLoad
    )
      .then((res) => {
        setRows(res.data.data.marchants);
        setTotalCount(res.data.data.totalCount);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
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
    updateMerchant(payLoad)
      .then((response) => {
        getMerchant();
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: 'Merchant deleted successfully',
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

  // get all user list.
  const getUserList = (data?: any) => {
    getAllUser()
      .then((res) => {
        setUserList(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // get area list
  const getAreaList = () => {
    getAllArea()
      .then((res) => {
        setAreaList(res.data.data.allAreas);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // get city list
  const getCityList = () => {
    getAllCities()
      .then((res) => {
        if (res.success) {
          setCityList(res.data.allCities);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCityList();
    getUserList();
    getAreaList();
  }, []);

  useEffect(() => {
    getMerchant();
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
            <Link className="addBtn" to={handleMerchantList()}>
              {/* <Button
                variant="contained"
                size="large"
                type="submit"
                onClick={handleMerchantList}
              > */}
              Add Merchant
              {/* </Button> */}
            </Link>
          )}
        </Stack>
      </Grid>

      <MainCard content={false} title="Merchant List">
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
            userList={userList}
            areaList={areaList}
            cityList={cityList}
            setFilterOpen={setFilterOpen}
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={10}>Loading data ...</TableCell>
                </TableRow>
              ) : rows && rows.length > 0 ? (
                rows?.map((row: any) => {
                  return (
                    <Row
                      key={row.id}
                      u
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
        message={'Do you want to delete this Merchant ?'}
        open={modalOpen}
        submitHandler={handleDelete}
      />
    </>
  );
}

function Row({ row = [], deleteItem, permission }: any) {
  const navigate = useNavigate();

  const updateFormById = (id: any) => {
    return `/merchant/update/${id}`;
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

  const onboardingStatus = (data: any) =>
    MerchantStatus[data] || 'Status not found';

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell>{data.name}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{DateFormat(row.merchant_active_date)}</TableCell>
        <TableCell>
          {row.happidoUserfirstName}&nbsp;{row.happidoUserlastName}
        </TableCell>
        <TableCell>
          {onboardingStatus(row.merchant_onboarding_status)}
        </TableCell>
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
