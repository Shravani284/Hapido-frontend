import { Button, ButtonProps } from "@mui/material";
import css from "./ButtonsStyle.module.scss";

type PrimaryButtonType = {
  label: any;
  type?: string;
  className?: string;
  isDisabled?: boolean;
} & ButtonProps;

const PrimaryButton = (
  { label, onClick, type = "button", isDisabled }: PrimaryButtonType,
  props: ButtonProps
) => {
  return (
    <>
      <Button
        disabled={isDisabled}
        onClick={onClick}
        className={css.primaryBtn}
        type={type}
        {...props}
      >
        {label}
      </Button>
    </>
  );
};

export default PrimaryButton;
