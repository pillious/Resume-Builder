import { Box, useTheme } from "@mui/material";
import { useContext } from "react";
import AppContext from "../../store/AppContext";

const Previewer: React.FC = () => {
    const theme = useTheme();

    const { activeResumeObj } = useContext(AppContext);

    return (
        <Box sx={{ flex: 1, position: "relative" }}>
            <iframe
                src={activeResumeObj.pdf.getUri(activeResumeObj.file?.name)}
                style={{
                    border: "none",
                    borderLeft: `1px solid ${theme.palette.divider}`,
                    height: "100%",
                    width: "100%",
                }}
            ></iframe>
        </Box>
    );
};

export default Previewer;
