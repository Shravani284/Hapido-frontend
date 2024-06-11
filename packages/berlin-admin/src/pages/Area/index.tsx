import React, { useEffect, useState } from 'react';

// material-ui
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
  TablePagination,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { HeadCell } from '../../../../berlin-merchant/src/types/table';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import MainCard from '../../components/MainCard';
import { ConfirmBoxAlert, paginationOption } from 'berlin-common';
import IconButton from '../../components/@extended/IconButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getAreaList } from '../../services/areaService';
import {
  // getArea,
  // deleteArea,
  deleteGeography,
} from '../../services/areaService';
import { path } from '../../routes/Routers';
import { useTranslation } from 'react-i18next';
import { setSnackbarConfig } from '../../store/slice/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumbs } from '@mui/material';
import { Typography } from '@mui/material';
import AreaFilter from './filter';
import { useFormik } from 'formik';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Permission from '../../components/Permission';
import usePermission from '../../components/Permission/usePermission';
import { filterRememberValueHandler } from '../../store/slice/Filter';
import { pageHandler, rowPageHandler } from '../../store/slice/Pagination';

// ==============================|| MUI TABLE - HEADER ||============================== //
const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Area Name',
  },
  {
    id: 'city',
    numeric: false,
    disablePadding: false,
    label: 'city',
  },
  {
    id: 'country',
    numeric: false,
    disablePadding: false,
    label: 'Country',
  },
  {
    id: 'active',
    numeric: false,
    disablePadding: true,
    label: 'status',
  },
  {
    id: 'Action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

// ==============================|| TABLE - DATA TABLE ||============================== //

export default function EnhancedTable() {
  const { permission } = usePermission('GEOGRAPHY');
  const userFilterDetails = useSelector((state: any) => state?.filter);
  const pagenationDetails = useSelector((state: any) => state?.pagination);
  const [dense] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPayload, setFilterPayload] = useState({});
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      areaName: '',
      filterSort: '',
      filterStatus: null,
      filterCountry: null,
      filterCity: null,
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

  const handleAreaList = () => {
    return path.AREAFORM;
  };
  const getAllArea = () => {
    setLoading(true);
    let payLoad =
      userFilterDetails?.filterDetails !== null
        ? userFilterDetails?.filterDetails
        : filterPayload;
    let payloadPagination = {
      page: pagenationDetails?.page,
      rowsPerPage: pagenationDetails?.rowsPerPage,
      // language: 'en',
    };
    getAreaList(payloadPagination, payLoad)
      .then((res) => {
        if (res?.success) {
          const allAreaName = res.data.allAreas?.map((item: any) => {
            const obj = { ...item };
            if (item?.areatranslation?.length > 0) {
              const area: string[] = [];
              const city: string[] = [];
              const countryName: string[] = [];

              item?.areatranslation?.forEach((item: any) => {
                area.push(item?.text);
              });
              item.city?.citytranslation?.forEach((item: any) => {
                city.push(item?.text);
              });
              item.country?.countrytranslation?.forEach((item: any) => {
                countryName.push(item?.text);
              });
              obj.areaName = area.join(', ');
              obj.cityName = city.join(', ');
              obj.countryName = countryName.join(', ');
            }

            return obj;
          });
          setRows(allAreaName);
          setTotalCount(res.data.totalCount);
          setLoading(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllArea();
  }, [
    pagenationDetails?.page,
    pagenationDetails?.rowsPerPage,
    filterPayload,
    userFilterDetails?.filterDetails,
  ]);

  // const updateFormById = (e: string | number) => {
  //   return `/geography/area/update/${e}`;
  // };

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
            <Link className="addBtn" to={handleAreaList()}>
              {/* <Button
                variant="contained"
                size="large"
                type="submit"
                title="Add Area"
                // onClick={handleAreaList}
              > */}
              Add Area
              {/* </Button> */}
            </Link>
          )}
        </Stack>
      </Grid>

      <MainCard content={false} title="Area List">
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
          <AreaFilter
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
                      permission={permission}
                      row={row}
                      getAllArea={() => {
                        getAllArea();
                      }}
                      // updateFormById={(e: any) => {
                      //   updateFormById(e);
                      // }}
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
    </>
  );
}
function Row({
  row,
  permission,
  getAllArea = () => {}, // updateFormById = () => {},
}: any) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { t } = useTranslation('translation');
  const dispatch = useDispatch();

  const handleDeleteArea = (id: any) => {
    const payLoad = {
      deleteFor: 'area',
      id: id,
      param: 'areaId',
    };
    deleteGeography(payLoad)
      .then((res) => {
        getAllArea();
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: 'Area deleted successfully',
            varient: 'success',
          })
        );
        setModalOpen(false);
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
    setModalOpen(false);
    getAllArea();
  };

  const updateFormById = (e: string | number) => {
    return `/geography/area/update/${e}`;
  };

  return (
    <>
      <TableRow hover tabIndex={-1} key={row.id}>
        <TableCell>{row?.areaName}</TableCell>
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
                // onClick={() => updateFormById(row.id)}
              >
                <EditOutlined />
              </IconButton>
            </Link>
            {permission === 'FULL' && (
              <IconButton
                title={t('DELETE')}
                variant="light"
                onClick={() => setModalOpen(true)}
              >
                <DeleteOutlined />
              </IconButton>
            )}
          </Box>
        </TableCell>
      </TableRow>
      <ConfirmBoxAlert
        title={'Delete'}
        handleClose={() => setModalOpen(false)}
        message={'Do you want to delete this Area ?'}
        open={modalOpen}
        submitHandler={() => handleDeleteArea(row?.id)}
      />
    </>
  );
}
