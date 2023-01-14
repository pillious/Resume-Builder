import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

interface IProps {
    open: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
    title: string;
    text: string;
    cancelText?: string;
    confirmText?: string;
}

const ConfirmationModal: React.FC<IProps> = (props) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="error">
                    {props.cancelText ?? "Cancel"}
                </Button>
                <Button
                    onClick={() => {
                        props.handleConfirm();
                        props.handleClose();
                    }}
                    autoFocus
                >
                    {props.confirmText ?? "Confirm"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationModal;
