import { useState } from "react";
import classes from "./Tooltip.module.css";

interface IProps {
    text: string;
    direction?: "top" | "right" | "bottom" | "left";
    delay?: number;
    children?: React.ReactNode;
}

/**
 * Original component:
 * https://paladini.dev/posts/how-to-make-an-extremely-reusable-tooltip-component-with-react--and-nothing-else/
 */
const Tooltip: React.FC<IProps> = ({
    text,
    direction = "top",
    delay = 500,
    children,
}) => {
    let timeout: ReturnType<typeof setTimeout>;
    const [active, setActive] = useState(false);

    const showTip = () => {
        timeout = setTimeout(() => {
            setActive(true);
        }, delay);
    };

    const hideTip = () => {
        clearInterval(timeout);
        setActive(false);
    };

    return (
        <div
            className={classes.tooltip_wrapper}
            onMouseEnter={showTip}
            onMouseLeave={hideTip}
        >
            {children}
            {active && (
                <div className={`${classes.tooltip_tip} ${classes[direction]}`}>
                    {text}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
