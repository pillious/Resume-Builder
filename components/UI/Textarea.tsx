import { useEffect } from "react";
import { SxProps } from "@mui/material";
import Input from "@mui/material/Input";
import useInput from "../../hooks/use-input";

interface IProps {
    sx?: SxProps;
    defaultValue?: string;
    placeholder?: string;
}

const Textarea: React.FC<IProps> = ({ sx, defaultValue, placeholder }) => {
    const { value, valueChangeHandler, reset } = useInput("");

    useEffect(() => {
        if (defaultValue) reset(defaultValue);
    }, [reset, defaultValue]);

    // Debounce saving to reducer.
    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log(value);
        }, 300);

        return () => {
            clearTimeout(identifier);
        };
    }, [value]);

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
