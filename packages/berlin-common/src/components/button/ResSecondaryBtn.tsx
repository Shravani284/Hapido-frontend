import { Button, ButtonProps } from "@mui/material";
import css from "./ButtonsStyle.module.scss";

type ResPrimaryButtonType = {
  label: string;
  type?: string;
  className?: string;
} & ButtonProps;

const ResSecondaryBtn = (
  { label, onClick, type = "button" }: ResPrimaryButtonType,
  props: ButtonProps
) => {
  return (
    <>
      <Button
        onClick={onClick}
        className={css.resSecondaryBtn}
        type={type}
        {...props}
      >
        {label}
      </Button>
    </>
  );
};

export default ResSecondaryBtn;
