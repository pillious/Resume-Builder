import { useEffect, useState } from "react";
import { SxProps } from "@mui/material";
import Input from "@mui/material/Input";
import useInput from "../../hooks/use-input";

interface IProps {
    sx?: SxProps;
    defaultValue?: string;
    placeholder?: string;
    onChange?: (content: string) => void;
}

const Textarea: React.FC<IProps> = ({
    sx,
    defaultValue,
    placeholder,
    onChange,
}) => {
    const { value, valueChangeHandler, reset } = useInput("");
    const [prevValue, setPrevValue] = useState(value);

    useEffect(() => {
        if (defaultValue) reset(defaultValue);
    }, [reset, defaultValue]);

    // Debounce saving to reducer.
    useEffect(() => {
        let identifier: NodeJS.Timeout;
        if (
            typeof onChange === "function" &&
            value.trim() !== prevValue.trim()
        ) {
            identifier = setTimeout(() => {
                onChange(value);
                setPrevValue(value);
            }, 300);
        }

        return () => {
            clearTimeout(identifier);
        };
    }, [prevValue, value, onChange]);

    return (
        <Input
            sx={sx ? sx : undefined}
            value={value}
            onChange={valueChangeHandler}
            placeholder={placeholder ? placeholder : undefined}
            multiline
            disableUnderline
        />
    );
};

export default Textarea;
