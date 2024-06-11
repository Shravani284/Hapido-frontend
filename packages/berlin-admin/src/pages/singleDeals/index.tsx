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
  Collapse,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { HeadCell } from '../../../../berlin-merchant/src/types/table';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import MainCard from '../../components/MainCard';
import { ConfirmBoxAlert, paginationOption } from 'berlin-common';
import { path } from '../../routes/Routers';
import IconButton from '../../components/@extended/IconButton';
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  RightOutlined,
} from '@ant-design/icons';
import Search from '../../layout/MainLayout/Header/HeaderContent/Search';
import {
  allDealsList,
  deleteDealsFormList,
  merchantDropDownApi,
} from '../../services/dealsService';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbarConfig } from '../../store/slice/Loader';
import { t } from 'i18next';
import { TranslationType } from '../category/constants/types';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Filter } from './filter';
import { useFormik } from 'formik';
import Permission from '../../components/Permission';
import { merchantActiveList } from '../../services/dropDownService';
import { useTranslation } from 'react-i18next';
import { getCategoriesSubCategories } from '../../services/dropDownService';
import usePermission from '../../components/Permission/usePermission';
import { filterRememberValueHandler } from '../../store/slice/Filter';
import { pageHandler, rowPageHandler } from '../../store/slice/Pagination';
import { VolunteerActivismOutlined } from '@mui/icons-material';

const headCells: HeadCell[] = [
  {
    id: 'deal_id',
    numeric: false,
    disablePadding: true,
    label: 'Deal ID',
  },
  {
    id: 'name_eng',
    numeric: false,
    disablePadding: true,
    label: 'Deal Title',
  },
  {
    id: 'grouped',
    numeric: false,
    disablePadding: true,
    label: 'Grouped',
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
    id: 'merchant',
    numeric: false,
    disablePadding: true,
    label: 'Merchant',
  },
  {
    id: 'deal_type',
    numeric: false,
    disablePadding: true,
    label: 'Deal Type',
  },
  {
    id: 'onboarding_status',
    numeric: false,
    disablePadding: true,
    label: 'Onboarding Status',
  },
  {
    id: 'platform',
    numeric: false,
    disablePadding: true,
    label: 'Platform',
  },
  {
    id: 'active_now',
    numeric: false,
    disablePadding: true,
    label: 'Active Now',
  },
  {
    id: 'active',
    numeric: false,
    disablePadding: true,
    label: 'Active',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'ACTION',
  },
];

