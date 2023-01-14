import { useTheme, Box, Button, Divider } from "@mui/material";

interface IProps {
    closePreview: () => void;
    isNavActive: boolean;
}

const ClosePreview: React.FC<IProps> = (props) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                height: "38px",
                display: "flex",
                gap: 0.5,
                p: "6px 1rem",
                pl: `${!props.isNavActive ? 5 : 1}`,
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}
        >
            {!props.isNavActive && (
                <Divider orientation="vertical" flexItem sx={{ mr: 1 }} />
            )}
            <Button
                variant="outlined"
                size="small"
                color="inherit"
                sx={{
                    fontSize: "0.875rem",
                    px: "4px",
                    textTransform: "capitalize",
                    minWidth: "32px",
                }}
                onClick={props.closePreview}
            >
                Exit Preview
            </Button>
        </Box>
    );
};

export default ClosePreview;
