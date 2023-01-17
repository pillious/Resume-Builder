import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { BULLET_ICON } from "../../../utils/constants";

interface IProps {
    isOpen: boolean;
    closeModal: () => void;
}

const HelpMenu: React.FC<IProps> = (props) => {
    return (
        <div>
            <Dialog
                onClose={props.closeModal}
                aria-labelledby="help-menu"
                open={props.isOpen}
            >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Text Formatting Tips
                    <IconButton
                        aria-label="close"
                        onClick={props.closeModal}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <TableContainer component={Paper}>
                        <Table aria-label="formatting-tips-table" size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell width={125}>Text Format</TableCell>
                                    <TableCell align="left" width={125}>
                                        Usage
                                    </TableCell>
                                    <TableCell align="left" width={125}>
                                        Result
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Bullet Point
                                    </TableCell>
                                    <TableCell align="left">* text</TableCell>
                                    <TableCell align="left">
                                        {BULLET_ICON} text
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Bold
                                    </TableCell>
                                    <TableCell align="left">**text**</TableCell>
                                    <TableCell align="left">
                                        <Typography fontWeight="bold">
                                            text
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Italics
                                    </TableCell>
                                    <TableCell align="left">_text_</TableCell>
                                    <TableCell align="left">
                                        <Typography fontStyle="italic">
                                            text
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Heading 1
                                    </TableCell>
                                    <TableCell align="left"># text</TableCell>
                                    <TableCell align="left">
                                        <Typography
                                            fontWeight="bold"
                                            fontSize="2rem"
                                        >
                                            text
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Heading 2
                                    </TableCell>
                                    <TableCell align="left">## text</TableCell>
                                    <TableCell align="left">
                                        <Typography
                                            fontWeight="bold"
                                            fontSize="1.5rem"
                                        >
                                            text
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Heading 3
                                    </TableCell>
                                    <TableCell align="left">### text</TableCell>
                                    <TableCell align="left">
                                        <Typography
                                            fontWeight="bold"
                                            fontSize="1.25rem"
                                        >
                                            text
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Heading 4
                                    </TableCell>
                                    <TableCell align="left">
                                        #### text
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography
                                            fontWeight="bold"
                                            fontSize="1rem"
                                        >
                                            text
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Heading 5
                                    </TableCell>
                                    <TableCell align="left">
                                        ##### text
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography
                                            fontWeight="bold"
                                            fontSize="0.875rem"
                                        >
                                            text
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        Heading 6
                                    </TableCell>
                                    <TableCell align="left">
                                        ###### text
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography
                                            fontWeight="bold"
                                            fontSize="0.85rem"
                                        >
                                            text
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={props.closeModal}
                        variant="outlined"
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default HelpMenu;
