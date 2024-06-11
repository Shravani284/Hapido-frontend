import { useCallback, useEffect, useState } from 'react';

import {
  Divider,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Breadcrumbs,
  Typography,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import MainCard from '../../../components/MainCard';
import { SubCategoryHeadCells } from '../constants';
import {
  deleteCategory,
  getSubCategories,
} from '../../../services/categoryService';
import { CategoryType, TranslationType } from '../constants/types';
import CategoryList from '../CategoryList';
import { setSnackbarConfig } from '../../../store/slice/Loader';
import { useDispatch } from 'react-redux';
import { ConfirmBoxAlert } from 'berlin-common';
import { path } from '../../../routes/Routers';

const CategoryDetails = () => {
  const [dense] = useState(false);
  const [subCategories, setSubCategories] = useState<CategoryType[]>([]);
  const [parentCategory, setParentCategory] = useState<CategoryType | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletePayLoad, setDeletePayLoad] = useState();
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();

  const fetchSubCategories = useCallback(() => {
    getSubCategories(state.parentCategory?.id)
      .then((response) => {
        if (response.data.success) {
          const list = response.data.data.subCategories.map(
            (item: CategoryType) => {
              const obj = { ...item };
              if (item.translations.length > 0) {
                const name_en = item.translations.find(
                  (ele: TranslationType) =>
                    ele.locale === 'en' && ele.column_name === 'name'
                );

                const name_ar = item.translations.find(
                  (ele: TranslationType) =>
                    ele.locale === 'ar' && ele.column_name === 'name'
                );

                obj.name = `${name_en?.text ?? ''} ${name_ar?.text ?? ''}`;

                const description_en = item.translations.find(
                  (ele: TranslationType) =>
                    ele.locale === 'en' && ele.column_name === 'description'
                );

                const description_ar = item.translations.find(
                  (ele: TranslationType) =>
                    ele.locale === 'ar' && ele.column_name === 'description'
                );

                obj.description = `${description_en?.text ?? ''} ${
                  description_ar?.text ?? ''
                }`;
              }
              return obj;
            }
          );
          setSubCategories(list);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log({ err });
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (state.parentCategory?.id) {
      setLoading(true);
      setParentCategory(state.parentCategory);
      fetchSubCategories();
    }
  }, []);

  const deleteRecord = (categoryId: any) => {
    setModalOpen(true);
    setDeletePayLoad(categoryId);
  };

  const deleteHandler = () => {
    if (deletePayLoad) {
      setLoading(true);
      deleteCategory(deletePayLoad)
        .then((response) => {
          if (response.data.success) {
            fetchSubCategories();
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Sub Category deleted successfully',
                varient: 'success',
              })
            );
          }
          setModalOpen(false);
        })
        .catch((err) => {
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: err.response.data.error.message.code
                ? err.response.data.error.message.code
                : 'Something went wrong',
              varient: 'error',
            })
          );
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            spacing={2}
            marginBottom={'20px'}
          >
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" to="/">
                Home
              </Link>
              <Link color="inherit" to="/Category">
                Category
              </Link>
              <Typography color="text.primary">
                {parentCategory?.name}
              </Typography>
            </Breadcrumbs>
          </Stack>
        </Grid>

        <Grid item xs={6}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={2}
            marginBottom={'20px'}
          >
            <Button
              variant="contained"
              size="large"
              type="submit"
              onClick={() =>
                navigate(path.CATEGORYFORM, {
                  state: {
                    isSubCategory: true,
                    parentCategory: state.parentCategory,
                  },
                })
              }
            >
              Add Sub Category
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <MainCard content={false} title="Sub-Category List">
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <TableHead>
              <TableRow>
                {SubCategoryHeadCells.map((headCell, index) => (
                  <TableCell
                    key={index}
                    sx={{ textAlign: index > 2 ? 'center' : 'left' }}
                  >
                    {headCell}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <CategoryList
              list={subCategories}
              loading={loading}
              onEdit={(category) => {
                if (category.id) {
                  navigate(`/category/update/${category.id}`, {
                    state: {
                      isEditable: true,
                      isSubCategory: true,
                      categoryId: category.id,
                      parentCategory: state.parentCategory,
                    },
                  });
                }
              }}
              onDelete={deleteRecord}
            />
          </Table>
        </TableContainer>
        <Divider />
      </MainCard>
      <ConfirmBoxAlert
        title={'Delete'}
        handleClose={() => setModalOpen(false)}
        message={'Do you want to delete this Sub Category ?'}
        open={modalOpen}
        submitHandler={deleteHandler}
      />
    </>
  );
};
export default CategoryDetails;
