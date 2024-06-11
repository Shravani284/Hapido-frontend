import { Button, InputLabel, Stack } from '@mui/material';
import { Drawer } from '@mui/material';
import { Box } from '@mui/material';
import { FormikProvider } from 'formik';
import { Grid } from '@mui/material';
import { GroupDropDown, MagicDropDown, NormalTextField } from 'berlin-common';
import { activeTorF, filterToogleOption } from '../../../data/data';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export function CategoryFilter({
  formik,
  filterOpen,
  categoryPrime,
  setFilterOpen,
}: any) {
  const userFilterDetails = useSelector((state: any) => state?.filter);
  const [categoriList] = useState([
    { label: 'Primary', id: 1 },
    { label: 'Secondary', id: 2 },
  ]);

  const setFilterHandler = () => {
    formik.setFieldValue('name', userFilterDetails?.filterDetails?.name);
    formik.setFieldValue(
      'tree_level',
      userFilterDetails?.filterDetails?.tree_level
    );
    formik.setFieldValue(
      'parent_category',
      userFilterDetails?.filterDetails?.parent_category
    );
    formik.setFieldValue('is_menu', userFilterDetails?.filterDetails?.is_menu);
    formik.setFieldValue(
      'is_featured',
      userFilterDetails?.filterDetails?.is_featured
    );
    formik.setFieldValue(
      'is_home_widget',
      userFilterDetails?.filterDetails?.is_home_widget
    );
    formik.setFieldValue('active', userFilterDetails?.filterDetails?.active);
  };

  useEffect(() => {
    setFilterHandler();
  }, [filterOpen]);

  return (
    <Drawer
      anchor={'right'}
      open={filterOpen}
      onClose={() => setFilterOpen(false)}
    >
      <Box p={2}>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container width={200}>
              <Grid item mt={1} xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>Name</InputLabel>
                  <NormalTextField
                    name="name"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Name"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Primary/Secondary category</InputLabel>
                  <GroupDropDown
                    name="tree_level"
                    option={categoriList}
                    label=" Category"
                    formik={formik}
                    placeholder="Select  Category"
                    // multiple
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Parent Category</InputLabel>
                  <MagicDropDown
                    label="Parent Category"
                    name="parent_category"
                    option={categoryPrime}
                    formik={formik}
                    placeholder="Parent Category"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Is Menu</InputLabel>
                  <MagicDropDown
                    label="Is menu"
                    name="is_menu"
                    option={filterToogleOption}
                    formik={formik}
                    placeholder="Is Menu"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Is Featured</InputLabel>
                  <MagicDropDown
                    label="Is Featured"
                    name="is_featured"
                    option={filterToogleOption}
                    formik={formik}
                    placeholder="Is Featured"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Is home Widget</InputLabel>
                  <MagicDropDown
                    label="Is home Widget"
                    name="is_home_widget"
                    option={filterToogleOption}
                    formik={formik}
                    placeholder="Is home Widget"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Active</InputLabel>
                  <MagicDropDown
                    label="Active"
                    name="active"
                    option={activeTorF}
                    formik={formik}
                    placeholder="Active"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} mt={2}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={2}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      formik.resetForm();
                      formik.handleSubmit();
                    }}
                  >
                    Reset
                  </Button>
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </FormikProvider>
      </Box>
    </Drawer>
  );
}

// export default Filter;
