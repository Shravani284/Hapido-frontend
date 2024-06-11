import { Button, ButtonProps } from "@mui/material";
import css from "./ButtonsStyle.module.scss";

type SecondaryButtonType = {
  label: string;
  type?: string;
  className?: string;
} & ButtonProps;

const SecondaryButton = (
  { label, onClick }: SecondaryButtonType,
  props: ButtonProps
) => {
  return (
    <>
      <Button
        className={css.secondaryButton}
        type="submit"
        onClick={onClick}
        {...props}
      >
        {label}
      </Button>
    </>
  );
};

export default SecondaryButton;
