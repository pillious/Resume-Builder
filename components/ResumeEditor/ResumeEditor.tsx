import AddSection from "./AddSection";
import classes from "./ResumeEditor.module.css";
import Section from "./Section";

const ResumeEditor: React.FC = () => {
    return (
        <section className={classes.section}>
            <Section />
            <AddSection />
        </section>
    );
};

export default ResumeEditor;
