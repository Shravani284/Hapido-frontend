import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Breadcrumbs,
  Button,
  Grid,
  Stack,
  Typography,
  Box,
} from '@mui/material';
import { useFormik } from 'formik';
import { constants, DateFormat } from 'berlin-common';
import MainCard from '../../MainCard';
import { useState } from 'react';
import { validationSchema } from './validation';
import { useDispatch } from 'react-redux';
import { setSnackbarConfig } from '../../../store/slice/Loader';
import { setDropDownValues } from '../../../utils/dropDown';
import {
  getReviewByIdAPI,
  updateReview,
} from '../../../services/reviewService';
import { path } from '../../../routes/Routers';
import { approvalStatus } from '../../../data/data';
import css from '../../Purchase/purchase.module.scss';
import usePermission from '../../../components/Permission/usePermission';

export interface MerchantValues {
  order_id: string | number;
  user_id: string | number;
  review_title: string;
  review_description: string;
  review_stars: string | number;
  image_ids: string | null;
  approval_status: Dropdown | null | any;
}

interface Dropdown {
  label: string;
  id: string | number;
}

const initialValues: MerchantValues = {
  order_id: '',
  user_id: '',
  review_title: '',
  review_description: '',
  review_stars: '',
  image_ids: '',
  approval_status: null,
};

