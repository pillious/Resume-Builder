import { Typography, SxProps } from "@mui/material";

interface IProps {
    sx?: SxProps;
}

const LogoName: React.FC<IProps> = (props) => {
    return (
        <Typography
            variant="h6"
            noWrap
            fontWeight={700}
            fontSize={24}
            letterSpacing="0.1rem"
            textAlign="center"
            sx={props.sx}
        >
            <span style={{ color: "#64ffda" }}>Resume  </span>
            <span style={{ color: "#f57dff" }}>Builder</span>
        </Typography>
    );
};

export default LogoName;
