// import { Cancel } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Button, Modal } from '@mui/material';
import { useWindowSize } from 'berlin-common';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { downloadVouchers } from '../../services/voucherService';

export default function VoucharImageListAr({
  showModal,
  selectedVoucher,
  url,
  closeModal,
  css,
}: any) {
  const { t } = useTranslation('translation');
  const { size } = useWindowSize();
  const [allDownloadURL, setAllDownloadURL] = useState();
  // const downloadAllVouchers = () => {
  //   const payload = {
  //     deal_id: selectedVoucher?.deal_identifier,
  //     deal_type:
  //       selectedVoucher?.bundleId !== null
  //         ? 'BUNDLE'
  //         : selectedVoucher?.comboId !== null
  //         ? 'COMBO'
  //         : 'SINGLE',
  //     order_id: selectedVoucher?.order_id,
  //   };
  //   downloadVouchers(payload)
  //     .then((response) => {
  //       if (response.success == true) {
  //         setAllDownloadURL(response?.data?.fileUrl);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // useEffect(() => {
  //   downloadAllVouchers();
  // }, [selectedVoucher]);

  return (
    <Modal
      open={showModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={closeModal}
      // style={{ width: '800px' }}
    >
      <Box
        sx={{ maxHeight: '80vh', overflow: 'auto' }}
        className={css.bookingPopup}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h4>{t('VOUCHERS')}</h4>
          <Box sx={{ padding: '0', marginRight: '-18px', marginTop: '-6px' }}>
            <Button color="inherit" onClick={closeModal}>
              <CancelIcon />
            </Button>
          </Box>
        </Box>
        {/* <Box>
          {selectedVoucher?.vouchers?.length > 1 && (
            <Button
              href={allDownloadURL}
              className={css.downloadAllVouchers}
              target="_blank"
              color="error"
              variant="outlined"
              sx={{ textAlign: 'right' }}
            >
              {t('DOWNLOAD_ALL')}
            </Button>
          )}
        </Box> */}
        {url?.length > 0
          ? url?.map((pdfPath: any, index: any) => {
              return (
                <>
                  {size > 768 ? (
                    <iframe
                      key={index}
                      src={pdfPath}
                      width="100%"
                      height="500px"
                      title={`PDF Viewer ${index + 1}`}
                    />
                  ) : (
                    <Box>
                      <label style={{ padding: '5px 0px' }}>
                        {t('VOUCHER_NO')} : {index + 1}
                      </label>
                      <Button
                        href={pdfPath}
                        target="_blank"
                        color="error"
                        variant="outlined"
                      >
                        {t('DOWNLOAD')}
                      </Button>
                    </Box>
                  )}
                </>
              );
            })
          : t('NO_VOUCHER')}
      </Box>
    </Modal>
  );
}
