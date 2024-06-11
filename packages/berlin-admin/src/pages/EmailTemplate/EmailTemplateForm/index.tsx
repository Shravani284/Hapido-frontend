// material-ui
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Grid,
  InputLabel,
  Stack,
  Typography,
  Breadcrumbs,
} from '@mui/material';
// third-party
import { FormikProvider, useFormik } from 'formik';

// project imports
import {
  NormalTextField,
  CustomSwitchButton,
  MagicDropDown,
} from 'berlin-common';
import MainCard from '../../MainCard';
import { useEffect, useState } from 'react';
import {
  CreateTemplateValues,
  initialValues,
  validationSchema,
} from './initialValues';
import { setSnackbarConfig } from '../../../store/slice/Loader';
import { useDispatch } from 'react-redux';
import {
  UpdateEmailTemplate,
  addEmailTemplate,
  getTemplateByIdAPI,
} from '../../../services/emailTemplateService';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { path } from '../../../routes/Routers';
import { CircularProgress } from '@mui/material';
import usePermission from '../../../components/Permission/usePermission';
import { languageList } from '../../../data/data';

// ==============================|| FORMS VALIDATION - ADDRESS ||============================== //

function form() {
  const { permission } = usePermission('EMAIL_TEMPLATE');

  const navigate = useNavigate();
  const params = useParams();
  const [btnLoader, setBtnLoader] = useState(false);
  const emailtemId: string = params.id ? params.id : '';
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleAdd(values);
    },
  });

  const HandleCancel = () => {
    navigate(path.EMAILTEMPLATELIST);
  };

  const handleAdd = async (values: CreateTemplateValues) => {
    const res: any = values;
    const payload = {
      name: res.name,
      lang: res.lang.id,
      subject: res.subject,
      description: res.description,
      text_part: res.text_part,
      html_part: res.html_part,
      active: res.active,
    };

    if (emailtemId) {
      setBtnLoader(true);
      UpdateEmailTemplate({ ...payload, id: +emailtemId })
        .then((response) => {
          setBtnLoader(false);
          if (response.success === true) {
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Email Template updated successfully',
                varient: 'success',
              })
            );
            navigate(path.EMAILTEMPLATELIST);
          }
        })
        .catch((error) => {
          setBtnLoader(false);
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: error.response.data.error.message
                ? error.response.data.error.message
                : 'something went wong',
              varient: 'error',
            })
          );
        });
    } else {
      setBtnLoader(true);
      addEmailTemplate(payload)
        .then((response) => {
          setBtnLoader(false);
          if (response.status === 200) {
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Email Template created successfully',
                varient: 'success',
              })
            );
            navigate(path.EMAILTEMPLATELIST);
          }
        })
        .catch((error) => {
          setBtnLoader(false);
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

  useEffect(() => {
    if (emailtemId) {
      getTemplateByIdAPI(emailtemId)
        .then((response) => {
          if (response) {
            const emailTem = { ...response.data.data.template };

            formik.setValues({
              active: emailTem.active,
              name: emailTem.name,
              lang: {
                label: emailTem.lang == 'ar' ? 'Arabic' : 'English',
                id: emailTem.lang,
              },
              subject: emailTem.subject,
              description: emailTem.description,
              html_part: emailTem.html_part,
              text_part: emailTem.text_part,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={path.EMAILTEMPLATELIST}>
          Email Template
        </Link>
        {emailtemId ? (
          <Typography color="text.primary">Update Email Template</Typography>
        ) : (
          <Typography color="text.primary">Add Email Template</Typography>
        )}
      </Breadcrumbs>
      <MainCard>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3.5}>
              <Grid item xs={12}></Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Name<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField name="name" placeholder="Name" />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Select Language<span className="asterisk">*</span>
                  </InputLabel>
                  <MagicDropDown
                    name="lang"
                    placeholder="Select Language"
                    option={languageList}
                    label="lang"
                    formik={formik}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Subject<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField name="subject" placeholder="Subject" />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Description<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField
                    name="description"
                    placeholder="Description"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Text Part<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField
                    name="text_part"
                    placeholder="Text Part"
                    multiline={true}
                    rows={5}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Html Part</InputLabel>
                  <Editor
                    placeholder="Html Part"
                    value={formik.values.html_part}
                    onValueChange={(html_part) =>
                      formik.setFieldValue('html_part', html_part)
                    }
                    highlight={(code) => highlight(code, languages.js, 'js')}
                    padding={10}
                    style={{
                      fontFamily: '"Fira code", "Fira Mono", monospace',
                      fontSize: 12,
                      border: '1px solid',
                      borderColor: '#E5E4E2',
                      minHeight: 300,
                    }}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Active</InputLabel>
                  <CustomSwitchButton
                    name={'active'}
                    formik={formik}
                    label=""
                  />
                </Stack>
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
                    onClick={HandleCancel}
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
                        <>{emailtemId ? 'Update' : 'Add'}</>
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
}

export default form;
