import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";

interface IProps {
    show: boolean;
    color?: string;
    styles?: SxProps;
}

const Overlay: React.FC<IProps> = (props) => {
    return (
        <Box
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                bgcolor: `${props.color ? props.color : "#eee"}`,
                opacity: 0.5,
                display: `${props.show ? "block" : "none"}`,
                ...props.styles,
            }}
        ></Box>
    );
};

export default Overlay;
