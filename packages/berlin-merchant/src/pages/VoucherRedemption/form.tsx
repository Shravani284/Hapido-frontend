import { Box, Button, InputLabel, Stack } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { Grid } from '@mui/material';
import { NormalTextField } from 'berlin-common';
import MainCard from '../../components/MainCard';
import { useNavigate, useParams } from 'react-router-dom';
import { addVoucherRedemption } from '../../services/voucherRedmeption';
import { setSnackbarConfig } from '../../store/slice/Loader';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { QrReader } from 'react-qr-reader';
import { createRef, useEffect, useState } from 'react';
import { FormHelperText } from '@mui/material';
import useScanDetection from 'use-scan-detection';
import errorAudio from '../../assets/audio/error.wav';
import success from '../../assets/audio/success.mp3';

function form() {
  const { type } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [audio, setAudio] = useState({
    isPlay: false,
    music: '',
  });

  const formik = useFormik({
    initialValues: {
      code: '',
      comments: '',
    },
    validationSchema: yup.object({
      code: yup.string().required('Code is required'),
    }),
    onSubmit: async (value) => {
      handleAdd(value);
    },
  });
  const backHandler = () => {
    window.location.href = '/voucher-redemption';
  };
  const handleAdd = async (value) => {
    const payload = {
      code: value?.code,
      comments: value?.comments,
    };
    setIsLoading(true);
    addVoucherRedemption(payload)
      .then((response) => {
        setAudio({
          isPlay: true,
          music: success,
        });
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: 'Voucher Redemption successfully',
            varient: 'success',
          })
        );
        setScanButton(false);

        setStopStream(false);
        // backHandler();
      })
      .catch((error) => {
        setAudio({
          isPlay: true,
          music: errorAudio,
        });
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: error.response.data.error.message
              ? error.response.data.error.message
              : 'something went wrong',
            varient: 'error',
          })
        );
        setScanButton(false);

        setStopStream(false);
      })
      .finally(() => {
        setIsLoading(false);
        setTimeout(() => {
          setAudio({
            isPlay: false,
            music: '',
          });
        }, 2000);
      });
  };
  const [data, setData] = useState('Not Found');
  const [stopStream, setStopStream] = useState(true);
  const [barcodeScan, setBarcodeScan] = useState<any>('');
  const [scanButton, setScanButton] = useState<any>(false);
  const qrReader = createRef();
  const navigate = useNavigate();
  useScanDetection({
    onComplete: setBarcodeScan,
    minLength: 3, // EAN13
  });

  useEffect(() => {
    if (barcodeScan) {
      if (type == 'Barcode') {
        formik.setFieldValue('code', barcodeScan);
        formik.handleSubmit();
      }
    }
  }, [type, barcodeScan]);

  return (
    <MainCard title={`${type.toUpperCase()} Voucher Redemption`}>
      {audio.isPlay && <audio src={audio.music} autoPlay />}
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3.5}>
            <Grid item mt={1} xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel>
                  Voucher Code
                  <FormHelperText id="standard-weight-helper-text-email-login">
                    {type !== 'Manual' &&
                      '(Note:Enter comments if required before scanning)'}
                  </FormHelperText>
                </InputLabel>
                <NormalTextField
                  name="code"
                  id="outlined-basic"
                  variant="outlined"
                  placeholder={type == 'Manual' && 'Enter Voucher Code'}
                  disabled={type !== 'Manual'}
                />
              </Stack>
            </Grid>
            <Grid item mt={1} xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel>Comments</InputLabel>
                <NormalTextField
                  name="comments"
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Enter Comments"
                />
              </Stack>
            </Grid>

            <Grid item xs={12} sm={12} mt={1}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="right"
                spacing={2}
                mr={2}
                mb={2}
              >
                {type !== 'Manual' && (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={() => {
                      setScanButton(true);
                      setStopStream(true);
                      formik.setFieldValue('code', '');
                      formik.setFieldValue('comments', '');
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? 'loading' : 'Scan'}
                  </Button>
                )}
                <Button
                  variant="outlined"
                  color="secondary"
                  type="reset"
                  onClick={() => backHandler()}
                >
                  Cancel
                </Button>
                {type == 'Manual' && (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? 'loading' : 'Redeem'}
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        </form>
      </FormikProvider>

      {type == 'qr' && (
        <>
          {scanButton == true ? (
            <Box maxWidth={500} margin={"auto"}>
              <QrReader
                onResult={(result: any, error) => {
                  if (!!result) {
                    formik.setFieldValue('code', result?.text);
                    setScanButton(false);
                    setTimeout(() => {
                      formik.handleSubmit();
                    }, 500);
                  }
                }}
                constraints={{ facingMode: 'environment' }}
              />
            </Box>
          ) : null}
        </>
      )}
    </MainCard>
  );
}

export default form;
