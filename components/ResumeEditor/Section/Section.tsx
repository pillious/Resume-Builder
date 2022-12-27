import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import Divider from "@mui/material/Divider";
import { guid } from "../../../custom2";
import DebouncedTextarea from "../../UI/DebouncedTextarea";

interface IProps {
    name: string;
    id: guid;
    updateSectionName: (sectionId: guid, name: string) => void;
    deleteSection: (sectionId: guid) => void;
    addExperience: (sectionId: guid) => void;
    children: JSX.Element;
}

const Section: React.FC<IProps> = (props) => {
    return (
        <div>
            <DebouncedTextarea
                sx={{
                    fontSize: "1.15rem",
                    width: "max-content",
                    backgroundColor: "#f5f5f5",
                    px: "4px",
                    mt: "0.5rem",
                    "&:hover": {
                        backgroundColor: "#ddd",
                    },
                    "& input": { textAlign: "center" },
                }}
                defaultValue={props.name}
                placeholder="SECTION"
                multiline={false}
                onChange={(name) => props.updateSectionName(props.id, name)}
            />
            <Button
                size="small"
                variant="contained"
                sx={{
                    bgcolor: "#ff355a",
                    fontSize: "10px",
                    lineHeight: "16px",
                    p: "4px 0",
                    ml: "8px",
                    fontWeight: "600",
                    "&:hover": {
                        bgcolor: "#fc5674",
                        transform: "translateY(-2px)",
                    },
                }}
                onClick={() => props.deleteSection(props.id)}
            >
                DELETE
            </Button>

            {props.children}

            <Box
                sx={{ display: "flex", justifyContent: "center", mt: 1, mb: 2 }}
            >
                <Button
                    size="small"
                    variant="outlined"
                    color="secondary"
                    onClick={() => props.addExperience(props.id)}
                    sx={{
                        fontSize: "12px",
                    }}
                >
                    Add Experience
                </Button>
            </Box>

            <Divider />
        </div>
    );
};

export default Section;
