import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import { EyeOutlined } from '@ant-design/icons';
import DocView from './DocView';

const Input = styled('input')({
  display: 'none',
});
Input.displayName = 'Input';

type DocsPreviewBtnType = {
  files?: any;
  rowData?: any;
  filterPayload?: any;
  merchantId?: any;
  excelHandler?: any;
  isExcelData?: any;
  excelData?: any;
};

function DocsPreviewBtn({
  files = [],
  rowData,
  filterPayload,
  merchantId,
  excelHandler,
  isExcelData,
  excelData,
}: DocsPreviewBtnType) {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };
  return (
    <>
      <Box display={'flex'} gap={2}>
        <Button
          variant="text"
          component="span"
          onClick={(e) => {
            handleModalOpen();
            excelHandler(rowData?.id, filterPayload?.dealtype?.id, merchantId);
          }}
        >
          <EyeOutlined style={{ marginRight: 5 }} />
          View
        </Button>
      </Box>
      <DocView
        isOpen={showModal}
        closeModal={() => {
          setShowModal(false);
        }}
        selectedFiles={excelData}
        isExcelData={isExcelData}
      />
    </>
  );
}

export default DocsPreviewBtn;
