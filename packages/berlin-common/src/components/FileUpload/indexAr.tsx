import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, CircularProgress } from "@mui/material";
import { CloudUploadOutlined } from "@mui/icons-material";
import { EyeOutlined } from "@ant-design/icons";
import { uploadFiles } from "../../../../berlin-admin/src/services/uploadFile";
import { useDispatch } from "react-redux";
import { setSnackbarConfig } from "../../../../berlin-admin/src/store/slice/Loader";
import PreviewModal from "../PreviewModal";
import Doctype from "../PreviewModal/Doctype";
import { fileType } from "../../constants/types";
import { uploadFilesAr } from "../../../../berlin-admin/src/services/uploadFileAr";
// styles
const Input = styled("input")({
  display: "none",
});
Input.displayName = "Input";

type FileUploadType = {
  name: string;
  tableName: { name: string; id: string };
  accept?: string;
  onSelect?: (files: fileType[]) => void;
  files?: fileType[];
  multiSelect?: boolean;
  isShowButton?: boolean;
  disabled?: boolean;
  type?: string;
};

function FileUploadAr({
  name,
  accept = "image/*",
  onSelect = () => {},
  tableName,
  files = [],
  multiSelect = true,
  isShowButton = true,
  type,
  disabled,
}: FileUploadType) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<fileType[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (files.length > 0) {
      setSelectedFiles([...files]);
    }
  }, [files]);

  const upload = (filesList: FileList) => {
    setLoading(true);
    uploadFilesAr({ files: filesList, tableName, type: type })
      .then((res) => {
        const fileList = res.data.data.map((item: any) => {
          return {
            id: item.image_id ?? item.video_id,
            extfilepath: item.ext_file_url,
            type: type,
          };
        });

        var list;
        if (multiSelect) {
          list = [...files, ...fileList];
        } else {
          list = [fileList[0]];
        }
        onSelect(list);
        setSelectedFiles(list);
        setLoading(false);
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: res.data.message,
            varient: "success",
          })
        );
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <Box display={"flex"} gap={2}>
        <label>
          <Input
            accept={accept}
            id={name}
            multiple
            type={"file"}
            name="name"
            disabled={disabled}
            onChange={(e: any) => {
              upload(e.target.files);
            }}
          />
          {isShowButton && (
            <Button
              variant="contained"
              component="span"
              disabled={loading || disabled}
            >
              {loading ? (
                <CircularProgress
                  color="secondary"
                  style={{ marginRight: 5 }}
                  size={15}
                />
              ) : (
                <CloudUploadOutlined style={{ marginRight: 5 }} />
              )}
              {loading ? "Uploading..." : "Upload"}
            </Button>
          )}
        </label>
        {selectedFiles.length > 0 && (
          <Button
            variant="text"
            component="span"
            onClick={() => setShowModal(true)}
          >
            <EyeOutlined style={{ marginRight: 5 }} />
            View
          </Button>
        )}
      </Box>
      {type == "doc" ? (
        <Doctype
          isOpen={showModal}
          closeModal={() => {
            setShowModal(false);
            onSelect(selectedFiles);
          }}
          selectedFiles={selectedFiles}
          type={type}
          tableName={tableName}
          setSelectedFiles={setSelectedFiles}
        />
      ) : (
        <PreviewModal
          isOpen={showModal}
          closeModal={() => {
            setShowModal(false);
          }}
          selectedFiles={selectedFiles}
          type={type}
          onSelect={onSelect}
          tableName={tableName}
          lang={"ar"}
        />
      )}
    </>
  );
}

export default FileUploadAr;
