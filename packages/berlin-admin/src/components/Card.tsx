import type { Identifier, XYCoord } from 'dnd-core';
import type { FC } from 'react';
import { useRef } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDrag, useDrop } from 'react-dnd';

export const ItemTypes = {
  CARD: 'card',
};

const style = {
  marginRight: '.5rem', // Adjust for horizontal layout
  backgroundColor: 'white',
  cursor: 'move',
};

export interface CardProps {
  id: any;
  url: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  deleteImgAndVideo: (hoverIndex: number, array: any) => void;
  type: string;
  array: any;
  item?: any;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const Card: FC<CardProps> = ({
  id,
  url,
  index,
  moveCard,
  item,
  type,
  deleteImgAndVideo,
  array,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
      {type == 'image' ? (
        <div className="imgAndVideo">
          <img
            src={url}
            alt={`preview-${index}`}
            style={{ width: '200px', height: '200px' }}
          />
          <div
            className="closeIcon"
            onClick={() => deleteImgAndVideo(id, array)}
          >
            <CancelIcon />
          </div>
        </div>
      ) : null}
      {type === 'video' ? (
        <div className="imgAndVideo">
          <video
            src={url}
            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            controls
          />
          <div
            className="closeIcon"
            onClick={() => deleteImgAndVideo(id, array)}
          >
            <CancelIcon />
          </div>
        </div>
      ) : null}
    </div>
  );
};
