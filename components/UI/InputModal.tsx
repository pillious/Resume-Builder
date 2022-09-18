import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormTextField from "./FormTextField";

interface IProps {
    open: boolean;
    handleClose: () => void;
    handleConfirm: (inputVal: string) => void;
    title: string;
    label: string;
    defaultValue?: string;
    confirmText?: string;
    cancelText?: string;
}

const InputModal: React.FC<IProps> = (props) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        if (props.open) setValue(props.defaultValue ?? "");
    }, [props.open, props.defaultValue]);

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <FormTextField
                    value={value}
                    label={props.label}
                    fieldId={props.label}
                    onChange={(v: string) => setValue(v)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="error">
                    {props.cancelText ?? "Cancel"}
                </Button>
                <Button
                    onClick={() => {
                        props.handleConfirm(value);
                        props.handleClose();
                        setValue("");
                    }}
                >
                    {props.confirmText ?? "Confirm"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default InputModal;
