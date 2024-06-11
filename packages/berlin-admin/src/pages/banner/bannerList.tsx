import {
  Stack,
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
  Grid,
  Breadcrumbs,
} from '@mui/material';
import IconButton from '../../components/@extended/IconButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ConfirmBoxAlert, paginationOption } from 'berlin-common';
import React, { useEffect, useState } from 'react';
import {} from '@mui/material';
// import { Navigate } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { path } from '../../routes/Routers';
import { HeadCell } from '../../../../berlin-merchant/src/types/table';
import MainCard from '../MainCard';
import { deleteBanner, getBanners } from '../../services/bannerService';
import { setSnackbarConfig } from '../../store/slice/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'i18next';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Filter from './filterBannerList';
import { useFormik } from 'formik';
import usePermission from '../../components/Permission/usePermission';
import { filterRememberValueHandler } from '../../store/slice/Filter';
import { pageHandler, rowPageHandler } from '../../store/slice/Pagination';

const headCells: HeadCell[] = [
  {
    id: 'campaign_name',
    numeric: false,
    disablePadding: true,
    label: 'Campaign Name',
  },
  {
    id: 'banner_type',
    numeric: false,
    disablePadding: false,
    label: 'Banner Type - Module - Placement',
  },
  {
    id: 'target_module',
    numeric: false,
    disablePadding: false,
    label: 'Target Module',
  },
  {
    id: 'target_element',
    numeric: false,
    disablePadding: false,
    label: 'Target Element',
  },
  {
    id: 'city',
    numeric: false,
    disablePadding: false,
    label: 'City',
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
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

const bannerList = () => {
  const { permission } = usePermission('BANNER');
  const userFilterDetails = useSelector((state: any) => state?.filter);
  const pagenationDetails = useSelector((state: any) => state?.pagination);
  const [dense] = React.useState(false);
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletePayLoad, setDeletePayLoad] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPayload, setFilterPayload] = useState({});
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const formik = useFormik({
    initialValues: {
      campaign_name: '',
      banner_type: null,
      banner_module: null,
      banner_placement_id: null,
      target_module: null,
      target_deal_type: null,
      target_deal_id: null,
      targetcategory: null,
      target_tag_id: null,
      search_term: '',
      city_id: null,
      // banner_active_date: '',
      // banner_expiry_date: '',
      platform: null,
      status: null,
    },
    onSubmit: async (value) => {
      dispatch(filterRememberValueHandler(value));
      setFilterPayload(value);
      dispatch(pageHandler(0));
      setFilterOpen(false);
    },
  });

  //navigates to banner form
  const handleBanner = () => {
    return path.CREATEBANNER;
  };

  //routes to banner form to update with specific id
  const updateFormById = (e: string | number) => {
    return `/banner/bannerlist/update/${e}`;
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

  //sets popup box true
  const deleteRow = (id: any) => {
    setOpen(true);
    setDeletePayLoad(id);
  };

  //deletes the row and gets remaining rows
  const handleDeleteBanner = () => {
    deleteBanner(deletePayLoad)
      .then((response) => {
        getAllBanners();
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: 'Banner deleted successfully',
            varient: 'success',
          })
        );
        setOpen(false);
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
    setOpen(false);
    getAllBanners();
  };

  // avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, page * rowsPerPage - rows.length) : 0;

  // shows banner details in the list
  const getAllBanners = () => {
    setLoading(true);
    let payLoad =
      userFilterDetails?.filterDetails !== null
        ? userFilterDetails?.filterDetails
        : filterPayload;
    getBanners(pagenationDetails?.page, pagenationDetails?.rowsPerPage, payLoad)
      .then((response) => {
        setRows(response.data.banners);
        setTotalCount(response.data.totalCount);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    getAllBanners();
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
            <Link className="addBtn" to={handleBanner()}>
              {/* <Button
                variant="contained"
                size="large"
                type="submit"
                onClick={handleBanner}
              > */}
              Add Banner
              {/* </Button> */}
            </Link>
          )}{' '}
        </Stack>
      </Grid>
      <MainCard content={false} title="Banner List">
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
                  <TableCell colSpan={5}>Loading data ...</TableCell>
                </TableRow>
              ) : rows && rows.length > 0 ? (
                rows?.map((row: any) => {
                  return (
                    <Row
                      key={row.id}
                      row={row}
                      deleteRow={deleteRow}
                      permission={permission}
                      // updateFormById={() => {
                      //   updateFormById(row.id);
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
      <ConfirmBoxAlert
        title={'Delete'}
        handleClose={() => setOpen(false)}
        message={'Do you want to delete this Banner ?'}
        open={open}
        submitHandler={() => handleDeleteBanner()}
      />
    </>
  );

  function Row({ row, deleteRow, permission }) {
    return (
      <>
        <TableRow hover tabIndex={-1}>
          <TableCell>{row?.campaign_name}</TableCell>
          <TableCell>
            {row?.banner_type}-{row?.banner_module}-{row?.banner_placement_id}
          </TableCell>
          <TableCell>{row?.target_module}</TableCell>
          <TableCell>
            {row?.target_deal_type
              ? `${row?.target_deal_type}-${row?.dealName}`
              : ''}
            {row?.tagname ? row?.tagname : ''}
            {row?.targetcategoryname ? row?.targetcategoryname : ''}
            {row?.search_term ? row.search_term : ''}
          </TableCell>
          <TableCell>
            {row?.bannerCities?.map((i: any) => i.cityname).join(', ')}
          </TableCell>
          <TableCell>{row?.platform}</TableCell>
          <TableCell>{row?.isActive == true ? 'Active' : 'Expired'}</TableCell>
          <TableCell>{row?.active ? 'Active' : 'Inactive'}</TableCell>

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
                  onClick={() => deleteRow(row.id)}
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
};

export default bannerList;
