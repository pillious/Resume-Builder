import { Box, useMediaQuery } from "@mui/material";
import dynamic from "next/dynamic";
import { useContext } from "react";
import AppContext from "../../store/AppContext";
import ResumeEditor from "../ResumeEditor/ResumeEditor";
import Background from "./Background";
import ClosePreview from "./ClosePreview";

const Previewer = dynamic(import("../Previewer/Previewer"), {
    ssr: false,
});

const Main: React.FC = () => {
    const { isPreviewActive, activeResumeId, isNavActive, togglePreview } =
        useContext(AppContext);

    const matches = useMediaQuery("(max-width: 1300px)");

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: `${matches ? "column" : "row"}`,
                width: "100%",
                height: "100%",
            }}
        >
            {(!isPreviewActive || (isPreviewActive && !matches)) && (
                <ResumeEditor />
            )}
            {isPreviewActive && (
                <>
                    {matches && (
                        <ClosePreview
                            closePreview={togglePreview}
                            isNavActive={isNavActive}
                        />
                    )}
                    <Previewer />
                </>
            )}
            {!isPreviewActive && !activeResumeId && <Background />}
        </Box>
    );
};

export default Main;
