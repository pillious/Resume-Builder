import DebouncedTextarea from "../../UI/DebouncedTextarea";

interface IProps {
    placeholder?: string;
    fontWeight?: number;
    fontSize?: number | string;
    defaultValue?: string;
    onChange: (content: string) => void;
}

const Info: React.FC<IProps> = (props) => {
    return (
        <DebouncedTextarea
            sx={{
                fontSize: `${props.fontSize ?? "inherit"}`,
                fontWeight: `${props.fontWeight ?? "unset"}`,
                maxWidth: "300px",
                pl: "0.5rem",
                borderRadius: "8px",
                backgroundColor: "#f5f5f5",
                "&:hover": {
                    backgroundColor: "#ddd",
                },
            }}
            defaultValue={props.defaultValue ?? ""}
            placeholder={props.placeholder ?? ""}
            multiline={false}
            onChange={(content) => props.onChange(content)}
        />
    );
};

export default Info;