function ReviewForm() {
  const { permission } = usePermission('REVIEWS');
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [reviewData, setReviewData] = useState<any>([]);
  const [selectedImages, setSelectedImages] = useState<
    constants.types.fileType[]
  >([]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (value) => {
      handleAdd(value);
    },
  });

  const handleAdd = async (value: MerchantValues) => {
    const res: any = value;
    const payload = {
      order_id: res?.order_id,
      user_id: res?.user_id,
      review_title: res?.review_title,
      review_description: res?.review_description,
      review_stars: res?.review_stars,
      image_ids: value.image_ids ?? '',
      images: selectedImages ?? '',
      approval_status: res?.approval_status?.id,
    };

    if (id) {
      updateReview({ ...payload, id: +id })
        .then((response: any) => {
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: 'Review updated successfully',
              varient: 'success',
            })
          );
          navigate(path.REVIEWLIST);
        })
        .catch((error: any) => {
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

  const getReviewHandler = (id: any) => {
    getReviewByIdAPI(id)
      .then((res) => {
        const data = res.data.data.review;
        const obj = { ...data };

        if (obj?.merchant?.length > 0) {
          const title_en = obj?.merchant?.find(
            (ele: any) =>
              ele?.locale === 'en' &&
              ele?.table_name === 'merchant' &&
              ele?.column_name === 'name'
          );
          const title_ar = obj.merchant?.find(
            (ele: any) =>
              ele?.locale === 'ar' &&
              ele?.table_name === 'merchant' &&
              ele?.column_name === 'name'
          );

          obj.merchant_name = `${title_en?.text ?? ''} ${title_ar?.text ?? ''}`;
        }
        if (obj.deal.length > 0) {
          const title_en = obj.deal.find(
            (ele: any) =>
              ele.locale === 'en' && ele.column_name === 'title_trans_ids'
          );
          const title_ar = obj.deal.find(
            (ele: any) =>
              ele.locale === 'ar' && ele.column_name === 'title_trans_ids'
          );

          obj.deal_Name = `${title_en?.text ?? ''} ${title_ar?.text ?? ''}`;
        }
        setReviewData(obj);
        setDropDownValues(approvalStatus, data, 'approval_status', formik);
        formik.setValues({
          order_id: data.order_id,
          user_id: data.user_id,
          review_title: data.review_title,
          review_description: data.review_description,
          review_stars: data.review_stars,
          image_ids: data.image_ids ?? '',
          approval_status: approvalStatus.find(
            (e: any) => e.id === data?.approval_status
          ),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (id) {
      getReviewHandler(id);
    }
  }, [id]);

  const handleDeals = (deal_type: any, deal_id: any) => {
    if (deal_type) {
      navigate(`/deals/singledeals/update/${deal_id}`);
    }
  };

  useEffect(() => {
    if (reviewData?.images?.length > 0) {
      const imagesList: constants.types.fileType[] = reviewData?.images?.map(
        (item: any) => {
          return {
            id: item.imageId,
            url: item.extfilepath,
            type: 'image',
          };
        }
      );
      setSelectedImages(imagesList);
    }

    if (selectedImages.length > 0) {
      const imageIdList = selectedImages.map((item) => item.id);
      formik.values.image_ids = imageIdList.join(',');
    }
  }, [reviewData]);

  const reviewStatusHandler = (status: string) => {
    const payload = {
      order_id: reviewData?.order_id,
      user_id: reviewData?.user_id,
      review_title: reviewData?.review_title,
      review_description: reviewData?.review_description,
      review_stars: reviewData?.review_stars,
      image_ids: reviewData?.image_ids ?? '',
      approval_status: status,
    };

    if (id) {
      updateReview({ ...payload, id: +id })
        .then((response: any) => {
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: 'Review updated successfully',
              varient: 'success',
            })
          );
          navigate(path.REVIEWLIST);
        })
        .catch((error: any) => {
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
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/">
          Home
        </Link>
        <Link color="inherit" to="/reviewList">
          Review List
        </Link>
        {id ? (
          <Typography color="text.primary">Update Review</Typography>
        ) : (
          <Typography color="text.primary">Add Review</Typography>
        )}
      </Breadcrumbs>

      <Grid container mt={2} xl={12}>
        <Grid item>
          <MainCard title="Review Details">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Voucher</Typography>
                  <Typography
                    className={css.voucherLink}
                    onClick={() =>
                      navigate(
                        `/purchase/voucherlist/${reviewData?.voucher_id}`
                      )
                    }
                  >
                    {reviewData?.voucher_id}-{reviewData?.deal_Name}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">
                    Order ID / Order Number
                  </Typography>
                  <Typography
                    className={css.voucherLink}
                    onClick={() =>
                      navigate(`/purchase/orderslist/${reviewData?.order_id}`)
                    }
                  >
                    {reviewData?.order_id != undefined &&
                      `${reviewData?.order_id} / ${reviewData?.order_number}`}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">
                    Customer Name / Email
                  </Typography>
                  <Typography
                    className={css.voucherLink}
                    onClick={() =>
                      navigate(`/users/update/${reviewData?.customer.id}`)
                    }
                  >
                    {reviewData?.customer?.first_name != undefined &&
                      `${reviewData?.customer.first_name} ${reviewData?.customer.last_name} / ${reviewData?.customer.email}`}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Deal Type</Typography>
                  <Typography>{reviewData?.deal_type}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Deal Name</Typography>
                  <Typography
                    className={css.voucherLink}
                    onClick={() =>
                      handleDeals(reviewData?.deal_type, reviewData?.deal_id)
                    }
                  >
                    {reviewData?.deal_type} -
                    {reviewData?.deal_type !== 'SINGLE'
                      ? `${reviewData?.deal_Name}(${reviewData?.parent_name})`
                      : reviewData?.deal_Name}
                    - {reviewData?.deal_id}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Merchant Name</Typography>
                  <Typography
                    className={css.voucherLink}
                    onClick={() =>
                      navigate(`/merchant/update/${reviewData?.merchant?.id}`)
                    }
                  >
                    {reviewData?.merchant_name}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Review Title </Typography>
                  <Typography>{reviewData?.review_title}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Review Description</Typography>
                  <Typography>{reviewData?.review_description}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Review Stars</Typography>
                  <Typography>{reviewData?.review_stars}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box width={'150px'} display={'flex'} gap={2} flexWrap={'wrap'}>
                  {selectedImages.map((e) => {
                    return <img src={e.url} width={'100%'} />;
                  })}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Created At / By</Typography>
                  <Typography>{DateFormat(reviewData?.created_at)}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Actioned At / By</Typography>
                  <Typography>{DateFormat(reviewData?.actioned_at)}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Review Status</Typography>
                  <Typography>
                    {reviewData?.approval_status === 'PENDING_APPROVAL'
                      ? 'PENDING APPROVAL'
                      : reviewData?.approval_status}
                  </Typography>
                </Stack>
              </Grid>
              {/* Select Action */}
              {reviewData?.approval_status === 'PENDING_APPROVAL'
                ? (permission === 'WRITE' || permission === 'FULL') && (
                    <Grid item xs={12} md={6}>
                      <Typography color="secondary">Select Action </Typography>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-end"
                        spacing={2}
                      >
                        <Button
                          variant="outlined"
                          color="secondary"
                          type="submit"
                          onClick={() => reviewStatusHandler('APPROVED')}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{ mt: 1, mr: 1 }}
                          onClick={() => reviewStatusHandler('REJECTED')}
                        >
                          Reject
                        </Button>
                      </Stack>
                    </Grid>
                  )
                : ' '}
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
}

export default ReviewForm;
