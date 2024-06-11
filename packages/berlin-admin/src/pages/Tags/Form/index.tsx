// material-ui
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  InputLabel,
  Stack,
  Typography,
} from '@mui/material';

// third-party
import { FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';

// project imports
import {
  CustomSwitchButton,
  FileUpload,
  FileUploadAr,
  NormalTextField,
  constants,
} from 'berlin-common';
import MainCard from '../../MainCard';
import { useEffect, useState } from 'react';
import { path } from '../../../routes/Routers';
import { TranslationType } from '../../category/constants/types';
import { createTag, getTagById, updateTag } from '../../../services/tagService';
import { useDispatch } from 'react-redux';
import { setSnackbarConfig } from '../../../store/slice/Loader';
import { CircularProgress } from '@mui/material';
import usePermission from '../../../components/Permission/usePermission';
import { getSigneid } from '../../../utils/getIds';
import { FormHelperText } from '@mui/material';

// ==============================|| FORMS VALIDATION - ADDRESS ||============================== //

export interface addTagType {
  tag_ar: string;
  tag_en: string;
  icon_image_id: string;
  icon_image_id_ar: string;
}

export interface Translation {
  locale: string;
  text: string;
}

export interface Role {
  module_id: number;
  access: string;
}

function form() {
  const params = useParams();
  const id: string = params.id ? params.id : '';
  const [tagData, setTagData] = useState<any>([]);
  const [btnLoader, setBtnLoader] = useState(false);
  const { permission } = usePermission('DEAL');
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState<
    constants.types.fileType[]
  >([]);
  const [selectedImagesAr, setSelectedImagesAr] = useState<
    constants.types.fileType[]
  >([]);

  const formik = useFormik({
    initialValues: {
      tag_en: '',
      tag_ar: '',
      icon_image_id: '',
      icon_image_id_ar: '',
    },
    validationSchema: yup.object({
      tag_en: yup.string().required('Name (English) required'),
      tag_ar: yup.string().required('Name (Arabic) required'),
    }),
    onSubmit: async (value) => {
      handleAddTag(value);
    },
  });
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(path.TAGLIST);
  };

  useEffect(() => {
    if (id) {
      getTagById(id)
        .then((response) => {
          const tag = { ...response.data.data.tag };
          if (tag.translations.length > 0) {
            const tag_en = tag.translations.find(
              (ele: TranslationType) => ele.locale === 'en'
            );

            const tag_ar = tag.translations.find(
              (ele: TranslationType) => ele.locale === 'ar'
            );

            tag.tag_en = tag_en?.text ?? '';
            tag.tag_ar = tag_ar?.text ?? '';
          }

          setTagData(tag);

          formik.setValues({
            tag_en: tag.tag_en,
            tag_ar: tag.tag_ar,
            // is_home_widget: tag.is_home_widget === 1 ? true : false,
            icon_image_id: tag.icon_image_id,
            icon_image_id_ar: tag.icon_image_id_ar,
            // note: tag.note,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleAddTag = async (value: addTagType) => {
    const res: any = value;
    const payload = {
      translations: [
        {
          column_name: 'tag_name_trans_ids',
          locale: 'en',
          text: res.tag_en,
        },
        {
          column_name: 'tag_name_trans_ids',
          locale: 'ar',
          text: res.tag_ar,
        },
      ],
      icon_image_id: parseInt(getSigneid(selectedImages, 'img')),
      icon_image_id_ar: parseInt(getSigneid(selectedImagesAr, 'img')),
    };

    if (id) {
      setBtnLoader(true);
      updateTag({ ...payload, id: parseInt(id) })
        .then((response) => {
          setBtnLoader(false);
          if (response.data.success === true) {
            navigate(path.TAGLIST);
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Tag updated successfully',
                varient: 'success',
              })
            );
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
      createTag(payload)
        .then((response) => {
          setBtnLoader(false);
          if (response.data.success === true) {
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Tag created successfully',
                varient: 'success',
              })
            );
            navigate(path.TAGLIST);
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
    }
  };

  useEffect(() => {
    if (tagData?.images?.length > 0) {
      const imagesList: constants.types.fileType[] = tagData?.images?.map(
        (item: any) => {
          return {
            ...item,
            id: item.imageId,
            type: 'image',
          };
        }
      );
      setSelectedImages(imagesList);
    }
    if (tagData?.images_ar?.length > 0) {
      const imagesList: any = tagData?.images_ar?.map((item) => {
        return {
          ...item,
          id: item.imageId,
          type: 'image',
        };
      });
      setSelectedImagesAr(imagesList);
    }
  }, [tagData]);

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={path.TAGLIST}>
          Tags
        </Link>

        <Typography color="text.primary">
          {id ? 'Update Tag' : 'Add Tag'}
        </Typography>
      </Breadcrumbs>
      <MainCard>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3.5}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Tag Name (English)<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField name="tag_en" placeholder="Name Trans" />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Tag Name (Arabic)<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField name="tag_ar" placeholder="Name Trans " />
                </Stack>
              </Grid>
              {id && (
                <>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>
                        Upload Image (Single)<span className="asterisk">*</span>
                      </InputLabel>
                      <FormHelperText id="standard-weight-helper-text-email-login">
                        {'Note:- Max Size - 10 MB Per File'}
                      </FormHelperText>
                      <FileUpload
                        disabled={
                          permission === 'WRITE' || permission === 'FULL'
                            ? false
                            : true
                        }
                        name={'icon_image_id'}
                        tableName={{ name: 'tags', id: id }}
                        onSelect={(data: constants.types.fileType[]) => {
                          setSelectedImages(data);
                        }}
                        files={selectedImages}
                        accept="image/*"
                        type="image"
                        multiSelect={false}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>
                        Upload Image (Arabic) (Single)
                        <span className="asterisk">*</span>
                      </InputLabel>
                      <FormHelperText id="standard-weight-helper-text-email-login">
                        {'Note:- Max Size - 10 MB Per File'}
                      </FormHelperText>
                      <FileUploadAr
                        disabled={
                          permission === 'WRITE' || permission === 'FULL'
                            ? false
                            : true
                        }
                        name={'icon_image_id_ar'}
                        tableName={{ name: 'tags', id: id }}
                        onSelect={(data: constants.types.fileType[]) => {
                          setSelectedImagesAr(data);
                        }}
                        files={selectedImagesAr}
                        accept="image/*"
                        type="image"
                        multiSelect={false}
                      />
                    </Stack>
                  </Grid>
                </>
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
                        <>{id ? 'Update' : 'Add'}</>
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
