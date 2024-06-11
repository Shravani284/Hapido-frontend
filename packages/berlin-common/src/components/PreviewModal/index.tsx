import { Box, Button, Grid, Modal } from "@mui/material";
import { fileType } from "../../constants/types";
import { Cancel } from "@mui/icons-material";
import React, { useState, useCallback, useEffect } from "react";
import { Card } from "../../../../berlin-admin/src/components/Card";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { deleteImgVideo } from "../../../../berlin-admin/src/services/uploadFile";
import { useDispatch } from "react-redux";
import { setSnackbarConfig } from "../../../../berlin-admin/src/store/slice/Loader";

type PreviewModalType = {
  isOpen: boolean;
  closeModal: () => void;
  onSelect: (data) => void;
  selectedFiles: fileType[];
  type?: string;
  tableName: { name: string; id: string };
  lang?: string;
};

const PreviewModal = ({
  isOpen = false,
  closeModal = () => {},
  onSelect = () => {},
  selectedFiles = [],
  type = "image",
  tableName,
  lang,
}: PreviewModalType) => {
  const [cards, setCards] = useState(selectedFiles);
  const dispatch = useDispatch();

  useEffect(() => {
    setCards([...selectedFiles]);
  }, [selectedFiles]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: any[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as any],
        ],
      })
    );
  }, []);
  const deleteHandler = (id, arr) => {
    deleteImgVideo(id, type, tableName.name, tableName?.id, lang)
      .then((response) => {
        if (response.data.success) {
          const deletedImg = arr?.filter((e) => {
            if (e?.imageId != id && e?.videoId != id && e?.id != id) {
              return e;
            }
          });
          setCards(deletedImg);
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
  const renderCard = useCallback(
    (
      card: {
        videoId?: string;
        id?: string;
        imageId?: string;
        extfilepath: string;
      },
      index: number,
      array
    ) => (
      <Card
        key={card.imageId}
        index={index}
        id={card.imageId || card?.videoId || card.id}
        url={card.extfilepath}
        moveCard={moveCard}
        type={type}
        deleteImgAndVideo={deleteHandler}
        item={card}
        array={array}
      />
    ),
    [moveCard]
  );
  const onCloseHandler = () => {
    onSelect(cards);
    closeModal();
  };
  return (
    <>
      <Modal
        open={isOpen}
        onClose={onCloseHandler}
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
            // display: "flex",
            flexWrap: "wrap",
            minWidth: "70%",
            maxHeight: "70vh",
            overflowY: "scroll",
          }}
        >
          <Grid container spacing={3.5}>
            <Grid item xs={6} sm={9}>
              <h2 id="parent-modal-title">Uploaded Files</h2>
            </Grid>
            <Grid item xs={6} sm={3} display={"flex"} justifyContent={"end"}>
              <Button
                color="secondary"
                component="span"
                onClick={onCloseHandler}
              >
                <Cancel />
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={3.5} mt={3} px={4}>
            <DndProvider backend={HTML5Backend}>
              <Box display={"flex"} flexWrap={"wrap"} p={1} gap={2}>
                {cards.map((card: any, i, array) => renderCard(card, i, array))}
              </Box>
            </DndProvider>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default PreviewModal;
