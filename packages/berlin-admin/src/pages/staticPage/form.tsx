import {
  Breadcrumbs,
  Button,
  Stack,
  Grid,
  Typography,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { path } from '../../routes/Routers';
import MainCard from '../MainCard';
import {
  CustomSwitchButton,
  MagicDropDown,
  NormalTextField,
} from 'berlin-common';
import { Form, FormikProvider, useFormik } from 'formik';
import { FlashDiscountI, initialValues, validationSchema } from './Validation';
import { URL_SlugData } from '../../data/data';
import { useDispatch } from 'react-redux';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import {
  createStaticPage,
  getStaticPage,
  updateStaticPage,
} from '../../services/staticPagesService';
import { setSnackbarConfig } from '../../store/slice/Loader';
import usePermission from '../../components/Permission/usePermission';
import CodeEditor from '../../components/codeEditor';

const FlashDiscountForm = () => {
  const { permission } = usePermission('STATIC_PAGES');

  const dispatch = useDispatch();
  const [btnLoader, setBtnLoader] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: async (value: FlashDiscountI) => {
      const payLoad = {
        name: value.name,
        url_slug: value.url_slug?.id,
        inject_js: value.inject_js,
        inject_css: value.inject_css,
        translations: value.translations,

        metaData: value.metaData,
        active: value.active,
      };

      if (id) {
        setBtnLoader(true);
        updateStaticPage({ ...payLoad, id: parseInt(id) })
          .then((response) => {
            setBtnLoader(false);
            if (response.data.success === true) {
              dispatch(
                setSnackbarConfig({
                  isOpen: true,
                  message: 'Static page updated successfully',
                  varient: 'success',
                })
              );
              navigate(path.STATICPAGE);
            }
          })
          .catch((error) => {
            setBtnLoader(false);
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
      } else {
        setBtnLoader(true);
        createStaticPage(payLoad)
          .then((response) => {
            setBtnLoader(false);
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Static page created successfully',
                varient: 'success',
              })
            );
            navigate(path.STATICPAGE);
          })
          .catch((error) => {
            setBtnLoader(false);
            console.log('error', error);
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
      }
    },
  });

  const enTitle = formik.values.metaData?.translations.findIndex(
    (e: any) => e.column_name === 'title' && e.locale === 'en'
  );
  const arTitle = formik.values.metaData?.translations.findIndex(
    (e: any) => e.column_name === 'title' && e.locale === 'ar'
  );
  const enDescription = formik.values.metaData?.translations.findIndex(
    (e: any) => e.column_name === 'description' && e.locale === 'en'
  );
  const arDescription = formik.values.metaData?.translations.findIndex(
    (e: any) => e.column_name === 'description' && e.locale === 'ar'
  );
  const enKeywords = formik.values.metaData?.translations.findIndex(
    (e: any) => e.column_name === 'keywords' && e.locale === 'en'
  );
  const arKeywords = formik.values.metaData?.translations.findIndex(
    (e: any) => e.column_name === 'keywords' && e.locale === 'ar'
  );

  const enHTML = formik.values.translations.findIndex(
    (e: any) => e.column_name === 'content_trans_ids' && e.locale === 'en'
  );
  const arHTML = formik.values.translations.findIndex(
    (e: any) => e.column_name === 'content_trans_ids' && e.locale === 'ar'
  );
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
  const getStaticPagesByIds = () => {
    const dropdown = ['url_slug'];
    getStaticPage(id || '')
      .then((response) => {
        const result = response.data.data.staticPage;
        formik.setValues(response.data.data.staticPage);
        formik.setFieldValue('url_slug', {
          id: result.url_slug,
          label: result.url_slug,
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    if (id) {
      getStaticPagesByIds();
    }
  }, []);

  const handleCancel = () => {
    navigate(path.STATICPAGE);
  };

  return (
    <>
      <div>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" to={path.STATICPAGE}>
            Static Page
          </Link>
          {id ? (
            <Typography color="text.primary">Update Static Page</Typography>
          ) : (
            <Typography color="text.primary">Add Static Page</Typography>
          )}
        </Breadcrumbs>

        <MainCard>
          <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3.5}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>
                      Page Name<span className="asterisk">*</span>
                    </InputLabel>
                    <NormalTextField
                      name={'name'}
                      placeholder="Enter Page Name"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>
                      URL Slug<span className="asterisk">*</span>
                    </InputLabel>
                    <MagicDropDown
                      multiple={false}
                      name="url_slug"
                      option={URL_SlugData}
                      label="Select URL Slug"
                      formik={formik}
                      placeholder="Select URL Slug"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>Meta Title(English)</InputLabel>
                    <NormalTextField
                      name={`metaData.translations[${enTitle}].text`}
                      placeholder="Enter Meta Title "
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>Meta Title(Arabic)</InputLabel>
                    <NormalTextField
                      name={`metaData.translations[${arTitle}].text`}
                      placeholder="Enter Meta Title "
                      multiline={false}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>Meta Keywords(English)</InputLabel>
                    <NormalTextField
                      name={`metaData.translations[${enKeywords}].text`}
                      placeholder="Enter Meta Keywords "
                      multiline={false}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>Meta Keywords(Arabic)</InputLabel>
                    <NormalTextField
                      name={`metaData.translations[${arKeywords}].text`}
                      placeholder="Enter Meta Keywords "
                      multiline={false}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>Meta Description(English)</InputLabel>
                    <NormalTextField
                      name={`metaData.translations[${enDescription}].text`}
                      placeholder="Enter Meta Description"
                      multiline={false}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>Meta Description(Arabic)</InputLabel>
                    <NormalTextField
                      name={`metaData.translations[${arDescription}].text`}
                      placeholder="Enter Meta Description "
                      multiline={false}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>HTML Content(English)</InputLabel>
                    <CodeEditor
                      value={formik.values.translations[enHTML]?.text || ''}
                      formik={formik}
                      name={`translations[${enHTML}].text`}
                    />
                    {/* <Editor
                      placeholder="Html Part"
                      value={formik.values.translations[enHTML]?.text || ''}
                      onValueChange={(html_part) =>
                        formik.setFieldValue(
                          `translations[${enHTML}].text`,
                          html_part
                        )
                      }
                      name={`translations[${enHTML}].text`}
                      highlight={(code) => highlight(code, languages.js, 'js')}
                      padding={10}
                      style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                        border: '1px solid',
                        borderColor: '#E5E4E2',
                      }}
                    /> */}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>HTML Content(Arabic)</InputLabel>
                    <CodeEditor
                      lang={'ar'}
                      value={formik.values.translations[arHTML]?.text || ''}
                      formik={formik}
                      name={`translations[${arHTML}].text`}
                    />
                    {/* <Editor
                      placeholder="Html Part"
                      name={`translations[${arHTML}].text`}
                      value={formik.values.translations[arHTML]?.text || ''}
                      onValueChange={(html_part) =>
                        formik.setFieldValue(
                          `translations[${arHTML}].text`,
                          html_part
                        )
                      }
                      highlight={(code) => highlight(code, languages.js, 'js')}
                      padding={10}
                      style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                        border: '1px solid',
                        borderColor: '#E5E4E2',
                      }}
                    /> */}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>JavaScript</InputLabel>
                    <NormalTextField
                      name={'inject_js'}
                      placeholder="Enter JavaScript"
                    />
                  </Stack>
                </Grid>{' '}
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>Styles(CSS)</InputLabel>
                    <NormalTextField
                      name={'inject_css'}
                      placeholder="Enter Styles"
                    />
                  </Stack>
                </Grid>
                {/* Active */}
                <Grid item xs={12} sm={3}>
                  <InputLabel>Active</InputLabel>
                  <CustomSwitchButton
                    name={'active'}
                    formik={formik}
                    label=""
                  />
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
                          <>{id ? 'Update' : 'Add'}</>
                        )}
                      </Button>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </MainCard>
      </div>
    </>
  );
};

export default FlashDiscountForm;
