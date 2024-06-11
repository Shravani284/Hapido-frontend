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
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { HeadCell } from '../../../../berlin-merchant/src/types/table';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import MainCard from '../../components/MainCard';
import { ConfirmBoxAlert, DateFormat, paginationOption } from 'berlin-common';
import { path } from '../../routes/Routers';
import IconButton from '../../components/@extended/IconButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Search from '../../layout/MainLayout/Header/HeaderContent/Search';
import {
  deleteDealBundle,
  getAllBundleChildDeal,
  getDealBundle,
} from '../../services/dealBundleService';
import { setSnackbarConfig } from '../../store/slice/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'i18next';
import { Filter } from './filter';
import { useFormik } from 'formik';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Permission from '../../components/Permission';
import {
  getAllDeals,
  getCategoriesSubCategories,
} from '../../services/dropDownService';
import usePermission from '../../components/Permission/usePermission';
import { filterRememberValueHandler } from '../../store/slice/Filter';
import { pageHandler, rowPageHandler } from '../../store/slice/Pagination';

const headCells: HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'Bundle ID',
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Bundle Title',
  },
  {
    id: 'selling_price',
    numeric: false,
    disablePadding: true,
    label: 'Selling Price',
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: true,
    label: 'Category',
  },
  {
    id: 'platform',
    numeric: false,
    disablePadding: true,
    label: 'platform',
  },
  {
    id: 'active_now',
    numeric: false,
    disablePadding: true,
    label: 'ACTIVE NOW',
  },
  {
    id: 'active',
    numeric: false,
    disablePadding: true,
    label: 'ACTIVE',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'ACTION',
  },
];

// ==============================|| MUI TABLE - HEADER ||============================== //

// ==============================|| TABLE - DATA TABLE ||============================== //

export default function DealBundles() {
  const userFilterDetails = useSelector((state: any) => state?.filter);
  const pagenationDetails = useSelector((state: any) => state?.pagination);
  let navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPayload, setFilterPayload] = useState({});
  const [dealList, setDealList] = useState([]);
  const [categoryList, setCategoryList] = useState<any>([]);
  const { permission } = usePermission('DEAL');
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      bundleid: '',
      name: '',
      bundle_child_id: null,
      categoryid: null,
      featured: null,
      home_widget: null,
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

  const handleDealBundleList = () => {
    return path.DEALBUNDLEFORM;
  };

  //? Display List
  const getAllDealBundle = () => {
    let payLoad =
      userFilterDetails?.filterDetails !== null
        ? userFilterDetails?.filterDetails
        : filterPayload;
    setLoading(true);
    getDealBundle(
      pagenationDetails?.page,
      pagenationDetails?.rowsPerPage,
      payLoad
    )
      .then((res) => {
        if (res?.success) {
          const getAllDealBundleList = res.data.deals?.map((item: any) => {
            const obj = { ...item };
            if (item.translations.length > 0) {
              const title_en = item.translations.find(
                (ele: any) =>
                  ele.locale === 'en' && ele.column_name === 'title_trans_ids'
              );

              obj.title = `${title_en?.text ?? ''}`;
            }
            return obj;
          });

          setRows(getAllDealBundleList);
          setTotalCount(res.data.totalCount);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const allDeals = () => {
    getAllDeals()
      .then((res) => {
        if (res.success) {
          const allSingleDeal = res?.data?.allDeals.filter(
            (i: any) => i?.type === 'Bundle' && i?.deal_type === 'SINGLE'
          );
          setDealList(allSingleDeal);
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  //api for category list
  const getCategoryList = () => {
    getCategoriesSubCategories()
      .then((response) => {
        setCategoryList(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    allDeals();
    getCategoryList();
  }, []);

  useEffect(() => {
    getAllDealBundle();
  }, [
    pagenationDetails?.page,
    pagenationDetails?.rowsPerPage,
    filterPayload,
    userFilterDetails?.filterDetails,
  ]);

  return (
    <>
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={2}
            marginBottom={'20px'}
          >
            {(permission === 'WRITE' || permission === 'FULL') && (
              <Link className="addBtn" to={handleDealBundleList()}>
                {/* <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  onClick={handleDealBundleList}
                > */}
                Add Deal Bundles
                {/* </Button> */}
              </Link>
            )}
          </Stack>
        </Grid>
      </Grid>
      <MainCard content={false} title="Deal Bundle">
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
            dealList={dealList}
            categoryList={categoryList}
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
                  <TableCell colSpan={8}>Loading data ...</TableCell>
                </TableRow>
              ) : rows && rows.length > 0 ? (
                rows?.map((row: any) => {
                  return (
                    <Row
                      key={row.id}
                      row={row}
                      getAllDealBundle={() => {
                        getAllDealBundle();
                      }}
                      permission={permission}
                    />
                  );
                })
              ) : (
                <>
                  <TableRow>
                    <TableCell align="center" colSpan={8}>
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
    </>
  );
}

function Row({ row, getAllDealBundle, permission }: any) {
  const [open, setOpen] = React.useState(false);
  const [deletePayLoad, setDeletePayLoad] = useState('');
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const updateBannerById = (id: any) => {
    return `/deals/dealbundle/update/${id}`;
  };

  //? Delete List Item
  const deleteDeals = (e: any) => {
    setModalOpen(true);
    setDeletePayLoad(e.id);
  };
  const handleDelete = () => {
    const payLoad = {
      id: deletePayLoad,
      soft_delete: true,
    };
    deleteDealBundle(payLoad)
      .then((response) => {
        getAllDealBundle();
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: 'Deal Bundle deleted successfully',
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
        setModalOpen(false);
      });
  };

  const getCategory = (primary: any, secondary: any) => {
    return (
      <div>
        {`Primary- ${primary}`}
        <br />

        {secondary && `Secondary- ${secondary?.join(', ')}`}
        {/* {`Secondary- ${secondary?.join(', ')}`} */}
      </div>
    );
  };

  return (
    <>
      <TableRow hover tabIndex={-1} key={row.id} onClick={() => setOpen(!open)}>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.title}</TableCell>
        <TableCell>{row?.display_selling_price}</TableCell>
        <TableCell>
          {getCategory(row?.primary_category, row?.secondary_categories)}
        </TableCell>
        <TableCell>{row.platform}</TableCell>
        <TableCell>{row?.active_now}</TableCell>
        <TableCell>{row?.active ? 'Active' : 'Inactive'}</TableCell>

        <TableCell align="right">
          <Box display={'flex'} justifyContent={'end'} gap={3}>
            <Link to={updateBannerById(row.id)}>
              <IconButton
                title={t('EDIT')}
                variant="light"
                color="info"
                // onClick={() => updateBannerById(row.id)}
              >
                <EditOutlined />
              </IconButton>
            </Link>
            {permission === 'FULL' && (
              <IconButton
                title={t('DELETE')}
                variant="light"
                onClick={() => deleteDeals(row)}
              >
                <DeleteOutlined />
              </IconButton>
            )}
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit></Collapse>
        </TableCell>
      </TableRow>
      <ConfirmBoxAlert
        title={'Delete'}
        handleClose={() => setModalOpen(false)}
        message={'Do you want to delete this Deal Bundle ?'}
        open={modalOpen}
        submitHandler={handleDelete}
      />
    </>
  );
}
