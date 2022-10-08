import { useContext } from "react";
import AppContext from "../../store/AppContext";

const Previewer: React.FC = () => {
    const { activeResumeObj, isPreviewActive } = useContext(AppContext);
    return (
        <>
            {isPreviewActive && (
                <iframe
                    src={activeResumeObj.pdf.getUri()}
                    frameBorder="0"
                    style={{ flex: 1 }}
                ></iframe>
            )}
        </>
    );
};

export default Previewer;
