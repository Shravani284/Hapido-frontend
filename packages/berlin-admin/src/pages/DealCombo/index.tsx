import React, { useEffect, useState } from 'react';
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
  Collapse,
  Box,
  Grid,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { path } from '../../routes/Routers';
import MainCard from '../../components/MainCard';
import { HeadCell } from '../../../../berlin-merchant/src/types/table';
import IconButton from '../../components/@extended/IconButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ConfirmBoxAlert, DateFormat, paginationOption } from 'berlin-common';
import {
  deleteDealCombo,
  getAllComboChildDeal,
  getDealCombo,
} from '../../services/dealComboServices';
import { setSnackbarConfig } from '../../store/slice/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Filter } from './filter';
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
    id: 'combo_id',
    numeric: false,
    disablePadding: true,
    label: 'Combo Id',
  },
  {
    id: 'combo_title',
    numeric: false,
    disablePadding: true,
    label: 'Combo Title',
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
    label: 'category',
  },
  {
    id: 'platform',
    numeric: false,
    disablePadding: true,
    label: 'platform',
  },
  {
    id: 'activeNow',
    numeric: false,
    disablePadding: true,
    label: 'active Now',
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

const DealCombos = () => {
  const { permission } = usePermission('DEAL');
  const userFilterDetails = useSelector((state: any) => state?.filter);
  const pagenationDetails = useSelector((state: any) => state?.pagination);
  const [dense] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [isLoading, setLoading] = useState(false);
  const [deletePayLoad, setDeletePayLoad] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPayload, setFilterPayload] = useState({});
  const [dealList, setDealList] = useState([]);
  const [categoryList, setCategoryList] = useState<any>([]);

  const formik = useFormik({
    initialValues: {
      comboid: '',
      name: '',
      combo_child_id: null,
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

  const handleComboForm = () => {
    return path.DEALCOMBOFORM;
  };

  const getAllDealCombos = () => {
    let payLoad =
      userFilterDetails?.filterDetails !== null
        ? userFilterDetails?.filterDetails
        : filterPayload;
    setLoading(true);
    getDealCombo(
      pagenationDetails?.page + 1,
      pagenationDetails?.rowsPerPage,
      payLoad
    )
      .then((res) => {
        if (res?.data?.success) {
          const getAllDealComboList = res.data.data.deals?.map((item: any) => {
            const obj = { ...item };
            if (item.translations.length > 0) {
              const title_en = item.translations.find(
                (ele: any) =>
                  ele.locale === 'en' && ele.column_name === 'title_trans_ids'
              );
              const title_ar = item.translations.find(
                (ele: any) =>
                  ele.locale === 'ar' && ele.column_name === 'title_trans_ids'
              );

              obj.title = `${title_en?.text ?? ''}`;
            }
            return obj;
          });
          setRows(getAllDealComboList);
          setTotalCount(res.data.data.totalCount);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
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

  // const updateDealById = (id: any) => {
  //   navigate(`/deals/dealcombo/update/${id}`);
  // };

  // ? Delete List Item
  const deleteDeals = (e: any) => {
    setModalOpen(true);
    setDeletePayLoad(e.id);
  };
  const handleDelete = () => {
    const payLoad = {
      id: deletePayLoad,
      soft_delete: true,
    };
    deleteDealCombo(payLoad)
      .then((response) => {
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: 'Deal Combo deleted successfully',
            varient: 'success',
          })
        );
        getAllDealCombos();
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
  const allDeals = () => {
    getAllDeals()
      .then((res) => {
        if (res.success) {
          const allSingleDeal = res.data?.allDeals.filter(
            (i: any) => i.type === 'Combo' && i.deal_type === 'SINGLE'
          );
          setDealList(allSingleDeal);
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
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

  useEffect(() => {
    allDeals();
    getCategoryList();
  }, []);

  useEffect(() => {
    getAllDealCombos();
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
            <Link className="addBtn" to={handleComboForm()}>
              {/* <Button
                variant="contained"
                size="large"
                type="submit"
                onClick={handleComboForm}
              > */}
              Add Deal Combo
              {/* </Button> */}
            </Link>
          )}
        </Stack>
      </Grid>

      <MainCard content={false} title="Deal Combo">
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
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7}>Loading data ...</TableCell>
                </TableRow>
              ) : rows && rows.length > 0 ? (
                rows?.map((row: any, index: number) => {
                  return (
                    <Row
                      key={index}
                      row={row}
                      deleteDeals={deleteDeals}
                      // updateDealById={() => {
                      //   updateDealById(row.id);
                      // }}
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
      <ConfirmBoxAlert
        title={'Delete'}
        handleClose={() => setModalOpen(false)}
        message={'Do you want to delete this Deal Combo ?'}
        open={modalOpen}
        submitHandler={handleDelete}
      />
    </>
  );
};

function Row({ row, deleteDeals, permission }: any) {
  const [open, setOpen] = React.useState(false);
  const getCategory = (primary, secondary) => {
    return (
      <>
        {`Primary- ${primary}`}

        <br />

        {`Secondary- ${secondary?.join(', ')}`}
      </>
    );
  };
  const updateDealById = (id: any) => {
    return `/deals/dealcombo/update/${id}`;
  };
  return (
    <>
      <TableRow hover tabIndex={-1} key={row.id} onClick={() => setOpen(!open)}>
        <TableCell>{row?.id}</TableCell>
        <TableCell>{row?.title}</TableCell>
        <TableCell>{row?.selling_price}</TableCell>
        {getCategory(row?.primary_category, row?.secondary_categories)}
        <TableCell>{row?.platform}</TableCell>
        <TableCell>{row?.active_now}</TableCell>
        <TableCell>{row?.active ? 'Active' : 'Inactive'}</TableCell>

        <TableCell align="right">
          <Box display={'flex'} justifyContent={'end'} gap={3}>
            <Link to={updateDealById(row.id)}>
              <IconButton
                variant="light"
                color="info"
                // onClick={() => updateDealById(row.id)}
              >
                <EditOutlined />
              </IconButton>
            </Link>
            {permission === 'FULL' && (
              <IconButton variant="light" onClick={() => deleteDeals(row)}>
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
    </>
  );
}

export default DealCombos;
