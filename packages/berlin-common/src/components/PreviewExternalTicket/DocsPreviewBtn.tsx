import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import { EyeOutlined } from "@ant-design/icons";
import { fileType } from "../../constants/types";
import DocView from "./DocView";
// styles
const Input = styled("input")({
  display: "none",
});
Input.displayName = "Input";

type DocsPreviewBtnType = {
  files?: fileType[];
};

function DocsPreviewBtn({ files = [] }: DocsPreviewBtnType) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Box display={"flex"} gap={2}>
        <Button
          variant="text"
          component="span"
          onClick={() => setShowModal(true)}
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
        selectedFiles={files}
      />
    </>
  );
}

export default DocsPreviewBtn;
