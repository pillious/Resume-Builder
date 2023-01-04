import { useContext } from "react";
import AppContext from "../../store/AppContext";

const Previewer: React.FC = () => {
    const { activeResumeObj, isPreviewActive } = useContext(AppContext);

    return (
        <>
            {isPreviewActive && (
                <iframe
                    src={activeResumeObj.pdf.getUri(activeResumeObj.file?.name)}
                    style={{ flex: 1, border: "none" }}
                ></iframe>
            )}
        </>
    );
};

export default Previewer;
