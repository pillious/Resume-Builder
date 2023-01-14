// import UndoIcon from "@mui/icons-material/Undo";
// import RedoIcon from "@mui/icons-material/Redo";
import SaveIcon from "@mui/icons-material/Save";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FileMenu from "./FileMenu";
import { useContext } from "react";
import AppContext from "../../../store/AppContext";
import { AnimatePresence, motion } from "framer-motion";
import {
    Paper,
    Button,
    Chip,
    IconButton,
    ToggleButton,
    Divider,
    useTheme,
} from "@mui/material";

interface IProps {
    fileName: string;
    hasUnsavedChanges: boolean;
    copy: () => void;
    save: () => void;
    download: () => void;
    preview: () => void;
    rename: (name: string) => void;
    delete: () => void;
}

const Toolbox: React.FC<IProps> = (props) => {
    const { isPreviewActive, toggleTools, areToolsActive, isNavActive } =
        useContext(AppContext);

    const theme = useTheme();

    return (
        <Paper
            sx={{
                height: "38px",
                display: "flex",
                gap: 0.5,
                p: "4px 1rem",
                pl: `${!isNavActive ? "2.5rem" : "1rem"}`,
                borderRadius: 0,
            }}
        >
            {!isNavActive && <Divider orientation="vertical" flexItem />}
            <FileMenu
                fileName={props.fileName}
                copy={props.copy}
                save={props.save}
                download={props.download}
                rename={props.rename}
                delete={props.delete}
            />
            <ToggleButton
                value="Preview"
                selected={isPreviewActive}
                onChange={props.preview}
                sx={{
                    fontSize: "0.875rem",
                    px: "4px",
                    textTransform: "capitalize",
                    border: "none",
                }}
            >
                Preview PDF
            </ToggleButton>
            <Button
                variant="text"
                size="small"
                sx={{
                    fontSize: "0.875rem",
                    px: "4px",
                    textTransform: "capitalize",
                    minWidth: "32px",
                    color: theme.palette.white,
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" },
                }}
            >
                Help
            </Button>
            <Divider orientation="vertical" flexItem />
            <IconButton
                sx={{ p: "4px", borderRadius: "4px" }}
                title="Save"
                onClick={props.save}
            >
                <SaveIcon fontSize="small" />
            </IconButton>
            <AnimatePresence>
                {props.hasUnsavedChanges && (
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "initial" }}
                        transition={{ duration: 0.2 }}
                        exit={{ opacity: 0, width: 0 }}
                    >
                        <Chip
                            label="Save Changes"
                            size="small"
                            color="primary"
                            onClick={props.save}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <Divider orientation="vertical" flexItem />
            {/* <div>
                <IconButton
                    sx={{ p: "4px" }}
                    title="undo"
                    onClick={() => console.log("TODO: implement undo")}
                >
                    <UndoIcon fontSize="small" />
                </IconButton>
                <IconButton
                    sx={{ p: "4px" }}
                    title="redo"
                    onClick={() => console.log("TODO: implement redo")}
                >
                    <RedoIcon fontSize="small" />
                </IconButton>
            </div> */}
            <ToggleButton
                value="ToggleTools"
                selected={!areToolsActive}
                title={areToolsActive ? "Hide Tools" : "Show Tools"}
                onChange={toggleTools}
                sx={{
                    px: "4px",
                    textTransform: "capitalize",
                    border: "none",
                }}
            >
                {areToolsActive ? (
                    <VisibilityIcon fontSize="small" />
                ) : (
                    <VisibilityOffIcon fontSize="small" />
                )}
            </ToggleButton>
        </Paper>
    );
};

export default Toolbox;
