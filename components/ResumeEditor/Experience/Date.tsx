import Box from "@mui/material/Box";
import DebouncedTextarea from "../../UI/DebouncedTextarea";

interface IProps {
    startDate: string;
    endDate: string;
    updateDate: (isStartDate: boolean, date: string) => void;
}

const Date: React.FC<IProps> = ({ startDate, endDate, updateDate }) => {
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
                    borderBottom: "1px solid #bbb",
                    fontSize: "0.9rem",
                    minWidth: "64px",
                    "&:hover": {
                        backgroundColor: "#ddd",
                    },
                    "& input": { textAlign: "center" },
                }}
                defaultValue={startDate}
                placeholder="04/2022"
                multiline={false}
                onChange={(date) => updateDate(true, date)}
            />
            <span>-</span>
            <DebouncedTextarea
                sx={{
                    borderBottom: "1px solid #bbb",
                    fontSize: "0.9rem",
                    minWidth: "64px",
                    "&:hover": {
                        backgroundColor: "#ddd",
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
