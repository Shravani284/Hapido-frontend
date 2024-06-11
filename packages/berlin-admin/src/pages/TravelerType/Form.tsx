import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Breadcrumbs,
  Button,
  CircularProgress,
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
  FileUpload,
  FileUploadAr,
  NormalTextField,
  constants,
} from 'berlin-common';
import { useEffect, useState } from 'react';
import { path } from '../../routes/Routers';
import { useDispatch } from 'react-redux';
import MainCard from '../../components/MainCard';
import usePermission from '../../components/Permission/usePermission';
import {
  addTraveler,
  getTravelerById,
  updateTraveler,
} from '../../services/TravlerType';
import { setSnackbarConfig } from '../../store/slice/Loader';
import { getSigneid } from '../../utils/getIds';
import { FormHelperText } from '@mui/material';

// ==============================|| FORMS VALIDATION - ADDRESS ||============================== //

export interface Root {
  translations: Translation[];
  icon_image_id: any;
  icon_image_id_ar: any;
}

export interface Translation {
  column_name: string;
  locale: string;
  text: string;
}

function TravelerTypeForm() {
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

  const [name, setName] = useState<any>();

  const formik = useFormik({
    initialValues: {
      translations: [
        {
          column_name: 'traveller_type_trans_ids',
          locale: 'en',
          text: '',
        },
        {
          column_name: 'traveller_type_trans_ids',
          locale: 'ar',
          text: '',
        },
      ],
      icon_image_id: null,
      icon_image_id_ar: null,
    },
    validationSchema: yup.object({
      translations: yup.array().of(
        yup.object().shape({
          column_name: yup.string().nullable(''),
          locale: yup.string().nullable(''),
          text: yup.string().required('Field is required'),
        })
      ),
    }),
    onSubmit: async (value: Root) => {
      handleAddTag(value);
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    const enTitle = formik?.values?.translations?.findIndex(
      (e: any) => e?.locale === 'en'
    );
    const arTitle = formik?.values?.translations?.findIndex(
      (e: any) => e?.locale === 'ar'
    );
    setName({ enTitle, arTitle });
  }, [formik?.values?.translations]);

  const handleCancel = () => {
    navigate(path.TRAVELERTYPE);
  };

  useEffect(() => {
    if (id) {
      getTravelerById(id)
        .then((response) => {
          const travellerType = { ...response?.data?.data?.travellerType };
          if (travellerType?.images?.length > 0) {
            const imagesList: constants.types.fileType[] =
              travellerType?.images.map((item: any) => {
                return {
                  ...item,
                  id: item.imageId,
                  type: 'image',
                };
              });
            setSelectedImages(imagesList);
          }
          if (travellerType?.images?.length > 0) {
            const imagesList: constants.types.fileType[] =
              travellerType?.images_ar.map((item: any) => {
                return {
                  ...item,
                  id: item.imageId,
                  type: 'image',
                };
              });
            setSelectedImagesAr(imagesList);
          }
          formik.setFieldValue('translations', travellerType?.translations);
          setTagData(travellerType);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleAddTag = async (value: Root) => {
    // const res: any = value;

    if (id) {
      setBtnLoader(true);
      updateTraveler({
        ...value,
        icon_image_id: getSigneid(selectedImages, 'img'),
        icon_image_id_ar: getSigneid(selectedImagesAr, 'img'),
        id: parseInt(id),
      })
        .then((response) => {
          setBtnLoader(false);
          if (response.data.success === true) {
            navigate(path.TRAVELERTYPE);
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Traveler Type updated successfully',
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
      addTraveler(value)
        .then((response) => {
          setBtnLoader(false);
          if (response.data.success === true) {
            dispatch(
              setSnackbarConfig({
                isOpen: true,
                message: 'Traveler Type created successfully',
                varient: 'success',
              })
            );
            navigate(path.TRAVELERTYPE);
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

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={path.TRAVELERTYPE}>
          Traveler Type
        </Link>

        <Typography color="text.primary">
          {id ? 'Update Traveler Type' : 'Add Traveler Type'}
        </Typography>
      </Breadcrumbs>
      <MainCard>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3.5}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Traveler Type Name (English)
                    <span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField
                    name={`translations[${name?.enTitle}].text`}
                    placeholder="Name Trans English"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Traveler Type Name (Arabic)
                    <span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField
                    name={`translations[${name?.arTitle}].text`}
                    placeholder="Name Trans Arabic"
                  />
                </Stack>
              </Grid>
              {id && (
                <>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>Upload Image (Single)</InputLabel>
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
                        tableName={{ name: 'traveller_types', id: id }}
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
                      <InputLabel>Upload Image (Arabic) (Single)</InputLabel>
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
                        tableName={{ name: 'traveller_types', id: id }}
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
export default TravelerTypeForm;
