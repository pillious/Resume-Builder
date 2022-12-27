import DebouncedTextarea from "../../UI/DebouncedTextarea";

interface IProps {
    placeholder?: string;
    defaultValue?: string;
    onChange: (content: string) => void;
}

const Info: React.FC<IProps> = (props) => {
    return (
        <DebouncedTextarea
            sx={{
                borderBottom: "1px solid #bbb",
                fontSize: "0.9rem",
                maxWidth: "136px",
                "&:hover": {
                    backgroundColor: "#ddd",
                },
                "& input": { textAlign: "center" },
            }}
            defaultValue={props.defaultValue ?? ""}
            placeholder={props.placeholder ?? ""}
            multiline={false}
            onChange={(content) => props.onChange(content)}
        />
    );
};

export default Info;
