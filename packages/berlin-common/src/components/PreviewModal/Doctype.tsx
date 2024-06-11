import { Box, Button, Grid, Modal } from "@mui/material";
import { fileType } from "../../constants/types";
import { Cancel } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import { deleteImgVideo } from "../../../../berlin-admin/src/services/uploadFile";
import { setSnackbarConfig } from "../../../../berlin-admin/src/store/slice/Loader";
import { useDispatch } from "react-redux";

type PreviewModalType = {
  isOpen: boolean;
  closeModal: () => void;
  selectedFiles: fileType[];
  type?: string;
  setSelectedFiles: (data) => void;
  tableName: { name: string; id: string };
};

type Item = {
  imageId: any;
  extfilepath: any;
  extfilepathId?: any;
};

const Doctype = ({
  isOpen = false,
  closeModal = () => {},
  selectedFiles = [],
  tableName,
  setSelectedFiles,
  type,
}: PreviewModalType) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    deleteImgVideo(id, type, tableName.name, tableName?.id)
      .then((response) => {
        if (response.data.success) {
          const data = selectedFiles.filter((e: any) => e.id !== id);
          setSelectedFiles(data);
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: response.data.message,
              varient: "success",
            })
          );
        }
      })
      .catch((error) => {
        console.log(error, "error");
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: "Something went wrong",
            varient: "error",
          })
        );
      });
  };

  const getPreview = (url: any, item: any) => {
    const isPdf = url?.includes(".pdf");
    return isPdf ? (
      <Grid item xs={12} sm={12}>
        <div className="imgAndVideo">
          <iframe src={url} style={{ width: 900, height: 400 }} />
          <div className="closeIcon" onClick={() => handleDelete(item.id)}>
            <CancelIcon />
          </div>
        </div>
      </Grid>
    ) : (
      <Grid item xs={12} sm={2}>
        <div className="imgAndVideo">
          <img src={url} style={{ width: "100%", height: 100 }} />
          <div className="closeIcon" onClick={() => handleDelete(item.id)}>
            <CancelIcon />
          </div>
        </div>
      </Grid>
    );
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
            flexWrap: "wrap",
            minWidth: "80%",
            height: "70%",
            overflowY: "scroll",
          }}
        >
          <Grid container spacing={3.5}>
            <Grid item xs={6} sm={9}>
              <h2 id="parent-modal-title">Uploaded Files</h2>
            </Grid>
            <Grid item xs={6} sm={3} display={"flex"} justifyContent={"end"}>
              <Button color="secondary" component="span" onClick={closeModal}>
                <Cancel />
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={3.5}>
            {selectedFiles.map((item: any, index) => {
              return <>{getPreview(item?.extfilepath, item)}</>;
            })}
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default Doctype;
