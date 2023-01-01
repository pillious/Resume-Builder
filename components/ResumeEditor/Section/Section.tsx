import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { guid } from "../../../custom2";
import DebouncedTextarea from "../../UI/DebouncedTextarea";
import DeleteSection from "./DeleteSection";
import AddExperience from "./AddExperience";
import { Reorder } from "framer-motion";

interface IProps {
    name: string;
    id: guid;
    areToolsActive: boolean;
    updateSectionName: (sectionId: guid, name: string) => void;
    deleteSection: (sectionId: guid) => void;
    addExperience: (sectionId: guid) => void;
    children: JSX.Element;
}

const Section: React.FC<IProps> = (props) => {
    return (
        <Reorder.Item
            key={props.id}
            value={props.id}
            style={{ listStyle: "none" }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: "0.5rem",
                }}
            >
                <DebouncedTextarea
                    sx={{
                        fontSize: "1.15rem",
                        width: "max-content",
                        backgroundColor: "#f5f5f5",
                        px: "4px",
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

                {props.areToolsActive && (
                    <DeleteSection
                        deleteSection={() => props.deleteSection(props.id)}
                    />
                )}
            </Box>

            {props.children}

            {props.areToolsActive && (
                <AddExperience
                    addExperience={() => props.addExperience(props.id)}
                />
            )}

            <Divider sx={{ mt: 2 }} />
        </Reorder.Item>
    );
};

export default Section;
