import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import {
  Breadcrumbs,
  Button,
  CircularProgress,
  Divider,
  FormHelperText,
  Grid,
  InputLabel,
  Stack,
} from '@mui/material';
import { FormikProvider, useFormik } from 'formik';

import {
  NormalTextField,
  MagicDropDown,
  CustomSwitchButton,
  FileUpload,
  FileUploadAr,
} from 'berlin-common';
import MainCard from '../../MainCard';
import {
  // activeStatus,
  initialFormValues,
  validationSchema,
} from '../constants';
import {
  CategoryFormType,
  CategoryType,
  TranslationType,
} from '../constants/types';
import { useEffect, useState } from 'react';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from '../../../services/categoryService';
import useConfig from '../../../hooks/useConfig';
import { useDispatch } from 'react-redux';
import { setSnackbarConfig } from '../../../store/slice/Loader';
import { constants } from 'berlin-common';
import { homeWidgetData } from '../../../data/data';
import { getAllBannerPlacements } from '../../../services/bannerService';
import { path } from '../../../routes/Routers';
import { Typography } from '@mui/material';
import usePermission from '../../../components/Permission/usePermission';
import { getId } from '../../../utils/getIds';
import { WEBSITEHOST } from '../../../../../../urlConst';

const CategoryForm = () => {
  const { permission } = usePermission('CATEGORY');
  const [categoryList, setCategoryList] = useState([]);
  const [placementList, setPlacementList] = useState<any>([]);
  const [data, setData] = useState<any>();
  const [btnLoader, setBtnLoader] = useState(false);
  const [selectedImages, setSelectedImages] = useState<
    constants.types.fileType[]
  >([]);
  const [selectedVideos, setSelectedVideos] = useState<
    constants.types.fileType[]
  >([]);
  const [selectedImagesAr, setSelectedImagesAr] = useState<
    constants.types.fileType[]
  >([]);
  const [selectedVideosAr, setSelectedVideosAr] = useState<
    constants.types.fileType[]
  >([]);

  const navigate = useNavigate();
  const { i18n } = useConfig();
  const { state } = useLocation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: (value) => {
      handleAdd(value);
    },
  });

  useEffect(() => {
    if (state?.sub_category) {
      formik.setFieldValue('isSubCategory', state?.sub_category);
    }
  }, [state?.sub_category]);

  const setFormikData = useCallback((data: CategoryType) => {
    const obj = {
      name_en: '',
      description_en: '',
      name_ar: '',
      description_ar: '',
      meta_title_en: '',
      meta_title_ar: '',
      meta_description_en: '',
      meta_description_ar: '',
      meta_keywords_en: '',
      meta_keywords_ar: '',
      meta_deal_title_en: '',
      meta_deal_title_ar: '',
      meta_deal_description_en: '',
      meta_deal_description_ar: '',
      meta_deal_keywords_en: '',
      meta_deal_keywords_ar: '',
      sort: '',
    };
    const name_en = data.translations.find(
      (ele: TranslationType) =>
        ele.locale === 'en' && ele.column_name === 'name'
    );
    if (name_en) {
      obj.name_en = name_en.text;
    }

    const description_en = data.translations.find(
      (ele: TranslationType) =>
        ele.locale === 'en' && ele.column_name === 'description'
    );
    if (description_en) {
      obj.description_en = description_en.text;
    }

    const name_ar = data.translations.find(
      (ele: TranslationType) =>
        ele.locale === 'ar' && ele.column_name === 'name'
    );
    if (name_ar) {
      obj.name_ar = name_ar.text;
    }

    const description_ar = data.translations.find(
      (ele: TranslationType) =>
        ele.locale === 'ar' && ele.column_name === 'description'
    );
    if (description_ar) {
      obj.description_ar = description_ar.text;
    }

    const meta_title_en = data?.metaData?.translations.find(
      (ele: TranslationType) =>
        ele.locale === 'en' && ele.column_name === 'title'
    );
    if (meta_title_en) {
      obj.meta_title_en = meta_title_en.text;
    }
    const meta_title_ar = data?.metaData?.translations.find(
      (ele: TranslationType) =>
        ele.locale === 'ar' && ele.column_name === 'title'
    );
    if (meta_title_ar) {
      obj.meta_title_ar = meta_title_ar.text;
    }
    const meta_description_en = data?.metaData?.translations.find(
      (ele: TranslationType) =>
        ele.locale === 'en' && ele.column_name === 'description'
    );
    if (meta_description_en) {
      obj.meta_description_en = meta_description_en.text;
    }
    const meta_description_ar = data?.metaData?.translations.find(
      (ele: TranslationType) =>
        ele.locale === 'ar' && ele.column_name === 'description'
    );
    if (meta_description_ar) {
      obj.meta_description_ar = meta_description_ar.text;
    }
    const meta_keywords_en = data?.metaData?.translations.find(
      (ele: TranslationType) =>
        ele.locale === 'en' && ele.column_name === 'keywords'
    );
    if (meta_keywords_en) {
      obj.meta_keywords_en = meta_keywords_en.text;
    }
    const meta_keywords_ar = data?.metaData?.translations.find(
      (ele: TranslationType) =>
        ele.locale === 'ar' && ele.column_name === 'keywords'
    );
    if (meta_keywords_ar) {
      obj.meta_keywords_ar = meta_keywords_ar.text;
    }
    // deal
    const meta_deal_title_en = data?.dealMetaData?.translations.find(
      (ele: TranslationType) =>
        ele.locale === 'en' && ele.column_name === 'title'
    );
    if (meta_deal_title_en) {
      obj.meta_deal_title_en = meta_deal_title_en.text;
    }
    const meta_deal_title_ar = data?.dealMetaData?.translations.find(
      (ele: TranslationType) =>
        ele.locale === 'ar' && ele.column_name === 'title'
    );
    if (meta_deal_title_ar) {
      obj.meta_deal_title_ar = meta_deal_title_ar.text;
    }
    const meta_deal_description_en = data?.dealMetaData?.translations.find(
      (ele: TranslationType) =>
        ele.locale === 'en' && ele.column_name === 'description'
    );
    if (meta_deal_description_en) {
      obj.meta_deal_description_en = meta_deal_description_en.text;
    }
    const meta_deal_description_ar = data?.dealMetaData?.translations.find(
      (ele: TranslationType) =>
        ele.locale === 'ar' && ele.column_name === 'description'
    );
    if (meta_deal_description_ar) {
      obj.meta_deal_description_ar = meta_deal_description_ar.text;
    }
    const meta_deal_keywords_en = data?.dealMetaData?.translations.find(
      (ele: TranslationType) =>
        ele.locale === 'en' && ele.column_name === 'keywords'
    );
    if (meta_deal_keywords_en) {
      obj.meta_deal_keywords_en = meta_deal_keywords_en.text;
    }
    const meta_deal_keywords_ar = data?.dealMetaData?.translations.find(
      (ele: TranslationType) =>
        ele.locale === 'ar' && ele.column_name === 'keywords'
    );
    if (meta_deal_keywords_ar) {
      obj.meta_deal_keywords_ar = meta_deal_keywords_ar.text;
    }

    if (data?.images?.length > 0) {
      const imagesList: any = data?.images?.map((item) => {
        return {
          ...item,
          id: item.imageId,
          type: 'image',
        };
      });
      setSelectedImages(imagesList);
    }

    if (data?.videos?.length > 0) {
      const videoList: any = data?.videos?.map((item) => {
        return {
          ...item,
          id: item.videoId,
          type: 'video',
        };
      });
      setSelectedVideos(videoList);
    }
    if (data?.images_ar?.length > 0) {
      const imagesList: any = data?.images_ar?.map((item) => {
        return {
          ...item,
          id: item.imageId,
          type: 'image',
        };
      });
      setSelectedImagesAr(imagesList);
    }

    if (data?.videos_ar?.length > 0) {
      const videoList: any = data?.videos_ar?.map((item) => {
        return {
          ...item,
          id: item.videoId,
          type: 'video',
        };
      });
      setSelectedVideosAr(videoList);
    }

    formik.setValues({
      show_in_menu: data.is_menu,
      show_in_featured: data.is_featured,
      feature_widget_priority: data.feature_widget_priority,
      home_widget_type:
        homeWidgetData.find((e: any) => e.id === data.home_widget_type) || null,
      show_in_home_widgets: data.is_home_widget,
      sort: data.sort,
      home_placement_id:
        placementList.find((e: any) => e.id === data.home_placement_id) || null,
      active: data.active,
      name_en: obj.name_en,
      name_ar: obj.name_ar,
      meta_title_en: obj.meta_title_en,
      meta_title_ar: obj.meta_title_ar,
      meta_description_en: obj.meta_description_en,
      meta_description_ar: obj.meta_description_ar,
      meta_keywords_en: obj.meta_keywords_en,
      meta_keywords_ar: obj.meta_keywords_ar,
      meta_deal_title_en: obj.meta_deal_title_en,
      meta_deal_title_ar: obj.meta_deal_title_ar,
      meta_deal_description_en: obj.meta_deal_description_en,
      meta_deal_description_ar: obj.meta_deal_description_ar,
      meta_deal_keywords_en: obj.meta_deal_keywords_en,
      meta_deal_keywords_ar: obj.meta_deal_keywords_ar,
      description_en: obj.description_en,
      description_ar: obj.description_ar,
      parent_category: null,
      isSubCategory: state.sub_category,
    });
  }, []);

  useEffect(() => {
    if (state.isEditable) {
      const { id } = state;
      getCategoryById(id)
        .then((response) => {
          const data = { ...response.data.data.category };
          setFormikData(data);
          setData(data);
        })
        .catch((err) => {
          console.log({ err });
        });
    }
  }, [state]);

  useEffect(() => {
    if (formik.values.isSubCategory) {
      getCategories()
        .then((res) => {
          if (res.data.success) {
            const list = res.data.data.allCategories;
            setCategoryList(list);
            if (state.sub_category) {
              const category = list.find(
                (ele: any) => ele.id === state?.parent_category_id
              );
              if (category) {
                formik.setFieldValue('parent_category', category);
              }
            }
          }
        })
        .catch((err) => {
          console.log({ err });
        });
    }
  }, [formik.values.isSubCategory]);

  const handleCancel = () => {
    navigate(-1);
  };
  //api for placement ids
  const getAllPlacementId = () => {
    getAllBannerPlacements()
      .then((response) => {
        const banners = response.data.data.placements?.map((item: any) => {
          return {
            id: item.id,
            label: item.placement_location,
          };
        });
        setPlacementList(banners);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllPlacementId();
  }, []);

  useEffect(() => {
    if (placementList.length > 0) {
      formik.setFieldValue(
        'home_placement_id',
        placementList?.find((e) => e.id === data?.home_placement_id) || null
      );
    }
  }, [data, placementList]);
  const handleAdd = (payLoad: CategoryFormType) => {
    const obj: any = {
      image_ids: getId(selectedImages, 'img'),
      video_ids: getId(selectedVideos, 'vid'),
      image_ids_ar: getId(selectedImagesAr, 'img'),
      video_ids_ar: getId(selectedVideosAr, 'vid'),
      is_menu: payLoad.show_in_menu,
      is_featured: payLoad.show_in_featured,
      show_in_featured: payLoad?.show_in_featured,
      is_home_widget: payLoad.show_in_home_widgets,
      feature_widget_priority: payLoad?.feature_widget_priority,
      home_widget_type: payLoad.show_in_home_widgets
        ? payLoad.home_widget_type?.id
        : null,
      home_placement_id: payLoad.show_in_home_widgets
        ? payLoad.home_placement_id?.id
        : null,
      sort: payLoad?.sort,
      active: payLoad.active,
      translations: [
        {
          column_name: 'name',
          table_name: 'category',
          locale: 'en',
          text: payLoad.name_en,
        },
        {
          column_name: 'name',
          locale: 'ar',
          table_name: 'category',
          text: payLoad.name_ar,
        },
        {
          column_name: 'description',
          table_name: 'category',
          locale: 'en',
          text: payLoad.description_en,
        },
        {
          column_name: 'description',
          locale: 'ar',
          table_name: 'category',
          text: payLoad.description_ar,
        },
      ],
      metaData: {
        meta_for: 'CATEGORY',
        translations: [
          {
            column_name: 'title',
            table_name: 'meta',
            locale: 'en',
            text: payLoad.meta_title_en,
          },
          {
            column_name: 'title',
            locale: 'ar',
            table_name: 'meta',
            text: payLoad.meta_title_ar,
          },
          {
            column_name: 'description',
            table_name: 'meta',
            locale: 'en',
            text: payLoad.meta_description_en,
          },
          {
            column_name: 'description',
            table_name: 'meta',
            locale: 'ar',
            text: payLoad.meta_description_ar,
          },
          {
            column_name: 'keywords',
            table_name: 'meta',
            locale: 'en',
            text: payLoad.meta_keywords_en,
          },
          {
            column_name: 'keywords',
            table_name: 'meta',
            locale: 'ar',
            text: payLoad.meta_keywords_ar,
          },
        ],
      },
      dealMetaData: {
        meta_for: 'DEAL-CATEGORY',
        translations: [
          {
            column_name: 'title',
            table_name: 'meta',
            locale: 'en',
            text: payLoad.meta_deal_title_en,
          },
          {
            column_name: 'title',
            locale: 'ar',
            table_name: 'meta',
            text: payLoad.meta_deal_title_ar,
          },
          {
            column_name: 'description',
            table_name: 'meta',
            locale: 'en',
            text: payLoad.meta_deal_description_en,
          },
          {
            column_name: 'description',
            table_name: 'meta',
            locale: 'ar',
            text: payLoad.meta_deal_description_ar,
          },
          {
            column_name: 'keywords',
            table_name: 'meta',
            locale: 'en',
            text: payLoad.meta_deal_keywords_en,
          },
          {
            column_name: 'keywords',
            table_name: 'meta',
            locale: 'ar',
            text: payLoad.meta_deal_keywords_ar,
          },
        ],
      },
    };

    if (formik.values.isSubCategory && formik.values.parent_category?.id) {
      obj.parent_category = { id: formik.values.parent_category?.id };
    }

    if (state.isEditable) {
      const { id } = state;
      obj.id = id;
      let updateObj = {
        ...obj,
        metaData: {
          ...obj?.metaData,
          id: data?.metaData?.id,
        },
        dealMetaData: {
          ...obj?.dealMetaData,
          id: data?.dealMetaData?.id,
        },
      };
      setBtnLoader(true);
      updateCategory(updateObj)
        .then((response) => {
          setBtnLoader(false);
          if (response.data.success) {
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: formik.values.isSubCategory
                  ? 'Sub Category updated successfully.'
                  : 'Category updated successfully.',
                varient: 'success',
              })
            );
            navigate('/category');
          }
        })
        .catch((err) => {
          setBtnLoader(false);
          console.log({ err });
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: err.response.data.error.message
                ? err.response.data.error.message
                : 'something went wrong',
              varient: 'error',
            })
          );
        });
    } else {
      setBtnLoader(true);
      createCategory(obj)
        .then((res) => {
          setBtnLoader(false);
          if (res.data.success) {
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: formik.values.isSubCategory
                  ? 'Sub Category updated successfully.'
                  : 'Category added successfully.',
                varient: 'success',
              })
            );
            navigate('/category');
          }
        })
        .catch((err) => {
          setBtnLoader(false);
          console.log({ err });
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: err.response.data.error.message
                ? err.response.data.error.message
                : 'something went wrong',
              varient: 'error',
            })
          );
        });
    }
  };
  useEffect(() => {
    if (!formik.isSubmitting) return;
    if (Object.keys(formik.errors).length > 0) {
      const firstError = document.querySelector('.Mui-error');

      if (firstError) {
        const offset = -150; // Adjust this value based on your preference
        const scrollToY =
          firstError.getBoundingClientRect().top + window.scrollY + offset;

        window.scrollTo({ top: scrollToY, behavior: 'smooth' });
      }
    }
  }, [formik]);
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={path.CATEGORYLIST}>
          Category
        </Link>
        {state?.isEditable ? (
          <Typography color="text.primary">Update Category</Typography>
        ) : (
          <Typography color="text.primary">Add Category</Typography>
        )}
      </Breadcrumbs>
      <MainCard>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            {state.isEditable && (
              <Button
                variant="outlined"
                color="secondary"
                type="reset"
                sx={{ mr: 1 }}
                href={`${WEBSITEHOST}/ae-en/${data?.slug}`}
                target="_blank"
              >
                Go to Category page
              </Button>
            )}
            <Grid container spacing={3.5}>
              <Grid item xs={12}>
                <CustomSwitchButton
                  name={'isSubCategory'}
                  formik={formik}
                  label="Is Sub-Category?"
                  disabled={state.isEditable}
                />
              </Grid>
              {formik.values.isSubCategory ? (
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>
                      Parent Category
                      <span className="asterisk">*</span>
                    </InputLabel>
                    <MagicDropDown
                      name="parent_category"
                      option={categoryList}
                      formik={formik}
                      placeholder="Select Parent Category"
                    />
                  </Stack>
                </Grid>
              ) : null}

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Name (English)<span className="asterisk">*</span>{' '}
                  </InputLabel>
                  <NormalTextField name="name_en" placeholder="Category Name" />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Name (Arabic)<span className="asterisk">*</span>{' '}
                  </InputLabel>
                  <NormalTextField name="name_ar" placeholder="Category Name" />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Description (English)</InputLabel>
                  <NormalTextField
                    name="description_en"
                    multiline
                    rows={4}
                    placeholder="Description (English)"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Description (Arabic)</InputLabel>
                  <NormalTextField
                    name="description_ar"
                    multiline
                    rows={4}
                    placeholder="Description (Arabic)"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Page Title (English)<span className="asterisk">*</span>{' '}
                  </InputLabel>
                  <NormalTextField
                    name="meta_title_en"
                    placeholder="Page Title"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Page Title (Arabic)<span className="asterisk">*</span>{' '}
                  </InputLabel>
                  <NormalTextField
                    name="meta_title_ar"
                    placeholder="Page Title"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Meta Keyword (English)
                    <span className="asterisk">*</span>{' '}
                  </InputLabel>
                  <NormalTextField
                    name="meta_keywords_en"
                    placeholder="Meta Keywords"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Meta Keyword (Arabic)
                    <span className="asterisk">*</span>{' '}
                  </InputLabel>
                  <NormalTextField
                    name="meta_keywords_ar"
                    placeholder="Meta Keywords"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Meta Description (English)
                    <span className="asterisk">*</span>{' '}
                  </InputLabel>
                  <NormalTextField
                    name="meta_description_en"
                    multiline
                    rows={4}
                    placeholder="Meta Description"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Meta Description (Arabic)
                    <span className="asterisk">*</span>{' '}
                  </InputLabel>
                  <NormalTextField
                    name="meta_description_ar"
                    multiline
                    rows={4}
                    placeholder="Meta Description"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Deal Page Title (English)
                    <span className="asterisk">*</span>{' '}
                  </InputLabel>
                  <NormalTextField
                    name="meta_deal_title_en"
                    placeholder=" Deal Page Title"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Deal Page Title (Arabic)
                    <span className="asterisk">*</span>{' '}
                  </InputLabel>
                  <NormalTextField
                    name="meta_deal_title_ar"
                    placeholder=" Deal Page Title"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Meta Deal Keyword (English)
                    <span className="asterisk">*</span>{' '}
                  </InputLabel>
                  <NormalTextField
                    name="meta_deal_keywords_en"
                    placeholder="Meta Deal Keywords"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Meta Deal Keyword (Arabic)
                    <span className="asterisk">*</span>{' '}
                  </InputLabel>
                  <NormalTextField
                    name="meta_deal_keywords_ar"
                    placeholder="Meta Deal Keywords"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Meta Deal Description (English)
                    <span className="asterisk">*</span>{' '}
                  </InputLabel>
                  <NormalTextField
                    name="meta_deal_description_en"
                    multiline
                    rows={4}
                    placeholder="Meta Deal Description"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Meta Deal Description (Arabic)
                    <span className="asterisk">*</span>{' '}
                  </InputLabel>
                  <NormalTextField
                    name="meta_deal_description_ar"
                    multiline
                    rows={4}
                    placeholder="Meta Deal Description"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Sort Weightage <span className="asterisk">*</span>{' '}
                  </InputLabel>
                  <NormalTextField
                    name="sort"
                    placeholder="Enter Sort Weightage"
                  />
                  {/* <MagicDropDown
                    name="sort"
                    option={sortWeight}
                    formik={formik}
                    placeholder="Select Parent Category"
                  /> */}
                </Stack>
              </Grid>

              {state.isEditable ? (
                <>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>Upload Image (Multiple)</InputLabel>
                      <FormHelperText id="standard-weight-helper-text-email-login">
                        {
                          'Note: First image will be used in menu/featured/subcat lists - upload resolution 200x200, for other images upload 1637x628, Max Size - 10 MB Per File'
                        }
                      </FormHelperText>
                      <FileUpload
                        disabled={
                          permission === 'WRITE' || permission === 'FULL'
                            ? false
                            : true
                        }
                        name={'image_ids'}
                        // tableName="category"
                        tableName={{ name: 'category', id: state?.id }}
                        onSelect={(data: constants.types.fileType[]) => {
                          setSelectedImages(data);
                        }}
                        files={selectedImages}
                        accept="image/*"
                        type="image"
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>Upload Image (Arabic) (Multiple)</InputLabel>
                      <FormHelperText id="standard-weight-helper-text-email-login">
                        {
                          'Note: First image will be used in menu/featured/subcat lists - upload resolution 200x200, for other images upload 1637x628, Max Size - 10 MB Per File'
                        }
                      </FormHelperText>
                      <FileUploadAr
                        disabled={
                          permission === 'WRITE' || permission === 'FULL'
                            ? false
                            : true
                        }
                        name={'image_ids_ar'}
                        // tableName="category"
                        tableName={{ name: 'category', id: state?.id }}
                        onSelect={(data: constants.types.fileType[]) => {
                          setSelectedImagesAr(data);
                        }}
                        files={selectedImagesAr}
                        accept="image/*"
                        type="image"
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>Upload Video (Multiple)</InputLabel>
                      <FormHelperText id="standard-weight-helper-text-email-login">
                        {
                          'Note: Video resolution 1637x828, Max Size - 200 MB Per File'
                        }
                      </FormHelperText>
                      <FileUpload
                        disabled={
                          permission === 'WRITE' || permission === 'FULL'
                            ? false
                            : true
                        }
                        accept="video/*"
                        type="video"
                        name={'video_ids'}
                        tableName={{ name: 'category', id: state?.id }}
                        onSelect={(data: constants.types.fileType[]) => {
                          setSelectedVideos(data);
                        }}
                        files={selectedVideos}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>Upload Video (Arabic) (Multiple)</InputLabel>
                      <FormHelperText id="standard-weight-helper-text-email-login">
                        {
                          'Note: Video resolution 1637x828, Max Size - 200 MB Per File'
                        }
                      </FormHelperText>
                      <FileUploadAr
                        disabled={
                          permission === 'WRITE' || permission === 'FULL'
                            ? false
                            : true
                        }
                        accept="video/*"
                        type="video"
                        name={'video_ids_ar'}
                        tableName={{ name: 'category', id: state?.id }}
                        onSelect={(data: constants.types.fileType[]) => {
                          setSelectedVideosAr(data);
                        }}
                        files={selectedVideosAr}
                      />
                    </Stack>
                  </Grid>
                </>
              ) : null}
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <CustomSwitchButton
                    name={'show_in_home_widgets'}
                    formik={formik}
                    label="Show in Home Widgets"
                  />
                </Stack>
              </Grid>
              {formik?.values?.show_in_home_widgets ? (
                <>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>
                        Home widget type<span className="asterisk">*</span>
                      </InputLabel>
                      <MagicDropDown
                        name="home_widget_type"
                        option={homeWidgetData}
                        formik={formik}
                        placeholder="Select Home Widget"
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>
                        Banner Placement Id<span className="asterisk">*</span>
                      </InputLabel>
                      <MagicDropDown
                        name="home_placement_id"
                        placeholder="Banner Placement Id"
                        option={placementList}
                        label="home_placement_id"
                        formik={formik}
                      />
                    </Stack>
                  </Grid>
                </>
              ) : (
                ''
              )}

              <Grid item xs={12} sm={6}>
                <InputLabel>
                  Active<span className="asterisk">*</span>
                </InputLabel>
                <CustomSwitchButton name="active" formik={formik} label="" />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <CustomSwitchButton
                    name={'show_in_featured'}
                    formik={formik}
                    label="Show in Featured List"
                  />
                </Stack>
              </Grid>
              {Boolean(formik?.values?.show_in_featured) === true && (
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>
                      Feature widget priority<span className="asterisk">*</span>
                    </InputLabel>
                    <NormalTextField
                      name={`feature_widget_priority`}
                      placeholder="Feature widget priority"
                    />
                  </Stack>
                </Grid>
              )}
              {formik.values.isSubCategory === false && (
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <CustomSwitchButton
                      name={'show_in_menu'}
                      formik={formik}
                      label="Show in Menu"
                    />
                  </Stack>
                </Grid>
              )}
              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={2}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    type="reset"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  {(permission === 'WRITE' || permission === 'FULL') && (
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={btnLoader}
                    >
                      {btnLoader ? (
                        <CircularProgress
                          color="secondary"
                          style={{ margin: '3px 10px' }}
                          size={18}
                        />
                      ) : (
                        <>{state.isEditable ? 'Update' : 'Add'}</>
                      )}
                    </Button>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </form>
        </FormikProvider>
      </MainCard>
    </>
  );
};

export default CategoryForm;