export default function SingleDeals() {
  const { permission } = usePermission('DEAL');
  const userFilterDetails = useSelector((state: any) => state?.filter);
  const pagenationDetails = useSelector((state: any) => state?.pagination);
  const [page, setPage] = useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [deleteDelasId, setDeleteDelasId] = useState();
  const dispatch = useDispatch();
  // const [open, setOpen] = React.useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPayload, setFilterPayload] = useState({});
  const [categoryList, setCategoryList] = useState<any>([]);
  const [merchantDropDown, setMerchantDropDown] = useState([]);
  const { t, i18n } = useTranslation('translation');

  const formik = useFormik({
    initialValues: {
      dealid: '',
      name: '',
      inventory_pricing: null,
      type_pricing: null,
      booking_deal: null,
      categoryid: null,
      merchantid: null,
      voucher_type: null,
      hapido_fulfilled: null,
      template_type: null,
      //TODO
      groupType: [],
      excludedGroup: [],
      featured: null,
      home_widget: null,
      platform: null,
      onboarding_status: null,
      active_date: '',
      end_date: '',
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

  const handleAddDeal = () => {
    return path.SINGLEDEALSFORM;
  };

  const dealsList = () => {
    let payLoad =
      userFilterDetails?.filterDetails !== null
        ? userFilterDetails?.filterDetails
        : filterPayload;
    setLoading(true);
    // console.log({ payLoad });
    allDealsList(
      pagenationDetails?.page,
      pagenationDetails?.rowsPerPage,
      payLoad
    )
      .then((res) => {
        setRows(res.data.data.deals);
        setTotalCount(res?.data?.data?.totalCount);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    dealsList();
  }, [
    pagenationDetails?.page,
    pagenationDetails?.rowsPerPage,
    filterPayload,
    userFilterDetails?.filterDetails,
  ]);

  const handleDelete = () => {
    const payLoad = {
      id: deleteDelasId,
      soft_delete: true,
    };
    deleteDealsFormList(payLoad)
      .then((response) => {
        if (response.data.success) {
          setModalOpen(false);
          dealsList();
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: 'Deals deleted successfully.',
              varient: 'success',
            })
          );
          navigate(path.SINGLEDEALS);
        }
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
  const deleteItem = (e: any) => {
    setModalOpen(true);
    setDeleteDelasId(e.id);
  };

  //api for category list
  const getCategoryList = (data?: any[]) => {
    getCategoriesSubCategories()
      .then((res) => {
        setCategoryList(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Merchant  Dropdown
  const getMerchant = () => {
    merchantActiveList(i18n.language)
      .then((res) => {
        setMerchantDropDown(res?.data?.data?.marchants);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    getMerchant();
    getCategoryList();
  }, []);

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
              <Link className="addBtn" to={handleAddDeal()}>
                {/* <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  onClick={handleBannerPlacement}
                > */}
                Add Deals
                {/* </Button> */}
              </Link>
            )}
          </Stack>
        </Grid>
      </Grid>

      <MainCard content={false} title="Deal Single">
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
            merchantDropDown={merchantDropDown}
            categoryList={categoryList}
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
        <ConfirmBoxAlert
          title={'Delete'}
          handleClose={() => setModalOpen(false)}
          message={'Do you want to delete this Deals ?'}
          open={modalOpen}
          submitHandler={handleDelete}
        />
      </MainCard>
    </>
  );
}

function Row({ row = [], deleteItem, permission }: any) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const updateFormById = (id: any) => {
    return `/deals/singledeals/update/${id}`;
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

  const getDealTitleEng = (item) => {
    if (item?.length > 0) {
      const title_en = item?.find(
        (ele: TranslationType) =>
          ele?.locale === 'en' && ele?.column_name === 'title_trans_ids'
      );
      return title_en?.text;
    }
  };

  const getVariablePricing = (inventory: number, type: number) => {
    if (inventory === 1 && type === 1) {
      return 'Inventory - Type';
    }
    if (inventory === 1 && type === 0) {
      return 'Inventory';
    }
    if (inventory === 0 && type === 1) {
      return 'Type';
    }
    if (inventory === 0 && type === 0) {
      return '-';
    }
  };

  const getBooking = (isBooked: number) => {
    return isBooked === 1 ? 'Yes' : 'No';
  };

  const getCategory = (primary: any, secondary: any) => {
    return (
      <div>
        {`Primary- ${primary}`}
        <br />
        {`Secondary- ${secondary ? secondary.join(', ') : 'Not Exist'}`}
      </div>
    );
  };
  return (
    <>
      <TableRow hover tabIndex={-1} key={row.id}>
        {/* <TableCell onClick={() => setOpen(!open)}>
          {!open ? <RightOutlined /> : <DownOutlined />}
        </TableCell> */}
        <TableCell>{row?.id}</TableCell>
        <TableCell>{getDealTitleEng(row?.translations)}</TableCell>
        {/* //TODO */}
        <TableCell>
          <>
            {row?.groupBundleIds?.length > 0 && (
              <p style={{ marginBottom: '5px' }}>
                Bundle -
                {row?.groupBundleIds.map((e) => {
                  return (
                    <Link to={`/deals/dealbundle/update/${e}`} target="_blank">
                      {e}
                    </Link>

                    // <span
                    //   onClick={() => navigate(`/deals/dealbundle/update/${e}`)}

                    // >
                    //   {e}
                    // </span>
                  );
                })}
              </p>
            )}
            {row?.groupComboIds?.length > 0 && (
              <p style={{ marginTop: '0px' }}>
                Combo -
                {row?.groupComboIds.map((e: any) => {
                  return (
                    <Link to={`/deals/dealcombo/update/${e}`} target="_blank">
                      {e}
                    </Link>
                    // <span
                    //   onClick={() => navigate(`/deals/dealcombo/update/${e}`)}
                    // >
                    //   {e}
                    // </span>
                  );
                })}
              </p>
            )}
          </>
        </TableCell>
        <TableCell>{row?.selling_price}</TableCell>
        <TableCell>
          {getCategory(row?.primary_category, row?.secondary_categories)}
        </TableCell>
        <TableCell>{row?.merchant_name}</TableCell>
        <TableCell>{`${row?.voucher_type} ${row?.template_type}`}</TableCell>
        <TableCell>{row?.deal_onboarding_status}</TableCell>
        <TableCell>{row?.platform}</TableCell>
        <TableCell>{row?.active_now}</TableCell>
        <TableCell>{row?.active === 1 ? 'Active' : 'Inactive'}</TableCell>
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
      {/* <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={9}>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            sx={{ width: '100%' }}
          >
            {open && (
              <Box
                sx={{
                  py: 3,
                  pl: { xs: 3, sm: 5, md: 6, lg: 10, xl: 12 },
                }}
              > */}
      {/* <MainCard content={false}> */}
      {/*<Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>CATEGORY</TableCell>
                      <TableCell>MERCHANT</TableCell>
                      <TableCell>DEAL TYPE</TableCell>
                      <TableCell>ONBOARDING STATUS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow></TableRow>
                  </TableBody>
                </Table> */}
      {/* </MainCard> */}
      {/*</Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow> */}
    </>
  );
}
