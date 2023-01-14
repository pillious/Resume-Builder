import { TextField } from "@mui/material";

interface IProps {
    value: string;
    onChange: (value: string) => void;
    label: string;
    fieldId: string;
    type?: string;
    margin?: "none" | "dense" | "normal";
}

const FormTextField: React.FC<IProps> = (props) => {
    return (
        <TextField
            autoFocus
            fullWidth
            variant="filled"
            margin={props.margin || "dense"}
            id={props.fieldId}
            label={props.label}
            type={props.type || "type"}
            onChange={(evt) => props.onChange(evt.target.value)}
            value={props.value}
        />
    );
};

export default FormTextField;
