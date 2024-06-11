import React, { useEffect, useState } from 'react';
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Typography,
  TablePagination,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { HeadCell } from '../../../../berlin-merchant/src/types/table';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import MainCard from '../../components/MainCard';
import { ConfirmBoxAlert, paginationOption } from 'berlin-common';
import { path } from '../../routes/Routers';
import { useTranslation } from 'react-i18next';
import IconButton from '../../components/@extended/IconButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getCity } from '../../services/geoGraphyService';
import useConfig from '../../hooks/useConfig';
import { deleteCity } from '../../services/cityService';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbarConfig } from '../../store/slice/Loader';
import { Breadcrumbs } from '@mui/material';
import { deleteGeography } from '../../services/areaService';
import { useFormik } from 'formik';
import CityFilter from './filter';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Permission from '../../components/Permission';
import usePermission from '../../components/Permission/usePermission';
import { filterRememberValueHandler } from '../../store/slice/Filter';
import { pageHandler, rowPageHandler } from '../../store/slice/Pagination';
// ==============================|| MUI TABLE - HEADER ||============================== //

const headCells: HeadCell[] = [
  {
    id: 'cityName',
    numeric: false,
    disablePadding: true,
    label: 'City Name',
  },

  {
    id: 'country',
    numeric: false,
    disablePadding: false,
    label: 'country',
  },
  {
    id: 'active',
    numeric: false,
    disablePadding: true,
    label: 'status',
  },
  {
    id: '',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

// ==============================|| TABLE - DATA TABLE ||============================== //

export default function City() {
  const { permission } = usePermission('GEOGRAPHY');
  const userFilterDetails = useSelector((state: any) => state?.filter);
  const pagenationDetails = useSelector((state: any) => state?.pagination);
  const [dense] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [cityId, setCityId] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('translation');
  const { i18n } = useConfig();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPayload, setFilterPayload] = useState({});

  const formik = useFormik({
    initialValues: {
      cityName: '',
      filterSort: '',
      filterStatus: null,
      filterCountry: null,
    },
    onSubmit: async (value) => {
      dispatch(filterRememberValueHandler(value));
      setFilterPayload(value);
      dispatch(pageHandler(0));
      setFilterOpen(false);
    },
  });

  //Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalCount, setTotalCount] = useState(0);
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

  // avoid a layout jump when reaching the last page with empty rows.

  // Navigate to Add city
  const handleCityList = () => {
    return path.CITYFORM;
  };

  // Navigate to Update
  // const updateFormById = (e: string) => {
  //   navigate(`/geography/city/update/${e}`);
  // };

  // Delete City
  const deleteItem = (e: any) => {
    setModalOpen(true);
    setCityId(e.id);
  };

  // Delete City API
  const handleDeleteCity = () => {
    const payLoad = {
      deleteFor: 'city',
      id: cityId,
      param: 'cityId',
    };
    deleteGeography(payLoad)
      .then((res) => {
        getAllCity();
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: 'Banner deleted successfully',
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
    setModalOpen(false);
  };

  // Get all City API
  const getAllCity = () => {
    setLoading(true);
    let payLoad =
      userFilterDetails?.filterDetails !== null
        ? userFilterDetails?.filterDetails
        : filterPayload;
    getCity(pagenationDetails?.page, pagenationDetails?.rowsPerPage, payLoad)
      .then((res) => {
        if (res.success) {
          const allCityName = res.data.allCities?.map((item: any) => {
            const obj = { ...item };
            if (item.citytranslation.length > 0) {
              const city: string[] = [];
              const country: string[] = [];
              item.citytranslation?.forEach((item: any) => {
                city.push(item.text);
              });
              item.country?.countrytranslation.forEach((item: any) => {
                country.push(item.text);
              });
              obj.cityName = city?.join(', ');
              obj.countryName = country?.join(', ');
            }
            return obj;
          });

          setRows(allCityName);
          setTotalCount(res.data.totalCount);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllCity();
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
            <Link className="addBtn" to={handleCityList()}>
              {/* <Button
                variant="contained"
                size="large"
                type="submit"
                title={t('ADD_CITY')}
                onClick={handleCityList}
              > */}
              {t('ADD_CITY')}
              {/* </Button> */}
            </Link>
          )}{' '}
        </Stack>
      </Grid>

      <MainCard content={false} title="City List">
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
          <CityFilter
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
                  <TableCell colSpan={5}>Loading data ...</TableCell>
                </TableRow>
              ) : rows && rows.length > 0 ? (
                rows.map((row: any, index: number) => {
                  return (
                    <Row
                      key={index}
                      deleteItem={deleteItem}
                      row={row}
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
        message={'Do you want to delete this City?'}
        open={modalOpen}
        submitHandler={handleDeleteCity}
      />
    </>
  );
}

function Row({ row, deleteItem, permission }: any) {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation('translation');
  // Navigate to Update
  const updateFormById = (e: string) => {
    return `/geography/city/update/${e}`;
  };
  return (
    <>
      <TableRow hover tabIndex={-1} key={row.id} onClick={() => setOpen(!open)}>
        <TableCell>{row?.cityName}</TableCell>
        <TableCell>{row?.countryName}</TableCell>
        <TableCell>{row?.active === 1 ? 'Active' : 'Inactive'}</TableCell>
        <TableCell>
          <Box display={'flex'} justifyContent={'end'} gap={3}>
            <Link to={updateFormById(row.id)}>
              <IconButton
                variant="light"
                color="info"
                title={t('EDIT')}
                // onClick={() => updateFormById(row.id)} //Edit Record
              >
                <EditOutlined />
              </IconButton>
            </Link>
            {permission === 'FULL' && (
              <IconButton
                variant="light"
                title={t('DELETE')}
                onClick={() => deleteItem(row)} // Delete Record
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
