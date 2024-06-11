import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import css from './Vouchers.module.scss';
import voucherImg from '../../../../berlin-consumer/assets/voucherImg.png';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Rating from '@mui/material/Rating';
import { useTranslation } from 'react-i18next';
import { FormikProvider, useFormik, Field, ErrorMessage } from 'formik';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  DateFormat,
  DateFormatAr,
  DealImg,
  FileUpload,
  constants,
  timeFormat,
} from 'berlin-common';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  createReview,
  submitReview,
  uploadReviewImages,
} from '../../services/voucherService';
import ImageUploading from 'react-images-uploading';
import { setSnackbarConfig } from '../../store/slice/Loader';
import { lang } from '../../utils/getLang';

interface IValues {
  stars: number;
  review_title: string;
  review_description: string;
  image_ids: string;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const VoucherReviewAr = () => {
  const { t } = useTranslation('translation');
  const [selectedImages, setSelectedImages] = useState<
    constants.types.fileType[]
  >([]);
  const [length, setLength] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [imagesData, setImagesData] = useState([]);
  const [details, setDetails] = useState<any>([]);
  const param = useParams();
  const encrypted_voucher_id = param?.voucherId;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let initialValue: IValues = {
    stars: null,
    review_title: null,
    review_description: null,
    image_ids: '',
  };

  const schema = Yup.object().shape({
    review_title: Yup.string()
      .min(5, t('REVIEW_TITLE_MUST_BE_ATLEAST_5_CHARACTERS_LONG'))
      .required(t('TITLE_REQUIRED')),
    review_description: Yup.string()
      .min(50, t('MESSAGE_MUST_BE_ATLEAST_50_CHARACTERS_LONG'))
      .required(t('REQUIRED_MESSAGE_REQUIRED')),
    stars: Yup.string().required(t('RATING_REQUIRED')),
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: schema,
    onSubmit: () => {
      submitHandler();
    },
  });

  const handleChange = (event: any, newValue: any) => {
    formik.setFieldValue('stars', newValue);
  };

  const submitReviewData = (image_ids: string) => {
    const payLoad = {
      id: details.id,
      // order_id: formik.values.review_description,
      review_title: formik.values.review_title,
      review_description: formik.values.review_description,
      image_ids: image_ids,
      review_stars: formik.values.stars,
      approval_status: 'PENDING_APPROVAL',
    };

    submitReview(payLoad)
      .then((response) => {
        if (response.success == true) {
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: t('REVIEW_SUBMITTED_SUCCESSFULLY'),
              varient: 'success',
            })
          );
          setLoading(false);
          navigate(`/${lang}/vouchers`);
        }
      })
      .catch((error) => {
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: error.response.data.error.message.code
              ? error.response.data.error.message.code
              : t('SOMETHING_WENT_WRONG'),
            varient: 'error',
          })
        );
        setLoading(false);
      });
  };

  const submitHandler = () => {
    setLoading(true);
    const formData = new FormData();

    imagesData?.map((item) => {
      formData.append('images', item.file);
    });

    uploadReviewImages(details.id, formData)
      .then((response) => {
        const imgList = response?.data?.map((img: any) => {
          return img.image_id;
        });
        const image_ids = imgList.join();
        formik.setFieldValue('image_ids', image_ids);
        submitReviewData(image_ids);
      })
      .catch((error) => {});
  };

  //TODO
  const onGetImage = (imageList) => {
    // data for submit
    setImagesData(imageList);
  };

  useEffect(() => {
    const payLoad = {
      review_title: '',
      review_description: '',
      review_stars: 0,
      image_ids: '',
      approval_status: 'DRAFT',
      voucher_id: encrypted_voucher_id,
    };
    createReview(payLoad)
      .then((response) => {
        if (response.success === true) {
          setDetails(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg(error.response.data.error.message);
        setOpen(true);
      });
  }, []);

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  return (
    <>
      <Box className={css.reviewVoucher}>
        <Box className={css.mobileView}>
          <div className={`RTLAccountHeading`}>
            <Button onClick={() => navigate(-1)}>
              <ArrowBackIosIcon />
            </Button>
          </div>
          <h1 style={{ textAlign: 'right' }}>{t('LEAVE_A_REVIEW')}</h1>
        </Box>

        <Grid container className={css.mobilePadding}>
          <Grid item xs={9}>
            <h3>{details?.deal_title}</h3>
            <h4>{details?.deal_tagline}</h4>
            <div className={css.iconBox}>
              <ScheduleIcon />
              <p>
                {t('BOOKED_ON')}:{DateFormatAr(details.booking_date)}
                {/* 18 Aug, 2023 - 9:34 PM // */}
              </p>
            </div>
          </Grid>
          <Grid item xs>
            <img
              width={100}
              height={100}
              style={{ float: 'left' }}
              loading="lazy"
              src={
                details?.dealImages?.length > 0
                  ? details?.dealImages[0].extfilepath
                  : DealImg
              }
              alt={t('IMAGE')}
            />
          </Grid>
        </Grid>

        <Box className={css.reviewBox}>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <div className={css.ratingSec}>
                <div className={css.ratingBox}>
                  <p>{t('RATING')}</p>
                  <Rating
                    dir="rtl"
                    id="stars"
                    name="stars"
                    value={formik.values.stars}
                    onChange={handleChange}
                    defaultValue={0}
                    size="large"
                    className="RTLRating"
                  />
                </div>
                <ErrorMessage
                  name="stars"
                  component="div"
                  className={css.error}
                />
              </div>
              <label>{t('YOUR_REVIEW')}</label>
              <Field
                as="input"
                id="review_title"
                name="review_title"
                placeholder="Review Title (min 5 characters)"
                className="form-control"
                formik={formik.values.review_title}
              />
              <ErrorMessage
                name="review_title"
                component="div"
                className={css.error}
              />
              <Field
                as="textarea"
                id="review_description"
                name="review_description"
                placeholder="How was the experience, service provided, and seamlessness? (At least 50 characters)"
                className="form-control"
                formik={formik.values.review_description}
              />
              <ErrorMessage
                name="review_description"
                component="div"
                className={css.error}
              />

              <div className={css.uploadPhotos}>
                <p> {t('UPLOAD_PHOTO_OPTIONAL')} </p>

                <ImageUploading
                  multiple
                  value={imagesData}
                  onChange={onGetImage}
                  maxNumber={6}
                  maxFileSize={3000000}
                  // acceptType={['jpg', 'png']}
                  // dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                    errors,
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                      <Button
                        component="label"
                        variant="contained"
                        startIcon={<AddIcon />}
                        style={isDragging ? { color: 'red' } : undefined}
                        // onClick={() => handleImageUpload()}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        {t('UPLOAD_PHOTO')}
                      </Button>
                      &nbsp;
                      {imagesData.length > 0 && (
                        <Button
                          component="label"
                          variant="contained"
                          onClick={onImageRemoveAll}
                        >
                          {t('REMOVE_ALL_IMAGES')}
                        </Button>
                      )}
                      {errors && (
                        <div className={css.addImageValidation}>
                          {errors.maxNumber && (
                            <span>
                              {t('YOU_CAN_SELECT_ONLY_6_IMAGES_AT_A_TIME')}
                            </span>
                          )}
                          {errors.acceptType && (
                            <span>
                              {t('YOU_SELECTED_FILE_TYPE_IS_NOT_ALLOWED')}
                            </span>
                          )}
                          {errors.maxFileSize && (
                            <span>{t('SELECTED_FILE_SIZE_EXCEED_3MB')}</span>
                          )}
                          {errors.resolution && (
                            <span>
                              {t(
                                'SELECTED_FILE_DOES_NOT_MATCH_YOUR_DESIRED_RESOLUTION'
                              )}
                            </span>
                          )}
                        </div>
                      )}
                      {/* //TODO */}
                      <div className={css.uploadReviewImg}>
                        {imageList.map((image, index) => (
                          <div key={index} className={css.imgThumbnail}>
                            <img src={image.dataURL} alt="" width="55" />
                            <div className="image-item__btn-wrapper">
                              {/* <Button onClick={() => onImageUpdate(index)}>
                                Update
                              </Button> */}
                              <Button onClick={() => onImageRemove(index)}>
                                <CloseIcon />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </ImageUploading>
              </div>

              <div className={css.text}>{t('REVIEW_NOTE')}</div>
            </form>
          </FormikProvider>
        </Box>

        <Box className={css.buttonBox}>
          <button className={css.cancelBtn} onClick={() => navigate(-1)}>
            {t('CANCEL')}
          </button>
          <Button
            variant="contained"
            type="submit"
            className={css.submitBtn}
            onClick={() => formik.handleSubmit()}
          >
            {loading ? (
              <CircularProgress style={{ color: '#ffffff', padding: '5px' }} />
            ) : (
              t('SUBMIT_REVIEW')
            )}
          </Button>
        </Box>
      </Box>
      <div>
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle sx={{ textAlign: 'center' }}>{'Alert'}</DialogTitle>
          <DialogContent>
            <DialogContentText
              className={'MsgText'}
              id="alert-dialog-slide-description"
            >
              {errorMsg}
            </DialogContentText>
          </DialogContent>

          <Box display={'flex'} justifyContent={'center'} gap={2} mb={3}>
            <Button
              className={css.CancelBtn}
              sx={{
                border: '1px solid #d4d5d7',
                borderRadius: '8px',
                padding: '8px 20px',
                color: '#3C4A53',
              }}
              onClick={handleClose}
            >
              {t('OK')}
            </Button>
          </Box>
        </Dialog>
      </div>
    </>
  );
};

export default VoucherReviewAr;
