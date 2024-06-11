import { Box, Button, Grid, Modal } from "@mui/material";
import { Cancel } from "@mui/icons-material";

type PreviewModalType = {
  isOpen: boolean;
  closeModal: () => void;
  selectedFiles: any;
};

const DocView = ({
  isOpen = false,
  closeModal = () => {},
  selectedFiles = [],
}: PreviewModalType) => {
  const getPreview = (url: any) => {
    const isPdf = url?.includes(".pdf");
    return (
      isPdf && (
        <Grid item xs={12} sm={12}>
          <div className="imgAndVideo">
            <iframe src={url} style={{ width: 900, height: 400 }} />
          </div>
        </Grid>
      )
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
            {getPreview(selectedFiles?.url)}
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default DocView;
