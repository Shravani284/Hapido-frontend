import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import MainCard from '../../components/MainCard';
import { path } from '../../routes/Routers';
import { useWindowSize } from 'berlin-common';

export default function VoucherRedemption() {
  const navigate = useNavigate();
  const { size } = useWindowSize();

  return (
    <>
      <MainCard title="Voucher Redemption">
        <Grid container spacing={3.5} xs={12} sm={12}>
          <Grid item xs={12} sm={4} mt={3}>
            <Stack spacing={1}>
              <Link
                to={`/voucher-redemption/Manual`}
                style={{
                  background: 'rgba(252, 28, 21, 0.9',
                  textAlign: 'center',
                  padding: '10px 0px',
                  fontWeight: 500,
                  color: '#fff',
                }}
              >
                Manual Redemption
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={4} mt={3}>
            <Stack spacing={1}>
              <Link
                to={`/voucher-redemption/Barcode`}
                style={{
                  background: 'gray',
                  textAlign: 'center',
                  padding: '10px 0px',
                  fontWeight: 500,
                  color: '#fff',
                }}
              >
                Barcode Redemption
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4} mt={3}>
            <Stack spacing={1}>
              <Link
                to={`/voucher-redemption/qr`}
                style={{
                  border: '1px solid red',
                  textAlign: 'center',
                  padding: '8px 0px',
                  fontWeight: 500,
                }}
              >
                QR Code Redemption
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
}
