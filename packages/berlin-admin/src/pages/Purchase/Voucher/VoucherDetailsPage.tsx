import { Grid, Stack, Typography } from '@mui/material';
import { Breadcrumbs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MainCard from '../../../components/MainCard';
import { getVoucherById } from '../../../services/purchaseServices';
import css from '../purchase.module.scss';
import { DateFormat } from 'berlin-common';
import { path } from '../../../routes/Routers';

const VoucherDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<any>();
  const getVoucherId = () => {
    getVoucherById(id)
      .then((response) => {
        const result = response?.data?.data?.voucher;
        const obj = { ...result };
        if (result?.merchant?.merchanttranslation?.length > 0) {
          const title_en = result?.merchant?.merchanttranslation?.find(
            (ele: any) => ele.locale === 'en' && ele.column_name === 'name'
          );

          obj.title = `${title_en?.text ?? ''} `;
        }

        if (result?.dealArea?.area?.length > 0) {
          const areaTitle_en = result?.dealArea?.area?.find(
            (ele: any) => ele.locale === 'en' && ele.table_name === 'area'
          );

          obj.areaName = `${areaTitle_en?.text ?? ' '} `;
        }
        if (result.deal?.length > 0) {
          const dealName_en = result?.deal?.find(
            (ele: any) =>
              ele.locale === 'en' && ele.column_name === 'title_trans_ids'
          );
          obj.deal_name = `${dealName_en?.text ?? ''} `;
        }
        if (result.basket?.deal_area?.length > 0) {
          const dealArea_en = result.basket?.deal_area?.find(
            (ele: any) => ele.locale === 'en' && ele.table_name === 'area'
          );
          obj.dealArea = `${dealArea_en?.text ?? ''} `;
        }
        setData(obj);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  useEffect(() => {
    if (id) {
      getVoucherId();
    }
  }, []);

  // const handleDeals = (
  //   deal_type: any,
  //   deal_id: any,
  //   deal_bundle_id: any,
  //   deal_combo_id: any
  // ) => {
  //   if (deal_type == 'SINGLE') {
  //     navigate(`/deals/singledeals/update/${deal_id}`);
  //   } else if (deal_type == 'BUNDLE') {
  //     navigate(`/deals/dealbundle/update/${deal_bundle_id}`);
  //   } else if (deal_type == 'COMBO') {
  //     navigate(`/deals/dealcombo/update/${deal_combo_id}`);
  //   }
  // };

  let linkTo = '';

  if (data?.deal_type === 'SINGLE') {
    linkTo = `/deals/singledeals/update/${data?.deal_id}`;
  } else if (data?.deal_type === 'BUNDLE') {
    linkTo = `/deals/dealbundle/update/${data?.deal_bundle_id}`;
  } else if (data?.deal_type === 'COMBO') {
    linkTo = `/deals/dealcombo/update/${data?.deal_combo_id}`;
  }

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={path.VOUCHERLIST}>
          Voucher List
        </Link>
        <Typography color="text.primary">Voucher Details</Typography>
      </Breadcrumbs>

      <Grid container mt={2} xl={12}>
        <Grid item>
          <MainCard title="Voucher Details">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Order ID/Number</Typography>
                  <Typography>
                    {data?.order_id != undefined &&
                      `${data?.order_id} / ${data?.order_number}`}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Customer Email - ID</Typography>
                  <Typography className={css.voucherLink}>
                    <Link
                      to={`/users/update/${data?.customer.id}`}
                      target="_blank"
                    >
                      {data?.customer?.email}
                    </Link>
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">User Platform</Typography>
                  <Typography>{data?.user_platform}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Voucher Code</Typography>
                  <Typography>{data?.code}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Voucher Type</Typography>
                  <Typography>{data?.voucher_type}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Hapido Fulfilled</Typography>
                  <Typography>
                    {data?.hapido_fulfilled ? 'Yes' : 'No'}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Merchant</Typography>
                  <Typography>{data?.title}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Voucher Location</Typography>
                  <Typography>
                    {data?.dealArea ? data?.dealArea : '-'}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Booking Date/Time</Typography>
                  <Typography>{data?.booking_date}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Booking Rescheduled</Typography>
                  <Typography>{data?.is_rescheduled ? 'Yes' : 'No'}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Voucher Sent</Typography>
                  <Typography>
                    {data?.is_voucher_sent ? 'Yes' : 'No'}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Voucher Status</Typography>
                  <Typography>{data?.voucher_status}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Creation Date/Time</Typography>
                  <Typography>{DateFormat(data?.created_at)}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">
                    Redemption Date/Time
                  </Typography>
                  <Typography>
                    {data?.redemption_date_time
                      ? DateFormat(data?.redemption_date_time)
                      : '-'}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Revoked Date / Time</Typography>
                  <Typography>
                    {data?.revoked_date_time
                      ? DateFormat(data?.revoked_date_time)
                      : '-'}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Revoked By</Typography>
                  <Typography>
                    {data?.revoked_by ? (
                      <>
                        {data?.revoked_by?.first_name}{' '}
                        {data?.revoked_by?.last_name}
                      </>
                    ) : (
                      '-'
                    )}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  {/* <Typography color="secondary"> Voucher Link</Typography> */}
                  <Link
                    className={css.voucherLink}
                    to={data?.voucher_link}
                    target="_blank"
                  >
                    Voucher Link
                  </Link>
                  {/* <Typography>
                    <a href={data?.voucher_link} className={css.voucherLink}>
                      {data?.voucher_link}
                    </a>
                  </Typography> */}
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">
                    Deal Type - Deal Name - Deal ID
                  </Typography>
                  {/* <Typography
                    className={css.voucherLink}
                    onClick={() => {
                      handleDeals(
                        data?.deal_type,
                        data?.deal_id,
                        data?.deal_bundle_id,
                        data?.deal_combo_id
                      );
                    }}
                  >
                    {data?.deal_type} - {data?.deal_name} - {data?.deal_id}
                  </Typography> */}
                  <Link className={css.voucherLink} to={linkTo} target="_blank">
                    {data?.deal_type} -{' '}
                    {data?.deal_type !== 'SINGLE'
                      ? `${data?.single_deal_name} (${data?.deal_name?.trim()})`
                      : data?.deal_name}{' '}
                    -{' '}
                    {(data?.deal_type === 'SINGLE' && data?.deal_id) ||
                      (data?.deal_type === 'BUNDLE' && data?.deal_bundle_id) ||
                      (data?.deal_type === 'COMBO' && data?.deal_combo_id)}{' '}
                    {data?.price_type
                      ? data?.price_type != 'People' && `(${data?.price_type})`
                      : ''}
                  </Link>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary"> Deal Area</Typography>
                  <Typography>
                    {data?.dealArea ? data?.dealArea : '-'}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Price</Typography>
                  <Typography>{data?.basket.price}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Quantity</Typography>
                  <Typography>{data?.basket.quantity}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Order Total Price</Typography>
                  <Typography>{data?.basket.total_price}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">
                    Order Coupon Discount
                  </Typography>
                  <Typography>{data?.basket.coupon_discount}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Currency</Typography>
                  <Typography>{data?.basket.currency}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Template Type</Typography>
                  <Typography>{data?.template_type}</Typography>
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default VoucherDetailsPage;
