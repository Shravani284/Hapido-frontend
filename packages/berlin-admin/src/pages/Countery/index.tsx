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
  Breadcrumbs,
  Typography,
  TablePagination,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { HeadCell } from '../../../../berlin-merchant/src/types/table';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import MainCard from '../../components/MainCard';
import useConfig from '../../hooks/useConfig';
import { getCountry } from '../../services/geoGraphyService';
import IconButton from '../../components/@extended/IconButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ConfirmBoxAlert, paginationOption } from 'berlin-common';
import { path } from '../../routes/Routers';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbarConfig } from '../../store/slice/Loader';
import { t } from 'i18next';
import { deleteGeography } from '../../services/areaService';
import { useFormik } from 'formik';
import CountryFilter from './filter';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import usePermission from '../../components/Permission/usePermission';
import { filterRememberValueHandler } from '../../store/slice/Filter';
import { pageHandler, rowPageHandler } from '../../store/slice/Pagination';

// table header
const headCells: HeadCell[] = [
  {
    id: 'countryName',
    numeric: false,
    disablePadding: true,
    label: 'Country Name',
  },
  {
    id: 'active',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

export default function CountryList() {
  const { permission } = usePermission('GEOGRAPHY');
  const userFilterDetails = useSelector((state: any) => state?.filter);
  const pagenationDetails = useSelector((state: any) => state?.pagination);
  const { i18n } = useConfig();
  const [dense] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [countryId, setCountryId] = useState<any>();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPayload, setFilterPayload] = useState({});

  const formik = useFormik({
    initialValues: {
      countryName: '',
      filterSort: '',
      filterStatus: null,
    },
    onSubmit: async (value) => {
      dispatch(filterRememberValueHandler(value));
      setFilterPayload(value);
      dispatch(pageHandler(0));
      setFilterOpen(false);
    },
  });

  //Pagination
  const [page, setPage] = React.useState<number>(0);
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

  const handleCountryList = () => {
    return path.COUNTRYFORM;
  };

  const getCountryList = () => {
    let payLoad =
      userFilterDetails?.filterDetails !== null
        ? userFilterDetails?.filterDetails
        : filterPayload;
    setLoading(true);
    getCountry(pagenationDetails?.page, pagenationDetails?.rowsPerPage, payLoad)
      .then((res) => {
        if (res.data.success) {
          const country = res.data.data?.allCountries?.map((item: any) => {
            const obj = { ...item };
            if (item.translations.length > 0) {
              const name: string[] = [];
              item.translations.forEach((item: any) => {
                name.push(item.text);
              });
              obj.name = name.join(', ');
            }
            return obj;
          });
          setRows(country);
          setTotalCount(res.data.data.totalCount);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  // Delete Item From list

  const deleteItem = (e: any) => {
    setModalOpen(true);
    setCountryId(e.id);
  };

  const handleSubmit = () => {
    const payLoad = {
      deleteFor: 'country',
      id: countryId,
      param: 'countryId',
    };
    deleteGeography(payLoad)
      .then((response) => {
        getCountryList();
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: 'Country deleted successfully',
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

  // Navigate to Update
  const updateFormById = (e: string) => {
    return `/geography/country/update/${e}`;
  };

  useEffect(() => {
    getCountryList();
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
            <Link className="addBtn" to={handleCountryList()}>
              {/* <Button
                variant="contained"
                size="large"
                type="submit"
                title=" Add Country"
                onClick={handleCountryList}
              > */}
              Add Country
              {/* </Button> */}
            </Link>
          )}{' '}
        </Stack>
      </Grid>
      <MainCard content={false} title="Country List">
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
          </Button>{' '}
          <CountryFilter
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4}>Loading data ...</TableCell>
                </TableRow>
              ) : rows && rows.length > 0 ? (
                rows.map((row: any) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        {row?.active === 1 ? 'Active' : 'Inactive'}
                      </TableCell>
                      <TableCell align="right">
                        <Box display={'flex'} justifyContent={'end'} gap={3}>
                          <Link to={updateFormById(row.id)}>
                            <IconButton
                              variant="light"
                              color="info"
                              title={t('Edit')}
                              // onClick={() => updateFormById(row.id)}
                            >
                              <EditOutlined />
                            </IconButton>
                          </Link>
                          {permission === 'FULL' && (
                            <IconButton
                              variant="light"
                              title={t('Delete')}
                              onClick={() => deleteItem(row)}
                            >
                              <DeleteOutlined />
                            </IconButton>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={4}>
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
        message={'Do you want to delete this Country ?'}
        open={modalOpen}
        submitHandler={handleSubmit}
      />
    </>
  );
}
