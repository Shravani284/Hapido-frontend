import React, { useCallback, useEffect, useState } from 'react';

import {
  Divider,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Breadcrumbs,
  Box,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import MainCard from '../../components/MainCard';
import { CategoryHeadCells } from './constants';
import {
  deleteCategory,
  getAllCategories,
} from '../../services/categoryService';
import useConfig from '../../hooks/useConfig';
import { CategoryType, TranslationType } from './constants/types';
import CategoryList from './CategoryList';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbarConfig } from '../../store/slice/Loader';
import { Typography } from '@mui/material';
import { ConfirmBoxAlert, paginationOption } from 'berlin-common';
import { CategoryFilter } from './constants/CategoryFilter';
import { useFormik } from 'formik';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { path } from '../../routes/Routers';
import usePermission from '../../components/Permission/usePermission';
import { getCategoriesSubCategories } from '../../services/dropDownService';
import { filterRememberValueHandler } from '../../store/slice/Filter';
import { pageHandler, rowPageHandler } from '../../store/slice/Pagination';

const CategoryScreen = () => {
  const { permission } = usePermission('CATEGORY');
  const userFilterDetails = useSelector((state: any) => state?.filter);
  const pagenationDetails = useSelector((state: any) => state?.pagination);
  const [dense] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [categoryPrime, setCategoryPrime] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletePayLoad, setDeletePayLoad] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = React.useState(0);
  const { i18n } = useConfig();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPayload, setFilterPayload] = useState({});

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

  const fetchCategories = useCallback(() => {
    let payLoad =
      userFilterDetails?.filterDetails !== null
        ? userFilterDetails?.filterDetails
        : filterPayload;
    setLoading(true);
    getAllCategories(
      i18n,
      pagenationDetails?.page,
      pagenationDetails?.rowsPerPage,
      payLoad
    )
      .then((res) => {
        setRows(res.data.data.categories);
        setTotalCount(res.data.data.totalCount);
        if (res.data.success) {
          setCategoryList(res?.data.data.allCategories);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log({ err });
        setLoading(false);
      });
  }, [
    pagenationDetails?.page,
    pagenationDetails?.rowsPerPage,
    filterPayload,
    userFilterDetails?.filterDetails,
  ]);

  const formik = useFormik({
    initialValues: {
      tree_level: null,
      name: '',
      is_menu: null,
      is_featured: null,
      parent_category: null,
      is_home_widget: null,
      active: null,
    },
    onSubmit: async (value) => {
      dispatch(filterRememberValueHandler(value));
      setFilterPayload(value);
      setFilterOpen(false);
      dispatch(pageHandler(0));
    },
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const deleteRecord = (categoryId: any) => {
    setModalOpen(true);
    setDeletePayLoad(categoryId);
  };

  const getCategoryList = () => {
    getCategoriesSubCategories()
      .then((res) => {
        const data = res?.filter((item) => !item.subcategory);
        setCategoryPrime(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  const deleteHandler = () => {
    if (deletePayLoad) {
      setLoading(true);
      deleteCategory(deletePayLoad)
        .then((response) => {
          if (response.data.success) {
            fetchCategories();
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Category deleted successfully',
                varient: 'success',
              })
            );
            setModalOpen(false);
          }
        })
        .catch((err) => {
          console.log(err, 'err');
          setLoading(false);
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: err?.response?.data?.error.message,
              varient: 'error',
            })
          );
          setModalOpen(false);
        });
    }
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
            <Button
              variant="contained"
              size="large"
              type="submit"
              onClick={() =>
                navigate(path.CATEGORYFORM, {
                  state: {
                    isEditable: false,
                  },
                })
              }
            >
              Add Category List
            </Button>
          )}
        </Stack>
      </Grid>

      <MainCard content={false} title="Category List">
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
          <CategoryFilter
            formik={formik}
            filterOpen={filterOpen}
            categoryPrime={categoryPrime}
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
                {CategoryHeadCells.map((headCell, index) => (
                  <TableCell
                    key={index}
                    sx={{ textAlign: index > 1 ? 'center' : 'left' }}
                  >
                    {headCell}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <CategoryList
              list={categoryList}
              loading={loading}
              onEdit={(category) => {
                if (category.id) {
                  navigate(`/category/update/${category.id}`, {
                    state: {
                      isEditable: true,
                      ...category,
                    },
                  });
                }
              }}
              onDelete={deleteRecord}
            />
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
        message={'Do you want to delete this Category ?'}
        open={modalOpen}
        submitHandler={deleteHandler}
      />
    </>
  );
};
export default CategoryScreen;
