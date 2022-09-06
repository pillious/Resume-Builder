import Box from "@mui/material/Box";

const TopBar: React.FC = () => {
    return (
        <Box
            sx={{
                borderBottom: "1px solid rgba(0,0,0,0.12)",
                px: 1,
                pt: 2,
                pb: 2,
            }}
        >
            <span>File anem</span>
            <span> Del</span>
        </Box>
    );
};

export default TopBar;
