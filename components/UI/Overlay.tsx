import { SxProps, useTheme, Box } from "@mui/material";

interface IProps {
    show: boolean;
    color?: string;
    styles?: SxProps;
}

const Overlay: React.FC<IProps> = (props) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                bgcolor: `${
                    props.color ? props.color : theme.palette.overlay
                }`,
                display: `${props.show ? "block" : "none"}`,
                zIndex: 2,
                ...props.styles,
            }}
        ></Box>
    );
};

export default Overlay;
