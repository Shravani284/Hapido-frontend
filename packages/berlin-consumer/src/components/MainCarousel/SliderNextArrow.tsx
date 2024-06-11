import css from '../MainCarousel/Slider.module.scss';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

interface ArrowProps {
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  arrowPosition: string;
}

const SliderNextArrow = (props: ArrowProps) => {
  const { style, onClick, arrowPosition } = props;
  return (
    <>
      {arrowPosition === 'middle' ? (
        <div
          className={`${css.middleNextArrow}`}
          style={{ ...style }}
          onClick={onClick}
        >
          <KeyboardArrowRightRoundedIcon
            fontSize="large"
            className={css.rightIcon}
          />
        </div>
      ) : (
        <div
          className={` ${css.topNextArrow} nextBtn RtltopNextArrow`}
          style={{ ...style }}
          onClick={onClick}
        >
          <KeyboardArrowRightRoundedIcon
            fontSize="small"
            className={css.rightIcon}
          />
        </div>
      )}
    </>
  );
};

export default SliderNextArrow;
