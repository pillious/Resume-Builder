import Box from "@mui/material/Box";
import DebouncedTextarea from "../../UI/DebouncedTextarea";

const Date: React.FC = () => {
    return (
        <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
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
                // defaultValue={props.title}
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
                // defaultValue={props.title}
                placeholder="04/2022"
                multiline={false}
                onChange={(date) => console.log(date)}
            />
        </Box>
    );
};

export default Date;
