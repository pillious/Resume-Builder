import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { SxProps } from "@mui/material";

interface IProps {
    styles?: SxProps;
}

const DragIndicator: React.FC<IProps> = (props) => {
    return (
        <DragIndicatorIcon
            sx={{
                color: "#aaa",
                cursor: "grab",
                "&:hover": { color: "#333" },
                "&:active": { cursor: "grabbing" },
                ...props.styles,
            }}
        />
    );
};

export default DragIndicator;
