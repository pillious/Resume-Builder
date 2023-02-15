import { Box, useTheme } from "@mui/material";
import DebouncedTextarea from "../../UI/DebouncedTextarea";

interface IProps {
    startDate: string;
    endDate: string;
    updateDate: (isStartDate: boolean, date: string) => void;
}

const Date: React.FC<IProps> = ({ startDate, endDate, updateDate }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                marginLeft: "auto",
                width: "clamp(150px, 25%, 300px)",
            }}
        >
            <DebouncedTextarea
                sx={{
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    fontSize: "0.9rem",
                    minWidth: "64px",
                    "&:hover": {
                        backgroundColor: theme.palette.overlay,
                    },
                    "& input": { textAlign: "center" },
                }}
                defaultValue={startDate}
                placeholder="04/2022"
                multiline={false}
                onChange={(date) => updateDate(true, date)}
            />
            <Box sx={{color: theme.palette.grey[300]}}>-</Box>
            <DebouncedTextarea
                sx={{
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    fontSize: "0.9rem",
                    minWidth: "64px",
                    "&:hover": {
                        backgroundColor: theme.palette.overlay,
                    },
                    "& input": { textAlign: "center" },
                }}
                defaultValue={endDate}
                placeholder="04/2022"
                multiline={false}
                onChange={(date) => updateDate(false, date)}
            />
        </Box>
    );
};

export default Date;
