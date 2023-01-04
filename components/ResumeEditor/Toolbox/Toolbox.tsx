import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ToggleButton from "@mui/material/ToggleButton";
import Divider from "@mui/material/Divider";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import SaveIcon from "@mui/icons-material/Save";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FileMenu from "./FileMenu";
import { useContext } from "react";
import AppContext from "../../../store/AppContext";

interface IProps {
    fileName: string;
    copy: () => void;
    save: () => void;
    download: () => void;
    preview: () => void;
    rename: (name: string) => void;
    delete: () => void;
}

const Toolbox: React.FC<IProps> = (props) => {
    const {
        isPreviewActive,
        toggleTools,
        areToolsActive,
        isNavActive,
        activeResumeObj,
        updateActiveResumeObj,
    } = useContext(AppContext);

    return (
        <Box
            sx={{
                height: "38px",
                display: "flex",
                gap: 0.5,
                p: "4px 1rem",
                pl: `${!isNavActive ? "2.5rem" : "1rem"}`,
                borderBottom: "1px solid #eee",
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
            <Button
                variant="text"
                size="small"
                sx={{
                    fontSize: "12px",
                    px: "4px",
                    textTransform: "capitalize",
                    minWidth: "32px",
                    color: "#000",
                }}
            >
                Format
            </Button>
            <ToggleButton
                value="Preview"
                selected={isPreviewActive}
                onChange={props.preview}
                sx={{
                    fontSize: "12px",
                    px: "4px",
                    textTransform: "capitalize",
                    minWidth: "32px",
                    color: "#000",
                    border: "none",
                }}
            >
                Preview
            </ToggleButton>
            <ToggleButton
                value="Preview"
                selected={isPreviewActive}
                onChange={() => updateActiveResumeObj(activeResumeObj.file)}
                sx={{
                    fontSize: "12px",
                    px: "4px",
                    textTransform: "capitalize",
                    minWidth: "32px",
                    color: "#000",
                    border: "none",
                }}
            >
                TEST
            </ToggleButton>
            <Divider orientation="vertical" flexItem />
            <IconButton sx={{ p: "4px" }} title="save" onClick={props.save}>
                <SaveIcon fontSize="small" />
            </IconButton>
            <Divider orientation="vertical" flexItem />
            <div>
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
            </div>
            <Divider orientation="vertical" flexItem />
            <ToggleButton
                value="ToggleTools"
                selected={!areToolsActive}
                title={areToolsActive ? "hide tools" : "show tools"}
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
        </Box>
    );
};

export default Toolbox;
