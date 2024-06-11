import css from '../MainCarousel/Slider.module.scss';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';

interface ArrowProps {
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  arrowPosition: string;
}

const SliderPreArrow = (props: ArrowProps) => {
  const { style, onClick, arrowPosition } = props;
  return (
    <>
      {arrowPosition === 'middle' ? (
        <div
          className={`${css.middlePrevArrow}`}
          style={{ ...style }}
          onClick={onClick}
        >
          <KeyboardArrowLeftRoundedIcon
            fontSize="large"
            className={css.leftIcon}
          />
        </div>
      ) : (
        <div
          className={`${css.topPrevArrow} prevBtn RtltopPrevArrow`}
          style={{ ...style }}
          onClick={onClick}
        >
          <KeyboardArrowLeftRoundedIcon
            fontSize="small"
            className={css.leftIcon}
          />
        </div>
      )}
    </>
  );
};

export default SliderPreArrow;
