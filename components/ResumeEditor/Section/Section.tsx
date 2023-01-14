import { guid } from "../../../types";
import DebouncedTextarea from "../../UI/DebouncedTextarea";
import DeleteSection from "./DeleteSection";
import AddExperience from "./AddExperience";
import { Reorder, useDragControls } from "framer-motion";
import DragIndicator from "../../UI/DragIndicator";
import { useState } from "react";
import Overlay from "../../UI/Overlay";
import { Box, Divider, useTheme } from "@mui/material";

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
    const controls = useDragControls();
    const theme = useTheme();

    const [showOverlay, setShowOverlay] = useState<boolean>(false);

    return (
        <Reorder.Item
            key={props.id}
            value={props.id}
            dragListener={false}
            dragControls={controls}
            style={{ listStyle: "none", position: "relative" }}
        >
            <Overlay show={showOverlay} styles={{ zIndex: 2 }} />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 1,
                }}
            >
                {props.areToolsActive && (
                    <div
                        onPointerDown={(e) => controls.start(e)}
                        onPointerOver={() => setShowOverlay(true)}
                        onPointerLeave={() => setShowOverlay(false)}
                        style={{ zIndex: 3 }}
                    >
                        <DragIndicator />
                    </div>
                )}
                <DebouncedTextarea
                    sx={{
                        fontSize: "1.15rem",
                        width: "max(225px, 35%)",
                        px: "4px",
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        "&:hover": {
                            backgroundColor: theme.palette.overlay,
                        },
                        "& input": { textAlign: "center" },
                    }}
                    defaultValue={props.name}
                    placeholder="SECTION"
                    multiline={false}
                    onChange={(name) => props.updateSectionName(props.id, name)}
                />

                {props.areToolsActive && (
                    <div
                        onPointerOver={() => setShowOverlay(true)}
                        onPointerLeave={() => setShowOverlay(false)}
                        style={{ zIndex: 3 }}
                    >
                        <DeleteSection
                            deleteSection={() => props.deleteSection(props.id)}
                        />
                    </div>
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
