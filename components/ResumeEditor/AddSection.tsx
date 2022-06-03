import Tooltip from "../UI/Tooltip";
import { MdAddCircleOutline } from "react-icons/md";
import classes from "./AddSection.module.css";

const AddSection: React.FC = () => {
    const clickHandler = () => {}

    return (
        <Tooltip text="Create Section" direction="bottom">
            <div className={classes.add_section} onClick={clickHandler}>
                {/* Don't remove the empty elements. CSS selectors operate upon these. */}
                <span />
                <span>
                    <MdAddCircleOutline size="100%" />
                </span>
                <span />
            </div>
        </Tooltip>
    );
};

export default AddSection;
