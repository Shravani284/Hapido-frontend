import css from './Vouchers.module.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  CircularProgress,
} from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { t } from 'i18next';
import {
  DateFormat,
  DealImg,
  HapidoLogo,
  timeFormat,
  useWindowSize,
} from 'berlin-common';
import {
  downloadVouchers,
  getVoucherList,
} from '../../services/voucherService';
import VoucharImageListAr from './VoucharImageList-ar';
import { SkeletonVoucherlist } from '../../components/Skeleton';
import { useTranslation } from 'react-i18next';
import Pagination from '../../components/Pagination';
import { useSelector } from 'react-redux';
import { mPage, viewPageEvent } from '../../utils/moEngage';
import Helmet from 'react-helmet';
import { path } from '../../routes/Routers';
import { lang } from '../../utils/getLang';
import getMetaTags from '../../utils/getMetaTags';
import OpenInApp from '../../components/openInApp';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface IValues {
  date: Date | null;
  time: string;
}

const VouchersAr = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [time, setTime] = useState('15');
  const [voucherList, setVoucherList] = useState<any>([]);
  const [pdfUrl, setPdfUrl] = useState<any>([]);
  const [skeletonVoucher, setSkeletonVoucher] = useState(false);
  const { size } = useWindowSize();
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;
  const [page, setPage] = useState(1);
  const { t, i18n } = useTranslation('translation');
  const currentCity = useSelector((state: any) => state?.cityName?.name);
  const { prevLocation } = useSelector((state: any) => state?.cityName);
  const [allDownloadURL, setAllDownloadURL] = useState();
  const [loadingStates, setLoadingStates] = useState({});
  const handlePrev = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    const totalPages = Math.ceil(totalCount / limit);
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  let initialValue: IValues = {
    date: null,
    time: '',
  };

  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: (values) => {
      submitHandler(values);
    },
  });

  const submitHandler = (values: any) => {};

  const VoucherData = () => {
    setSkeletonVoucher(true);
    getVoucherList(page, limit)
      .then((res) => {
        setTotalCount(res?.data?.totalCount);
        setSkeletonVoucher(false);
        setVoucherList(res.data.transformedVouchers);
      })
      .catch((error) => {
        setSkeletonVoucher(false);
        console.log(error);
      });
  };
  useEffect(() => {
    VoucherData();
  }, [page, limit, i18n]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
      case 'مؤكد':
        return '#3DB585';

      case 'Partially redeemed':
      case 'تم استردادها جزئيًا':
        return '#FD995B';

      case 'Redeemed':
        return '#FF311C';

      case 'Expired':
      case "منتهي الصلاحية":
        return '#818990';

      default:
        return 'none';
    }
};

  const [open, setOpen] = useState(false);
  const [calenderOpen, setCalenderOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<any>();
  const handleSeeVoucherClick = () => {
    setOpen(true);

    // TODO:  if (e == 'Review') {
    //     navigate(`/${lang}/voucher/add-review`);
    //   } else if (e == 'Change Booking') {
    //   }
  };
  const getUrl = (item: any) => {
    let linkList = [];
    item?.vouchers?.forEach((e: any) => linkList.push(e?.voucher_link));
    let list = linkList?.filter((item) => item);
    setPdfUrl(list);
    handleSeeVoucherClick();
    setSelectedVoucher(item);
    return '';
  };

  const addReview = (encrypted_voucher_id) => {
    // navigate(`${path.VOUCHERREVIEW}/:${encrypted_voucher_id}`);
    navigate(`/${lang}/voucher/add-review/${encrypted_voucher_id}`, {
      state: {
        data: {
          encrypted_voucher_id: encrypted_voucher_id,
        },
      },
    });
  };

  const handleClose = () => setOpen(false);
  useEffect(() => {
    viewPageEvent(mPage.voucher, currentCity, prevLocation);
  }, []);
  localStorage.removeItem('GFTUJNBGH');
  const urlObject = new URL(window.location.href);
  const baseUrlWithoutQueryString = urlObject.origin + urlObject.pathname;
  const HapidoSiteLogo =
    'https://cdn.hapido.com/site-assets/images/hapido-full-logo-white.jpg';

  // meta tags
  const fullMetaArray = {
    title: 'My Vouchers - Hapido',
    metaKeywords: 'vouchers, tickets',
    metaDescription: 'Access and manage your vouchers on Hapido.',
    ogType: 'website',
    ogSiteName: 'hapido.com',
    ogLocale: 'en_ae',
    ogURL: baseUrlWithoutQueryString,
    ogTitle: 'My Vouchers - Hapido',
    ogDescriptions: 'Access and manage your vouchers on Hapido.',
    ogImageWidth: '350',
    ogImageHeight: '350',
    ogImage: HapidoSiteLogo,
    twitterSite: '@hapido',
    twitterCreator: '@hapido',
    twitterImage: HapidoSiteLogo,
    twitterCard: HapidoSiteLogo,
  };

  useEffect(() => {
    getMetaTags(fullMetaArray);
  }, [param]);

  const handleDownload = (selectedVoucher, index) => {
    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [index]: true,
    }));

    const payload = {
      deal_id: selectedVoucher?.deal_identifier,
      deal_type:
        selectedVoucher?.bundleId !== null
          ? 'BUNDLE'
          : selectedVoucher?.comboId !== null
          ? 'COMBO'
          : 'SINGLE',
      order_id: selectedVoucher?.order_id,
    };

    downloadVouchers(payload)
      .then(async (response) => {
        if (response.success == true) {
          setAllDownloadURL(response?.data?.fileUrl);
          const pdfUrl = response?.data?.fileUrl;

          try {
            const response = await fetch(pdfUrl);
            const blob = await response.blob();

            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'Voucher.pdf';
            link.click();

            window.URL.revokeObjectURL(blobUrl);

            if (document.body.contains(link)) {
              document.body.removeChild(link);
            }
          } catch (error) {
            console.error('Error downloading the file:', error);
          }
        }
        setLoadingStates((prevLoadingStates) => ({
          ...prevLoadingStates,
          [index]: false,
        }));
      })
      .catch((error) => {
        setLoadingStates((prevLoadingStates) => ({
          ...prevLoadingStates,
          [index]: false,
        }));
        console.log(error);
      });
  };

  return (
    <>
      {size < 768 && <OpenInApp />}
      <Grid className={`${size < 768 && css.Vouchers}`}>
        {size < 767 && (
          <>
            <div className={'RTLAccountHeading'}>
              <Button onClick={() => navigate(-1)}>
                <ArrowBackIosIcon />
              </Button>
            </div>
            <div className={`${css.accountHeader} RTLAccountHeader`}>
              <p className={`${css.accountTitle} RTLAccountTitle`}>
                {t(`VOUCHERS`)}
              </p>
            </div>
          </>
        )}
      </Grid>
      <Grid className={css.voucherTitle}>
        <h1>{t('ALL_VOUCHER')}</h1>
        <KeyboardArrowDownIcon />
      </Grid>

      {skeletonVoucher ? (
        <>
          <SkeletonVoucherlist />
        </>
      ) : totalCount ? (
        voucherList?.map((item, index) => {
          console.log('==>', item.show_add_review);
          const isLoading = loadingStates[index];
          return (
            <>
              <Card className={` ${css.voucherCard}`}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid className={css.imgWrapper} item>
                      <img
                        className={css.voucherImg}
                        loading="lazy"
                        src={item.images[0]?.extfilepath || DealImg}
                      />
                    </Grid>
                    <Grid item container className={css.textWrapper}>
                      <Grid
                        item
                        xs
                        container
                        direction="column"
                        spacing={2}
                        className={css.mobileCart}
                      >
                        <Grid item xs>
                          <div className={`RTLLeft`}>
                            <h1>{item?.deal_title}</h1>
                            <h2>
                              {item?.deal_combo_title ||
                                item?.deal_bundle_label ||
                                ''}
                            </h2>
                          </div>
                          <div className={css.iconBoxRes}>
                            <div className={css.iconBox}>
                              <ScheduleIcon />
                              <p>
                                {t(`BOOKED_ON`)}:
                                {item?.booking_date
                                  ? DateFormat(item?.booking_date)
                                  : '-'}
                              </p>
                            </div>
                            {item.voucher_type !== 'External' && (
                              <div className={css.iconBox}>
                                <CalendarMonthIcon />
                                <p>
                                  {t(`VALIDITY`)}:
                                  {item?.claim_end_date
                                    ? DateFormat(item?.claim_end_date)
                                    : '-'}
                                </p>
                              </div>
                            )}
                            <div className={css.iconBox}>
                              <PersonOutlineIcon />
                              <p>
                                {t(`PERSON`)}: {item.vouchers?.length}
                              </p>
                            </div>

                            <div
                              style={{
                                backgroundColor: getStatusColor(
                                  item.voucher_status
                                ),
                              }}
                              className={css.statusBar}
                            >
                              {item.voucher_status}
                            </div>
                            <Box sx={{ ml: 20 }} className={css.buttonBox}>
                              <button onClick={(e) => getUrl(item)}>
                                {t(`SEE_VOUCHER`)}
                              </button>
                              {item.show_add_review == true && (
                                <button
                                  className={css.addReviewBtn}
                                  onClick={(e) =>
                                    addReview(item.encrypted_voucher_id)
                                  }
                                >
                                  {t(`ADD_REVIEW`)}
                                </button>
                              )}

                              <button
                                onClick={() => handleDownload(item, index)}
                                className={css.allVoucherDownload}
                                style={{ opacity: isLoading ? 0.3 : 0.8 }}
                                disabled={isLoading}
                              >
                                {isLoading ? (
                                  <>
                                    {item?.vouchers?.length > 1
                                      ? t(`DOWNLOAD_ALL_VOUCHERS`)
                                      : t(`DOWNLOAD`)}
                                    <CircularProgress
                                      size={'18px'}
                                      style={{
                                        position: 'absolute',
                                        marginLeft: '-30px',
                                        color: '#fb1d14',
                                      }}
                                    />
                                  </>
                                ) : item?.vouchers?.length > 1 ? (
                                  t(`DOWNLOAD_ALL_VOUCHERS`)
                                ) : (
                                  t(`DOWNLOAD`)
                                )}
                              </button>
                            </Box>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid item className={css.aedBox}>
                        <h2>{`${t('AED')} ${item?.total_paid}`}</h2>
                        <p>{t(`TOTAL_PAID`)}</p>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* <Modal
              open={open}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              onClose={() => setOpen(false)}
            >
              <Box className={css.bookingPopup}>
                <h4>{t('CHANGE_BOOKING')}</h4>
                <p> {t('BOOKING_NOTE')}</p>
                <FormikProvider value={formik}>
                  <form onSubmit={formik.handleSubmit} className={css.form}>
                    <Stack spacing={1} className={css.bottom}>
                      <label className={css.popupLabel}>Date</label>
                      <VoucherCalenderPopup
                        setCalenderOpen={setCalenderOpen}
                        calenderOpen={calenderOpen}
                        label={
                          formik.values.date
                            ? moment(formik.values.date).format('D MMM YYYY')
                            : 'DD/MM/YYYY'
                        }
                      >
                        <VoucherCalendarComponent
                          setCalenderOpen={setCalenderOpen}
                          formik={formik}
                          name="date"
                        />
                      </VoucherCalenderPopup>
                    </Stack>

                    <Box className="popupTime">
                      <label className={css.popupLabel}>Time</label>
                      <FormControl fullWidth className={css.bottom}>
                        <Select
                          name="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          inputProps={{ 'aria-label': 'Without label' }}
                        >
                          <MenuItem value={15}>
                            15.00 - <span> AED 20</span>{' '}
                          </MenuItem>
                          <MenuItem value={16}>
                            16.00 - <span> AED 20</span>{' '}
                          </MenuItem>
                          <MenuItem value={17}>
                            17.00 - <span> AED 20</span>{' '}
                          </MenuItem>
                          <MenuItem value={17}>
                            18.00 - <span> AED 20</span>{' '}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <p>{t('BOOKING_NOTE1')}</p>
                    <p>{t('BOOKING_NOTE2')}</p>

                    <Box className={css.popupButton}>
                      <button className={css.cancelBtn} onClick={handleClose}>
                        {t('CANCEL')}
                      </button>
                      <button className={css.payBtn}>{t('PAY')}</button>
                    </Box>
                  </form>
                </FormikProvider>
              </Box>
            </Modal> */}
            </>
          );
        })
      ) : (
        <h4
          style={{
            textAlign: 'center',
            color: '#FC1C15',
            borderRadius: '25px',
            margin: '100px 0px',
          }}
        >
          {t('NO_RECORD')}
        </h4>
      )}
      {totalCount >= limit && (
        <Box my={6}>
          <Pagination
            handlePrev={handlePrev}
            handleNext={handleNext}
            page={page}
            cartCount={totalCount}
            itemsPerPage={limit}
          />
        </Box>
      )}
      <VoucharImageListAr
        showModal={open}
        selectedVoucher={selectedVoucher}
        url={pdfUrl}
        closeModal={() => {
          setOpen(false);
        }}
        css={css}
      />
    </>
  );
};

export default VouchersAr;
