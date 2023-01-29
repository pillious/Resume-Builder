import { useEffect, useState } from "react";
import { SxProps, Input } from "@mui/material";
import useInput from "../../hooks/use-input";

interface IProps {
    sx?: SxProps;
    defaultValue?: string;
    placeholder?: string;
    multiline?: boolean;
    onChange?: (content: string) => void;
}

const Textarea: React.FC<IProps> = ({
    sx,
    defaultValue,
    placeholder,
    multiline,
    onChange,
}) => {
    const { value, valueChangeHandler, reset } = useInput("");
    const [prevValue, setPrevValue] = useState(value);

    useEffect(() => {
        reset(defaultValue ?? "");
    }, [reset, defaultValue]);

    // Debounce saving to reducer.
    useEffect(() => {
        let identifier: NodeJS.Timeout;
        if (typeof onChange === "function" && value !== prevValue) {
            identifier = setTimeout(() => {
                onChange(value);
                setPrevValue(value);
            }, 275);
        }

        return () => {
            clearTimeout(identifier);
        };
    }, [prevValue, value, onChange]);

    return (
        <Input
            sx={sx || undefined}
            value={value}
            onChange={valueChangeHandler}
            placeholder={placeholder || undefined}
            multiline={multiline !== undefined ? multiline : true} // true by default
            disableUnderline
        />
    );
};

export default Textarea;
