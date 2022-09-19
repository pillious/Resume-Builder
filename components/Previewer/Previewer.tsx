import { jsPDF } from "jspdf";

const generator = () => {
    const doc = new jsPDF();
    doc.text("Hello world!", 10, 10);
    return doc.output("datauristring");
};

const Previewer: React.FC = () => {
    return <iframe src={generator()} frameBorder="0"></iframe>;
};

export default Previewer;
