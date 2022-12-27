import Box from "@mui/material/Box";
import DebouncedTextarea from "../../UI/DebouncedTextarea";

interface IProps {
    startDate: string;
    endDate: string;
}

const Date: React.FC<IProps> = ({ startDate, endDate }) => {
    return (
        <Box
            sx={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                marginLeft: "auto",
            }}
        >
            <DebouncedTextarea
                sx={{
                    borderBottom: "1px solid #bbb",
                    fontSize: "0.9rem",
                    maxWidth: "64px",
                    "&:hover": {
                        backgroundColor: "#ddd",
                    },
                    "& input": { textAlign: "center" },
                }}
                defaultValue={startDate}
                placeholder="04/2022"
                multiline={false}
                onChange={(date) => console.log(date)}
            />
            <span>-</span>
            <DebouncedTextarea
                sx={{
                    borderBottom: "1px solid #bbb",
                    fontSize: "0.9rem",
                    maxWidth: "64px",
                    "&:hover": {
                        backgroundColor: "#ddd",
                    },
                    "& input": { textAlign: "center" },
                }}
                defaultValue={endDate}
                placeholder="04/2022"
                multiline={false}
                onChange={(date) => console.log(date)}
            />
        </Box>
    );
};

export default Date;
