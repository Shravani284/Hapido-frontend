import { Button, ButtonProps } from "@mui/material";
import css from "./ButtonsStyle.module.scss";

type DefaultButtonType = {
  label: string;
  type?: string;
  className?: string;
} & ButtonProps;

const DefaultButton = (
  { label, onClick }: DefaultButtonType,
  props: ButtonProps
) => {
  return (
    <>
      <Button
        className={css.defaultButton}
        type="submit"
        onClick={onClick}
        {...props}
      >
        {label}
      </Button>
    </>
  );
};

export default DefaultButton;
