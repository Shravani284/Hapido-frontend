import {
  Breadcrumbs,
  Grid,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Transitions from '../../../components/@extended/Transitions';
import MainCard from '../../../components/MainCard';
import { getPaymentLogById } from '../../../services/purchaseServices';

export interface PaymentLogsT {
  // id: 5;
  logs: string;
  method: string;
  order_id: number;
}

const paymentLogsDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState<PaymentLogsT>();

  const getPaymentLogsId = () => {
    getPaymentLogById(id)
      .then((response) => {
        const result = response.data.data.paymentLog;
        setData(result);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  useEffect(() => {
    if (id) {
      getPaymentLogsId();
    }
  }, []);

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/purchase/paymentlogs">
          Payment Logs
        </Link>
        <Typography color="text.primary">Payment Logs Details</Typography>
      </Breadcrumbs>

      <Grid container mt={2} xl={12}>
        <Grid md={12} item>
          <MainCard title="Payment Logs Details">
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Order ID/Number</Typography>
                  <Typography>{data?.order_id}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Method</Typography>
                  <Typography>{data?.method}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">
                    Log (log stored in DB)
                  </Typography>
                  <Typography>{data?.logs}</Typography>
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default paymentLogsDetails;
