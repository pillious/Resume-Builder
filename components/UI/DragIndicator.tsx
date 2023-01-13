import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { SxProps, useTheme } from "@mui/material";

interface IProps {
    styles?: SxProps;
}

const DragIndicator: React.FC<IProps> = (props) => {
    const theme = useTheme();

    return (
        <DragIndicatorIcon
            sx={{
                color: theme.palette.muted.main,
                cursor: "grab",
                transform: "translateY(3px)",
                "&:hover": { color: theme.palette.muted.dark },
                "&:active": { cursor: "grabbing" },
                ...props.styles,
            }}
        />
    );
};

export default DragIndicator;
