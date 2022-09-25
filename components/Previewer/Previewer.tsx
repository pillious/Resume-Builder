import { useContext } from "react";
import AppContext from "../../store/AppContext";
import { getURI } from "../../utils/pdfgen";

const Previewer: React.FC = () => {
    const { activeResumeObj } = useContext(AppContext);
    return (
        <iframe
            src={getURI(activeResumeObj.pdf)}
            frameBorder="0"
            style={{ flex: 1 }}
        ></iframe>
    );
};

export default Previewer;
