import { useState } from "react";
import Button, { ButtonProps } from "./Button";
import _ from "lodash";
import CustomDialog from "./CustomDialog";

interface ModalProps extends ButtonProps {
  buttonContent: string | React.ReactNode;
  title: string;
  width?: "md" | "lg";
}

export default function Modal(props: ModalProps) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Button
        type="button"
        filled
        onClick={handleOpen}
        {..._.omit(props, "children", "buttonContent", "title", "width")}
      >
        {props.buttonContent}
      </Button>
      <CustomDialog
        open={open}
        onClose={handleClose}
        title={props.title}
        width={props.width}
      >
        {props.children}
      </CustomDialog>
    </>
  );
}
